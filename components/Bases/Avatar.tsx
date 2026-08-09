import { Avatar as AvatarPrimitive } from "@base-ui/react/avatar";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const avatarVariants = cva(
  "group/avatar relative inline-flex shrink-0 items-center justify-center overflow-hidden select-none",
  {
    variants: {
      variant: {
        circular: "rounded-full",
      },
      size: {
        small: "size-6 wongnok-text-label",
        medium: "size-10 wongnok-text-sm",
        large: "size-14 wongnok-text-base",
      },
    },
    defaultVariants: {
      variant: "circular",
      size: "medium",
    },
  },
);

const FALLBACK_TONES = [
  "bg-primary-subtle text-primary",
  "bg-accent-subtle text-accent-strong",
  "bg-success-subtle text-success",
  "bg-secondary text-secondary-foreground",
] as const;

function getInitials(name: string) {
  const words = name.trim().split(/\s+/).filter(Boolean);
  if (words.length === 0) return "?";

  const first = words[0];
  const last = words[words.length - 1];
  return `${first[0]}${words.length > 1 ? last[0] : ""}`.toUpperCase();
}

function getFallbackTone(name: string) {
  let hash = 0;
  for (let i = 0; i < name.length; i += 1) {
    hash += name.charCodeAt(i);
  }
  return FALLBACK_TONES[hash % FALLBACK_TONES.length];
}

export type AvatarProps = Omit<AvatarPrimitive.Root.Props, "children"> &
  VariantProps<typeof avatarVariants> & {
    name: string;
    imageUrl?: string;
  };

function Avatar({
  className,
  variant = "circular",
  size = "medium",
  name,
  imageUrl,
  ...props
}: AvatarProps) {
  return (
    <AvatarPrimitive.Root
      data-slot="avatar"
      className={cn(avatarVariants({ variant, size, className }))}
      {...props}
    >
      {imageUrl ? (
        <AvatarPrimitive.Image
          data-slot="avatar-image"
          src={imageUrl}
          alt={name}
          className="size-full object-cover"
        />
      ) : null}
      <AvatarPrimitive.Fallback
        data-slot="avatar-fallback"
        className={cn(
          "flex size-full items-center justify-center font-bold",
          getFallbackTone(name),
        )}
      >
        {getInitials(name)}
      </AvatarPrimitive.Fallback>
    </AvatarPrimitive.Root>
  );
}

export default Avatar;
export { Avatar, avatarVariants };
