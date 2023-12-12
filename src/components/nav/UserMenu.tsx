"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/src/components/ui/DropdownMenu";
import { Box, Heart, LogOut, User2 } from "lucide-react";
import { User } from "next-auth";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { Fragment } from "react";
import { buttonVariants } from "../ui/Button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/Sheet";

interface UserMenuProps {
  user: User;
}

export function UserMenu({ user }: UserMenuProps) {
  return (
    // Desktop
    <Fragment>
      <div className="hidden md:flex hover:cursor-pointer">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <User2 className="hover:cursor-pointer text-slate-600" size={25} />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-white" align="end">
            <div className="flex items-center justify-start gap-2 p-2">
              <div className="flex flex-col space-y-1 leading-none">
                <p className="font-medium">{user.name}</p>
                <p className="w-[200px] truncate text-sm text-muted-foreground">
                  {user.email}
                </p>
              </div>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/favorites">
                {" "}
                <Heart className="mr-2 h-4 w-4" />
                Favorites
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/orders">
                {" "}
                <Box className="mr-2 h-4 w-4" />
                Orders
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/#">
                {" "}
                <Box className="mr-2 h-4 w-4" />
                Dashboard
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/#">
                {" "}
                <Box className="mr-2 h-4 w-4" />
                Settings
              </Link>
            </DropdownMenuItem>

            <DropdownMenuSeparator />
            <DropdownMenuItem
              onSelect={(event) => {
                event.preventDefault();
                signOut({
                  callbackUrl: `${window.location.origin}/sign-in`,
                });
              }}
              className="cursor-pointer"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Sign out
            </DropdownMenuItem>
          </DropdownMenuContent>{" "}
        </DropdownMenu>
      </div>

      {/* Mobile */}
      <div className="flex flex-col md:hidden hover:cursor-pointer">
        <Sheet>
          <SheetTrigger asChild>
            <User2 size={25} className="text-slate-600" />
          </SheetTrigger>
          <SheetContent side="right">
            <SheetHeader>
              <SheetTitle>{user.name}</SheetTitle>
              <SheetDescription>{user.email}</SheetDescription>
            </SheetHeader>
            <hr className="mt-4" />
            <div className="flex flex-col gap-6 py-4">
              <SheetClose asChild>
                <Link href="/favorites">Favorites</Link>
              </SheetClose>
              <SheetClose asChild>
                <Link href="/orders">Orders</Link>
              </SheetClose>
              <SheetClose asChild>
                <Link href="/#">Dashboard</Link>
              </SheetClose>
              <SheetClose asChild>
                <Link href="/#">Settings</Link>
              </SheetClose>
            </div>
            <hr className="mb-4" />
            <SheetFooter>
              <SheetClose
                onClick={(event) => {
                  event.preventDefault();
                  signOut({
                    callbackUrl: `${window.location.origin}/sign-in`,
                  });
                }}
                className={`w-full ${buttonVariants({
                  variant: "destructive",
                })}`}
              >
                Sign out
              </SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>
    </Fragment>
  );
}
