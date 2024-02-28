"use client"
import { signOut } from "next-auth/react"
import Link from "next/link"
export default function Logout(){
    return (
        <Link href="/" onClick={()=>(signOut())} className="border-white border-[1px] hover:bg-purple-700 focus:bg-purple-500 focus:border-none rounded-md px-2 py-0.5 bg-purple-950">Logout</Link>
    )
}