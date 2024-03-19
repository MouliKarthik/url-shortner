import { Body, Controller,Get,Param,Post,Res,Req,HttpException,HttpStatus } from "@nestjs/common";
import { Response,Request } from 'express';
import { UrlService } from "./url.service";

@Controller()
export class UrlController {
    constructor(private readonly urlService: UrlService){}

    @Post('shorturl/:userId')
    async addUrl(
        @Param('userId') userId:string,
        @Body('url') url:string
    ){
        let result;
        try{
            result = await this.urlService.addUrl(url, userId);
        }catch(error){
            console.error('Error signing in:', error.message);
            return new HttpException(error.message,HttpStatus.BAD_REQUEST);
        }
        return result
    }

    @Get('shorturl/:userId')
    async getUrl(
        @Param('userId') userId:string
    ){
        let result;
        try{
            result = await this.urlService.getUrlByUserId(userId);
        }catch(error){
            console.error('Error signing in:', error.message);
            return new HttpException(error,HttpStatus.BAD_REQUEST);
        }
        return result;
    }

    @Get('shorturl/:userId/:shorturl')
    async redirectToOriginalUrl(
        @Param('shorturl') shortUrl: string, 
        @Param('userId') userId: string,
        @Res() res: Response,
        @Req() req: Request 
    ){
    try{
        let originalUrl = await this.urlService.getOriginalUrlByShortUrl(shortUrl,userId,req);

        if (!originalUrl.startsWith('http://') && !originalUrl.startsWith('https://')) {
          originalUrl = 'http://' + originalUrl; 
        }
        res.setHeader('Location', originalUrl);
        return res.status(302).send();

    }catch(error) {
      console.error('Error:', error.message);
      return res.json({ error: error.message });
    }
  }

}