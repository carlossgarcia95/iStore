"use client";

import { formatPrice } from "../../utils/formatPrice";
import { truncateText } from "../../utils/truncateText";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Card } from "../ui/Card";
import FavoriteButton from "../FavoriteButton";
import { useSession } from "next-auth/react";

interface ProductCardProps {
  product: any;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const router = useRouter();
  const { data: session } = useSession();

  return (
    <Card className="relative col-span-1 border-[1px] bg-white rounded-xl p-4 transition text-center text-sm">
      <div className="flex flex-col items-center w-full gap-1">
        <div
          onClick={() => router.push(`product/${product.id}`)}
          className="aspect-square cursor-pointer overflow-hidden relative w-full my-2 hover:scale-105"
        >
          <Image
            fill
            src={product.images[0].image}
            alt="data.name"
            className="w-full h-full object-contain"
          />
        </div>
        <hr className="border w-full" />
        <div className="relative w-full rounded-md text-left">
          <div
            onClick={() => router.push(`product/${product.id}`)}
            className="mt-2 hover:underline cursor-pointer"
          >
            {truncateText(product.name)}
          </div>

          <div className="font-bold text-orange-600">
            {formatPrice(product.price)}
          </div>
          {session?.user && (
            <div className="absolute right-0 top-4">
              <FavoriteButton productId={product.id} user={session.user} />
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};

export default ProductCard;
