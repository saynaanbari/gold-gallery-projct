import Link from "next/link";

export default function BreadCrumb({ categoryName }: { categoryName: string }) {
  return (
    <nav className="flex items-center text-sm">
      <ul className="flex items-center gap-2.5">
        <li className="font-bold text-xs text-gray-500">
          <Link href="/" className="hover:text-black transition">
            خانه
          </Link>
        </li>
        <span className="text-gray-300">/</span>
        <li className="font-bold text-xs text-gray-500">
          <Link href="/products" className="hover:text-black transition">
            فروشگاه
          </Link>
        </li>
        <span className="text-gray-300">/</span>
        <li className="font-bold text-xs text-black">
          <Link href={""}>{categoryName}</Link>
        </li>
      </ul>
    </nav>
  );
}