"use server"

import { prisma, User } from "../db/prisma";

export const getUserByEmail = async (email: string) =>{
    try{
        const user = await prisma.user.findUnique({
            where:{
                email
            }
        })
        if(user){
            return {
                success: true,
                user: user
            }
        }else{
            return {
                success: false,
                user: null
            }
        }
    }catch(error){
        console.error("###getUserByEmail: \n"+ JSON.stringify(error));
        throw error
    }
}

export const getUserById = async (id: string) =>{
    try{
        const user = await prisma.user.findUnique({
            where:{
                id
            }
        })
        if(user){
            return {
                success: true,
                user: user
            }
        }else{
            return {
                success: false,
                user: null
            }
        }
    }catch(error){
        console.error("###getUserById: \n"+ JSON.stringify(error));
        throw error
    }
}

export const updateUserById = async (id: string, data:Partial<User>) => {
    try{
        const user = await prisma.user.update({
            where:{
                id
            }, data
        })
        if(user){
            return {
                success: true,
                user: user
            }
        }else{
            return {
                success: false,
                user: null
            }
        }
    }catch(error){
        console.error("###updateUserById: \n"+ JSON.stringify(error));
        throw error
    }
}

// export const getCurrentUserInfo = async () => {
//     try{
//         const currentUserEmail = (await auth())?.user?.email
//         if(!currentUserEmail){
//             return {
//                 success: false,
//                 user: null
//             }
//         }
//         const user = await prisma.user.findUnique({
//             where:{
//                 email: currentUserEmail
//             }
//         })
//         if(user){
//             return {
//                 success: true,
//                 user: user
//             }
//         }else{
//             return {
//                 success: false,
//                 user: null
//             }
//         }
//     }catch(error){
//         console.error("###getCurrentUserInfo: \n"+ JSON.stringify(error));
//         throw error
//     }
// }