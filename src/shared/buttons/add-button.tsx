import Image, { StaticImageData } from "next/image";
export default function AddButton({
  className,
  img,
  title,
}: {
  className: string;
  img: StaticImageData;
  title: string;
}) {
  return (
    <button className="flex items-center gap-2 bg-[#a9bd86] px-3 py-2 rounded-lg">
      <Image src={img} alt={""} width={20} height={20} />
      <div className={className}>{title}</div>
    </button>
  );
}
