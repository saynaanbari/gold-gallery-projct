import Image from "next/image";
import rightStar from "@/assets/svg/right-star-cream.svg";
import leftStar from "@/assets/svg/left-star-cream.svg";
import star from "@/assets/svg/star.svg";
import necklace from "@/assets/images/neck.webp";
import bracelet from "@/assets/images/bracelet.webp";
import ring from "@/assets/images/ring.webp";
import set from "@/assets/images/set.webp";
import instagram from "@/assets/svg/instagram2.svg";

export default function InstagramFollow() {
  return (
    <div className="mb-25">
      <div className="flex items-center md:gap-5 justify-center mb-10 ">
        <Image src={rightStar} alt={""} width={120} height={10} />
        <h2 className="font-bold">از اینستاگرام ما دیدن کنید</h2>
        <Image src={leftStar} alt={""} width={120} height={10} />
      </div>
      <div className="w-full grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-5 justify-items-center">
        <div className="w-57 h-68 border border-light-cream shadow shadow-light-cream flex flex-col items-center justify-center gap-5 hover:rounded-lg hover:-translate-y-2 duration-500 ease-in-out overflow-hidden">
          <div className="flex items-center gap-1">
            <Image src={star} alt={""} width={25} height={25} />
            <div className="font-bold text-xl">مارا دنبال کنید</div>
          </div>
          <div className="font-bold">mahgold-gallery@</div>
          <Image src={instagram} alt={""} width={50} height={50} />
        </div>
        <div className="relative w-57 h-68 shadow shadow-light-cream hover:rounded-lg hover:-translate-y-2 duration-500 ease-in-out overflow-hidden">
          <Image src={necklace} alt={""} fill className="object-cover" />
        </div>
        <div className="relative w-57 h-68 shadow shadow-light-cream hover:rounded-lg hover:-translate-y-2 duration-500 ease-in-out overflow-hidden">
          <Image src={bracelet} alt={""} fill className="object-cover" />
        </div>
        <div className="relative w-57 h-68 shadow shadow-light-cream hover:rounded-lg hover:-translate-y-2 duration-500 ease-in-out overflow-hidden">
          <Image src={ring} alt={""} fill className="object-cover" />
        </div>
        <div className="relative w-57 h-68 shadow shadow-light-cream hover:rounded-lg hover:-translate-y-2 duration-500 ease-in-out overflow-hidden">
          <Image src={set} alt={""} fill className="object-cover" />
        </div>
      </div>
    </div>
  );
}
