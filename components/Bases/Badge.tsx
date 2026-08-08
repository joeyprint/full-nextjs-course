import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "group/badge inline-flex shrink-0 items-center justify-center gap-1 rounded-full border border-transparent whitespace-nowrap transition-colors",
  {
    variants: {
      variant: {
        contained: "",
        outlined: "bg-transparent",
      },
      color: {
        primary: "",
        accent: "",
        success: "",
        error: "",
        gray: "",
      },
      size: {
        medium: "px-2.5 py-0.75 wongnok-text-label font-bold",
        large: "px-3 py-1.5 wongnok-text-xs font-bold",
      },
    },
    defaultVariants: {
      variant: "contained",
      color: "primary",
      size: "medium",
    },
    compoundVariants: [
      {
        variant: "contained",
        color: "primary",
        className: "bg-primary-subtle text-primary",
      },
      {
        variant: "contained",
        color: "accent",
        className: "bg-accent-subtle text-accent-strong",
      },
      {
        variant: "contained",
        color: "success",
        className: "bg-success-subtle text-success",
      },
      {
        variant: "contained",
        color: "error",
        className: "bg-destructive-subtle text-destructive-strong",
      },
      {
        variant: "contained",
        color: "gray",
        className: "bg-secondary text-secondary-foreground",
      },
      {
        variant: "outlined",
        color: "primary",
        className: "border-primary text-primary",
      },
      {
        variant: "outlined",
        color: "accent",
        className: "border-accent text-accent-strong",
      },
      {
        variant: "outlined",
        color: "success",
        className: "border-success text-success",
      },
      {
        variant: "outlined",
        color: "error",
        className: "border-destructive-strong text-destructive-strong",
      },
      {
        variant: "outlined",
        color: "gray",
        className: "border-border text-muted-foreground",
      },
    ],
  },
);

export type BadgeProps = React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants>;

function Badge({
  className,
  variant = "contained",
  color = "primary",
  size = "medium",
  ...props
}: BadgeProps) {
  return (
    <span
      data-slot="badge"
      className={cn(badgeVariants({ variant, size, color, className }))}
      {...props}
    />
  );
}

export default Badge;
export { Badge, badgeVariants };
