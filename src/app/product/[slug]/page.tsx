import { products } from "@/src/utils/products";
import ProductDetails from "@/src/app/product/[slug]/ProductDetails";

interface PageProps {
  params: {
    slug: string;
  };
}

const page = ({ params }: PageProps) => {
  const { slug } = params;
  const product = products.find((item) => item.id === slug);
  return (
    <div className="container p-8">
      <ProductDetails product={product} />
      <div className="flex flex-col mt-20 gap-4"></div>
    </div>
  );
};

export default page;
