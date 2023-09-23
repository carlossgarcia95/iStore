import Link from "next/link";
import { UserMenu } from "./UserMenu";
import { products } from "@/src/utils/products";
import { buttonVariants } from "../ui/Button";
import CartCount from "./CartCount";

const Navbar = async () => {
  return (
    <div className="sticky p-2 top-0 w-full z-30 shadow-sm bg-opacity-80 bg-white backdrop-blur-md">
      <div className="container max-w-7xl h-full mx-auto flex items-center justify-between gap-2">
        <Link href="/" className="font-bold text-2xl text-slate-700">
          iStore
        </Link>
        {/* <Search/> */}
        <div className="flex items-center gap-2 md:gap-6">
          <CartCount />
          <UserMenu />
          <Link href="/login" className={buttonVariants()}>
            Log In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
