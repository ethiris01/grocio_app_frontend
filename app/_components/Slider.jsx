import React from "react";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { logo1 } from "../assets";

const Slider = ({ sliderList }) => {
  return (
    <Carousel>
      <CarouselContent>
        {sliderList.map((slider, index) => {
          // Extract image details
          const image = slider.image?.[0];
          const imageUrl = image?.formats?.large?.url
            ? `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}${image.formats.large.url}`
            : {logo1}; // Fallback to placeholder if no image exists

          return (
            <CarouselItem key={index} className="flex flex-col items-center min-w-full">
              <Image
                src={imageUrl}
                alt="slider"
                width={1000} // Adjust based on your design
                height={600}
                className="w-[1000px] h-[200px] md:h-[400px] object-cover rounded-xl"
              />
            </CarouselItem>
          );
        })}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};

export default Slider;
