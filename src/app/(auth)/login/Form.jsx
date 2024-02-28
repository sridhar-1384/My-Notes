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
    <section className="bg-gray-50 dark:bg-gray-800">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-900 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white text-center">
              Welcome
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@company.com"
                  required=""
                  onChange={handleChange}
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required=""
                  onChange={handleChange}
                />
              </div>
              {error && <p className="text-red-500">{error}</p>}
              <button
                type="submit"
                className="w-full text-white bg-primary-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-primary-800"
                disabled={pending ? true:false}
              >
                {pending?"Logging you in ...":"Login"}
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
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
