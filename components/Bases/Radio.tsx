"use client";

import { Radio as RadioPrimitive } from "@base-ui/react/radio";
import { RadioGroup as RadioGroupPrimitive } from "@base-ui/react/radio-group";
import { cva, type VariantProps } from "class-variance-authority";
import { createContext, type ReactNode, useContext } from "react";

import { cn } from "@/lib/utils";

type RadioVariant = "default" | "outlined";
type RadioSize = "small" | "medium" | "large";

type RadioContextValue = {
  variant?: RadioVariant | null;
  size?: RadioSize | null;
  error?: boolean;
};

const RadioContext = createContext<RadioContextValue | null>(null);

const radioVariants = cva(
  "flex shrink-0 items-center justify-center rounded-full border bg-card transition-all data-disabled:bg-muted",
  {
    variants: {
      size: {
        small: "size-3.5",
        medium: "size-4",
        large: "size-4.5",
      },
      error: {
        false:
          "border-input data-checked:border-primary data-disabled:data-checked:border-input focus-visible:border-primary focus-visible:ring-3 focus-visible:ring-primary/12",
        true: "border-destructive-strong focus-visible:ring-3 focus-visible:ring-destructive-strong/12",
      },
    },
    defaultVariants: {
      size: "medium",
      error: false,
    },
  },
);

const radioWrapperVariants = cva(
  "inline-flex items-center text-foreground transition-all has-[[data-disabled]]:pointer-events-none has-[[data-disabled]]:text-muted-foreground/50",
  {
    variants: {
      variant: {
        default: "self-start",
        outlined: "rounded-lg border bg-card has-[[data-disabled]]:bg-muted",
      },
      size: {
        small: "wongnok-text-xs gap-1.5",
        medium: "wongnok-text-sm gap-2",
        large: "wongnok-text-base gap-2",
      },
      error: { false: "", true: "" },
    },
    compoundVariants: [
      { variant: "outlined", size: "small", className: "px-2.5 py-1.25" },
      { variant: "outlined", size: "medium", className: "px-3.5 py-2" },
      { variant: "outlined", size: "large", className: "px-4 py-2.5" },
      {
        variant: "outlined",
        error: false,
        className:
          "border-input has-[[data-checked]]:border-primary has-[[data-checked]]:bg-primary-subtle has-[[data-disabled][data-checked]]:border-input has-[[data-disabled][data-checked]]:bg-muted",
      },
      {
        variant: "outlined",
        error: true,
        className: "border-destructive-strong",
      },
    ],
    defaultVariants: {
      variant: "default",
      size: "medium",
      error: false,
    },
  },
);

const INDICATOR_SIZE: Record<RadioSize, string> = {
  small: "size-1.5",
  medium: "size-2",
  large: "size-2.5",
};

export type RadioProps = Omit<
  RadioPrimitive.Root.Props<string>,
  "className" | "onChange" | "render"
> &
  Omit<VariantProps<typeof radioVariants>, "size"> & {
    variant?: RadioVariant | null;
    size?: RadioSize | null;
    className?: string;
    rootClassName?: string;
    label?: ReactNode;
    checked?: boolean;
    name?: string;
    onChange?: (value: string) => void;
  };

function Radio({
  className,
  rootClassName,
  variant,
  size,
  error,
  label,
  checked,
  name,
  onChange,
  value,
  disabled,
  ...props
}: RadioProps) {
  const group = useContext(RadioContext);

  /* Own prop wins, then the group's, then the default. */
  const resolvedVariant = variant ?? group?.variant ?? "default";
  const resolvedSize = size ?? group?.size ?? "medium";
  const hasError = Boolean(error ?? group?.error);

  const control = (
    <label
      data-slot="radio"
      onChange={() => onChange?.(value)}
      className={cn(
        radioWrapperVariants({
          variant: resolvedVariant,
          size: resolvedSize,
          error: hasError,
          className: rootClassName,
        }),
      )}
    >
      <RadioPrimitive.Root
        data-slot="radio-control"
        value={value}
        disabled={disabled}
        className={cn(
          radioVariants({ size: resolvedSize, error: hasError, className }),
        )}
        {...props}
      >
        <RadioPrimitive.Indicator
          data-slot="radio-indicator"
          keepMounted
          className={cn(
            "rounded-full bg-primary transition-transform data-disabled:bg-muted-foreground/40 data-unchecked:scale-0",
            INDICATOR_SIZE[resolvedSize],
          )}
        />
      </RadioPrimitive.Root>

      {label ? (
        <span data-slot="radio-label" className="min-w-0">
          {label}
        </span>
      ) : null}
    </label>
  );

  if (group) {
    return control;
  }

  return (
    <RadioGroupPrimitive
      name={name}
      value={checked ? value : null}
      disabled={disabled}
      className="inline-flex"
    >
      {control}
    </RadioGroupPrimitive>
  );
}

export default Radio;
export { Radio, radioVariants, radioWrapperVariants, RadioContext };
export type { RadioContextValue, RadioSize, RadioVariant };
