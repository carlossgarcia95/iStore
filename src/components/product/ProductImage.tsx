"use client";

import {
  CartProductType,
  SelectedImgType,
} from "@/src/app/product/[slug]/ProductDetails";
import Image from "next/image";

interface ProductImageProps {
  cartProduct: CartProductType;
  product: any;
  handleColorSelect: (value: SelectedImgType) => void;
}

const ProductImage: React.FC<ProductImageProps> = ({
  cartProduct,
  product,
  handleColorSelect,
}) => {
  return (
    <div className="w-1/2 flex items-center justify-center">
      <Image
        height={400}
        width={400}
        src={cartProduct.selectedImg.image}
        alt={cartProduct.name}
        className="object-contain"
      />
    </div>
  );
};

export default ProductImage;
