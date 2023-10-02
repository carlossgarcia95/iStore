import { getAuthSession } from "@/src/lib/auth";
import { db } from "@/src/lib/db";

export default async function handler(req: Request) {
  const session = await getAuthSession();

  if (!session?.user) {
    return new Response("Unauthorized", { status: 401 });
  }

  try {
    if (req.method === "POST") {
      const body = await req.json();
      const { productId } = body;

      const existingProduct = await db.product.findUnique({
        where: {
          id: productId,
        },
      });

      if (!existingProduct) {
        return new Response("Product ID does not exist", { status: 404 });
      }

      // Update user's favorites by adding productId
      const user = await db.user.update({
        where: {
          email: session.user.email || "",
        },
        // Bypass type checking for favoriteIds
        data: {
          favoriteIds: {
            push: productId,
          },
        },
      });

      return new Response(JSON.stringify(user));
    } else if (req.method === "DELETE") {
      const body = await req.json();
      const { productId } = body;

      const existingProduct = await db.product.findUnique({
        where: {
          id: productId,
        },
      });

      if (!existingProduct) {
        return new Response("Product ID does not exist", { status: 404 });
      }

      // Remove productId from user's favorites
      const user = await db.user.update({
        where: {
          email: session.user.email || "",
        },
        // Bypass type checking for favoriteIds
        data: {
          favoriteIds: {
            pull: productId,
          } as any, // Use "as any" to avoid type checking error
        },
      });

      return new Response(JSON.stringify(user));
    } else {
      // Handle other HTTP methods if needed
      return new Response("Method not allowed", { status: 405 });
    }
  } catch (error) {
    // Handle errors here
    return new Response("Error processing request", { status: 500 });
  }
}
