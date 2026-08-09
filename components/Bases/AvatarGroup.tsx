import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

import Avatar, { avatarVariants, type AvatarProps } from "./Avatar";

const avatarGroupVariants = cva(
  "flex items-center [&>*]:ring-2 [&>*]:ring-background",
  {
    variants: {
      spacing: {
        small: "",
        medium: "",
      },
      size: {
        small: "",
        medium: "",
        large: "",
      },
    },
    defaultVariants: {
      spacing: "medium",
      size: "medium",
    },
    compoundVariants: [
      { size: "small", spacing: "small", className: "-space-x-1.5" },
      { size: "small", spacing: "medium", className: "-space-x-0.5" },
      { size: "medium", spacing: "small", className: "-space-x-2.5" },
      { size: "medium", spacing: "medium", className: "-space-x-1" },
      { size: "large", spacing: "small", className: "-space-x-3.5" },
      { size: "large", spacing: "medium", className: "-space-x-1.5" },
    ],
  },
);

export type AvatarGroupItem = Pick<AvatarProps, "name" | "imageUrl">;

export type AvatarGroupProps = React.ComponentProps<"div"> &
  VariantProps<typeof avatarGroupVariants> & {
    avatars: AvatarGroupItem[];
    max?: number;
    total?: number;
    variant?: AvatarProps["variant"];
  };

function AvatarGroup({
  className,
  spacing = "medium",
  avatars,
  max,
  total,
  size = "medium",
  variant = "circular",
  ...props
}: AvatarGroupProps) {
  const visible = avatars.slice(0, Math.max(0, max ?? avatars.length));
  const overflow = Math.max(0, (total ?? avatars.length) - visible.length);

  return (
    <div
      data-slot="avatar-group"
      className={cn(avatarGroupVariants({ spacing, size, className }))}
      {...props}
    >
      {visible.map((avatar, index) => (
        <Avatar
          key={`${avatar.name}-${index}`}
          variant={variant}
          size={size}
          {...avatar}
        />
      ))}

      {overflow > 0 ? (
        <span
          data-slot="avatar-group-overflow"
          className={cn(
            avatarVariants({ variant, size }),
            "bg-secondary font-bold text-secondary-foreground",
          )}
        >
          +{overflow}
        </span>
      ) : null}
    </div>
  );
}

export default AvatarGroup;
export { AvatarGroup, avatarGroupVariants };
