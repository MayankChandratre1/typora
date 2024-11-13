"use server"

import { Blog, prisma } from "../db/prisma"


export const saveBlog = async (data:{
    title: string,
    content: string,
    authorId: string
}) => {    
    try{
        const blog = await prisma.blog.create({
            data:{
                ...data,
            }
        })
        if(blog){
            return {
                success: true,
                blogId: blog.id
            }
        }else{
            return {
                success: false
            }
        }
    }catch(e){
        console.log("### Error in saveBlog: ", e);
        return null
    }
}

export const publishBlog = async (id: string) => {
    try{
        const blog = await prisma.blog.update({
            where:{
                id
            },
            data:{
                published: true
            }
        })
        if(blog){
            return {
                success: true
            }
        }else{
            return {
                success: false
            }
        }
    }catch(e){
        console.log("### Error in publishBlog: ", e);
        return null
    }
}

export const getBlogById = async (id: string) => {   
    try{
        const blog = await prisma.blog.findUnique({
            where:{
                id
            },
            select:{
                id:true,
                title:true,
                content:true,
                published:true,
                publishedAt:true,
                authorId:true,
                createdAt:true,
                thumbnail_url:true,
                likes:{
                    select:{
                        id:true,
                        userId:true
                    }
                },
                comments:{
                    select:{
                        id:true,
                        content:true,
                        userId:true,
                        createdAt:true,
                        user:{
                            select:{
                                username:true,
                                avatar_url:true
                            }
                        }
                    }
                },
                tags:{
                    select:{
                        id:true,
                        name:true
                    }
                }
            }
        })
        if(blog){
            return {
                success: true,
                blogs: [blog]
            }
        }else{
            return {
                success: false
            }
        }
    }catch(e){
        console.log("### Error in getBlogById: ", e);
        return null
    }
}

export const getAllPublishedBlogs = async () => {   
    try{
        const blogs = await prisma.blog.findMany({
            where:{
                published: true,
            },
            select:{
                id:true,
                title:true,
                content:true,
                published:true,
                publishedAt:true,
                authorId:true,
                createdAt:true,
                thumbnail_url:true,
                likes:{
                    select:{
                        id:true,
                        userId:true
                    }
                },
                comments:{
                    select:{
                        id:true,
                        content:true,
                        userId:true,
                        createdAt:true,
                        user:{
                            select:{
                                username:true,
                                avatar_url:true
                            }
                        }
                    }
                },
                tags:{
                    select:{
                        id:true,
                        name:true
                    }
                }
            }
        })
        if(blogs){
            return {
                success: true,
                blogs
            }
        }else{
            return {
                success: false
            }
        }
    }catch(e){
        console.log("### Error in getBlogs: ", e);
        return null
    }
}

export const getBlogsByAuthorId = async (authorId: string) => {   
    try{
        const blogs = await prisma.blog.findMany({
            where:{
                authorId
            },
            select:{
                id:true,
                title:true,
                content:true,
                published:true,
                publishedAt:true,
                authorId:true,
                createdAt:true,
                thumbnail_url:true,
                likes:{
                    select:{
                        id:true,
                        userId:true
                    }
                },
                comments:{
                    select:{
                        id:true,
                        content:true,
                        userId:true,
                        createdAt:true,
                        user:{
                            select:{
                                username:true,
                                avatar_url:true
                            }
                        }
                    }
                },
                tags:{
                    select:{
                        id:true,
                        name:true
                    }
                }
            }
        })
        if(blogs){
            return {
                success: true,
                blogs
            }
        }else{
            return {
                success: false
            }
        }
    }catch(e){
        console.log("### Error in getBlogsByAuthorId: ", e);
        return null
    }
}

export const getBlogsByTagId = async (tagId: string)=>{
    try{
        const blogs = await prisma.blog.findMany({
            where:{
                tags:{
                    some:{
                        id: tagId
                    }
                },
                published: true
            },
            select:{
                id:true,
                title:true,
                content:true,
                published:true,
                publishedAt:true,
                authorId:true,
                createdAt:true,
                thumbnail_url:true,
                likes:{
                    select:{
                        id:true,
                        userId:true
                    }
                },
                comments:{
                    select:{
                        id:true,
                        content:true,
                        userId:true,
                        createdAt:true,
                        user:{
                            select:{
                                username:true,
                                avatar_url:true
                            }
                        }
                    }
                },
                tags:{
                    select:{
                        id:true,
                        name:true
                    }
                }
            }
        })
        if(blogs){
            return {
                success: true,
                blogs
            }
        }else{
            return {
                success: false
            }
        }
    }catch(e){
        console.log("### Error in getBlogsByTagId: ", e);
        return null
    }
}

export const updateBlog = async (blogId:string, data: Partial<Blog>) => {
    try{
        const blog = await prisma.blog.update({
            where:{
                id: blogId
            },
            data
        })
        if(blog){
            return {
                success: true
            }
        }else{
            return {
                success: false
            }
        }
    }catch(e){
        console.log("### Error in updateBlog: ", e);
        return null
    }
}

export const deleteBlogById = async (blogId: string) => {
    try{
        const blog = await prisma.blog.delete({
            where:{
                id: blogId
            }
        })
        if(blog){
            return {
                success: true
            }
        }else{
            return {
                success: false
            }
        }
    }catch(e){
        console.log("### Error in deleteBlogById: ", e);
        return {
            success: false
        }
    }
}

export const getBlogByName = async (name: string) => {
    try{
        const blogs = await prisma.blog.findMany({
            where:{
                title:{
                    contains: name,
                    mode: "insensitive"
                }
            },
            select:{
                id:true,
                title:true,
                content:true,
                published:true,
                publishedAt:true,
                authorId:true,
                createdAt:true,
                thumbnail_url:true,
                likes:{
                    select:{
                        id:true,
                        userId:true
                    }
                },
                comments:{
                    select:{
                        id:true,
                        content:true,
                        userId:true,
                        createdAt:true,
                        user:{
                            select:{
                                username:true,
                                avatar_url:true
                            }
                        }
                    }
                },
                tags:{
                    select:{
                        id:true,
                        name:true
                    }
                }
            }
        })
        if(blogs){
            return {
                success: true,
                blogs
            }
        }else{
            return {
                success: false
            }
        }
    }catch(e){
        console.log("### Error in getBlogByName: ", e);
        return {
            success: false
        }
    }
}

