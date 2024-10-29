"use client"
import Navbar from "@/components/custom_components/layout/Navbar";
import ThemeButton from "@/components/custom_components/ThemeButton";
import { useSession } from "next-auth/react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = useSession().data?.user;
  return (

      <div className="h-screen flex flex-col">
        <Navbar userId={user?.id || "No_id"} />
        <div className="flex-1">
          {children}
        </div>
      </div>
    
  );
}