"use client";

import { CartProductType } from "@/src/app/product/[slug]/ProductDetails";
import { Button } from "../ui/Button";

interface SetQtyProps {
  cartCounter?: boolean;
  cartProduct: CartProductType;
  handleQtyIncrease: () => void;
  handleQtyDecrease: () => void;
}

const SetQuantity: React.FC<SetQtyProps> = ({
  cartCounter,
  cartProduct,
  handleQtyIncrease,
  handleQtyDecrease,
}) => {
  return (
    <div className="flex gap-8 items-center">
      {cartCounter ? null : <div className="font-semibold">QUANTITY</div>}
      <div className="flex gap-2 items-center text-base">
        <Button onClick={handleQtyDecrease} size={'sm'} variant={'ghost'}>
          -
        </Button>
        <div>{cartProduct.quantity}</div>
        <Button onClick={handleQtyIncrease} size={'sm'} variant={'ghost'}>
          +
        </Button>
      </div>
    </div>
  );
};

export default SetQuantity;
