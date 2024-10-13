"use server"

import { prisma } from "../db/prisma"

export const createTag = async (name:string)=>{
    try{
        const tag = await prisma.tag.create({
            data:{
                name
            }
        })
        if(tag){
            return {
                success: true,
                tagId: tag.id
            }
        }else{
            return {
                success: false
            }
        }
    }catch(e){       
        console.log("### Error in createTag: ", e);
        return null
    }
}

export const addTagToBlog = async (blogId: string, tagId: string)=>{
    try{
        const blog = await prisma.blog.update({
            where:{
                id: blogId
            },
            data:{
                tags:{
                    connect:{
                        id: tagId
                    }
                }
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
        console.log("### Error in addTagToBlog: ", e);
        return null
    }
}

export const getTagByName = async (name: string)=>{
    try{
        const tag = await prisma.tag.findUnique({
            where:{
                name
            }
        })
        if(tag){
            return {
                success: true,
                tagId: tag.id
            }
        }else{
            return {
                success: false
            }
        }
    }catch(e){
        console.log("### Error in getTagByName: ", e);
        return null
    }
}

export const getTagsByBlogId = async (blogId: string)=>{
    try{
        const tags = await prisma.tag.findMany({
            where:{
                blogs:{
                    some:{
                        id: blogId
                    }
                }
            }
        })
        if(tags){
            return {
                success: true,
                tags
            }
        }else{
            return {
                success: false
            }
        }
    }catch(e){
        console.log("### Error in getTagsByBlogId: ", e);
        return null
    }
}



