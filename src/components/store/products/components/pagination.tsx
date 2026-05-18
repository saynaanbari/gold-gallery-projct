"use client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function ProductsPagePagination({
  currentPage,
  totalPages,
}: {
  currentPage: number;
  totalPages: number;
}) {
  const searchParams = useSearchParams();
  const createPageURL = (page: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", page.toString());
    if (!params.get("limit")) params.set("limit", "12");
    return `?${params.toString()}`;
  };

  const generatePages = () => {
    const pages: (number | string)[] = [];
    const delta = 2;
    const rangeStart = Math.max(2, currentPage - delta);
    const rangeEnd = Math.min(totalPages - 1, currentPage + delta);
    pages.push(1);
    if (rangeStart > 2) pages.push("...");
    for (let i = rangeStart; i <= rangeEnd; i++) pages.push(i);
    if (rangeEnd < totalPages - 1) pages.push("...");
    if (totalPages > 1) pages.push(totalPages);

    return pages;
  };
  const pages = generatePages();
  return (
    <div className="flex items-center justify-center gap-2 py-6">
      {currentPage === 1 ? (
        <div className="w-10 h-9 flex items-center justify-center rounded-md opacity-40 cursor-not-allowed">
          <span className="text-xs font-bold text-gray">قبلی</span>
        </div>
      ) : (
        <Link
          href={createPageURL(currentPage - 1)}
          className="w-10 h-9 flex items-center justify-center rounded-md hover:bg-gray-100 transition"
        >
          <span className="text-xs font-bold text-gray">قبلی</span>
        </Link>
      )}
      {pages.map((page, index) =>
        page === "..." ? (
          <div
            key={index}
            className="w-10 h-9 flex items-center justify-center text-gray font-bold text-lg"
          >
            ...
          </div>
        ) : (
          <Link
            key={index}
            href={createPageURL(page)}
            className={`w-10 h-9 flex items-center justify-center rounded-md text-sm font-bold transition ${
              page === currentPage
                ? "bg-[#a0af80] hover:bg-light-green text-white"
                : "text-gray border border-light-green hover:bg-gray-100"
            }`}
          >
            {page.toLocaleString("fa-IR")}
          </Link>
        ),
      )}
      {currentPage === totalPages ? (
        <div className="w-10 h-9 flex items-center justify-center rounded-md opacity-40 cursor-not-allowed">
          <span className="text-xs font-bold text-gray">بعدی</span>
        </div>
      ) : (
        <Link
          href={createPageURL(currentPage + 1)}
          className="w-10 h-9 flex items-center justify-center rounded-md hover:bg-gray-100 transition"
        >
          <span className="text-xs font-bold text-gray">بعدی</span>
        </Link>
      )}
    </div>
  );
}
