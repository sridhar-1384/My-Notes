"use client"
import { useRouter } from "next/navigation"
export default function NoteCard(props){
    let router=useRouter()
    async function handleDelete(){
        let id=props.id
        let res=await fetch("/api/notes",{
            method:"DELETE",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({objectId:id})
        })
        if(res.ok){
            console.log("Deleted note")
            router.refresh()
        }else{
            console.log("delete failed")
        }
    }
    return(
        <div className=" w-screen md:w-[300px] mx-2 my-4 md:m-4 min-h-[150px] bg-[#535C91] rounded-lg p-3 shadow-md shadow-[#9290C3] relative">
            <p className="text-center font-semibold text-xl font-serif">{props.title}</p>
            <hr className="my-2 border-[#070F2B] shadow-sm shadow-black font-mono" />
            {props.message}
            <div onClick={handleDelete} className="bg-red-500 rounded-full h-4 w-4 hover:h-6 hover:w-6 p-1.5 text-center absolute -top-1 -end-1"></div>
        </div>
    )
}