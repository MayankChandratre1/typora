import { getUserById } from '@/lib/actions/userActions';
import markdownToHtml from '@/lib/markdown/markdownToHtml';
import { BlogWithRelations } from '@/lib/types/blogTypes';
import { Blog, Comment, Like, Tag } from '@prisma/client'
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'




const BlogDetails = ({blog}:{
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
    },[])
    
    const handleClick = () => {
      router.push(`/blog/${blog.id}`);
    };
    useEffect(() => {
        
    },[])
    return (
        <div
        onClick={handleClick}
        className="bg-white dark:bg-gray-800 overflow-hidden min-w-[40%] border-b-2 border-gray-200 relative"
      >
        
        <div className="p-4">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
            {blog.title}
          </h2>
          <div className="mt-4 flex justify-between items-center">
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {blog.published
                ? `${new Date(blog.publishedAt).toLocaleDateString()} : ${author}`
                : `${new Date(blog.createdAt).toLocaleDateString()}`}
            </span>
            <span>
              {blog.likes.length} Likes {". "}
              {blog.comments.length} Comments
            </span>
          </div>
        </div>
      </div>
    );
}

export default BlogDetails