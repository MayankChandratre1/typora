import Navbar from "@/components/custom_components/layout/Navbar";
import ThemeButton from "@/components/custom_components/ThemeButton";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    
      <div className="h-screen flex flex-col">
        <div className="fixed top-0 w-full">
        <Navbar />
        </div>
        <div className="flex-1 mt-16">
          {children}
        </div>
      </div>
    
  );
}