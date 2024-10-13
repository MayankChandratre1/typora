import React from 'react'
import { Button } from '../ui/button'
import ThumbsUp from '../icons/ThumbsUp'
import CommentIcon from '../icons/CommentIcon'
import ShareIcon from '../icons/ShareIcon'
import { BlogWithRelations } from '@/lib/types/blogTypes'
import { Blog } from '@prisma/client'

const Interactions = ({blog}:{
    blog:BlogWithRelations | Blog
}) => {
  return (
    <div className='flex justify-start gap-3 mx-3'>
        <Button variant={"ghost"} className='dark:bg-white/10 dark:hover:bg-white/70'>
            <ThumbsUp size='small' color='black' />
            
        </Button>
        <Button variant={"ghost"} className='dark:bg-white/10 dark:hover:bg-white/70'>
            <CommentIcon size='small' color='black' />
        </Button>
        <Button variant={"ghost"} className='dark:bg-white/10 dark:hover:bg-white/70'>
            <ShareIcon size='small' color='black' />
        </Button>
    </div>
  )
}

export default Interactions