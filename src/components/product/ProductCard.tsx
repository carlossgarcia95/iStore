"use client";

import { formatPrice } from "../../utils/formatPrice";
import { truncateText } from "../../utils/truncateText";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface ProductCardProps {
  data: any;
}

const ProductCard: React.FC<ProductCardProps> = ({ data }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const router = useRouter();

  return (
    <div
      onClick={() => router.push(`product/${data.id}`)}
      className="relative col-span-1 cursor-pointer border-[1px] bg-white rounded-xl p-4 transition hover:scale-105 text-center text-sm"
    >
      <div
        onClick={() => setIsFavorite(!isFavorite)}
        className="absolute z-10 right-[8px] top-[8px]"
      >
        {isFavorite ? (
          <AiFillHeart size={25} className='text-teal-500' />
        ) : (
          <AiOutlineHeart size={25} className="text-teal-500" />
        )}
      </div>

      <div className="flex flex-col items-center w-full gap-1">
        <div className="aspect-square overflow-hidden relative w-full my-2">
          <Image
            fill
            src={data.images[0].image}
            alt="data.name"
            className="w-full h-full object-contain"
          />
        </div>
        <hr className="border w-full" />
        <div className="w-full rounded-md">
          <div className="mt-2">{truncateText(data.name)}</div>
          <div className="font-bold">{formatPrice(data.price)}</div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
