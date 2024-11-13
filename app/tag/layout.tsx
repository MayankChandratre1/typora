"use client"
import Navbar from "@/components/custom_components/layout/Navbar";
import { useSession } from "next-auth/react";

export default function RootLayout({ children }: Readonly<{
  children: React.ReactNode;
}>) {
  const { data: session, status } = useSession();

  return (
    <div className="h-screen flex flex-col">
      {status === "loading" ? (
        <div>Loading...</div>
      ) : (
        <Navbar userId={session?.user?.id || "No_id"} />
      )}
      <div className="flex-1">{children}</div>
    </div>
  );
}
