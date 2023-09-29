"use client";

import ProductImage from "@/src/components/product/ProductImage";
import { Button, buttonVariants } from "@/src/components/ui/Button";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { MdCheckCircle } from "react-icons/md";
import { useCart } from "@/src/hooks/useCart";
import SetColor from "@/src/components/product/SetColor";
import SetQuantity from "@/src/components/product/SetQuantity";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { Card } from "@/src/components/ui/Card";

interface ProductDetailsProps {
  product: any;
}

export type CartProductType = {
  id: string;
  name: string;
  description: string;
  category: string;
  selectedImg: SelectedImgType;
  quantity: number;
  price: number;
};

export type SelectedImgType = {
  color: string;
  colorCode: string;
  image: string;
};

const ProductDetails: React.FC<ProductDetailsProps> = ({ product }) => {
  const { handleAddProductToCart, cartProducts } = useCart();
  const [isProductInCart, setIsProductInCart] = useState(false);
  const [cartProduct, setCartProduct] = useState<CartProductType>({
    id: product.id,
    name: product.name,
    description: product.description,
    category: product.category,
    selectedImg: { ...product.images[0] },
    quantity: 1,
    price: product.price,
  });
  const router = useRouter();

  useEffect(() => {
    setIsProductInCart(false);
    if (cartProducts) {
      const existingIndex = cartProducts.findIndex(
        (item) => item.id === product.id
      );
      if (existingIndex > -1) {
        setIsProductInCart(true);
      }
    }
  }, [cartProducts]);

  const handleColorSelect = useCallback((value: SelectedImgType) => {
    setCartProduct((prev) => {
      return { ...prev, selectedImg: value };
    });
  }, []);

  const handleQtyIncrease = useCallback(() => {
    if (cartProduct.quantity === 99) {
      return;
    }
    setCartProduct((prev) => {
      return { ...prev, quantity: prev.quantity + 1 };
    });
  }, [cartProduct]);

  const handleQtyDecrease = useCallback(() => {
    if (cartProduct.quantity === 1) {
      return;
    }
    setCartProduct((prev) => {
      return { ...prev, quantity: prev.quantity - 1 };
    });
  }, [cartProduct]);

  const Horizontal = () => {
    return <hr className="w-full my-2" />;
  };

  return (
    <div>
      <div className="mb-4">
        <Link className={buttonVariants({ variant: "link" })} href={"/"}>
          <ChevronLeft className="h-4 w-4 mr-1" />
          Shop
        </Link>
      </div>
      <Card className="flex flex-col mx-auto md:flex-row gap-6 items-center p-10 max-w-5xl">
        <ProductImage
          cartProduct={cartProduct}
          product={product}
          handleColorSelect={handleColorSelect}
        />
        <div className="flex flex-col gap-2 md:gap-4 text-zinc-600">
          <h2 className="text-2xl font-medium text-zinc-700 text-center md:text-3xl">
            {product.name}
          </h2>
          <Horizontal />
          <div className="text-justify">{product.description}</div>
          <Horizontal />
          <div>
            <span className="font-semibold">CATEGORY: </span>
            {product.category}
          </div>
          <div className={product.inStock ? "text-green-600" : "text-rose-400"}>
            {product.inStock ? "In stock" : "Out of stock"}
          </div>
          <Horizontal />
          {isProductInCart ? (
            <>
              <p className="mb-2 text-zinc-500 flex items-center gap-1">
                <MdCheckCircle size={20} className="text-teal-500" />
                <span>Product added to cart</span>
              </p>
              <Button
                onClick={() => router.push("/cart")}
                className="w-full"
                variant={"outline"}
              >
                View Cart
              </Button>
            </>
          ) : (
            <>
              <SetColor
                cartProduct={cartProduct}
                images={product.images}
                handleColorSelect={handleColorSelect}
              />
              <Horizontal />
              <SetQuantity
                cartProduct={cartProduct}
                handleQtyIncrease={handleQtyIncrease}
                handleQtyDecrease={handleQtyDecrease}
              />
              <Horizontal />
              <div className="w-full">
                <Button
                  onClick={() => handleAddProductToCart(cartProduct)}
                  className="w-full"
                >
                  Add to Cart
                </Button>
              </div>
            </>
          )}
        </div>
      </Card>
    </div>
  );
};

export default ProductDetails;
