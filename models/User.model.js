import { Schema,model } from "mongoose";

const UserSchema = new Schema({
    name :{
        type:String
    },
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true,
    }
},{timestamps:true})

const User = model("Users",UserSchema);
export default User
