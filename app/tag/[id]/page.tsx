"use client"
import BlogCard from '@/components/blog/BlogCard';
import { getBlogsByTagId } from '@/lib/actions/blogActions';
import { getTagById } from '@/lib/actions/tagActions';

import { BlogWithRelations } from '@/lib/types/blogTypes';
import React, { useEffect, useState } from 'react'

const TagPage = ({ params }: { 
    params: { id: string }
 }) => {
    const tagId = params.id;
    const [tag, setTag] = useState<string | null>(null);
    const [blogs, setBlogs] = useState<BlogWithRelations[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response =  await getBlogsByTagId(tagId);
                if(response?.success && response?.blogs ){
                    const data =  response.blogs;
                    setBlogs(data);
                }
                setLoading(false);
            } catch (error) {
                setError("An error occurred while fetching the blogs");
                setLoading(false);
                console.log(error);
                
            }
        }
        fetchBlogs();
    }, [tagId])

    useEffect(() => {
        const fetchTag = async () => {
            try {
                const response =  await getTagById(tagId);
                if(response?.success && response?.tag ){
                    const data =  response.tag;
                    setTag(data);
                }
                setLoading(false);
            } catch (error) {
                console.log(error);
                
                setError("An error occurred while fetching the tag");
                setLoading(false);
            }
        }
        fetchTag();
    },[tagId])

    if(loading){
        return <div>Loading...</div>
    }

    if(error){
        return <div>{error}</div>
    }

    return (
        <div className='grid place-items-center p-10 gap-4'>
            <div className='text-xl lg:text-3xl font-bold text-gray-400 hover:text-gray-900 dark:hover:text-gray-100'>
                {tag}
            </div>
            {blogs.map(blog => (
                <BlogCard key={blog.id} blog={blog} />
            ))}
        </div>
    )
 }

export default TagPage