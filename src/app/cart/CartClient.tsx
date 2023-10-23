"use client";

import { Button, buttonVariants } from "@/src/components/ui/Button";
import { Card } from "@/src/components/ui/Card";
import Heading from "@/src/components/ui/Heading";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/src/components/ui/Table";
import { useCart } from "@/src/hooks/useCart";
import { formatPrice } from "@/src/utils/formatPrice";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import CartItem from "./CartItem";

interface CartClientProps {
  user: any;
}

const CartClient: React.FC<CartClientProps> = ({ user }) => {
  const { cartProducts, cartTotalAmount, handleClearCart, handleCheckout } = useCart();
  const router = useRouter();

  if (!cartProducts || cartProducts.length === 0) {
    return (
      <div className="container flex flex-col">
        <Heading title="Your Cart is Empty" center />
        <Link className={buttonVariants({ variant: "link" })} href={"/"}>
          <ChevronLeft className="h-4 w-4 mr-1" />
          Start shopping
        </Link>
      </div>
    );
  }

  return (
    <>
      <Heading title="Cart" center />
      <Card className="mt-8 p-2 md:p-8 ">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>PRODUCT</TableHead>
              <TableHead>PRICE</TableHead>
              <TableHead className="text-end">TOTAL</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {cartProducts?.map((item) => {
              return <CartItem item={item} key={item.id} />;
            })}
          </TableBody>
        </Table>
        <div className="border-t-[1.5px] border-black pt-4 flex flex-col-reverse w-full md:flex-row justify-between gap-1">
          <Button
            variant={"destructive"}
            size={"lg"}
            onClick={() => {
              handleClearCart();
            }}
          >
            Clear Cart
          </Button>
          <div className="text-sm flex flex-col gap-2">
            <div className="flex  justify-between w-full text-base font-semibold">
              <span>Subtotal</span>
              <span>{formatPrice(cartTotalAmount)}</span>
            </div>
            <p className="text-zinc-500">
              Taxes and shipping calculated at checkout
            </p>
            {user ? (
              <Button
                onClick={() => handleCheckout(cartProducts)}
                className="w-full"
                size={"lg"}
              >
                Checkout
              </Button>
            ) : (
              <Button
                onClick={() => router.push("/login")}
                className="w-full"
                variant={"outline"}
              >
                Login to Checkout
              </Button>
            )}
            <Link
              className={`my-4 md:my-0 ${buttonVariants({ variant: "link" })}`}
              href={"/"}
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Continue Shopping
            </Link>
          </div>
        </div>
      </Card>
    </>
  );
};

export default CartClient;
