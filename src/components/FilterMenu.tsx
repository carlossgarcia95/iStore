"use client";

import React from "react";

type FilterMenuProps = {
  data: any;
  filterBy: (category: string) => void;
  removeFilter: () => void;
};

const FilterMenu: React.FC<FilterMenuProps> = ({
  data,
  filterBy,
  removeFilter,
}) => {
  let categories = [];
  categories = data.map((product: any) => product.category);
  let uniqueCategories = new Set(categories);

  // Transform the Set to an array using Array.
  let uniqueCategoriesArray = Array.from(
    uniqueCategories,
    (category) => category as string
  );

  return (
    <div className="flex gap-10 border mb-10 justify-center py-4 font-bold bg-white text-zinc-600">
      <div
        className="hover:cursor-pointer hover:text-zinc-900"
        onClick={() => {
          removeFilter();
        }}
      >
        All
      </div>

      <div className="flex gap-10">
        {uniqueCategoriesArray.map((category: any) => {
          return (
            <div
              className="hover:cursor-pointer hover:text-zinc-900"
              onClick={() => {
                filterBy(category);
              }}
            >
              {category}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FilterMenu;
