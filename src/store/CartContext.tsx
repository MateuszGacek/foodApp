import React, { createContext, useReducer } from "react";
import { Meal } from "../components/type/Meal";

type CartContextValue = {
  items: Meal[];
  addItem: (item: Meal) => void;
  removeItem: (id: string) => void;
};
type CartState = {
  items: Meal[];
};

type ItemAction =
  | { type: "ADD_ITEM"; item: Meal }
  | { type: "REMOVE_ITEM"; id: string };

const CartContext = createContext<CartContextValue>({
  items: [],
  addItem: () => {},
  removeItem: () => {},
});

const cartReducer = (state: CartState, action: ItemAction): CartState => {
  if (action.type === "ADD_ITEM") {
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );

    const updatedItems = [...state.items];

    if (existingCartItemIndex > -1) {
      const existingItem = state.items[existingCartItemIndex];
      const updatedItem = {
        ...existingItem,
        quantity: existingItem.quantity! + 1,
      };
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      updatedItems.push({ ...action.item, quantity: 1 });
    }

    return { ...state, items: updatedItems };
  }

  if (action.type === "REMOVE_ITEM") {
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );
    const existingCartItem = state.items[existingCartItemIndex];
    const updatedItems = [...state.items];

    if (existingCartItem.quantity === 1) {
      updatedItems.splice(existingCartItemIndex, 1);
      const updatedItem = {
        ...existingCartItem,
        quantity: existingCartItem.quantity! - 1,
      };
      updatedItems[existingCartItemIndex] = updatedItem;
    }
    return { ...state, items: updatedItems };
  }

  return state;
};

export function CartContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [cart, dispatchCartAction] = useReducer(cartReducer, { items: [] });

  const addItem = (item: Meal) => {
    dispatchCartAction({ type: "ADD_ITEM", item });
  };

  const removeItem = (id: string) => {
    dispatchCartAction({ type: "REMOVE_ITEM", id });
  };

  const value: CartContextValue = { items: cart.items, addItem, removeItem };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export default CartContext;
