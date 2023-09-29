import HomeBanner from "../components/HomeBanner";
import ProductCard from "../components/product/ProductCard";
import { db } from "../lib/db";
import { Product } from "@prisma/client";

export default async function Home() {
  const products = await db.product.findMany();
  return (
    <div>
      <HomeBanner />
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
