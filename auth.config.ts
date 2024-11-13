import { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { SigninInputSchema } from "./lib/types/authTypes";
import { getUserByEmail } from "./lib/actions/userActions";
import bcrypt from "bcryptjs"

export default {
    providers: [Credentials({
        async authorize(credentials) {         
            if(credentials){
                const validate_creds = SigninInputSchema.safeParse(credentials)
                if(validate_creds.success){
                    const {success ,user} = await getUserByEmail(validate_creds.data.email)
                    if(success && user){
                        const isPasswordCorrect = await bcrypt.compare(validate_creds.data.password, user.password)
                        if(isPasswordCorrect){
                            console.log("###AUTH:\n"+"USER SIGNED IN");
                            return user
                        }
                    }
                }
            }
            return null
        },
    })],
    callbacks:{
        session: async ({session, token, user})=>{
            if(token.sub && session.user){
                session.user.id = token.sub
            }
            console.log("###Session:\n"+JSON.stringify(session));
            return session
        },
        jwt: async ({token}) => {
            return token
        },
        
    }

} satisfies NextAuthConfig