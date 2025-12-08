import { useContext } from "react";
import { CartContext } from "./cartContextStore";

export const useCart = () => useContext(CartContext);
