"use server"

import { prisma } from "../db/prisma";
import {  getUserByEmail, getUserById } from "./userActions";

export const likeBlogById = async (id: string, userEmail:string) => {
    try{
        const {success, user} = await getUserByEmail(userEmail);
        if(success){
            const blog = await prisma.blog.findUnique({
                where:{
                    id
                }
            })
            const like = await prisma.like.create({
                data:{
                    user:{
                        connect:{
                            id: user?.id
                        }
                    },
                    blog:{
                        connect:{
                            id
                        }
                    }
                }
            })
            if(blog && like){
                const updatedBlog = await prisma.blog.update({
                    where:{
                        id
                    },
                    data:{
                        likes:{
                            connect:{
                                id:like?.id
                            }
                        }
                    }
                })
                if(updatedBlog){
                    return {
                        success: true,
                        blog: updatedBlog
                    }
                }else{
                    return {
                        success: false,
                        blog: null
                    }
                }
            }else{
                return {
                    success: false,
                    blog: null
                }
            }
        }
    }catch(error){      
        console.error("###likeBlogById: \n"+ JSON.stringify(error));
        throw error
    }
}

export const dislikeBlogById = async (id: string, userEmail:string) => {
    try{
        const {success, user} = await getUserByEmail(userEmail);
        if(success){
            const blog = await prisma.blog.findUnique({
                where:{
                    id
                },
                select:{
                    id:true,
                    likes:{
                        where:{
                            userId: user?.id
                        }
                    }
                }
            })
            const like = blog?.likes[0]
            if(blog && like){
                
                const deletedLike = await prisma.like.delete({  
                    where:{
                        id:like?.id
                    }
                })
                if(deletedLike){
                    return {
                        success: true,
                    }
                }else{
                    return {
                        success: false,
                    }
                }
            }else{
                return {
                    success: false,
                }
            }
        }
    }catch(error){      
        console.error("###likeBlogById: \n"+ JSON.stringify(error));
        throw error
    }
}

export const addCommentOnBlog = async (id: string, userEmail:string, content:string) => {
    try{
        const {success, user} = await getUserByEmail(userEmail);
        if(success){
            const comment = await prisma.comment.create({
                data:{
                    user:{
                        connect:{
                            id: user?.id
                        }
                    },
                    blog:{
                        connect:{
                            id
                        }
                    },
                    content
                }
            })
            if(comment){
                return {
                    success: true,
                    comment
                }
            }else{
                return {
                    success: false,
                    comment: null
                }
            }
        }
    }catch(error){      
        console.error("###commentOnBlog: \n"+ JSON.stringify(error));
        throw error
    }
}

export const deleteCommentOnBlog = async (id: string, userEmail:string, commentId:string) => {
    try{
        const {success, user} = await getUserByEmail(userEmail);
        if(success){
            const comment = await prisma.comment.findUnique({
                where:{
                    id:commentId
                }
            })
            if(comment){
                const deletedComment = await prisma.comment.delete({
                    where:{
                        id:commentId
                    }
                })
                if(deletedComment){
                    return {
                        success: true,
                    }
                }else{
                    return {
                        success: false,
                    }
                }
            }else{
                return {
                    success: false,
                }
            }
        }
    }catch(error){      
        console.error("###deleteCommentOnBlog: \n"+ JSON.stringify(error));
        throw error
    }
}