import mongoose from "mongoose"

const noteSchema=new mongoose.Schema({
    title:String,
    message:String
})
const userSchema= new mongoose.Schema(
    {
        name:{
            type:String,
            required:true
        },
        email:{
            type:String,
            required:true,
            unique:[true,"email exits"]
        },
        password:{
            type:String,
            required:true
        },
        notes:[noteSchema]
    }
)

let User=mongoose.models.users || mongoose.model("users",userSchema)
export default User