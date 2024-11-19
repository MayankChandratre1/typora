"use client"

import ProfileCard from '@/components/profile/ProfileCard';
import UserBlogs from '@/components/profile/UserBlogs';
import { useUser } from '@/lib/hooks/users/useUser';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'

const ProfilePage = ({ params }: { 
    params: { id: string }
 }) => {
  const userId = params.id;
  const user = useUser(userId);
  const router = useRouter();
  useEffect(()=>{
      console.log(user);
    },[user])
  
  if(!user){
    return <div>Loading...</div>
  }


  const signout = async () => {
    await signOut();
    router.replace("/")
  }

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 h-full'>
        <div className='flex flex-col justify-center items-center'>
           <div className='flex flex-col '>
           <ProfileCard user={user} />
            <div className='mt-4 flex gap-2'>
              
            </div>
           </div>
        </div>
        <div>
           <UserBlogs userId={userId} />

        </div>
    </div>
  )
}

export default ProfilePage