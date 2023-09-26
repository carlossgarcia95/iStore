import { products } from "@/src/utils/products";

interface PageProps {
  params: {
    slug: string;
  };
}

const page = ({params}: PageProps) => {
    const product = products.find((item) => item.id === params.slug)
  return <div>Product Page</div>;
};

export default page;
