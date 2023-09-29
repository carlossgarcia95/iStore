import ProductDetails from "@/src/app/product/[slug]/ProductDetails";
import { db } from "@/src/lib/db";

interface PageProps {
  params: {
    slug: string;
  };
}

const page = async ({ params }: PageProps) => {
  const { slug } = params;
  const product = await db.product.findFirst({
    where: {
      id: slug,
    },
  });
  return (
    <div className="mx-2 md:container">
      <ProductDetails product={product} />
      <div className="flex flex-col mt-20 gap-4"></div>
    </div>
  );
};

export default page;
