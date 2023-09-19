import React, { useEffect, useState } from "react";
import hotel1 from "../assets/hotel1.jpg";

const Carousel = () => {
  const [index, setindex] = useState(0);
  const imgs = [
    "https://s3-eu-north-1.amazonaws.com/py3.visitsweden.com/original_images/Liseberg_HotelCuriosa_600x600_MINT_CMSTemplate.jpg",
    "https://www.travelandleisure.com/thmb/pCU_Y9fbQe4CT5Q73J9k2Bqd_bI=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/header-grand-velas-los-cabos-MXALLINC0222-46d3772ad56f4493a83e1bcb49e119f9.jpg",
    "https://q-xx.bstatic.com/xdata/images/hotel/max1024x768/370564672.jpg?k=8231a32ede50f5d1f15ee992530735d10dc16ce48cae7f5e165c74ba108c4d1b&o=",
  ];
  let isset = false;
  const interval = setInterval(() => {
    if (isset === true) return;
    isset = true;

    if (index === imgs.length - 1) {
      setindex(0);
    } else {
      const i = index + 1;
      setindex(i);
    }

    // const i = index + 1;
    // console.log(i);
    // setindex(i);
  }, 4000);

  useEffect(() => {
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <>
      <div id="default-carousel" className="relative w-full">
        <div className="relative h-56 overflow-hidden rounded-lg md:h-96">
          <div className=" duration-700 ease-in-out" data-carousel-item>
            <img
              src={imgs[index]}
              className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
              alt="..."
            />
          </div>
        </div>
        <div className="absolute z-30 flex space-x-3 -translate-x-1/2 bottom-5 left-1/2"></div>
      </div>
    </>
  );
};

export default Carousel;
