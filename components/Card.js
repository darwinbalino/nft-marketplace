import Image from "next/image";
import React from "react";

const Card = ({ image, name, price }) => {
  return (
    <div className="relative z-40 px-6 py-2 text-gray-800 bg-gray-100 sm:px-2 ">
      {/* <h1 className="font-serif text-2xl">Latest artwork </h1> */}

      <section className="mt-3 duration-500 ease-in-out shadow-lg hover:-translate-y-1">
        {/* img */}
        <Image
          src={image}
          className="object-cover"
          height="600"
          width="600"
          alt=""
        />
        <div className="bg-white">
          {/* top */}
          <div className="border-b-2 border-gray-100">
            <div className="flex items-center justify-between py-4 px-7">
              <hi className="font-light text-md">{name}</hi>
              <hi className="text-xs font-bold">1/1</hi>
            </div>
            <div className="flex items-center space-x-2 pb-7 px-7">
              <img
                className="object-cover rounded-full"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7z1Od4QrQGPPjCfrPUrcG9hCj_WBvyr9dKw&usqp=CAU"
                width={35}
                height={35}
              />
              <h1 className="font-extralight">Beeple</h1>
            </div>
          </div>
          {/* bot */}
          <div className="px-10 py-2 font-bold text-md">
            <h1 className="tracking-tight">Buy now</h1>
            <h1 className="tracking-tighter">
              {price} <span className="text-sm">ETH</span>
            </h1>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Card;
