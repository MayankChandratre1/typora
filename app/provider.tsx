import { SessionProvider } from 'next-auth/react'
import React from 'react'
import {ThemeProvider as NextThemesProvider} from "next-themes";
import { Toaster } from "@/components/ui/toaster"
const Provider = ({children}:{
    children:React.ReactNode
}) => {
  return (
    
      <>
      <NextThemesProvider attribute="class" defaultTheme="dark">
        <SessionProvider>
        
        {children}  
        <Toaster />
        </SessionProvider>
      </NextThemesProvider>
      </>
    
  )
}

export default Provider