import { getAuthSession } from "@/src/lib/auth";
import CartClient from "./CartClient";

// Parallel route for sign-in modal. See
// https://nextjs.org/docs/app/building-your-application/routing/parallel-routes#dismissing-a-modal
// for more info.
const Page = async () => {
  const session = await getAuthSession()
  return (
    <div className="mx-2 md:container max-w-5xl pt-8 ">
      <CartClient user={session?.user} />
    </div>
  );
};

export default Page;
