import { BlogWithRelations } from '@/lib/types/blogTypes'
import React from 'react'
import { Button } from '../ui/button'
import TrashIcon from '../icons/TrashIcon';

import useAuthSession from '@/lib/hooks/users/useAuthSession';
import Image from 'next/image';

const Comments = ({blog, comments, handleDelete}:{
    blog?: BlogWithRelations,
    handleDelete: (id:string) => Promise<void>,
    comments: {
        id: string;
        content: string;
        userId: string;
        user:{
            username: string;
            avatar_url: string;
        },
        createdAt: Date;
    }[]
}) => {
  const {session} = useAuthSession();

  return (
    <div>
        <div className="text-xl font-bold my-3">Comments{" "}<span className='text-gray-400 text-xs'>({comments.length})</span></div>
        {comments.map(comment => (
            <CommentCard key={comment.id} handleDelete={handleDelete} isAuthorOrUser={
                blog?.authorId === comment.userId || session?.user?.id === comment.userId
            } comment={comment} />
        ))}
    </div>
  )
}


const CommentCard = ({comment , isAuthorOrUser, handleDelete}:{ comment: {
    id: string;
        content: string;
        userId: string;
        user:{
            username: string;
            avatar_url: string;
        },
        createdAt: Date;
}, isAuthorOrUser:boolean, handleDelete: (id:string) => Promise<void> }) => {

    

    return (
        <div key={comment.id} className="border-2 rounded-xl my-1 px-4 py-2">
            <div className='flex justify-between'>
            <div className='flex gap-2 items-center'>
                <Image width={100} height={100} alt='comment' src={comment.user.avatar_url} className="h-5 w-5 rounded-full object-cover" />
                <span className="font-semibold">{comment.user.username}</span>
                <div className='text-xs text-gray-500'>{comment.createdAt.toDateString()}</div>
            </div>

            {
                isAuthorOrUser && (
                    <div className='flex justify-end'>
                        <Button variant='ghost' onClick={()=>{
                            handleDelete(comment.id)
                        }}>
                            <TrashIcon size='small' />
                        </Button>
                    </div>
                )
            }

            </div>
            
            <div className='py-2'>{comment.content}</div>
        </div>
    )
}  

export default Comments