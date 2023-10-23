import { getAuthSession } from "@/src/lib/auth";
import { db } from "@/src/lib/db";
import { Orders } from "./Orders";

const page = async () => {

  const session = await getAuthSession();
  const orders = await db.order.findMany({
    where: {
      userId: session?.user.id,
    },
  });

  return (
    <div className="mx-2 md:container max-w-5xl pt-8 ">
      <Orders data={orders}/>
    </div>
  );
};

export default page;
