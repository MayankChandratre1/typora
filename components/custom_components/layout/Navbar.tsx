"use client"
import React, { use, useEffect, useState } from 'react'
import ThemeButton from '../ThemeButton'
import { Button } from '@/components/ui/button'
import { set } from 'zod'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { User } from '@prisma/client'
import { useAuthor } from '@/lib/hooks/users/useAuthor'
import MyProfileButton from './MyProfileButton'

const Navbar = ({userId}:{
  userId:string
}) => {
  const [showMenu, setShowMenu] = useState(false)
  const router = useRouter()
  const user = useAuthor(userId);
  const x = useSession()
  

  useEffect(() => {
    console.log(x.status);
  },[x.status])

 
  const changeRoute = (route: string) => {
    router.replace(route)
  }

 
  
  return (
    <div className="px-10 flex items-center justify-between py-4">
          <Link href={"/home"}><h1 className="text-xl">typora</h1></Link>
          <div className='flex gap-3'>
            <Link href={"/blog/createblog"}><Button className='hidden lg:block' variant={"link"}>Create Blog</Button></Link>
            <Button className='hidden lg:block' variant={"link"}>Tags</Button>
            <MyProfileButton userId={x.data?.user?.id || "XYZ"}/>
            <Button className='lg:hidden block' variant={"link"} onClick={()=>{
                setShowMenu(true)
            }}>Menu</Button>
            <ThemeButton />
          </div>
          {showMenu && <Menu uid={user?.id || ""} close={()=>{
            setShowMenu(false)
          }} />}
    </div>
  )
}

const Menu = ({close, uid}:{
    close:()=>void
    uid:string
}) => {
    return (
        <div className='fixed top-0 right-0 h-screen w-64 bg-white shadow-lg z-50 animate-in animate-pulse duration-100'>
        <div className='p-4'>
            <Button variant={"link"} className='text-xs w-full flex justify-end' onClick={close}>Close</Button>
        </div>
        <div className='p-4 flex flex-col gap-2'>
            <Button variant={"link"}>Create Blog</Button>
            <Button variant={"link"}>Tags</Button>
            <Link href={"/profile/"+uid}>
              <Button variant={"link"}>My Profile</Button>
            </Link>
        </div>
        </div>
    )
}

export default Navbar