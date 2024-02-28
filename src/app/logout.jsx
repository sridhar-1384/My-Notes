"use client"
import { signOut } from "next-auth/react"
import Link from "next/link"
export default function Logout(){
    return (
        <Link href="/" onClick={()=>(signOut())} className="border-white border-[1px] hover:bg-gray-700 focus:bg-gray-800 focus:border-none rounded-md px-2 py-0.5">Logout</Link>
    )
}