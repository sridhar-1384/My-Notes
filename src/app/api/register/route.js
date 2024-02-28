import connectDB from "../../../../utils/connect";
import User from "../../../../models/UserModel";
import { NextResponse } from "next/server";
import { hash } from "bcrypt";
export async function POST(req){
    try{
        await connectDB();
        let {name,email,password}=await req.json()
        let exists=await User.findOne({email:email})
        if(exists){
            return NextResponse.json({message:"specified user exists"},{status:500})
        }
        let passHash=await hash(password,10)
        await User.create({name:name,email:email,password:passHash})
        return NextResponse.json({message:"User registered"},{status:200})
    }catch(err){
        console.log("Error entering user details")
        return NextResponse.json({message:err.message},{status:500})
    }
}