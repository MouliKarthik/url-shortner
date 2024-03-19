import { Controller,Post,Get,Body,HttpException,HttpStatus, UseGuards } from "@nestjs/common";
import { UserService } from "./user.service";

@Controller()
export class UserController {
    constructor(private readonly userService: UserService){}

    @Post('signup')
    async signup(
        @Body('email')  email: string,
        @Body('password') password: string
    ){
        let result;
        try{
            result = await this.userService.createUser(email, password);
        }catch(error){
            console.log(error.message);
            return new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return {id:result.id,token:result.token};
    }
    
    @Post('login')
    async signin(
        @Body('email') email: string,
        @Body('password') password: string
    ){
        let result;
        try {
            result = await this.userService.login(email, password);
            
        } catch (error) {
            // Handle the error here
            console.error('Error signing in:', error.message);
            return new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return {id:result.id,token:result.token};
    }
}
