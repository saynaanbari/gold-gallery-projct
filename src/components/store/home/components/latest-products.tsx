"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
import { useEffect, useState } from "react";
import { ProductType } from "@/types/product-type";
import { getProducts } from "../services/get-products";
import ProductsCard from "@/shared/cards/products-card";

export default function LatestProducts() {
  const [products, setProducts] = useState<ProductType[]>([]);
  useEffect(() => {
    async function fetchProducts() {
      try {
        const result = await getProducts();
        const newestProduct: ProductType[] = [...result.data]
          .sort(
            (a, b) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
          )
          .slice(0, 8);
        setProducts(newestProduct);
      } catch (error) {
        console.error("خطا در گرفتن داده ها", error);
        throw error;
      }
    }
    fetchProducts();
  }, []);
  return (
    <div className="w-full px-10 md:px-0 mb-25">
      <div className="relative">
        <h3 className="font-bold text-xl mb-8 lg:text-[20px] relative z-10">
          جدیدترین محصولات
        </h3>
        <div className="bg-light-green w-16 h-5 absolute top-3.5 rounded-md"></div>
      </div>
      
      <Swiper
        spaceBetween={20}
        loop={true}
        speed={800}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        modules={[Autoplay]}
        breakpoints={{
          0: {
            slidesPerView: 1,
          },
          768: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 4,
          },
        }}
      >
        {products.map((product) => (
          <SwiperSlide key={product._id}>
            <ProductsCard item={product} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
