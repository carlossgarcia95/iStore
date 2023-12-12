"use client";

import { Product } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { debounce } from "lodash";
import { Search } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { useOnClickOutside } from "../hooks/useOnClickOutside";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./ui/Command";
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from "./ui/Sheet";
import { columns } from "../app/orders/Orders";

const MobileSearchBar = () => {
  const [input, setInput] = useState<string>("");
  const pathname = usePathname();
  const commandRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const [searchIsOpen, setSearchIsOpen] = useState(false)

  useOnClickOutside(commandRef, () => {
    setInput("");
  });

  const request = debounce(async () => {
    refetch();
  }, 300);

  const debounceRequest = useCallback(() => {
    request();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const {
    isFetching,
    data: queryResults,
    refetch,
    isFetched,
  } = useQuery({
    queryFn: async () => {
      if (!input) return [];
      const { data } = await axios.get(`/api/search?q=${input}`);
      return data as Product[];
    },
    queryKey: ["search-query"],
    enabled: false,
  });

  useEffect(() => {
    setInput("");
  }, [pathname]);

  return (
    <Sheet open={searchIsOpen} onOpenChange={setSearchIsOpen}>
      <SheetTrigger>
        <Search size={25} className=" text-slate-600" />
      </SheetTrigger>
      <SheetContent side="top">
        <SheetHeader>
          <Command
            ref={commandRef}
            className="relative rounded-lg border mt-6 z-50 overflow-visible"
          >
            <CommandInput
              onValueChange={(text) => {
                setInput(text);
                debounceRequest();
              }}
              onKeyDown={(e) => {
                if(e.key === "Enter") {
                  setSearchIsOpen(!searchIsOpen)
                  setInput('')
                }
              }}
              value={input}
              className="outline-none border-none focus:border-none focus:outline-none ring-0"
              placeholder="Search products..."
            />

            {input.length > 0 && (
              <CommandList className="absolute bg-white top-full inset-x-0 shadow rounded-b-md">
                {isFetched && <CommandEmpty>No results found.</CommandEmpty>}
                {(queryResults?.length ?? 0) > 0 ? (
                  <CommandGroup heading="Products">
                    {queryResults?.map((product) => (
                      <CommandItem
                        onSelect={(e) => {
                          router.push(`/product/${e}`);
                          console.log("Enter pressed")
                          router.refresh();
                        }}
                        onKeyDown={(e) => {
                          if(e.key === 'Enter') {
                            console.log("Enter pressed")
                          }
                        }}
                        key={product.id}
                        value={product.urlName}
                      >
                        <a
                          className="w-full text-left"
                          href={`/product/${product.urlName}`}
                        >
                          {product.name}
                        </a>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                ) : null}
              </CommandList>
            )}
          </Command>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

export default MobileSearchBar;
