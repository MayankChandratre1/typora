import { auth } from '@/auth';
import { Button } from '@/components/ui/button'
import useAuthSession from '@/lib/hooks/users/useAuthSession';
import { Session } from 'next-auth';
import { useSession } from 'next-auth/react';
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

const MyProfileButton = ({userId}:{
  userId:string
}) => {
  const {session , loading} = useAuthSession()
  useEffect(()=>{

  },[session])
  return (
    <Link href={"/profile/"+session?.user?.id}>
             <Button className='hidden lg:block' variant={"link"}>{
                loading ? "Loading user":"My Profile"
              }</Button>
    </Link>
  )
}

export default MyProfileButton