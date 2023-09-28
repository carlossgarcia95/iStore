import Image from "next/image";
import { Card } from "./ui/Card";

const HomeBanner = () => {
  return (
    <Card className="relative m-2 md:m-6 rounded-lg bg-gradient-to-r from-purple-900 to-blue-500 shadow-md">
      <div className="mx-auto px-8 py-12 flex flex-col gap-2 md:flex-row items-center justify-evenly">
        <div className="mb-8 md:mb-0 text-center">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4">
          Only the Best from Apple
          </h1>
          <p className="text-lg md:text-xl text-white mb-2">
            Enjoy discount on selected items
          </p>
          <p className="text-xl md:text-2xl lg:text-3xl text-yellow-400 font-bold">
            LIMITED TIME OFFER
          </p>
        </div>
        <div className="w-80 md:w-96 relative aspect-video">
          <Image
            src="/banner-image.png"
            fill
            alt="Banner Image"
            className=""
          />
        </div>
      </div>
    </Card>
  );
};

export default HomeBanner;