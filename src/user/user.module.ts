import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { UserSchema } from "./user.model";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { AuthModule } from "src/auth/auth.module";

@Module({
    imports: [AuthModule,MongooseModule.forFeature([{name:"User",schema:UserSchema}])],
    controllers:[UserController],
    providers:[UserService],
})
export class UserModule{}