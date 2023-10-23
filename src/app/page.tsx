import { Product } from "@prisma/client";
import Categories from "../components/Categories";
import HomeBanner from "../components/HomeBanner";
import ProductCard from "../components/product/ProductCard";
import { db } from "../lib/db";

interface Props {
  searchParams: {
    category: string;
  };
}

export default async function Home({ searchParams }: Props) {
  const filteredProducts = await db.product.findMany({
    where: { category: searchParams.category },
  });

  let categories = [];
  const products = await db.product.findMany();
  categories = products.map((product: any) => product.category);
  let uniqueCategories = new Set(categories);

  // Transform the Set to an array using Array.
  let uniqueCategoriesArray = Array.from(
    uniqueCategories,
    (category) => category as string
  ).sort();

  const handleFilter = () => {};

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
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-2 md:gap-8">
          {filteredProducts.map((product: Product) => {
            return <ProductCard key={product.id} product={product} />;
          })}
        </div>
      </div>
    </div>
  );
}
