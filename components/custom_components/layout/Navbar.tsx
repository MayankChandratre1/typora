"use client"
import React, { useState } from 'react'
import ThemeButton from '../ThemeButton'
import { Button } from '@/components/ui/button'
import { set } from 'zod'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false)
  const router = useRouter()

  const changeRoute = (route: string) => {
    router.replace(route)
  }

  return (
    <div className="px-10 flex items-center justify-between py-4">
          <Link href={"/home"}><h1 className="text-xl">typora</h1></Link>
          <div className='flex gap-3'>
            <Link href={"/blog/createblog"}><Button className='hidden lg:block' variant={"link"}>Create Blog</Button></Link>
            <Button className='hidden lg:block' variant={"link"}>Tags</Button>
            <Button className='hidden lg:block' variant={"link"}>My Profile</Button>
            <Button className='lg:hidden block' variant={"link"} onClick={()=>{
                setShowMenu(true)
            }}>Menu</Button>
            <ThemeButton />
          </div>
          {showMenu && <Menu close={()=>{
            setShowMenu(false)
          }} />}
    </div>
  )
}

const Menu = ({close}:{
    close:()=>void
}) => {
    return (
        <div className='fixed top-0 right-0 h-screen w-64 bg-white shadow-lg z-50 animate-in animate-pulse duration-100'>
        <div className='p-4'>
            <Button variant={"link"} className='text-xs w-full flex justify-end' onClick={close}>Close</Button>
        </div>
        <div className='p-4 flex flex-col gap-2'>
            <Button variant={"link"}>Create Blog</Button>
            <Button variant={"link"}>Tags</Button>
            <Button variant={"link"}>My Profile</Button>
        </div>
        </div>
    )
}

export default Navbar