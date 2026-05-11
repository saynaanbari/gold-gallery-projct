"use client";
import Image from "next/image";
import heroSection from "@/assets/images/slider-01.jpg";
import heroSection2 from "@/assets/images/slider-02.jpg";
import arrow from "@/assets/svg/short-left-arrow.svg";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.css";
import CtaButton from "../base/cta-button";

export default function HeroSection() {
  return (
    <div className="relative w-full h-80 md:h-130 lg:h-115 mb-10 lg:mt-6 lg:mb-20">
      <CtaButton
        href={"/products"}
        title={"مشاهده همه محصولات"}
        img={arrow}
        className={
          "absolute bottom-3 right-5 md:right-6 md:bottom-6 lg:right-5 lg:bottom-5 z-10 px-3 py-2 md:py-3 lg:px-5 font-bold text-[8px] bg-dark-green hover:bg-[#5b6b5d] text-white cursor-pointer md:text-[12px] md:px-5 flex items-center"
        }
      />
      <Swiper
        modules={[Autoplay]}
        spaceBetween={0}
        slidesPerView={1}
        loop={true}
        speed={1000}
        autoplay={{
          delay: 6000,
          disableOnInteraction: false,
        }}
        style={{
          width: "100%",
          height: "100%",
        }}
      >
        <SwiperSlide
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            src={heroSection}
            alt=""
            style={{
              display: "block",
              width: "100%",
              height: "100%",
              objectFit: "cover",
              cursor: "pointer",
            }}
          />
        </SwiperSlide>
        <SwiperSlide
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            src={heroSection2}
            alt=""
            style={{
              display: "block",
              width: "100%",
              height: "100%",
              objectFit: "cover",
              cursor: "pointer",
            }}
          />
        </SwiperSlide>
        {/* عکس hero3 استفاده نشده، اگر لازم نیست حذفش کن */}
        {/* <SwiperSlide
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            src={hero3}
            alt="Slide 3"
            style={{
              display: "block",
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </SwiperSlide> */}
      </Swiper>
    </div>
  );
}
