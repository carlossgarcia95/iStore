import CartClient from "./CartClient";

// Parallel route for sign-in modal. See
// https://nextjs.org/docs/app/building-your-application/routing/parallel-routes#dismissing-a-modal
// for more info.
const Page = () => {
  return (
    <div className="container max-w-5xl pt-8 ">
      <CartClient />
    </div>
  );
};

export default Page;
