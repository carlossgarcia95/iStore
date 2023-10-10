import { db } from '@/src/lib/db';

export async function GET(req: Request) {
  const url = new URL(req.url);
  const q = url.searchParams.get("q");

  if (!q) return new Response("Invalid query", { status: 400 });

  try {
    const results = await db.product.findMany({
      where: {
        name: {
          contains: q, // Use 'contains' for a case-insensitive search
          mode: "insensitive", // Make the search case-insensitive
        },
      },
      take: 5,
    });

    return new Response(JSON.stringify(results));
  } catch (error) {
    console.error("Error fetching data:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
