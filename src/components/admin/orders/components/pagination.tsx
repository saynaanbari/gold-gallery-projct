"use client";
import Link from "next/link";

export default function OrdersPagination({
  currentPage,
  totalPages,
}: {
  currentPage: number;
  totalPages: number;
}) {
  return (
    <div className="flex gap-3 md:gap-5 items-center">
      <Link
        className="bg-light-orange text-white font-bold px-3 py-2 rounded-md cursor-pointer text-xs"
        href={`?page=${1}`}
      >
        اولین صفحه
      </Link>
      {currentPage === 1 ? (
        <Link
          className="bg-light-orange text-white font-bold px-3 py-2 rounded-md text-xs cursor-not-allowed"
          href={`#`}
        >
          قبلی
        </Link>
      ) : (
        <Link
          className="bg-light-orange text-white font-bold px-3 py-2 rounded-md cursor-pointer text-xs"
          href={`?page=${currentPage - 1}`}
        >
          قبلی
        </Link>
      )}
      <div className="w-30 text-center font-bold text-sm">
        صفحه {currentPage.toLocaleString("FA-IR")} از{" "}
        {totalPages.toLocaleString("FA-IR")}
      </div>

      {currentPage === totalPages ? (
        <Link
          className="bg-light-orange text-white font-bold px-3 py-2 rounded-md text-xs cursor-not-allowed"
          href={`#`}
        >
          بعدی
        </Link>
      ) : (
        <Link
          className="bg-light-orange text-white font-bold px-3 py-2 rounded-md cursor-pointer text-xs"
          href={`?page=${currentPage + 1}`}
        >
          بعدی
        </Link>
      )}
      <Link
        className="bg-light-orange text-white font-bold px-3 py-2 rounded-md cursor-pointer text-xs"
        href={`?page=${totalPages}`}
      >
        آخرین صفحه
      </Link>
    </div>
  );
}
