"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import Image from "next/image";
import rightStar from "@/assets/svg/right-star-cream.svg";
import leftStar from "@/assets/svg/left-star-cream.svg";
import { topRatedImages } from "../constants/top-rated-images";

export default function TopRatedSwiper() {
  return (
    <div className="w-full mb-25">
      <div className="flex items-center md:gap-5 justify-center mb-10 ">
        <Image src={rightStar} alt={""} width={120} height={10} />
        <h2 className="font-bold">محبوب ترین های مه گلد</h2>
        <Image src={leftStar} alt={""} width={120} height={10} />
      </div>
      <Swiper
        modules={[Autoplay]}
        loop={true}
        speed={7000}
        autoplay={{
          delay: 0,
          disableOnInteraction: false,
        }}
        breakpoints={{
          320: {
            slidesPerView: 2,
            spaceBetween: 12,
          },
          640: {
            slidesPerView: 3,
            spaceBetween: 16,
          },
          1024: {
            slidesPerView: 5,
            spaceBetween: 20,
          },
        }}
        className="w-full ease-linear!"
      >
        {topRatedImages.map((item, index) => {
          const isTop = index % 2 === 0;

          return (
            <SwiperSlide key={item.id} className="h-auto!">
              <div
                className={`h-64 md:h-87 w-full transition-transform duration-500 overflow-hidden
          ${isTop ? "md:-translate-y-8" : "md:translate-y-8"}
          ${isTop ? "-translate-y-3" : "translate-y-3"}`}
              >
                <Image
                  src={item.img}
                  alt={`slide-${index}`}
                  className="w-full h-full object-cover"
                />
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>

      <style jsx global>{`
        .swiper-wrapper {
          transition-timing-function: linear !important;
          align-items: center;
        }
      `}</style>
    </div>
  );
}
