import { Blog, Like, Tag } from "@prisma/client"

export type BlogWithRelations = {
    likes:  {
        id: string;
        userId: string;
    }[],
    comments: {
        id: string;
        content: string;
        userId: string;
    }[],
    tags:  {
        id: string;
        name: string;
    }[],
} & Blog