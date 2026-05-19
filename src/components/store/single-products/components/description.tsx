"use client";
import { useEffect, useRef, useState } from "react";
export default function SingleProductDescription({
  description,
}: {
  description: string;
}) {
  const [expanded, setExpanded] = useState(false);
  const [isTruncated, setIsTruncated] = useState(false);
  const textRef = useRef<HTMLParagraphElement>(null);
  useEffect(() => {
    if (textRef.current) {
      setIsTruncated(textRef.current.scrollHeight > 56);
    }
  }, [description]);
  return (
    <div className="w-full">
      <div className="font-bold pb-4 mb-4 text-sm text-light-cream border-b border-b-light-cream">
        توضیحات محصول
      </div>
      <p
        ref={textRef}
        className={`text-xs leading-7 transition-all duration-300 text-gray font-bold ${
          isTruncated && !expanded ? "max-h-14 line-clamp-2" : ""
        }`}
      >
        {description}
      </p>

      {isTruncated && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-blue-500 mt-2 text-[10px] font-bold hover:text-blue-700 cursor-pointer"
        >
          {expanded ? "مشاهده کمتر ❯" : "مشاهده بیشتر ❯"}
        </button>
      )}
    </div>
  );
}