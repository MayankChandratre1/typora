"use server"
import { signIn } from "@/auth";
import { SigninInput, SignupInput } from "../types/authTypes";
import { getUserByEmail } from "./userActions";
import { prisma } from "../db/prisma";
import { hashPassword } from "../util/hashPassword";
import { DEFAULT_AUTH_REDIRECT } from "@/route";

export const SignIn = async (userInfo:SigninInput) => {
    try{
        const { email , password } = userInfo
         await signIn("credentials",{
            email,
            password,
            redirectTo: DEFAULT_AUTH_REDIRECT
        });
        return {
            success: true,
        }
    }catch(error){
        throw error
    }
}

export const SignUp = async (userInfo:SignupInput) => {
    try{
        const { username, email , password } = userInfo

        const existingUser = await getUserByEmail(email)


        if(existingUser.success) throw new Error("User Already Exists!")
        
        const user = await prisma.user.create({
            data:{
                username,
                email,
                password: await hashPassword(password)
            }
        })
        const res = await SignIn({
            email: userInfo.email || "No email",
            password: userInfo.password || "No Password"
        });
        if(user && res.success){
            return {
                success: true,
                id: user.id
            }
        }else{
            return {
                success: false,
                id: null
            }
        }
    }catch(error){
        throw error
    }
}



