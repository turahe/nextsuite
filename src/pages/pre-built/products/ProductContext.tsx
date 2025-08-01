import React, { useState, createContext, ReactNode } from "react";
import { Outlet } from "react-router-dom";
import { productCardData } from "./ProductData";

interface ProductContextType {
  contextData: [any[], React.Dispatch<React.SetStateAction<any[]>>];
}

interface ProductContextProviderProps {
  children?: ReactNode;
}

export const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductContextProvider = (props: ProductContextProviderProps) => {
  const [data, setData] = useState(productCardData);

  return (
    <ProductContext.Provider value={{ contextData: [data, setData] }}>
      <Outlet />
    </ProductContext.Provider>
  );
};