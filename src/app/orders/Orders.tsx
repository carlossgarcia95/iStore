import Heading from "@/src/components/ui/Heading";
import { Card } from "@/src/components/ui/Card";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
} from "@/src/components/ui/Table";
import Link from "next/link";
import { buttonVariants } from "@/src/components/ui/Button";
import { ChevronLeft } from "lucide-react";
import OrderItem from "./OrderItem";

const orders = [
  {
    id: "2309203942soij02193",
    amount: 120,
    currency: "USD",
    status: "pending",
    deliveryStatus: "pending",
    createDate: "2023-09-13T16:00:55.788+00:00",
  },
  {
    id: "2309203942soij02193",
    amount: 120,
    currency: "USD",
    status: "pending",
    deliveryStatus: "pending",
    createDate: "2023-09-13T16:00:55.788+00:00",
  },
  {
    id: "2309203942soij02193",
    amount: 120,
    currency: "USD",
    status: "pending",
    deliveryStatus: "pending",
    createDate: "2023-09-13T16:00:55.788+00:00",
  },
  {
    id: "2309203942soij02193",
    amount: 120,
    currency: "USD",
    status: "pending",
    deliveryStatus: "pending",
    createDate: "2023-09-13T16:00:55.788+00:00",
  },
];

const Orders = () => {
  if (!orders || orders.length === 0) {
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
      <Heading title="Orders" center />
      <Card className="mt-8 p-2 md:p-8 ">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>AMOUNT</TableHead>
              <TableHead>CURRENCY</TableHead>
              <TableHead>STATUS</TableHead>
              <TableHead>DELIVERY STATUS</TableHead>


            </TableRow>
          </TableHeader>
          <TableBody>
            {orders?.map((item) => {
              return <OrderItem item={item} key={item.id} />;
            })}
          </TableBody>
        </Table>
      </Card>
    </>
  );
};

export default Orders;
