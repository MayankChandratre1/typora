
import { Button } from '@/components/ui/button'
import useAuthSession from '@/lib/hooks/users/useAuthSession';

import Link from 'next/link'
import React from 'react'

const MyProfileButton = () => {
  const {session , loading} = useAuthSession()
  
  return (
    <Link href={"/profile/"+session?.user?.id}>
             <Button className='hidden lg:block' variant={"link"}>{
                loading ? "Loading user":"My Profile"
              }</Button>
    </Link>
  )
}

export default MyProfileButton