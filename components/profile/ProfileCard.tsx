import { User } from '@prisma/client'
import Image from 'next/image'
import React, { useState } from 'react'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Textarea } from '../ui/textarea'
import ImageUploadWidget from '../cloudinary/ImageUploadWidget'
import { updateUserById } from '@/lib/actions/userActions'

const ProfileCard = ({user, isCurrentUser}:{
    user: User,
    isCurrentUser?: boolean
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState<User>(user);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  
  const onSave = async () => { 
    if(!error){
        const {success} = await updateUserById(userData.id, userData)
        
        if(!success)
            setError("Failed to update profile")
        else
            setSuccess("Profile updated successfully")
        setIsEditing(false)
    }
  }



  return (
    <div className="flex flex-col items-center p-6 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md">
    <div className='flex flex-col mb-2'>
    <Image
        src={userData.avatar_url}
        alt={`${userData.username}'s avatar`}
        className="w-[200px] h-[200px] rounded-full mb-4"
        width={100}
        height={100}
    />
    {
        isEditing && <ImageUploadWidget setUrl={(value)=>{
            console.log(value);
            
            setUserData({
                ...userData,
                avatar_url: value?.toString() || ""
        })}} />
    }
    </div>
    {error && <p className='text-red-500'>{error}</p>}
    {success && <p className='text-green-500'>{success}</p>}
    {
        isEditing ? <Input className="text-xl font-semibold my-2 dark:border-white text-center shadow-none" value={userData.username} 
        onChange={(e)=>{
            setError("")
            setUserData({
                ...userData,
                username: e.target.value
            })
            if(userData.username.length < 3){
                setError("Username should be atleast 3 characters long")
            }
        }}
        /> : <p className='text-xl font-semibold border-none text-center shadow-none'>{userData.username}</p>
    }
    <p className="text-gray-600">{userData.email}</p>
    {
        isEditing ? <Textarea className="text-sm my-2 dark:border-white text-gray-500 shadow-none" value={userData.about}
        onChange={(e)=>{
            setError("")
            setUserData({
                ...userData,
                about: e.target.value
            })
            if(userData.about.length < 10){
                setError("About should be atleast 10 characters long")
            }
        }}
        /> : <p className='text-sm text-gray-500 border-none text-center shadow-none'>{userData.about}</p>
    }

    {
        isCurrentUser && <Button onClick={()=>{
            if(isEditing){
                onSave()
            }
            setIsEditing(!isEditing)
        }} variant={'link'} className='text-xs italic font-light text-gray-500 hover:text-gray-200'>
            {isEditing ? 'Save' : 'Edit'}
        </Button>
    }
</div>
  )
}

export default ProfileCard