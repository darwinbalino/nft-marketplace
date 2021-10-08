import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";

var nft1 = require("/public/nft1.jpg");

const Hero = () => {
  const router = useRouter();
  return (
    <>
      <div>
        <div className="w-[1900px] h-[500px]">
          <Image
            className="z-10 object-cover max-h-44 brightness-40 grayscale-60"
            src={nft1}
            objectFit="fill"
          />
        </div>
        <div className="relative z-20">
          <div className="px-6 text-gray-200 md:px-14 lg:px-20 -mt-96">
            {/* Hero */}
            <h1 className="-mb-2 font-serif text-5xl leading-tight md:text-7xl">
              Discover
            </h1>
            <h1 className="font-serif text-5xl leading-tight md:text-7xl">
              rare digital art
            </h1>
            <h1 className="font-serif text-5xl leading-tight md:text-7xl">
              and collect NFTs
            </h1>
            <button
              onClick={() => router.push("/marketplace")}
              className="px-3 py-2 font-sans font-light bg-transparent rounded-md cursor-pointer hover:bg-gray-200 hover:text-gray-900 mt-7 text-md ring-1 ring-gray-200"
            >
              View marketplace
            </button>
            <h1 className="mt-5 font-sans font-light text-md">
              Genesis Estate by Mad Dog Jones
            </h1>
          </div>
          <div className="h-24 bg-gray-100 mt-60" />
        </div>
      </div>
      <div className="relative z-10 px-6 py-2 text-gray-800 bg-gray-100">
        <h1 className="font-serif text-2xl">Latest artwork </h1>
      </div>
    </>
  );
};

export default Hero;
