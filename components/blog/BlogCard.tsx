import { getUserById } from '@/lib/actions/userActions';

import { BlogWithRelations } from '@/lib/types/blogTypes';

import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { Button } from '../ui/button';
import Image from 'next/image';

const BlogCard = ({blog}:{
    blog: BlogWithRelations
}) => {
    const router = useRouter();
    const [author, setAuthor] = useState<string | null>(null);
    useEffect(() => {
        getUserById(blog.authorId).then((response) => {
          if (response?.success && response.user) {
            setAuthor(response.user.username);
          }
        })
    },[blog.authorId])
    
    const handleClick = () => {
      router.push(`/blog/${blog.id}`);
    };

    
  
    return (
        <div
        onClick={handleClick}
        className="cursor-pointer bg-gray-50 dark:bg-gray-800 shadow-md rounded-lg overflow-hidden transition-all transform hover:scale-105 hover:shadow-lg min-w-[40%] w-[80%] md:w-[20%]"
      >
       {
        blog.thumbnail_url && (
          <Image
          src={blog.thumbnail_url}
          alt={blog.title}
          className="w-full  object-cover object-top"
          width={500}
          height={300}
        />
        )
       }
        <div className="p-4">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
            {blog.title}
          </h2>
          <span>
            {(blog.content.length/250).toFixed(0)} mins read
          </span>
          <div className="mt-4 flex justify-between items-center">
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {blog.published
                ? `${new Date(blog.publishedAt).toLocaleDateString()} : ${author}`
                : `${new Date(blog.createdAt).toLocaleDateString()}`}
            </span>
           
          </div>
          <div className='my-2 flex flex-wrap'>
            {
              blog.tags.map((tag) => (
                <Button variant={"outline"} onClick={(e)=>{
                  e.stopPropagation();
                  router.push(`/tag/${tag.id}`)
                }} key={tag.id} className="text-sm bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white px-2 py-1 rounded-md mx-2 my-1">
                  {tag.name}
                </Button>
              ))
            }
          </div>
        </div>
      </div>
    );
}

export default BlogCard