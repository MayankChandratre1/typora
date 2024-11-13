import { getUserById } from '@/lib/actions/userActions';

import { BlogWithRelations } from '@/lib/types/blogTypes';
import React, { useEffect, useState } from 'react'
import { Button } from '../ui/button';
import TrashIcon from '../icons/TrashIcon';
import PencilIcon from '../icons/PencilIcon';
import Link from 'next/link';
import { deleteBlogById } from '@/lib/actions/blogActions';
import { toast } from '@/hooks/use-toast';
import EarthIcon from '../icons/EarthIcon';




const BlogDetails = ({blog, isMyprofile}:{
    blog: BlogWithRelations,
    isMyprofile:boolean
}) => {
    const [author, setAuthor] = useState<string | null>(null);
    const [deleted, setDeleted] = useState(false);
    useEffect(() => {
        getUserById(blog.authorId).then((response) => {
          if (response?.success && response.user) {
            setAuthor(response.user.username);
          }
        })
    },[deleted, blog.authorId])

    
    
    const handleDelete = async () => {
        const res = await deleteBlogById(blog.id);
        if(res?.success){
          toast({
            title: "Blog Deleted",
            description: "Your blog has been deleted successfully",
          });
          setDeleted(true);
        }else{
          toast({
            title: "Failed to delete blog",
            description: "Something went wrong!",
          });
        }
    }

    return (
        <div
        key={blog.id}
        // onClick={handleClick}
        className={` dark:bg-transparent overflow-hidden min-w-[40%] border-b-2 border-gray-200 relative ${deleted ? "hidden" : ""}`}
      >
        
        <div className="p-4">
          <div className='flex'>
          <Link className='flex-1' href={`/blog/${blog.id}`}>
          <h2 className=" text-2xl font-bold text-gray-800 dark:text-white">
            {blog.title}
          </h2>
          </Link>
          {
            isMyprofile && <div>
            <Link href={`/blog/edit/${blog.id}`}>
            <Button variant={"ghost"}>
              <PencilIcon size='small' />
            </Button>
            </Link>
            <Button onClick={handleDelete} variant={"ghost"}>
              <TrashIcon size='small' />
            </Button>
          </div>
          }
          </div>
          <div className="mt-4 flex justify-between items-center">
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {blog.published
                ? `${new Date(blog.publishedAt).toLocaleDateString()}  ${!isMyprofile ? author: ""}`
                : `${new Date(blog.createdAt).toLocaleDateString()}`}
            </span>
                <span>
                  {
                    blog.published && (<span className='flex items-center gap-1 text-xs'><EarthIcon size='small' />Public</span>)
                  }
                </span>
            {
              isMyprofile && <span className='text-xs md:text-md'>
              {blog.likes.length} Likes {". "}
              {blog.comments.length} Comments
            </span>
            }
          </div>
        </div>
      </div>
    );
}

export default BlogDetails