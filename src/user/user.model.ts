import * as mongoose from "mongoose";

export const UserSchema = new mongoose.Schema({
    email: {type:String,required:true},
    password: {type:String,required:true},
    urls: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Url' }],
});

export interface User extends mongoose.Document {
    id:string,
    email:string,
    password:string,
    urls: string[];
}