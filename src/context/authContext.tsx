import { Session } from "@supabase/supabase-js";
import { createContext, Dispatch, SetStateAction, useState } from "react";

interface authContext {
  isLogin: boolean;
  setisLogin: React.Dispatch<React.SetStateAction<boolean>>;
  userDetails: Session | null;
  setUserDetails: Dispatch<SetStateAction<Session | null>>;
}

export const AuthContext = createContext<authContext>({
  isLogin: false,
  setisLogin: () => {},
  userDetails: null,
  setUserDetails: () => {},
});
export function AuthContextProvider({
  children,
}: {
  children: React.JSX.Element;
}) {
  const [isLogin, setisLogin] = useState<boolean>(false);
  const [userDetails, setUserDetails] = useState<Session | null>(null);

  return (
    <AuthContext.Provider
      value={{ isLogin, setisLogin, setUserDetails, userDetails }}>
      {children}
    </AuthContext.Provider>
  );
}
