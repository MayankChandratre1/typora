import { getUserById } from "@/lib/actions/userActions";
import { User } from "@prisma/client";

import { useEffect, useState } from "react";

export const useAuthor = (authorId: string) => {
    const [author, setAuthor] = useState<User>();
    useEffect(() => {
        getUserById(authorId).then((response) => {
            if (response?.success && response.user) {
                setAuthor(response.user);
            }
        })
    },[authorId])
    return author;
}