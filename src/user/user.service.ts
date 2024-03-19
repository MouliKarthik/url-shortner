import { Injectable, NotFoundException,HttpException,HttpStatus } from "@nestjs/common";
import { User } from "./user.model";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import * as bcrypt from "bcrypt";
import { AuthService } from "src/auth/auth.service";


@Injectable()
export class UserService {
    constructor(@InjectModel('User') private readonly userModel: Model<User>,
                private readonly authService: AuthService){};

    async createUser(email:string,password:string){
        try {
            const existingUser = await this.userModel.findOne({ email });
            if (existingUser) {
                throw new Error('User already exists');
            }
            const hashedPassword = await this.hashPassword(password);
            const newUser = new this.userModel({ email, password: hashedPassword });
            const result = await newUser.save();
            const user = { email: result.email,id:result.id}
            const token = this.authService.generateToken(user);
            return {id: result.id,token:token};
        } catch (error) {
            console.error('Error creating user:', error);
            throw new Error(error.message+' ,signin failed');
        }
    }

    async login(email:string,password:string){
        try {
            const existingUser = await this.userModel.findOne({ email });
            if (!existingUser) {
                throw new Error('User not found');
            }
            const isValidPassword = await this.comparePasswords(password, existingUser.password);
            if (!isValidPassword) {
                throw new Error('Invalid credentials');
            }
            const user = { email: existingUser.email,id:existingUser.id}
            const token = this.authService.generateToken(user);
            return {id:existingUser.id,token:token};
        } catch (error) {
            console.error(error.message);
            throw new Error(error.message+' ,Login failed');
        }
    }

    async hashPassword(password: string):   Promise<string> {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
        return hash.toString();
    }

    async comparePasswords(plainPassword: string, hashedPassword: string): Promise<boolean> {
        // Compare the plain password with the hashed password
        const isMatch = await bcrypt.compare(plainPassword, hashedPassword);
        return isMatch;
    }
    
}