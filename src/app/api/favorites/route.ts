import { getAuthSession } from "@/src/lib/auth";
import { db } from "@/src/lib/db";

export default async function GET(req: Request) {
  const session = await getAuthSession();

  if (!session?.user) {
    return new Response("Unauthorized", { status: 401 });
  }

  const favoritedProducts = await db.product.findMany({
    where: {
      id: {
        in: session.user.favoriteIds,
      },
    },
  });

  // Return the JSON in the response body with the appropriate content type
  return new Response(JSON.stringify(favoritedProducts));
}
