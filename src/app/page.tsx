import HomeBanner from "../components/HomeBanner";
import ProductCard from "../components/product/ProductCard";
import { db } from "../lib/db";
import { Product } from "@prisma/client";
import Categories from "../components/Categories";

export default async function Home() {
  const products = await db.product.findMany();

  let categories = [];
  categories = products.map((product: any) => product.category);
  let uniqueCategories = new Set(categories);

  // Transform the Set to an array using Array.
  let uniqueCategoriesArray = Array.from(
    uniqueCategories,
    (category) => category as string
  ).sort();

  return (
    <div>
      <HomeBanner />
      <Categories items={uniqueCategoriesArray} />
      
      {/* <FilterMenu
        data={products}
        filterBy={filterByHandler}
        removeFilter={() => setFilteredProducts(products)}
      /> */}
      <div className="md:container mx-2">
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-2 md:gap-8">
          {products.map((product: Product) => {
            return <ProductCard key={product.id} product={product} />;
          })}
        </div>
      </div>
    </div>
  );
}
