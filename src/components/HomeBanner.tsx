import Image from "next/image";

const HomeBanner = () => {
  return (
    <div className="relative m-2 rounded-lg bg-gradient-to-r from-teal-900 to-teal-300 shadow-md">
      <div className="mx-auto px-8 py-12 flex flex-col gap-2 md:flex-row items-center justify-evenly">
        <div className="mb-8 md:mb-0 text-center">
          <h1 className="sm:text-xl md:text-3xl lg:text-4xl font-bold text-white mb-4">
          The Best Apple has to Offer
          </h1>
          <p className="text-lg md:text-xl text-white mb-2">
            Enjoy discount on selected items
          </p>
          <p className="text-2xl md:5xl text-yellow-400 font-bold">
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
    </div>
  );
};

export default HomeBanner;