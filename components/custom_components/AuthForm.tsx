'use client'
import Link from 'next/link'
import React, { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from '../ui/button'

import {  SigninInputSchema, SignupInput, SignupInputSchema} from '@/lib/types/authTypes'

import { SignIn, SignUp } from '@/lib/actions/authActions'
import { useRouter } from 'next/navigation'


const AuthForm = ({mode}:{
    mode: "signin" | "signup"
}) => {
  
  const [showPassword, setShowPassword] = useState<boolean>(false)
 
  const [error, setError] = useState("")
  const router = useRouter()
  const [userInfo, setUserInfo] = useState<Partial<SignupInput>>({
    username:"",
    email:"",
    password:"",
    confirmpassword:""
  })

  

  const onChange = (value:string,name:string) => {
    const newUserInfo = {...userInfo}
    if(name == "username" || name == "email" || name == "password" || name == "confirmpassword"){
        newUserInfo[name] = value
    }
    setUserInfo(newUserInfo)
  }

  const authenticate = async () => {
    if(mode == 'signin'){
        const validate_result = SigninInputSchema.safeParse(userInfo)
        if(!validate_result.success){
            setError(validate_result.error.errors[0].path+": "+validate_result.error.errors[0].message)
            return
        }
      await SignIn({
            email: userInfo.email || "No email",
            password: userInfo.password || "No Password"
        });
    }else{
        const validate_result = SignupInputSchema.safeParse(userInfo)
        if(!validate_result.success){
            setError(validate_result.error.errors[0].path+": "+validate_result.error.errors[0].message)
            return
        }
        if(userInfo.password !== userInfo.confirmpassword){
            setError("Passwords don't match")
            return
        }
        const res = await SignUp({
            username: userInfo.username || "",
            email: userInfo.email || "",
            password: userInfo.password || "",
            confirmpassword: userInfo.confirmpassword || ""
        })
        console.log("USERID: "+res.id);
        
        router.replace("/auth/addInfo/"+res.id)
    }
  }

  const onSubmit = async () => {
        try{
            await authenticate()
        }catch(err){
            setError("Something went wrong!")
            console.error("###AuthForm:\n"+ JSON.stringify(err));
            return
        }
  }

  return (
    <div className='px-4 w-1/2 max-w-[500px]'>
        <h2 className='text-2xl mb-2'>
        {mode === 'signin' ? 'SignIn':'SignUp'}
        </h2>
        <div className='flex flex-col gap-3'>
                {
                    error && <p className='p-2 text-xs text-red-500'>{error}</p>
                }
            {
                mode === 'signin' ? 
                <>
                    <fieldset>
                <label htmlFor="email">Email</label>
                <Input type='email' placeholder='Email' name='email' value={userInfo.email} onChange={(e)=>{
                    onChange(e.target.value, e.target.name);
                }} />
            </fieldset>
            <fieldset>
                <label htmlFor="password">Password</label>
                <div className='relative'>
                    <Input type={showPassword ? 'text':'password'} placeholder='Password' name='password' value={userInfo.password} onChange={(e)=>{
                    onChange(e.target.value, e.target.name);
                }} />
                    <Button variant={"link"} className='absolute right-0 top-0' onClick={()=>{
                        setShowPassword(prev => !prev)
                    }}>{showPassword ? 'Hide':'Show'}</Button>
                </div>
            </fieldset>
                </>
                :<>
            <fieldset>
                <label htmlFor="username">Username</label>
                <Input type='text' placeholder='Username' name='username' value={userInfo.username} onChange={(e)=>{
                    onChange(e.target.value, e.target.name);
                }} />
            </fieldset>
            <fieldset>
                <label htmlFor="email">Email</label>
                <Input type='email' placeholder='Email' name='email' value={userInfo.email} onChange={(e)=>{
                    onChange(e.target.value, e.target.name);
                }} />
            </fieldset>
            <fieldset>
                <label htmlFor="password">Password</label>
                <div className='relative'>
                    <Input type={showPassword ? 'text':'password'} placeholder='Password' name='password' value={userInfo.password} onChange={(e)=>{
                    onChange(e.target.value, e.target.name);
                }}/>
                    <Button variant={"link"} className='absolute right-0 top-0' onClick={()=>{
                        setShowPassword(prev => !prev)
                    }}>{showPassword ? 'Hide':'Show'}</Button>
                </div>
            </fieldset>
            <fieldset>
                <div className='relative'>
                    <Input type={'password'} placeholder='Confirm Password' name='confirmpassword' value={userInfo.confirmpassword} onChange={(e)=>{
                    onChange(e.target.value, e.target.name);
                }} />
                </div>
            </fieldset>
                </>
            }
            <fieldset>
                <Button onClick={onSubmit} variant={"secondary"}>{mode === 'signin' ? 'Sign In':'Sign Up'}</Button>
            </fieldset>
        </div>
        <div className='mt-3'>
                <Link href={
                    mode === 'signin' ? '/auth/signup' : '/auth/signin'
                } className='underline text-xs '>
                    {mode === 'signin' ? 
                    <p>Don&apos;t have an Account? SignUp</p> : 
                    <p>Already have an Account? SignIn</p>}
                </Link>
        </div>   
    </div>
  )
}

export default AuthForm