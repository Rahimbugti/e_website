import { createContext, useContext, useEffect, useReducer } from "react";

const CartContext = createContext();

const initialState = {
  cart: JSON.parse(localStorage.getItem("cart")) || [],
};

function cartReducer(state, action) {
  let newCart;

  switch (action.type) {
    case "ADD_TO_CART": {
      const exist = state.cart.find(
        (item) => item.id === action.payload.id
      );

      if (exist) {
        newCart = state.cart.map((item) =>
          item.id === action.payload.id
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item
        );
      } else {
        newCart = [
          ...state.cart,
          {
            ...action.payload,
            quantity: 1,
          },
        ];
      }

      return {
        ...state,
        cart: newCart,
      };
    }

    case "REMOVE_FROM_CART":
      newCart = state.cart.filter(
        (item) => item.id !== action.payload
      );

      return {
        ...state,
        cart: newCart,
      };

    case "INCREASE_QTY":
      newCart = state.cart.map((item) =>
        item.id === action.payload
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item
      );

      return {
        ...state,
        cart: newCart,
      };

    case "DECREASE_QTY":
      newCart = state.cart.map((item) =>
        item.id === action.payload
          ? {
              ...item,
              quantity: item.quantity > 1 ? item.quantity - 1 : 1,
            }
          : item
      );

      return {
        ...state,
        cart: newCart,
      };

    case "CLEAR_CART":
      return {
        ...state,
        cart: [],
      };

    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(state.cart));
  }, [state.cart]);

  return (
    <CartContext.Provider
      value={{
        cart: state.cart,
        dispatch,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);