"use client"
import GlobalApi from '@/app/_utils/GlobalApi'
import { logo1 } from '@/app/assets'
import { Button } from '@/components/ui/button'
import { LoaderIcon } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner'

const signIn = () => {
  const [email,setEmail]= useState();
  const [password,setPassword]= useState()
    const router = useRouter()
    const [loader,setLoader] = useState()
  useEffect(() => {
    const jwt = sessionStorage.getItem('jwt')
    if(jwt) {
      router.push("/")
    }
  },[])

  const  onSignIn = () => {
    setLoader(true)
    GlobalApi.signInUser(email,password).then(resp => {
            console.log(resp.data.user);
      console.log(resp.data.jwt);
            sessionStorage.setItem('user',JSON.stringify(resp.data.user))
      sessionStorage.setItem('jwt',resp.data.jwt)
      router.push("/")
      toast("Account logged successfully")
      setLoader(false)
    }, (e) => {
      console.log(e);
       toast(e?.response?.data?.error?.message)
      setLoader(false)
    })
  }

  return (
 <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-20 lg:px-8 ">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm ">
          <Image
            alt="Your Company"
            src={logo1}
            className="mx-auto h-10 w-auto"
          />
          <h2 className="mt-5 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
            Login to your Account
          </h2>
        </div>

        <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">

            <div className='mt-5'>
              <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                  type="email"
                  placeholder='abc@email.com'
                  required
                  autoComplete="email"
                  className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  sm:text-sm/6"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div className='mt-5'>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">
                  Password
                </label>
                {/* <div className="text-sm">
                  <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                    Forgot password?
                  </a>
                </div> */}
              </div>
              <div className="mt-2">
                <input
                  type="password"
                  placeholder='password'
                  required
                  autoComplete="current-password"
                  className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  sm:text-sm/6"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
            <div className='mt-5'>
              <Button
                className="flex w-full justify-center rounded-md bg-green-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                onClick={() => onSignIn()}
                disabled={!(email || password)}
              >
                {/* Sign Up */}
                {loader ? <LoaderIcon  className='animate-spin'/> : 'Sign In' }
              </Button>
            </div>
          <p className="mt-5 text-center text-sm/6 text-gray-500">
          Create a new  account?{' '}
            <a href={"/sign-up"} className="font-semibold text-blue-600 hover:text-blue-500">
              Signup
            </a>
          </p>
        </div>
      </div>
  )
}

export default signIn
