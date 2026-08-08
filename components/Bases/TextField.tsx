import { Field } from "@base-ui/react/field";
import { Input as InputPrimitive } from "@base-ui/react/input";
import { cva, type VariantProps } from "class-variance-authority";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

/* Border, background and focus ring live on the wrapper rather than the input
   so the adornments sit inside the same box as the text. */
const textFieldVariants = cva(
  "group/text-field flex w-full items-center rounded-lg border text-foreground transition-all has-[input:disabled]:pointer-events-none has-[input:disabled]:bg-muted has-[input:disabled]:text-muted-foreground/50",
  {
    variants: {
      variant: {
        outlined: "border-input bg-card",
        filled: "border-transparent bg-muted focus-within:bg-card",
      },
      size: {
        small: "gap-1.5 px-2.5 py-1.25 wongnok-text-xs",
        medium: "gap-2 px-3.5 py-2 wongnok-text-sm",
        large: "gap-2 px-4 py-2.5 wongnok-text-base",
      },
      error: {
        false:
          "focus-within:border-primary focus-within:ring-3 focus-within:ring-primary/12",
        true: "border-destructive-strong focus-within:ring-3 focus-within:ring-destructive-strong/12",
      },
    },
    defaultVariants: {
      variant: "outlined",
      size: "medium",
      error: false,
    },
  },
);

/* `size` is omitted because the native input attribute (a character count)
   collides with the variant axis. */
export type TextFieldProps = Omit<InputPrimitive.Props, "size" | "className"> &
  VariantProps<typeof textFieldVariants> & {
    /** Styles the control box — the bordered wrapper around the input. */
    className?: string;
    /** Styles the outermost element. Escape hatch for layout (width, margin). */
    rootClassName?: string;
    label?: ReactNode;
    helperText?: ReactNode;
    /** Replaces `helperText` and forces the error styling when present. */
    errorMessage?: ReactNode;
    startAdornment?: ReactNode;
    endAdornment?: ReactNode;
  };

function TextField({
  className,
  rootClassName,
  variant = "outlined",
  size = "medium",
  error = false,
  label,
  helperText,
  errorMessage,
  startAdornment,
  endAdornment,
  disabled,
  ...props
}: TextFieldProps) {
  const hasError = Boolean(error) || Boolean(errorMessage);

  return (
    <Field.Root
      data-slot="text-field"
      className={cn("flex w-full flex-col gap-1.5", rootClassName)}
      disabled={disabled}
      invalid={hasError || undefined}
    >
      {label ? (
        <Field.Label
          data-slot="text-field-label"
          className="wongnok-text-label font-bold text-foreground data-disabled:text-muted-foreground/50"
        >
          {label}
        </Field.Label>
      ) : null}

      <div
        data-slot="text-field-control"
        className={cn(
          textFieldVariants({ variant, size, error: hasError, className }),
        )}
      >
        {startAdornment ? (
          <span
            data-slot="text-field-start-adornment"
            className="flex shrink-0 items-center text-muted-foreground [&_svg]:size-4"
          >
            {startAdornment}
          </span>
        ) : null}

        {/* Typography comes from the wrapper — preflight gives inputs
            `font: inherit`, so the size variant reaches the text. */}
        <InputPrimitive
          data-slot="text-field-input"
          className="min-w-0 flex-1 bg-transparent text-inherit outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed"
          disabled={disabled}
          {...props}
        />

        {endAdornment ? (
          <span
            data-slot="text-field-end-adornment"
            className="flex shrink-0 items-center text-muted-foreground [&_svg]:size-4"
          >
            {endAdornment}
          </span>
        ) : null}
      </div>

      {errorMessage ? (
        <Field.Error
          match
          data-slot="text-field-error"
          className="wongnok-text-xs text-destructive-strong"
        >
          {errorMessage}
        </Field.Error>
      ) : helperText ? (
        <Field.Description
          data-slot="text-field-helper-text"
          className="wongnok-text-xs text-muted-foreground"
        >
          {helperText}
        </Field.Description>
      ) : null}
    </Field.Root>
  );
}

export default TextField;
export { TextField, textFieldVariants };
