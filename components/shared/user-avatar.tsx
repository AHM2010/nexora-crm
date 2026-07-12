import { Avatar, AvatarBadge, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

export type UserPresence = "online" | "offline";

export type UserAvatarProps = {
  name: string;
  src?: string;
  alt?: string;
  size?: "default" | "sm" | "lg";
  className?: string;
  presence?: UserPresence;
};

function getInitials(name: string) {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

export function UserAvatar({
  name,
  src,
  alt,
  size = "default",
  className,
  presence,
}: UserAvatarProps) {
  return (
    <Avatar size={size} className={className}>
      {src ? <AvatarImage src={src} alt={alt ?? name} /> : null}
      <AvatarFallback aria-label={name}>{getInitials(name)}</AvatarFallback>
      {presence ? <AvatarBadge aria-label={`${name} is ${presence}`} className={cn(presence === "online" ? "bg-success" : "bg-muted-foreground")} /> : null}
    </Avatar>
  );
}
