"use client"
import React, { useEffect, useState } from 'react'
import ThemeButton from '../ThemeButton'
import { Button } from '@/components/ui/button'


import Link from 'next/link'
import { useSession } from 'next-auth/react'

import MyProfileButton from './MyProfileButton'
import SearchBar from '../SearchBar'

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false)
  const {data, status} = useSession()
  

  useEffect(() => {
    console.log(status);
  },[status])

 
  

 
  
  return (
    <>
      <div className="px-10 flex items-center justify-between py-4">
          <Link href={"/home"}><h1 className="text-xl">typora</h1></Link>
          <div className='flex-1 mx-10 max-md:hidden'>
          <SearchBar />
          </div>
          <div className='flex gap-3'>
            <Link href={"/blog/createblog"}><Button className='hidden lg:block' variant={"link"}>Create Blog</Button></Link>
            <MyProfileButton />
            <Button className='lg:hidden block' variant={"link"} onClick={()=>{
                setShowMenu(true)
            }}>Menu</Button>
            <ThemeButton />
          </div>
          {showMenu && <Menu uid={data?.user?.id || ""} close={()=>{
            setShowMenu(false)
          }} />}
    </div>
    <div className='mx-10 md:hidden'>
          <SearchBar />
          </div>
    </>
  )
}

const Menu = ({close, uid}:{
    close:()=>void
    uid:string
}) => {
    return (
        <div className='fixed top-0 right-0 h-screen w-64 bg-white dark:bg-gray-900 shadow-lg z-50 animate-in animate-pulse duration-100'>
        <div className='p-4'>
            <Button variant={"link"} className='text-xs w-full flex justify-end' onClick={close}>Close</Button>
        </div>
        <div className='p-4 flex flex-col gap-2'>
        <Link href={"/blog/createblog"}><Button className='' variant={"link"}>Create Blog</Button></Link>
        <Link href={"/profile/"+uid}>
             <Button className='' variant={"link"}>{
                "My Profile"
              }</Button>
    </Link>
        </div>
        </div>
    )
}

export default Navbar