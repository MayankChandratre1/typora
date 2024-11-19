import { useBlogs } from '@/lib/hooks/blog/useBlog';
import React from 'react'

import BlogDetails from '../blog/BlogDetails';


const UserBlogs = ({userId, isMyProfile}:{
    userId: string,
    isMyProfile?: boolean
}) => {
    const {blogs, loading } = useBlogs("ByAuthorId", userId);

  if(loading){
      return <div>Loading...</div>
  }
  


  return (
    <div className='p-3 h-full flex flex-col gap-2'>

      {
        !isMyProfile && blogs.filter(blog => blog.published).map((blog) => (
            <BlogDetails key={blog.id} isMyprofile={isMyProfile || false}  blog={blog} />
        ))
      }

       {isMyProfile && blogs.map((blog) => (
            <BlogDetails key={blog.id} isMyprofile={isMyProfile || false}  blog={blog} />
       ))}
    </div>
  )
}

export default UserBlogs