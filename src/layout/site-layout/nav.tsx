import Link from "next/link";
export default function Nav() {
  return (
    <div className="hidden lg:flex justify-center py-3.5 bg-light-green shadow relative">
      <ul className="flex flex-row gap-6 font-bold text-sm">
        <li className="group">
          <Link
            href="/"
            className="relative pb-0.5 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-current after:transition-all after:duration-300 after:ease-in-out group-hover:after:w-full"
          >
            خانه
          </Link>
        </li>

        <li className="group">
          <Link
            href="/products"
            className="relative pb-0.5 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-current after:transition-all after:duration-300 after:ease-in-out group-hover:after:w-full"
          >
            فروشگاه
          </Link>
        </li>
        <li className="group">
          <Link
            href=""
            className="relative pb-0.5 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-current after:transition-all after:duration-300 after:ease-in-out group-hover:after:w-full"
          >
            نرخ لحظه ای طلا
          </Link>
        </li>

        <li className="group">
          <Link
            href="/about-us"
            className="relative pb-0.5 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-current after:transition-all after:duration-300 after:ease-in-out group-hover:after:w-full"
          >
            درباره ما
          </Link>
        </li>

        <li className="group">
          <Link
            href="/contact-us"
            className="relative pb-0.5 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-current after:transition-all after:duration-300 after:ease-in-out group-hover:after:w-full"
          >
            ارتباط با ما
          </Link>
        </li>
      </ul>
    </div>
  );
}