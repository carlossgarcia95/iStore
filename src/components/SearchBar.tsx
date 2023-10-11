'use client'

import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "./ui/Command";
import { debounce } from "lodash";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useOnClickOutside } from "../hooks/useOnClickOutside";

import { Product } from "@prisma/client";

const SearchBar = () => {
  const [input, setInput] = useState<string>("");
  const pathname = usePathname();
  const commandRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

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
        if (!input) return []
        const { data } = await axios.get(`/api/search?q=${input}`)
        return data as (Product)[]
      },
    queryKey: ["search-query"],
    enabled: false,
  });

  useEffect(() => {
    setInput("");
  }, [pathname]);

  return (
    <Command
      ref={commandRef}
      className="relative rounded-lg border max-w-lg z-50 overflow-visible"
    >
      <CommandInput
        onValueChange={(text) => {
          setInput(text);
          debounceRequest();
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
                    router.refresh();
                  }}
                  key={product.id}
                  value={product.urlName}
                >
                  <a className="w-full" href={`/product/${product.urlName}`}>{product.name}</a>
                </CommandItem>
              ))}
            </CommandGroup>
          ) : null}
        </CommandList>
      )}
    </Command>
  );
};

export default SearchBar;
