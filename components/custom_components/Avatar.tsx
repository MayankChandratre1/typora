import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const UserAvatar = ({
    avatar_url, username
}:{
    avatar_url: string,
    username: string
}) => {
  return (
    <div>
        <Avatar>
            <AvatarImage src={avatar_url} />
            <AvatarFallback>{username.toUpperCase().charAt(0)}</AvatarFallback>
        </Avatar>
    </div>
  )
}

export default UserAvatar