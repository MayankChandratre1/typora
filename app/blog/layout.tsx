"use client"
import Navbar from "@/components/custom_components/layout/Navbar";



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  return (

      <div className="h-screen flex flex-col">
        <Navbar />
        <div className="flex-1">
          {children}
        </div>
      </div>
    
  );
}