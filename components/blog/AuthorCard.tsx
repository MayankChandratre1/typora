import { useAuthor } from '@/lib/hooks/users/useAuthor';
import React from 'react'
import UserAvatar from '../custom_components/Avatar';
import Link from 'next/link';
import ThumbsUp from '../icons/ThumbsUp';

const AuthorCard = ({authorId}:{
    authorId: string
}) => {
  const author = useAuthor(authorId);
  if(!author){
    return <div>Loading....</div>
  }
  return (
    <div className='my-2 p-3 border-2 rounded-md shadow-sm hover:underline lg:w-1/2 dark:bg-gray-500'>
        <Link href={"/"} className='flex gap-2 items-center'>
            <UserAvatar avatar_url={author?.avatar_url} username={author?.username} />
            <h4>{author.username}</h4>
        </Link>
    </div>
  )
}

export default AuthorCard