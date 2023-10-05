import { getAuthSession } from "@/src/lib/auth";
import { db } from "@/src/lib/db";

export async function GET(req: Request) {
  const session = await getAuthSession();
  const userFavorites = session?.user.favoriteIds || []

  try {
    const favorites = await db.product.findMany({
      where: {
        id: {
          in: userFavorites,
        },
      },
    });
    return new Response(JSON.stringify(favorites))
  } catch (error) {
    return new Response("Could not fetch favorites", { status: 500 });
  }
}
