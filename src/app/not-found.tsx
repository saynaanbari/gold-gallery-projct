import notFoundImg from "@/assets/images/img-404.webp";
import Image from "next/image";
import Link from "next/link";
export default function NotFoundPage() {
  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center">
      <div className="w-100 h-55 relative">
        <Image src={notFoundImg} alt={""} fill className="object-cover" />
      </div>
      <div className="flex flex-col items-center gap-2">
        <p className="font-bold text-xl md:text-2xl">
          صفحه‌ای که به دنبال آن هستید وجود ندارد!
        </p>
        <p className="text-gray-600 font-bold text-sm">
          لطفاً آدرس را بررسی کنید یا به صفحه اصلی بازگردید
        </p>
      </div>
      <Link
        href="/"
        className="mt-10 bg-light-green text-white px-5 py-3  font-bold text-sm  bg-linear-to-b from-light-green to-[#8a9e6e] rounded-lg transition-all duration-30 hover:from-[#8a9e6e] hover:to-[#6b7f4e] hover:shadow-md"
      >
        بازگشت به صفحه اصلی
      </Link>
    </div>
  );
}
