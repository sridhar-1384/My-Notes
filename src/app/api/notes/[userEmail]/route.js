import { NextResponse } from "next/server";
import User from "../../../../../models/UserModel";
import connectDB from "../../../../../utils/connect";
export async function GET(req,{params}){
    let email=params.userEmail;
    try{
        await connectDB()
        let user=await User.findOne({email:email})
        let data=user.notes
        return NextResponse.json(data,{status:200})
    }catch(error){
        return NextResponse.json({message:error.message},{status:500})
    }
}