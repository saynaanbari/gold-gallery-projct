"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
import { useEffect, useState } from "react";
import { getProducts } from "../services/get-products.service";
import rightStar from "@/assets/svg/right-star-cream.svg";
import leftStar from "@/assets/svg/left-star-cream.svg";
import Image from "next/image";
import { ProductType } from "@/types/product-type";
import ProductsCard from "@/shared/cards/products-card";

export default function SimilarProducts({ product }: { product: ProductType }) {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (!product?.category) return;

    async function fetchSimilarProducts() {
      try {
        setLoading(true);
        const firstPage = await getProducts(1, 10);
        const totalPages = firstPage.pages || 1;
        let allProducts: ProductType[] = [...firstPage.data];
        for (let page = 2; page <= totalPages; page++) {
          const currentSimilarCount = allProducts.filter(
            (p) => p.category === product.category && p._id !== product._id,
          ).length;

          if (currentSimilarCount >= 5) break;

          const nextPage = await getProducts(page, 10);
          allProducts = [...allProducts, ...nextPage.data];
        }
        const similar = allProducts
          .filter(
            (item: ProductType) =>
              String(item.category).trim() ===
                String(product.category).trim() && item._id !== product._id,
          )
          .slice(0, 5);

        setProducts(similar);
      } catch (error) {
        console.error("خطا در گرفتن محصولات مشابه", error);
      } finally {
        setLoading(false);
      }
    }

    fetchSimilarProducts();
  }, [product]);

  return (
    <div className="w-full">
      <div className="w-full flex items-center justify-center gap-5 mb-7">
        <Image src={rightStar} alt={""} width={120} height={10} />
        <h3 className="font-bold text-md whitespace-nowrap relative z-10 text-center">
          محصولات مشابه
        </h3>
        <Image src={leftStar} alt={""} width={120} height={10} />
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