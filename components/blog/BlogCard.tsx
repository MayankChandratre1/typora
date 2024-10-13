import { getUserById } from '@/lib/actions/userActions';
import markdownToHtml from '@/lib/markdown/markdownToHtml';
import { Blog } from '@prisma/client'
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const BlogCard = ({blog}:{
    blog: Blog
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
        className="cursor-pointer bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden transition transform hover:scale-105 hover:shadow-lg min-w-[40%]"
      >
        <img
          src={blog.thumbnail_url}
          alt={blog.title}
          className="w-full h-48 object-cover object-top"
        />
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
            <span
              className={`text-sm ${
                blog.published ? 'text-green-500' : 'text-yellow-500'
              }`}
            >
              {blog.published ? 'Published' : 'Draft'}
            </span>
          </div>
        </div>
      </div>
    );
}

export default BlogCard