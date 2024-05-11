import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";
import connectDB from "../../../../../utils/connect";
import User from "../../../../../models/UserModel";
import { compare } from "bcrypt";

export const authOptions = {
    session:{
        strategy:"jwt"
    },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {},
        password: {}
      },
      async authorize(credentials, req) {
        try{
            await connectDB()
            let user=await User.findOne({email:credentials.email})
            if(!user)
                throw new Error("User not exist")
            const passCompare=await compare(credentials.password,user.password)
            if(!passCompare)
                throw new Error("Password incorrect")
            return ({
                name:user.name,
                email:user.email
            })
        }catch(error){
            console.log(error.message)
            return null
        }
      }
    })
  ]
}

const handler= NextAuth(authOptions)
export {handler as POST,handler as GET}

