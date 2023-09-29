import SetQuantity from "@/src/components/product/SetQuantity";
import { TableCell, TableRow } from "@/src/components/ui/Table";
import { useCart } from "@/src/hooks/useCart";
import { CartProductType } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { formatPrice } from "@/src/utils/formatPrice";
import { truncateText } from "@/src/utils/truncateText";
import { Button, buttonVariants } from "@/src/components/ui/Button";

interface CartItemProps {
  item: CartProductType;
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const {
    handleRemoveProductFromCart,
    handleCartQtyIncrease,
    handleCartQtyDecrease,
  } = useCart();
  return (
    <TableRow>
      <TableCell>
        <div className="flex flex-col my-2 md:flex-row items-start md:items-center gap-2">
          <Link href={`/product/${item.id}`}>
            <div className="relative w-[70px] aspect-square">
              <Image
                src={item.selectedImg.image}
                alt={item.name}
                fill
                className="object-contain"
              />
            </div>
          </Link>
          <div className="space-y-2">
            <Link href={`/product/${item.id}`} className="font-bold">
              {truncateText(item.name)}
            </Link>
            <p>{item.selectedImg.color}</p>
            <div
              onClick={() => {
                handleRemoveProductFromCart(item);
              }}
              className="hover:cursor-pointer hover:underline text-zinc-600"
            >
              Remove
            </div>
          </div>
        </div>
      </TableCell>
      <TableCell>{formatPrice(item.price)}</TableCell>
      <TableCell>
        <div className="flex flex-col items-end gap-2">
          <div className="border rounded-md">
            <SetQuantity
              cartCounter={true}
              cartProduct={item}
              handleQtyIncrease={() => {
                handleCartQtyIncrease(item);
              }}
              handleQtyDecrease={() => {
                handleCartQtyDecrease(item);
              }}
            />
          </div>

          <p>{formatPrice(item.price * item.quantity)}</p>
        </div>
      </TableCell>
    </TableRow>
  );
};

export default CartItem;
