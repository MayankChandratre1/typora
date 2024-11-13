"use client"
import BlogDetails from '@/components/blog/BlogDetails'

import ReadBlogView from '@/components/blog/ReadBlogView'
import { useBlogs } from '@/lib/hooks/blog/useBlog'
import markdownToHtml from '@/lib/markdown/markdownToHtml'
import React, { useEffect, useState } from 'react'

const BlogPage = ({ params }: { 
    params: { id: string }
 }) => {
  const {blogs , loading, error} = useBlogs("ByBlogId", params.id);
  const [html, setHtml] = useState<string | null>(null);

  useEffect(()=>{
    const getHtml = async () => {   
      if(blogs.length > 0){
        
        const blog = blogs[0];
        console.log(blog);
        
        const newHtml = await markdownToHtml(blog.content);
        
        
        setHtml(newHtml);
      }
    }
    getHtml();
  },[blogs])

  

  if(loading){
    return <div>Loading...</div>
  }

  if(error){
    return <div>{error}</div>
  }

  return (
    <div>
        {blogs.map(blog => (
            <div key={blog.id}>
                <div className=''>
                  <BlogDetails isMyprofile={false} blog={blog} />
                </div>
                {
                  html && <ReadBlogView blog={blog} html={html} />
                }
                {
                  !html && <div>Loading...</div>
                }
            </div>
        ))}
    </div>
  )
}

export default BlogPage