"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { CiShoppingCart } from "react-icons/ci";
import { LiaShoppingBagSolid } from "react-icons/lia";
import { useCart } from "@/src/hooks/useCart";
import { buttonVariants } from "../ui/Button";

const CartCount = () => {
  const [btnIsHighlighted, setBtnIsHighlighted] = useState(false);
  const { cartTotalQty } = useCart();
  const router = useRouter();

  return (
    <div className={buttonVariants({variant: "outline", size: 'sm'})}>
      <div
        className={`relative cursor-pointer text-zinc-600 hover:text-zinc-950 ${
          btnIsHighlighted ? "animate-pulse scale-110" : ""
        }`}
        onClick={() => router.push("/cart")}
      >
        <div className="text-sm">
          <span
            className={`absolute top-[0px] -right-[4px] bg-teal-500 text-white h-4 w-4 rounded-full flex items-center justify-center text-sm font-bold ${
              btnIsHighlighted ? "bg-black text-white " : ""
            }`}
          >
            {cartTotalQty}
          </span>
          <LiaShoppingBagSolid size={28} className="text-teal-500" />
        </div>
      </div>
    </div>
  );
};

export default CartCount;
