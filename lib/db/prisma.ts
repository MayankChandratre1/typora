import { PrismaClient, User, Blog } from "@prisma/client";

declare module globalThis {
    var prisma: PrismaClient
} 

export const prisma = globalThis.prisma || new PrismaClient()
export type {
    User,
    Blog
}
if(process.env.NODE_ENV !== "production") globalThis.prisma = prisma