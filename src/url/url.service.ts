import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Url } from "./url.model";
import { Response,Request } from 'express';
import { User } from "src/user/user.model";

@Injectable()
export class UrlService{
    constructor(@InjectModel('Url') private readonly urlModel: Model<Url>,
                @InjectModel('User') private readonly userModel: Model<User>){};

    async addUrl(url:string,userId:string){
        let savedUrl;
        try{
             // Find the user document by ID
            const user = await this.userModel.findById(userId);
    
             // If user found, update user.url array with the new URL's ID
            if(!user){
                 throw new Error('User not found'); // Handle the case if user is not found
             }
             const existingUrl = await this.urlModel.findOne({ url, creator: userId });

             if (existingUrl) {
                 // If the URL already exists for the same user, handle the case
                 throw new Error('URL already exists for this user');
             }
            
            const expirationDate = new Date();
            expirationDate.setDate(expirationDate.getDate() + 1);

            const newUrl = new this.urlModel({
                url,
                creator:userId,
                validUntil:expirationDate
            })
            savedUrl = await newUrl.save();
            user.urls.push(savedUrl._id);   
            await user.save();
           
        }catch(error){
            throw new Error(error.message);
        }
        return savedUrl;
    }

    async getUrlByUserId(userId:string){
        const urls = await this.urlModel.find({ creator: userId }).exec();
        return urls;
    }

    async getOriginalUrlByShortUrl(shortUrl:string,userId:string,req:Request){
        try {
            const result = await this.urlModel.findOne({ shortUrl: shortUrl, creator: userId });
            if (!result) {
                throw new Error('URL not found');
            }
            if(result.validUntil < new Date()) {
                await result.deleteOne();
                throw new Error('Short url expired');
            }
            const userAgent = req.headers['user-agent'];
            if (userAgent) {
                if (userAgent.toLowerCase().includes('mobile')) {
                    result.clickedFrom.mobile = (result.clickedFrom.mobile || 0) + 1;
                } else {
                    result.clickedFrom.pc = (result.clickedFrom.pc || 0) + 1;
                }
            }
            await result.save();
            let url;
            if (!result.url.startsWith('http://') && !result.url.startsWith('https://')) {
                url = 'http://' + result.url; 
            }
            return url; // Return the URL string
        } catch (error) {
            throw new Error(error.message);
        }
    }
   
}