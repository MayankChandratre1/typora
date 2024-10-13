import Navbar from "@/components/custom_components/layout/Navbar";
import ThemeButton from "@/components/custom_components/ThemeButton";

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