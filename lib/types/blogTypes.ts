import { Blog } from "@prisma/client"

export type BlogWithRelations = {
    likes:  {
        id: string;
        userId: string;
    }[],
    comments: {
        id: string;
        content: string;
        userId: string;
        user:{
            username: string;
            avatar_url: string;
        },
        createdAt: Date;
    }[],
    tags:  {
        id: string;
        name: string;
    }[],
} & Blog