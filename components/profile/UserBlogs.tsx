import { useBlogs } from '@/lib/hooks/blog/useBlog';
import React, { useEffect } from 'react'
import BlogCard from '../blog/BlogCard';
import BlogDetails from '../blog/BlogDetails';
import Link from 'next/link';

const UserBlogs = ({userId}:{
    userId: string
}) => {
    const {blogs, loading, error} = useBlogs("ByAuthorId", userId);

  if(loading){
      return <div>Loading...</div>
  }
    
  return (
    <div className='p-3 h-full flex flex-col gap-2'>
       {blogs.map((blog) => (
            <BlogDetails key={blog.id} isMyprofile  blog={blog} />
       ))}
    </div>
  )
}

export default UserBlogs