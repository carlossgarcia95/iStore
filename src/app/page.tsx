"use client";

import { useState } from "react";
import FilterMenu from "../components/FilterMenu";
import HomeBanner from "../components/HomeBanner";
import { products } from "../utils/products";
import ProductCard from "../components/ProductCard";

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
      <div className="md:container mx-2">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-2 md:gap-8">
          {filteredProducts.map((product: any) => {
            return <ProductCard key={product.id} data={product} />;
          })}
        </div>
      </div>
    </div>
  );
}
