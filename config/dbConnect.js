import mongoose from "mongoose";

const connectToDb =  async () => {
     try {
        mongoose.connect('mongodb://localhost:27017/passportLocal').then(()=>{
             console.log(`connect to databse`)
        }).catch((err)=>{
             console.log(err)
        })
     } catch (error) {
        console.log(error)
     }
}

export default connectToDb