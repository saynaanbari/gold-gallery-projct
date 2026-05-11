import Image, { StaticImageData } from "next/image";
import Link from "next/link";

export default function CtaButton({
  href,
  title,
  className,
  img
}: {
  href: string;
  title: string;
  className : string;
  img : StaticImageData
}) {
  return (
    <button className={className}>
      <Link
        href={href}
      >
        {title}
      </Link>
      <Image src={img} alt={""} width={20} height={20}/>
    </button>
  );
}
