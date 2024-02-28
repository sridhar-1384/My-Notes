"use client"
import { useRouter } from "next/navigation";

import { useState } from "react";

export default function Form() {

    const [info,setInfo]=useState({title:"",message:""})
    const [pending,setPending]=useState(false)
    const [error,setError]=useState("")
    let router=useRouter()

    function handleChange(e){
        setInfo((prev)=>({...prev,[e.target.name]:e.target.value}))
    }

    async function handleSubmit(e){
        e.preventDefault()
        if(!info.title || !info.message)
            setError("All fields required")
        else{
            setError("")
            setPending(true)
            let form=e.target
            try{
                let res=await fetch("/api/notes",{
                    method:"POST",
                    headers:{
                        "Content-Type":"application/json"
                    },
                    body:JSON.stringify(info)
                })
                if(res.ok){
                    console.log("Note created")
                    form.reset()
                    setInfo({title:"",message:""})
                    router.refresh()
                }else{
                    let {message}=await res.json()
                    console.log(message)
                    setError(message)
                }
            }catch(error){
                console.log("Something went wrong")
            }finally{
                setPending(false)
            }
        }
    }

  return (
      <div className="flex flex-col items-center justify-center px-6 py-8 lg:py-0 font-serif">
        <div className="w-full rounded-lg shadow border md:mt-3 sm:max-w-md xl:p-0 bg-gray-900 border-gray-700">
          <div className="p-3 space-y-2">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-white">
              Create Note
            </h1>
            <form className="space-y-3" onSubmit={handleSubmit}>
            <div>
                <label
                  htmlFor="title"
                  className="block mb-2 text-sm font-medium text-white"
                >
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  id="title"
                  className="border sm:text-sm rounded-lg block w-full p-1.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Title"
                  required=""
                  maxLength="20"
                  onChange={handleChange}
                />
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="block mb-2 text-sm font-medium text-white"
                >
                  Note
                </label>
                <input
                  type="text"
                  name="message"
                  id="message"
                  className="border sm:text-sm rounded-lg block w-full p-1.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Text"
                  required=""
                  maxLength="70"
                  onChange={handleChange}
                />
              </div>
              {error && <p className="text-red-500">{error}</p>}
              <button
                type="submit"
                className="w-full text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-1.5 text-center bg-blue-600 hover:bg-blue-700"
                disabled={pending ? true:false}
              >
                {pending?"wait ...":"Create"}
              </button>
            </form>
          </div>
        </div>
      </div>
  );
}
