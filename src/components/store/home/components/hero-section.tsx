"use client";
import { useRef } from "react";
import Image from "next/image";
import heroSection from "@/assets/images/slider-01.jpg";
import heroSection2 from "@/assets/images/slider-02.jpg";
import arrowRight from "@/assets/svg/arrow-sign.svg";
import arrow from "@/assets/svg/short-left-arrow.svg";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.css";
import "swiper/css/pagination";
import CtaButton from "../base/cta-button";

export default function HeroSection() {
  const swiperRef = useRef<any>(null);
  const handleNext = () => swiperRef.current?.slideNext();
  const handlePrev = () => swiperRef.current?.slidePrev();

  return (
    <div className="relative w-full h-80 md:h-130 lg:h-115 md:mt-8 lg:mt-6 mb-20 overflow-hidden">
      <CtaButton
        href={"/products"}
        title={"مشاهده همه محصولات"}
        img={arrow}
        className={
          "absolute bottom-3 right-5 md:right-6 md:bottom-6 lg:right-5 lg:bottom-5 z-10 px-3 py-2 md:py-3 lg:px-5 font-bold text-[8px] bg-dark-green hover:bg-[#5b6b5d] text-white cursor-pointer md:text-[12px] md:px-5 flex items-center"
        }
      />
      <button
        onClick={handleNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-black/10 backdrop-blur-md border border-white/30 shadow transition-all duration-300 hover:bg-black/20 hover:scale-110 hover:border-white/50 cursor-pointer z-20"
      >
        <Image src={arrowRight} alt="" width={20} height={20} />
      </button>
      <button
        onClick={handlePrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-black/10 backdrop-blur-md border border-white/30 shadow transition-all duration-300 hover:bg-black/20 hover:scale-110 hover:border-white/50 cursor-pointer z-20"
      >
        <Image
          src={arrowRight}
          alt=""
          width={20}
          height={20}
          className="rotate-180"
        />
      </button>
      <Swiper
        modules={[Autoplay, Pagination]}
        pagination={{ clickable: true }}
        autoplay={{ delay: 6000, disableOnInteraction: false }}
        loop={true}
        speed={1000}
        slidesPerView={1}
        spaceBetween={0}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        className="w-full h-full"
      >
        <SwiperSlide>
          <Image src={heroSection} alt="" fill className="object-cover" />
        </SwiperSlide>

        <SwiperSlide>
          <Image src={heroSection2} alt="" fill className="object-cover" />
        </SwiperSlide>
      </Swiper>
      <style jsx global>{`
        .swiper-pagination-bullet {
          background: white !important;
          opacity: 0.5;
          width: 7px;
          height: 7px;
          transition: 0.3s;
        }
        .swiper-pagination-bullet-active {
          background: rgba(18, 92, 49, 0.6) !important;
          opacity: 1;
          width: 20px;
          border-radius: 5px;
        }
      `}</style>
    </div>
  );
}
