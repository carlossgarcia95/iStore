import { db } from "@/src/lib/db";
import Categories from "./Categories";

const SearchPage = async () => {
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
    <div className="p-6">
    </div>
  );
};

export default SearchPage;
