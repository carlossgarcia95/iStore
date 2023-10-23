import Heading from "./ui/Heading";
import ProductCard from "./product/ProductCard";
import { getAuthSession } from "../lib/auth";
import { db } from "../lib/db";
import { Product } from "@prisma/client";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "./ui/Button";

interface FavoritesProps {
  favorites: any;
}

const Favorites: React.FC<FavoritesProps> = async ({ favorites }) => {


  return (
    <div className="mt-8">
      {favorites.length > 0 ? (
        <>
          <Heading title="Favorites" center />
          <div className="md:container mx-2">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-2 md:gap-8 mt-8">
              {favorites?.map((product: any) => {
                return <ProductCard key={product.id} product={product} />;
              })}
            </div>
          </div>
        </>
      ) : (
        <div className="container flex flex-col">
          <Heading title="Your Wishlist is Empty" center />
          <Link className={buttonVariants({ variant: "link" })} href={"/"}>
            <ChevronLeft className="h-4 w-4 mr-1" />
            Start shopping
          </Link>
        </div>
      )}
    </div>
  );
};

export default Favorites;
