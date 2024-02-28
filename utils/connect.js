import mongoose from "mongoose";

export default async function connectDB(){
    try{
        await mongoose.connect(process.env.MONGO_URI)
        console.log("connected to DB")
    }catch(err){
        console.log("Unable to connect to DB-"+err.message)
    }
}