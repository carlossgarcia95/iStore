import { without } from "lodash";

import { db } from "@/src/lib/db";
import { getAuthSession } from "@/src/lib/auth";

export async function DELETE(req: Request) {
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

    // Update the user's favoriteIds by removing the menuItemId
    const updatedFavoriteIds = without(session?.user.favoriteIds, productId);

    // Update the user's favoriteIds in the database
    const updatedUser = await db.user.update({
      where: {
        email: session?.user.email || "",
      },
      data: {
        favoriteIds: updatedFavoriteIds,
      },
    });
    return new Response(JSON.stringify(updatedUser));
  } catch (error) {
    // If an error occurs during the process, log the error
    console.log(error);

    // Return a 400 status code (Bad Request)
    return new Response("Could not unfavorite. Please try again.", {
      status: 500,
    });
  }
}
