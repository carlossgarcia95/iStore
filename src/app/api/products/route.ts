import { db } from "@/src/lib/db";

export default async function GET(req: Request) {
  try {
    const products = await db.product.findMany();
    return new Response(JSON.stringify(products));
  } catch (error) {
    return new Response("Could not fetch more posts", {
      status: 500,
    });
  }
}
