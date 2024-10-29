"use client"
import React, { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import ThumbsUp from '../icons/ThumbsUp'
import CommentIcon from '../icons/CommentIcon'
import ShareIcon from '../icons/ShareIcon'
import { BlogWithRelations } from '@/lib/types/blogTypes'
import { Blog } from '@prisma/client'
import ShareModal from '../custom_components/ShareModal'
import { usePathname, useRouter } from 'next/navigation'
import { addCommentOnBlog, deleteCommentOnBlog, dislikeBlogById, likeBlogById } from '@/lib/actions/interactionsActions'
import { useSession } from 'next-auth/react'
import { set } from 'zod'
import { getUserByEmail } from '@/lib/actions/userActions'

const Interactions = ({blog}:{
    blog:BlogWithRelations,
}) => {
  const [showShareModal, setShowShareModal] = useState(false);
  const url = usePathname()
  const session = useSession()
  const [isLiked, setIsLiked] = useState(false)
  const [likeCount, setLikeCount] = useState<number>(blog.likes.length);
  const [commentCount, setCommentCount] = useState<number>(blog.comments.length);


  useEffect(()=>{
    const userEmail = session.data?.user?.email;
    if(!userEmail){
        return
    }
    getUserByEmail(userEmail).then((result)=>{
        const liked = blog.likes.find(like => like.userId === result.user?.id);
        if(liked){
            setIsLiked(true)
        }
    })
  },[blog])


  

  const like = async () => {
    try{
        const userEmail = session.data?.user?.email;
        if(!userEmail){
            return
        }
        if(!isLiked){
            await likeBlogById(blog.id, userEmail);
            setIsLiked(true)
            setLikeCount(likeCount+1)
        }else{
            await dislikeBlogById(blog.id, userEmail);
            setIsLiked(false)
            setLikeCount(likeCount-1)
        }
    }catch(error){
        console.error("###like: \n"+ JSON.stringify(error));
    }
}
  
    


  return (
    <div className="horizontal-interactions max-lg:vertical-interactions w-1/2">
        <Button variant={"ghost"} className={`${isLiked ? "bg-gray-200 dark:bg-gray-800":""} active:scale-75`} onClick={like}>
            <p className='mr-2 text-xs'>{likeCount}</p> <ThumbsUp size='small' color='black' />
        </Button>
        <Button variant={"ghost"} className=''>
            <p className='mr-2 text-xs'>{commentCount}</p>
            <CommentIcon size='small' color='black' />
        </Button>
        <Button onClick={()=>{
            setShowShareModal(true)
        }} variant={"ghost"} className=''>
            <ShareIcon size='small' color='black' />
        </Button>

        <>
            {
                showShareModal && <ShareModal url={url} onClose={()=>setShowShareModal(false)} />
            }
        </>
    </div>
  )
}

export default Interactions