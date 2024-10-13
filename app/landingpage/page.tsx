'use client'
import React from 'react'
import ThemeButton from '@/components/custom_components/ThemeButton'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

const Lannding = () => {
  const router = useRouter()
  return (
    <div className='flex flex-col h-screen'>
      <div className='px-10 flex items-center justify-between py-4'>
        <h1 className='text-xl'>typora</h1>
        <ThemeButton />
      </div>
      <div className='flex-1 flex flex-col justify-center items-center'>
        <div className='flex items-center'>
        <h1 className='text-[200px] lg:text-[300px] font-serif px-10 text-shadow-lg dark:text-shadow-white'>
          t
        </h1>
        <div className='px-3'>
          <h1 className='font-light italic text-2xl lg:text-4xl '>Write Elegantly on <span className='font-bold'>typora</span></h1>
          <div className='flex gap-3 my-3'>
            <Button onClick={()=>{
              router.push("/auth/signin")
            }}>
                Join Now
            </Button>
            <Button variant={"outline"} onClick={()=>{
              router.push("/auth/signup")
            }}>
                Sign In
            </Button>
          </div>
        </div>
        </div>
      </div>
        <div className='p-4 text-center font-extralight'>
          &copy;typora made with ❣️ by Mayank Chandratre
        </div>
    </div>
  )
}

export default Lannding