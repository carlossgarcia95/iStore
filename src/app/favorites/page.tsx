import Favorites from "@/src/components/Favorites";
import { getAuthSession } from "@/src/lib/auth";
import { db } from "@/src/lib/db";
import axios from "axios";

const Page = async () => {
  const session = await getAuthSession();
  const userFavorites = session?.user.favoriteIds || [];

  const favorites = await db.product.findMany({
    where: {
      id: {
        in: userFavorites,
      },
    },
  });

  return (
    <div>
      <Favorites favorites={favorites}/>
    </div>
  );
};

export default Page;
