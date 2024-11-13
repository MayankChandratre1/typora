import { SessionProvider } from 'next-auth/react'
import React from 'react'
import {ThemeProvider as NextThemesProvider} from "next-themes";
import { Toaster } from "@/components/ui/toaster"
import { auth } from '@/auth';
const Provider = async ({children}:{
    children:React.ReactNode
}) => {
  const session = await auth()
  return (
    
      <>
      <NextThemesProvider attribute="class" defaultTheme="dark">
        <SessionProvider session={session}>
        {children}  
        <Toaster />
        </SessionProvider>
      </NextThemesProvider>
      </>
    
  )
}

export default Provider