"use server"
import { prisma } from "../db/prisma";

export const addComment = async (blogId:string, authorId:string, content:string) => {
    try{
        const comment = await prisma.comment.create({
            data: {
                blogId: blogId,
                userId: authorId,
                content: content,
            },
            select: {
                id: true,
                content: true,
                userId: true,
                createdAt: true,
                blogId: true,
                user: {
                    select: {
                        username: true,
                        avatar_url: true,
                        id: true
                    }
                }
            }
            
        })
        return {
            success: true,
            comment: comment
        }
    }catch(err){
        console.log("Error in addComment: ", err);
        return {
            success: false,
        }
    }
}

export const getComments = async (blogId:string) => {
    try{
        const comments = await prisma.comment.findMany({
            where: {
                blogId: blogId
            },
            select: {
                id: true,
                content: true,
                userId: true,
                createdAt: true,
                blogId: true,
                user: {
                    select: {
                        username: true,
                        avatar_url: true,
                        id: true
                    }
                }
            }
        })
        return {
            success: true,
            comments: comments
        }
    }catch(err){
        console.log("Error in getComments: ", err);
        return {
            success: false,
        }
    }
}

export const deleteComment = async (commentId:string) => {
    try{
        const comment = await prisma.comment.delete({
            where: {
                id: commentId
            }
        })
        return {
            success: true,
            comment: comment
        }
    }catch(err){
        console.log("Error in deleteComment: ", err);
        return {
            success: false,
        }
    }
}

