"use client";
import Image from "next/image";
import { useState } from "react";
import arrowRight from "@/assets/svg/chevron-right-arrow.svg";
import arrowLeft from "@/assets/svg/chevron-left-arrow.svg";

export default function ProductGallery({ images }: { images: string[] }) {
  const [index, setIndex] = useState(0);
  const next = () => {
    setIndex((prev) => (prev + 1) % images.length);
  };
  const prev = () => {
    setIndex((prev) => (prev - 1 + images.length) % images.length);
  };
  return (
    <div className="flex flex-col gap-3">
      <div className="relative w-full h-105 lg:h-120 shadow rounded-lg">
        <Image
          src={`http://localhost:5000${images[index]}`}
          alt=""
          fill
          className="object-cover rounded-lg"
          unoptimized
        />
        <button
          onClick={prev}
          className="group absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-black/10 backdrop-blur-md border border-white/30 shadow transition-all duration-300 hover:bg-black/20 hover:scale-110 hover:border-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 cursor-pointer"
        >
          <Image src={arrowLeft} alt={""} width={20} height={20} />
        </button>
        <button
          onClick={next}
          className="group absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-black/10 backdrop-blur-md border border-white/30 shadow transition-all duration-300 hover:bg-black/20 hover:scale-110 hover:border-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 cursor-pointer"
        >
          <Image src={arrowRight} alt={""} width={20} height={20} />
        </button>
      </div>
      <div className="flex gap-2">
        {images.map((img, i) => (
          <div
            key={i}
            onClick={() => setIndex(i)}
            className={`relative w-20 h-20 cursor-pointer transition ${
              i === index
                ? "opacity-100 border-2 border-green rounded-md"
                : "opacity-50"
            }`}
          >
            <Image
              src={`http://localhost:5000${img}`}
              alt=""
              fill
              className="object-cover rounded-md"
              unoptimized
            />
          </div>
        ))}
      </div>
    </div>
  );
}