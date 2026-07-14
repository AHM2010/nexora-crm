import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

export function CustomerAvatar({ name, src, className }: { name: string; src: string; className?: string }) {
  const initials = name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("");
  return (
    <Avatar className={cn(className)}>
      <AvatarImage src={src} alt="" />
      <AvatarFallback aria-hidden="true">{initials}</AvatarFallback>
    </Avatar>
  );
}
