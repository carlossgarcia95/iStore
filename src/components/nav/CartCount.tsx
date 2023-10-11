"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { CiShoppingCart } from "react-icons/ci";
import { LiaShoppingBagSolid } from "react-icons/lia";
import { useCart } from "@/src/hooks/useCart";

const CartCount = () => {
  const { cartTotalQty } = useCart();
  const router = useRouter();

  return (
    <div
      className='relative cursor-pointer group'
      onClick={() => router.push("/cart")}
    >
      <div className="text-sm">
        <span
          className={`absolute top-[0px] -right-[4px] border border-slate-400 bg-white text-black group-hover:border-teal-500  h-4 w-4 rounded-full flex items-center justify-center text-sm font-semibold`}
        >
          {cartTotalQty}
        </span>
        <LiaShoppingBagSolid size={28} className="text-slate-400 group-hover:text-teal-500 transition" />
      </div>
    </div>
  );
};

export default CartCount;
