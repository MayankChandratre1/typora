import { auth } from "@/auth";
import { Session } from "next-auth";
import { createContext, useContext } from "react";

interface CustomSessionContextType {
    session: Session | null;
}

const CustomSessionContext = createContext<CustomSessionContextType | undefined>({
    session: null,
});

export const CustomSessionProvider = async ({ children }: { children: React.ReactNode }) => {
    const session = await auth();
    return (
        <CustomSessionContext.Provider value={{ session }}>
            {children}
        </CustomSessionContext.Provider>
    );
}
export const useCustomSessionContext = () : CustomSessionContextType => {
    const context = useContext(CustomSessionContext);
    if (!context) {
      throw new Error('useCustomSessionContext must be used within a CustomSessionProvider');
    }
    return context;
  };

