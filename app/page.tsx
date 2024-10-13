"use client"
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

const Home = () => {
  const router = useRouter()
  useEffect(()=>{
    router.replace("/landingpage")
  },[])
  return (
    <div  
      className='text-4xl'
    >
      

    </div>
  )
}

export default Home