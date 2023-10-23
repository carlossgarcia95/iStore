"use client";

import { Button, buttonVariants } from "@/src/components/ui/Button";
import Heading from "@/src/components/ui/Heading";
import { ChevronLeft } from "lucide-react";
import { getURL } from "next/dist/shared/lib/utils";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Fragment } from "react";

const CheckoutPage = () => {
  const router = useRouter();
  const url = getURL();

  let transactionSuccessful;
  if (url.includes("/checkout/success=true")) {
    transactionSuccessful = true;
  } else if (url.includes("/checkout/success=true")) {
    transactionSuccessful = false;
  }

  return (
    <div className="mx-2 md:container max-w-5xl pt-8 ">
      {transactionSuccessful ? (
        <Fragment>
          <Heading title="Your order has been placed" center />
          <Button
            className="mx-auto flex mt-4"
            onClick={() => router.push("/orders")}
          >
            View Orders
          </Button>
        </Fragment>
      ) : (
        <div className="flex flex-col gap-4">
          <Heading title="Transaction unsuccessful" center />
          <p className="text-center mt-2 text-red-500">
            There was an issue processing your payment. Please check card details and try again.
          </p>
          <Link className={buttonVariants({ variant: "link" })} href={"/"}>
            <ChevronLeft className="h-4 w-4 mr-1" />
            Return to shop
          </Link>
        </div>
      )}
    </div>
  );
};

export default CheckoutPage;
