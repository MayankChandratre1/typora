import ThemeButton from "@/components/custom_components/ThemeButton";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
   
      <div className="h-screen flex flex-col">
        <div className="px-10 flex items-center justify-between py-4">
          <h1 className="text-xl">typora</h1>
          <ThemeButton />
        </div>
        <div className="flex-1">
          {children}
        </div>
        <div className='p-4 text-center font-extralight'>
          &copy;typora by Mayank Chandratre
        </div>
      </div>
    
  );
}
