import { getUserById } from "@/lib/actions/userActions";
import { User } from "@prisma/client";
import { useEffect, useState } from "react";

export const useUser = (userId: string) => {
    const [user, setUser] = useState<User>();
    useEffect(() => {
        getUserById(userId).then((response) => {
            if (response?.success && response.user) {
                setUser(response.user);
            }
        })
    },[userId])
    return user;
}