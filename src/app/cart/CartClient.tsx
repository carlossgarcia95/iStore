"use client";

import Heading from "@/src/components/ui/Heading";
import { useCart } from "@/src/hooks/useCart";
import Image from "next/image";
import CartItem from "./CartItem";
import Link from "next/link";
import { Button, buttonVariants } from "@/src/components/ui/Button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/src/components/ui/Table";
import { Card } from "@/src/components/ui/Card";
import { ChevronLeft, Divide } from "lucide-react";
import { formatPrice } from "@/src/utils/formatPrice";
import router from "next/router";
import { MdArrowBack } from "react-icons/md";

const CartClient = () => {
  const { cartProducts, cartTotalAmount, handleClearCart } = useCart();

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
      {cartProducts?.length === 0 && <div className="mb-4"></div>}
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
              size={"sm"}
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
              <Button
                onClick={() => router.push("/checkout")}
                className="w-full"
              >
                Checkout
              </Button>
              <Link className={buttonVariants({ variant: "link" })} href={"/"}>
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
