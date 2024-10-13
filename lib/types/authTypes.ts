import zod from "zod"
export type AuthUserType = {
    username: string,
    email: string,
    password: string
}

export const SignupInputSchema = zod.object({
    username: zod.string().min(1),
    email: zod.string().email(),
    password: zod.string().min(6),
    confirmpassword: zod.string().min(6)
})
export const SigninInputSchema = zod.object({
    email: zod.string().email(),
    password: zod.string().min(6),
})

export type SigninInput = zod.infer<typeof SigninInputSchema>
export type SignupInput = zod.infer<typeof SignupInputSchema>