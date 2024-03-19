import * as mongoose from 'mongoose';
import { User } from 'src/user/user.model';
import * as shortid from 'shortid';

export const UrlSchema = new mongoose.Schema({
  url: {type:String,required:true},
  shortUrl: {type: String, default:shortid.generate(),  required:true},
  createdAt: { type: Date, default: Date.now },
  validUntil:{type:Date,required:true},
  creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, 
  clickedFrom: {
    mobile: { type: Number, default: 0 },
    pc: { type: Number, default: 0 }
  }
});



export interface Url extends mongoose.Document {
    url: string;
    shortUrl: string;
    createdAt: Date;
    creator: User['_id']; 
    clickedFrom: {
        mobile: number;
        pc: number;
      },
    validUntil: Date
  }
