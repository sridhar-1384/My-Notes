import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import connectDB from "../../../../utils/connect";
import User from "../../../../models/UserModel";

export async function POST(req){
    let {title,message}=await req.json()
    let {user}=await getServerSession()
    const email=user.email
    try{
        await connectDB()
        await User.updateOne({email:email},{$push:{["notes"]:{title:title,message:message}}})
         return NextResponse.json({message:"Note inserted"},{status:200})
    }catch(error){
        console.log("Error putting notes")
        return NextResponse.json({message:error.message},{status:500})
    }
}

export async function DELETE(req){
    let {objectId}=await req.json()
    let {user}=await getServerSession()
    const email=user.email
    try{
        await connectDB()
        await User.updateOne({email:email},{$pull:{"notes":{_id: objectId }}})
        return NextResponse.json({message:"Note deleted"},{status:200})
    }catch(error){
        console.log("Error deleting notes")
        return NextResponse.json({message:error.message},{status:500})
    }
}