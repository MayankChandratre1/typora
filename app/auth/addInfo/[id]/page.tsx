"use client"
import ImageUploadWidget from '@/components/cloudinary/ImageUploadWidget'
import { Button } from '@/components/ui/button'
import { getUserById, updateUserById } from '@/lib/actions/userActions'
import { User } from '@prisma/client'
import { CloudinaryUploadWidgetInfo } from 'next-cloudinary'
import Image from 'next/image'

import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const AddInfoPage = ({ params }: { 
    params: { id: string }
 }) => {
    const [user, setUser] = useState<Partial<User>>({})
    const router = useRouter()
    const [avatar, setAvatar] = useState<string | CloudinaryUploadWidgetInfo | undefined>("")
    const [about, setAbout] = useState<string>("")
    const [error, setError] = useState<string>("")
    useEffect(()=>{
        console.log(JSON.stringify(params.id));
        getUserById(params.id).then(data => {
          setUser({
            ...data.user
          })
        })
    },[params.id])

    const addAvatarAndAbout = async () => {
      if(about){
        const res = await updateUserById(params.id, {
          avatar_url: avatar?.toString() || user.avatar_url,
          about: about || user.about
        })
        if(res.success){
          router.push('/home')
        }else{
          setError("Something went wrong")
        }
      }else{
        setError("Please fill the about field")
      }
    }
  return (
    <div className='p-10'>
        <div className='text-2xl mb-3'>
          Welcome, <span className='font-bold'>{user.username} </span> 
        </div>

        { error && <div className='text-red-500'>{error}</div>}

        <div className='h-full grid grid-cols-1 lg:grid-cols-2 py-10'>
          <div>
            <h3 className='mb-2 text-xl'>Add a profile picture (optional)</h3>
            <div className='flex gap-3 items-center'>
            {
              avatar && <Image src={avatar?.toString() || ""} width={200} height={200} alt='avatar' className=' w-[100px] h-[100px] lg:w-[200px] lg:h-[200px] rounded-full object-cover my-3' />
            }
            {
              !avatar && <Image src={user.avatar_url || ""} width={200} height={200} alt='avatar' className='w-[100px] h-[100px] lg:w-[200px] lg:h-[200px] rounded-full object-cover my-3' />
            }
            <ImageUploadWidget setUrl={setAvatar} />
            </div>
          </div>

          <div>
             <h3 className='mb-2 text-xl'>Tell about yourself</h3>
             <textarea className='border rounded-md p-2 h-40 max-h-96 overflow-auto resize-none w-4/5 lg:w-full my-3' value={about} onChange={(e)=>{
              setAbout(e.target.value)
             }} placeholder='Write here...'></textarea>
          </div>
        </div>
        <div className='flex justify-end space-x-2'>
          <Button variant={"green"} onClick={addAvatarAndAbout} className=''>
             Update Profile
          </Button>
          <Button variant={"secondary"} onClick={()=>{
            router.push('/home')
          }} className=''>
             Skip
          </Button>
        </div>
    </div>
  )
}

export default AddInfoPage