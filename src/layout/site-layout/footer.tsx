"use client";
import Image from "next/image";
import trust from "@/assets/images/trustsymb2.png";
import telegram from "@/assets/svg/telegram.svg";
import instagram from "@/assets/svg/instageram.svg";
import { usePathname } from "next/navigation";

export default function Footer() {
 const pathname = usePathname();
 const hideFooter = [
   "/cart",
   "/checkout",
   "/payment",
   "/auth",
   "/payment/success",
 ];
 if (hideFooter.includes(pathname)) {
   return null;
 }
  return (
    <footer className="w-full bg-light-green px-15 pt-10 flex flex-col gap-10 relative">
      <div className="flex flex-col gap-10 justify-center lg:flex-row lg:justify-around lg:items-start ">
        <div className="flex flex-col gap-4 lg:w-100 items-center lg:items-start">
          <div className="font-black ">گالری طلا مه گلد</div>
          <div className="text-sm lg:leading-relaxed text-center lg:text-start">
            مه گلد؛ ارائه‌دهنده انواع طلا و جواهر اصل با بالاترین کیفیت و
            طراحی‌های منحصربه‌فرد. خرید آنلاین گردنبند، دستبند، انگشتر،
            سرویس‌های عروس و طلای مردانه با بهترین قیمت روز بازار. ضمانت اصالت
            کالا، فاکتور رسمی و ارسال سریع به سراسر کشور.
          </div>
        </div>
        <div className="grid grid-cols-2 gap-10 md:grid-cols-4">
          <ul className="text-center text-sm cursor-pointer flex flex-col md:gap-4 lg:text-start">
            <li className="font-black">پشتیبانی مه گلد</li>
            <li>نحوه سفارش و پرداخت</li>
            <li>شرایط استفاده</li>
            <li>سوالات متداول</li>
            <li>ضمانت بازگشت کالا</li>
            <li>حریم خصوصی</li>
          </ul>
          <ul className="text-center text-sm  cursor-pointer flex flex-col md:gap-3 lg:text-start">
            <li className="font-black ">میانبرهای کاربردی</li>
            <li>خرید اینترنتی طلا</li>
            <li>استعلام قیمت روز طلا</li>
            <li>فروش طلای دست دوم</li>
            <li>گارانتی و عوداشت کالا</li>
            <li>مشاوره خرید آنلاین</li>
            <li>پیگیری سفارش‌ها</li>
          </ul>
          <ul className=" w-fit cursor-pointer flex flex-col items-center lg:items-start gap-2">
            <li className="font-black text-sm">ارتباط با ما</li>
            <li className="relative w-8 h-8">
              <Image src={telegram} alt="" fill className="object-cover" />
            </li>
            {/* <li className="relative w-9 h-9">
              <Image src={whatsapp} alt="" fill className="object-cover" />
            </li> */}
            <li className="relative w-8 h-8">
              <Image src={instagram} alt="" fill className="object-cover" />
            </li>
          </ul>
          <div className="relative w-27.25 h-31.75 bg-light rounded-3xl p-3">
            <Image src={trust} alt="" fill className="object-contain" />
          </div>
        </div>
      </div>
      <div>
        <div className="w-full h-0.5 bg-black"></div>
        <div className="text-center  font-black text-sm py-5">
          تمام حقوق متعلق به مه گلد است.
        </div>
      </div>
    </footer>
  );
}
