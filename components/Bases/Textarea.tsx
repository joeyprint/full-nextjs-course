import { Field } from "@base-ui/react/field";
import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps, ReactNode } from "react";

import { cn } from "@/lib/utils";

/* Border, background and focus ring live on the wrapper rather than the
   textarea so the box matches TextField's control exactly. */
const textareaVariants = cva(
  "group/textarea flex w-full rounded-lg border text-foreground transition-all has-[textarea:disabled]:pointer-events-none has-[textarea:disabled]:bg-muted has-[textarea:disabled]:text-muted-foreground/50",
  {
    variants: {
      variant: {
        outlined: "border-input bg-card",
        filled: "border-transparent bg-muted focus-within:bg-card",
      },
      size: {
        small: "px-2.5 py-1.25 wongnok-text-xs",
        medium: "px-3.5 py-2 wongnok-text-sm",
        large: "px-4 py-2.5 wongnok-text-base",
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

export type TextareaProps = Omit<ComponentProps<"textarea">, "className"> &
  VariantProps<typeof textareaVariants> & {
    /** Styles the control box — the bordered wrapper around the textarea. */
    className?: string;
    /** Styles the outermost element. Escape hatch for layout (width, margin). */
    rootClassName?: string;
    label?: ReactNode;
    helperText?: ReactNode;
    /** Replaces `helperText` and forces the error styling when present. */
    errorMessage?: ReactNode;
  };

function Textarea({
  className,
  rootClassName,
  variant = "outlined",
  size = "medium",
  error = false,
  label,
  helperText,
  errorMessage,
  rows = 3,
  disabled,
  ...props
}: TextareaProps) {
  const hasError = Boolean(error) || Boolean(errorMessage);

  return (
    <Field.Root
      data-slot="textarea"
      className={cn("flex w-full flex-col gap-1.5", rootClassName)}
      disabled={disabled}
      invalid={hasError || undefined}
    >
      {label ? (
        <Field.Label
          data-slot="textarea-label"
          className="wongnok-text-label font-bold text-foreground data-disabled:text-muted-foreground/50"
        >
          {label}
        </Field.Label>
      ) : null}

      <div
        data-slot="textarea-control"
        className={cn(
          textareaVariants({ variant, size, error: hasError, className }),
        )}
      >
        {/* Base UI has no textarea primitive — `render` swaps Field.Control's
            element, and the render element's props win the merge, so `rows`
            and the caller's attributes belong there rather than on Control. */}
        <Field.Control
          data-slot="textarea-input"
          className="min-w-0 flex-1 resize-y bg-transparent text-inherit outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed"
          disabled={disabled}
          render={<textarea rows={rows} {...props} />}
        />
      </div>

      {errorMessage ? (
        <Field.Error
          match
          data-slot="textarea-error"
          className="wongnok-text-xs text-destructive-strong"
        >
          {errorMessage}
        </Field.Error>
      ) : helperText ? (
        <Field.Description
          data-slot="textarea-helper-text"
          className="wongnok-text-xs text-muted-foreground"
        >
          {helperText}
        </Field.Description>
      ) : null}
    </Field.Root>
  );
}

export default Textarea;
export { Textarea, textareaVariants };
