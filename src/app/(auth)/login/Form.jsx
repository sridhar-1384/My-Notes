"use client"

import Link from "next/link";
import { useState } from "react";
import {signIn} from "next-auth/react"
import { useRouter } from "next/navigation";
export default function Form() {

    const [info,setInfo]=useState({email:"",password:""})
    const [pending,setPending]=useState(false)
    const [error,setError]=useState("")
    const router=useRouter()

    function handleChange(e){
        setInfo((prev)=>({...prev,[e.target.name]:e.target.value}))
    }

    async function handleSubmit(e){
        e.preventDefault()
        if(!info.email || !info.password)
            setError("All credentials required")
        else{
            setError("")
            setPending(true)
            try{
                let res=await signIn("credentials",{
                    email:info.email,
                    password:info.password,
                    redirect:false
                })
                console.log(res)
                if(res.ok){
                    console.log("logged in")
                    router.push("/notes")
                    router.refresh()
                }
                if(res.error){
                    setError(res.error)
                }
            }catch(error){
                console.log("Something went wrong")
            }finally{
                setPending(false)
            }
        }
    }

  return (
    <section className="bg-gray-800">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0">
        <div className="w-full rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0 bg-gray-900 border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl text-white text-center">
              Welcome
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-white"
                >
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className=" border sm:text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                  placeholder="name@company.com"
                  required=""
                  onChange={handleChange}
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-white"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="border sm:text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                  required=""
                  onChange={handleChange}
                />
              </div>
              {error && <p className="text-red-500">{error}</p>}
              <button
                type="submit"
                className="w-full text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-blue-600 hover:bg-blue-700 focus:ring-primary-800"
                disabled={pending ? true:false}
              >
                {pending?"Logging you in ...":"Login"}
              </button>
              <p className="text-sm font-light text-gray-400">
                Donot have an account?{" "}
                <Link
                  href="/register"
                  className="font-medium text-blue-500 hover:underline"
                >
                  Register here
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
