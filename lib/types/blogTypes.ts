import { Blog, Like, Tag } from "@prisma/client"

export type BlogWithRelations = {
    likes:  {
        id: string;
        blogId: string;
        userId: string;
    }[],
    comments: Comment[],
    tags:  {
        name: string;
        id: string;
    }[]
} & Blog