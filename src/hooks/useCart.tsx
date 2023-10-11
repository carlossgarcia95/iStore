// Include CartProvider in layout.tsx to be able to use cart in all components

import { CartProductType } from "@prisma/client";
import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";
import { useToast } from "./useToast";
import axios from "axios";

type CartContextType = {
  cartTotalQty: number;
  cartTotalAmount: number;
  cartProducts: CartProductType[] | null;
  handleAddProductToCart: (product: CartProductType) => void;
  handleRemoveProductFromCart: (product: CartProductType) => void;
  handleCartQtyIncrease: (product: CartProductType) => void;
  handleCartQtyDecrease: (product: CartProductType) => void;
  handleClearCart: () => void;
  handleCheckout: (cartProducts: CartProductType[]) => void;
};

export const CartContext = createContext<CartContextType | null>(null);

interface Props {
  [propName: string]: any;
}

export const CartContextProvider = (props: Props) => {
  const [cartTotalAmount, setCartTotalAmount] = useState(0);
  const [cartTotalQty, setCartTotalQty] = useState(0);
  const [cartProducts, setCartProducts] = useState<CartProductType[] | null>(
    null
  );

  const { toast } = useToast();

  // Ensures cart is persistent even after page refresh
  useEffect(() => {
    const cartItems: any = localStorage.getItem("iStoreCartItems");
    const cProducts: CartProductType[] | null = JSON.parse(cartItems);
    setCartProducts(cProducts);
  }, []);

  useEffect(() => {
    const getTotals = () => {
      if (cartProducts) {
        const { total, qty } = cartProducts?.reduce(
          (acc, item) => {
            const itemTotal = item.price * item.quantity;
            acc.total += itemTotal;
            acc.qty += item.quantity;

            return acc;
          },
          { total: 0, qty: 0 }
        );
        setCartTotalQty(qty);
        setCartTotalAmount(total);
      }
    };

    getTotals();
  }, [cartProducts]);

  const handleAddProductToCart = useCallback((product: CartProductType) => {
    setCartProducts((prev) => {
      let updatedCart;
      if (prev) {
        updatedCart = [...prev, product];
      } else {
        updatedCart = [product];
      }
      // Success. Send user feedback and add cart item to local storage
      toast({
        description: "Product added to Cart",
        variant: "success",
      });
      localStorage.setItem("iStoreCartItems", JSON.stringify(updatedCart));
      return updatedCart;
    });
  }, []);

  const handleRemoveProductFromCart = useCallback(
    (product: CartProductType) => {
      if (cartProducts) {
        const filteredProducts = cartProducts.filter((item) => {
          return item.id !== product.id;
        });
        setCartProducts(filteredProducts);
        toast({
          description: "Product removed from Cart",
          variant: "success",
        });
        localStorage.setItem(
          "iStoreCartItems",
          JSON.stringify(filteredProducts)
        );
      }
    },
    [cartProducts]
  );

  const handleCartQtyIncrease = useCallback(
    (product: CartProductType) => {
      if (product.quantity === 99) {
        toast({
          description: "Oops! Maximum amount reached",
          variant: "destructive",
        });
      }

      if (!cartProducts) {
        return; // Nothing to update if cartProducts is undefined
      }

      const updatedCart = cartProducts.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      );

      setCartProducts(updatedCart);
      localStorage.setItem("iStoreI", JSON.stringify(updatedCart));
    },
    [cartProducts]
  );

  const handleCartQtyDecrease = useCallback(
    (product: CartProductType) => {
      if (product.quantity === 1) {
        toast({
          title: "Oops! Minimum amount reached",
          variant: "destructive",
        });
        return;
      }

      if (!cartProducts) {
        return; // Nothing to update if cartProducts is undefined
      }

      const updatedCart = cartProducts.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity - 1 } : item
      );

      setCartProducts(updatedCart);
      localStorage.setItem("iStoreCartItems", JSON.stringify(updatedCart));
    },
    [cartProducts]
  );

  const handleClearCart = useCallback(() => {
    setCartProducts(null);
    setCartTotalQty(0);
    localStorage.setItem("iStoreCartItems", JSON.stringify(null));
  }, [cartTotalQty]);

  const handleCheckout = async (cartProducts: CartProductType[]) => {
    const data = await fetch("/api/checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        cartProducts,
      }),
    });

    if (data.ok) {
      handleClearCart();
      const { url } = await data.json();
      window.location.href = url;
    } else {
      console.log("Failed to create order.");
    }
  };

  const value = {
    cartTotalQty,
    cartTotalAmount,
    cartProducts,
    handleAddProductToCart,
    handleRemoveProductFromCart,
    handleCartQtyIncrease,
    handleCartQtyDecrease,
    handleClearCart,
    handleCheckout,
  };

  return <CartContext.Provider value={value} {...props} />;
};

export const useCart = () => {
  const context = useContext(CartContext);

  if (context === null) {
    throw new Error("useCart must be used wihin a CartContextProvider");
  }

  return context;
};
