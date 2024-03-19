import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { UrlModule } from './url/url.module';
import { ConfigModule } from '@nestjs/config';



@Module({
  imports: [UserModule,UrlModule,ConfigModule.forRoot({isGlobal: true,}),
    MongooseModule.forRoot(
      `mongodb+srv://Mouli:AjNQOxx70pqNMHPc@cluster0.26837vw.mongodb.net/urlShortner?retryWrites=true&w=majority&appName=Cluster0`
    )
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
console.log(`${process.env.DATABASE_URL}`);
