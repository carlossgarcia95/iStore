import Heading from "./ui/Heading";
import ProductCard from "./product/ProductCard";
import { getAuthSession } from "../lib/auth";

const Favorites = async () => {
  const session = await getAuthSession();

  const list = session?.user.favoriteIds;


  return (
    <div className="mt-8">
      <Heading title="Favorites" center />
      <div className="md:container mx-2">
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-2 md:gap-8">
          {list?.map((product: any) => {
            return <div>{product}</div>;
          })}
        </div>
      </div>
    </div>
  );
};

export default Favorites;
