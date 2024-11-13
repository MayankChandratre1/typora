"use client"
import BlogCard from '@/components/blog/BlogCard'
import { useBlogs } from '@/lib/hooks/blog/useBlog'
import React from 'react'

const HomePage = () => {
  const {blogs, loading, error} = useBlogs('All')
  return (
    <div className='grid place-items-center p-10 gap-4'>
        {
          !loading && blogs.map(blog => <BlogCard key={blog.id} blog={blog} />)
        }
        {
          loading && <p>Loading...</p>
        }
        {
          error && <p>{error}</p>
        }
        {
          !loading && !blogs.length && <p>No blogs found</p>
        }
        {/* <ShareModal onClose={()=>(5)} /> */}
    </div>
  )
}

export default HomePage