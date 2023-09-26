"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { CiShoppingCart } from "react-icons/ci";
import {LiaShoppingBagSolid} from 'react-icons/lia'
import { useCart } from "@/src/hooks/useCart";

const CartCount = () => {
  const [btnIsHighlighted, setBtnIsHighlighted] = useState(false);
  const {cartTotalQty} = useCart()
  const router = useRouter();

  return (
    <div
      className={`relative cursor-pointer text-zinc-600 hover:text-zinc-950 ${
        btnIsHighlighted ? "animate-pulse scale-110" : ""
      }`}
      onClick={() => router.push("/cart")}
    >
      <div className="text-3xl">
        <span
          className={`absolute top-[5px] right-[28px] bg-teal-500 text-white h-5 w-5 rounded-full flex items-center justify-center text-sm font-bold ${
            btnIsHighlighted ? "bg-black text-white " : ""
          }`}
        >
          {cartTotalQty}
        </span>
        <LiaShoppingBagSolid size={28} className='text-slate-700'/>
      </div>
    </div>
  );
};

export default CartCount;
