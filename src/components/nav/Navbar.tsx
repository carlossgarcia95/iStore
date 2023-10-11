import Link from "next/link";
import { UserMenu } from "./UserMenu";
import { buttonVariants } from "../ui/Button";
import CartCount from "./CartCount";
import { getAuthSession } from "@/src/lib/auth";
import SearchBar from "../SearchBar";
import MobileSearchBar from "../MobileSearchBar";
import { Cpu } from "lucide-react";

const Navbar = async () => {
  const session = await getAuthSession();
  return (
    <div className="p-2 top-0 w-full z-30 shadow-sm bg-opacity-95 bg-white backdrop-blur-md">
      <div className="md:container px-2 max-w-7xl h-full mx-auto flex items-center justify-between gap-2">
        <Link href="/" className="flex items-center gap-1 font-light text-2xl text-slate-700">
          <Cpu className="text-teal-500"/>
          iStore
        </Link>
        <div className="hidden md:flex w-full justify-center">
          <SearchBar />
        </div>
        <div className="flex items-center gap-4 md:gap-6">
          <div className="flex md:hidden hover:cursor-pointer">
            <MobileSearchBar />
          </div>
          <CartCount />
          {session?.user ? (
            <UserMenu user={session?.user} />
          ) : (
            <Link href="/login" className={`min-w-max  ${buttonVariants({ size: "sm" })}`}>
              Login
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
