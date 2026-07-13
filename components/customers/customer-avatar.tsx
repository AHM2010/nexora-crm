import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function CustomerAvatar({ name, src }: { name: string; src: string }) {
  const initials = name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("");
  return (
    <Avatar>
      <AvatarImage src={src} alt="" />
      <AvatarFallback aria-hidden="true">{initials}</AvatarFallback>
    </Avatar>
  );
}
