"use client";

import { Field } from "@base-ui/react/field";
import { RadioGroup as RadioGroupPrimitive } from "@base-ui/react/radio-group";
import { cva, type VariantProps } from "class-variance-authority";
import { type ReactNode, useMemo } from "react";

import { cn } from "@/lib/utils";
import {
  RadioContext,
  type RadioSize,
  type RadioVariant,
} from "@/components/Bases/Radio";

const radioGroupVariants = cva("flex", {
  variants: {
    orientation: {
      vertical: "flex-col gap-2",
      horizontal: "flex-row flex-wrap gap-3",
    },
  },
  defaultVariants: {
    orientation: "vertical",
  },
});

export type RadioGroupProps = Omit<
  RadioGroupPrimitive.Props<string>,
  | "className"
  | "onValueChange"
  | "onChange"
  | "value"
  | "defaultValue"
  | "render"
> &
  VariantProps<typeof radioGroupVariants> & {
    value?: string | null;
    defaultValue?: string;
    onChange?: (value: string) => void;
    variant?: RadioVariant | null;
    size?: RadioSize | null;
    error?: boolean;
    className?: string;
    rootClassName?: string;
    label?: ReactNode;
    helperText?: ReactNode;
    errorMessage?: ReactNode;
    children?: ReactNode;
  };

function RadioGroup({
  className,
  rootClassName,
  variant = "default",
  size = "medium",
  orientation = "vertical",
  error = false,
  label,
  helperText,
  errorMessage,
  onChange,
  disabled,
  children,
  ...props
}: RadioGroupProps) {
  const hasError = Boolean(error) || Boolean(errorMessage);

  const context = useMemo(
    () => ({ variant, size, error: hasError }),
    [variant, size, hasError],
  );

  return (
    <Field.Root
      data-slot="radio-group"
      className={cn("flex w-full flex-col gap-1.5", rootClassName)}
      disabled={disabled}
      invalid={hasError || undefined}
    >
      {label ? (
        <Field.Label
          data-slot="radio-group-label"
          className="wongnok-text-label font-bold text-foreground data-disabled:text-muted-foreground/50"
        >
          {label}
        </Field.Label>
      ) : null}

      <RadioContext.Provider value={context}>
        <RadioGroupPrimitive
          data-slot="radio-group-control"
          className={cn(radioGroupVariants({ orientation, className }))}
          disabled={disabled}
          onValueChange={(next) => {
            if (next != null) {
              onChange?.(next);
            }
          }}
          {...props}
        >
          {children}
        </RadioGroupPrimitive>
      </RadioContext.Provider>

      {errorMessage ? (
        <Field.Error
          match
          data-slot="radio-group-error"
          className="wongnok-text-xs text-destructive-strong"
        >
          {errorMessage}
        </Field.Error>
      ) : helperText ? (
        <Field.Description
          data-slot="radio-group-helper-text"
          className="wongnok-text-xs text-muted-foreground"
        >
          {helperText}
        </Field.Description>
      ) : null}
    </Field.Root>
  );
}

export default RadioGroup;
export { RadioGroup, radioGroupVariants };
