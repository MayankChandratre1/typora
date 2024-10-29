import { auth } from '@/auth';
import { Button } from '@/components/ui/button'
import { Session } from 'next-auth';
import { useSession } from 'next-auth/react';
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

const MyProfileButton = ({userId}:{
  userId:string
}) => {
  const [session, setSession] = useState<Session | null>()
  useEffect(()=>{
    fetch("/api/auth/session").then(res=>res.json()).then(data=>{
      console.log(data);
      
      setSession(data)
    })
  },[])
  return (
    <Link href={"/profile/"+session?.user?.id}>
             <Button className='hidden lg:block' variant={"link"}>My Profile</Button>
    </Link>
  )
}

export default MyProfileButton