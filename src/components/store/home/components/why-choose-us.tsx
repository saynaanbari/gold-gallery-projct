import Image from "next/image";
import whyChooseUsImg from "@/assets/images/img01-new.webp";

export default function WhyChooseUs() {
  return (
    <div className="w-full flex flex-col lg:flex-row lg:justify- lg:items-center gap-10 items-center mb-25">
      <div className="relative w-91 h-97 md:w-137.5 md:h-145">
        <Image src={whyChooseUsImg} alt={""} fill className="object-cover" />
      </div>
      <div className="w-100 md:w-150 md:text-xl lg:text-[19px] font-medium leading-relaxed">
        <strong className="font-black text-2xl md:text-4xl lg:text-[39px]">
          چرا مه گلد؟
        </strong>
        ما طلا را نه به عنوان یک کالای ساده، بلکه به عنوان خاطره‌ای ماندگار و
        ارزشمند به دست شما می‌رسانیم. هر قطعه از جواهرات ما، با عشق و وسواس در
        طراحی و اجرا ساخته می‌شود تا روایتی واقعی از شخصیت، سلیقه و خاطرات شما
        باشد. با ما بدرخشید. چون اعتقاد داریم هر کسی شایسته بهترین‌هاست.
      </div>
    </div>
  );
}
