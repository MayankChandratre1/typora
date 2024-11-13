"use server"

import { prisma } from "../db/prisma"

export const createTag = async (name:string)=>{
    try{
        const existingTag = await prisma.tag.findUnique({
            where:{
                name
            }
        })
        if(existingTag){
            return {
                success: true,
                tagId: existingTag.id
            }
        }
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
        return {
            success: false
        }
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
            },
            select: {
                tags: true
            }
        })
        if(blog){
            console.log("### Blog after adding tag: ", JSON.stringify(blog));
            return {
                success: true
            }
        }else{
            console.log("### Blog after adding tag: ");
            return {
                success: false
            }
        }
    }catch(e){
        console.log("### Error in addTagToBlog: ", e);
        return {
            success: false
        }
    }
}

export const getTagById = async (tagId: string)=>{
    try{
        const tag = await prisma.tag.findUnique({
            where:{
                id:tagId
            }
        })
        if(tag){
            return {
                success: true,
                tag: tag.name
            }
        }else{
            return {
                success: false
            }
        }
    }catch(e){
        console.log("### Error in getTagById: ", e);
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




