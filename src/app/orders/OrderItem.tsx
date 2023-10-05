import { TableRow, TableCell } from "@/src/components/ui/Table";

interface OrderItemProps {
  item: any;
}

const OrderItem: React.FC<OrderItemProps> = ({ item }) => {
  return (
    <TableRow>
      <TableCell>{item.id}</TableCell>
      <TableCell>{item.amount}</TableCell>
      <TableCell>{item.currency}</TableCell>
      <TableCell>{item.status}</TableCell>
      <TableCell>{item.deliveryStatus}</TableCell>
    </TableRow>
  );
};

export default OrderItem;
