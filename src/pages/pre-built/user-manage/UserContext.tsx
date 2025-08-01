import React, { useState, createContext, ReactNode } from "react";
import { Outlet } from "react-router-dom";
import { userData } from "./UserData";

interface UserContextType {
  contextData: [any[], React.Dispatch<React.SetStateAction<any[]>>];
}

interface UserContextProviderProps {
  children?: ReactNode;
}

export const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserContextProvider = (props: UserContextProviderProps) => {
  const [data, setData] = useState(userData);

  return (
    <UserContext.Provider value={{ contextData: [data, setData] }}>
      <Outlet />
    </UserContext.Provider>
  );
};