"use client";

import { useState } from "react";
import FilterMenu from "../components/FilterMenu";
import HomeBanner from "../components/HomeBanner";
import { products } from "../utils/products";

export default function Home() {
  const [filteredProducts, setFilteredProducts] = useState(products);

  const filterByHandler = (category: string) => {
    setFilteredProducts(
      products.filter((product) => product.category === category)
    );
  };

  return (
    <div>
      <HomeBanner />
      {/* <FilterMenu
        data={products}
        filterBy={filterByHandler}
        removeFilter={() => setFilteredProducts(products)}
      /> */}
    </div>
  );
}
