import React, { createContext, useReducer } from "react";
import { Meal } from "../type/Meal";

type CartContextValue = {
  items: Meal[];
  addItem: (item: Meal) => void;
  removeItem: (id: string) => void;
};

const CartContext = createContext<CartContextValue>({
  items: [],
  addItem: (item) => {},
  removeItem: (id) => {},
});

export function CartContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <CartContext.Provider>{children}</CartContext.Provider>;
}

export default CartContext;
