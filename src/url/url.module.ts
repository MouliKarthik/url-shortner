import { Module } from "@nestjs/common";
import { UrlController } from "./url.controller";
import { UrlService } from "./url.service";
import { UrlSchema } from "./url.model";
import { MongooseModule } from "@nestjs/mongoose";
import { UserSchema } from "src/user/user.model";



@Module({
    imports:[MongooseModule.forFeature([{name:"Url",schema:UrlSchema},{name:"User",schema:UserSchema}])],
    controllers:[UrlController], 
    providers:[UrlService],
})
export class UrlModule {}