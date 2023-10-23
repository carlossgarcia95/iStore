import { db } from "@/src/lib/db";
import { getAuthSession } from "@/src/lib/auth";

export async function POST(req: Request) {
  try {
    const session = await getAuthSession();

    const body = await req.json();
    const { productId } = body;

    const existingProduct = await db.product.findUnique({
      where: {
        id: productId,
      },
    });

    if (!existingProduct) {
      throw new Error("Invalid ID");
    }

    const user = await db.user.update({
      where: {
        email: session?.user.email || "",
      },
      data: {
        favoriteIds: {
          push: productId,
        },
      },
    });

    return new Response(JSON.stringify(user));
  } catch (err) {
    return new Response("Could not get favorite. Please try again.", {
      status: 500,
    });
  }
}
