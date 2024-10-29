import { useBlogs } from '@/lib/hooks/blog/useBlog';
import React from 'react'
import BlogCard from '../blog/BlogCard';
import BlogDetails from '../blog/BlogDetails';
import Link from 'next/link';

const UserBlogs = ({userId}:{
    userId: string
}) => {
    const {blogs, loading, error} = useBlogs("ByAuthorId", userId);
  return (
    <div className='p-3 h-full flex flex-col gap-2'>
       {blogs.map((blog) => (
        <Link href={"/blog/"+blog.id}>
            <BlogDetails key={blog.id} blog={blog} />
        </Link>
       ))}
    </div>
  )
}

export default UserBlogs