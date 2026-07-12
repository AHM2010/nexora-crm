import Image from "next/image";
import { cn } from "@/lib/utils";

export type BrandMarkProps = {
  className?: string;
  inverted?: boolean;
  priority?: boolean;
};

export function BrandMark({
  className,
  inverted = false,
  priority = false,
}: BrandMarkProps) {
  const lightLogo = inverted
    ? "/logos/nexora-mini-logo-dark.png"
    : "/logos/nexora-mini-logo-ligth.png";
  const darkLogo = inverted
    ? "/logos/nexora-mini-logo-ligth.png"
    : "/logos/nexora-mini-logo-dark.png";

  return (
    <span
      className={cn(
        "relative block shrink-0 overflow-hidden rounded-lg",
        className,
      )}
    >
      <Image
        src={lightLogo}
        alt="Nexora"
        fill
        priority={priority}
        sizes="320px"
        className="scale-[3.2] object-cover dark:hidden"
      />
      <Image
        src={darkLogo}
        alt="Nexora"
        fill
        priority={priority}
        sizes="320px"
        className="hidden scale-[3.2] object-cover dark:block"
      />
    </span>
  );
}
