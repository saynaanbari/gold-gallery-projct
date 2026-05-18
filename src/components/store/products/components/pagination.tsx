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

  const createPageURL = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", page.toString());
    if (!params.get("limit")) {
      params.set("limit", "9");
    }
    return `?${params.toString()}`;
  };

  return (
    <div className="flex gap-3 md:gap-5 items-center">
      <Link
        className="bg-olive-green text-white font-bold px-3 py-2 rounded-md text-xs"
        href={createPageURL(1)}
      >
        اولین صفحه
      </Link>

      {currentPage === 1 ? (
        <span className="bg-olive-green text-white font-bold px-3 py-2 rounded-md text-xs opacity-70">
          قبلی
        </span>
      ) : (
        <Link
          className="bg-olive-green text-white font-bold px-3 py-2 rounded-md text-xs"
          href={createPageURL(currentPage - 1)}
        >
          قبلی
        </Link>
      )}

      <div className="w-25 text-center font-bold text-sm">
        صفحه {currentPage.toLocaleString("fa-IR")} از{" "}
        {totalPages.toLocaleString("fa-IR")}
      </div>

      {currentPage === totalPages ? (
        <span className="bg-olive-green text-white font-bold px-3 py-2 rounded-md text-xs opacity-70">
          بعدی
        </span>
      ) : (
        <Link
          className="bg-olive-green text-white font-bold px-3 py-2 rounded-md text-xs"
          href={createPageURL(currentPage + 1)}
        >
          بعدی
        </Link>
      )}

      <Link
        className="bg-olive-green text-white font-bold px-3 py-2 rounded-md text-xs"
        href={createPageURL(totalPages)}
      >
        آخرین صفحه
      </Link>
    </div>
  );
}
