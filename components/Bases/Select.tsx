import { Field } from "@base-ui/react/field";
import {
  Select as SelectPrimitive,
  type SelectRootProps,
} from "@base-ui/react/select";
import { cva, type VariantProps } from "class-variance-authority";
import { Check, ChevronDown } from "lucide-react";
import type { ComponentProps, ReactNode } from "react";

import { cn } from "@/lib/utils";

const selectVariants = cva(
  "group/select flex w-full items-center justify-between rounded-lg border text-foreground transition-all data-disabled:pointer-events-none data-disabled:bg-muted data-disabled:text-muted-foreground/50",
  {
    variants: {
      variant: {
        outlined: "border-input bg-card",
        filled: "border-transparent bg-muted data-popup-open:bg-card",
      },
      size: {
        small: "gap-1.5 px-2.5 py-1.25 wongnok-text-xs",
        medium: "gap-2 px-3.5 py-2 wongnok-text-sm",
        large: "gap-2 px-4 py-2.5 wongnok-text-base",
      },
      error: {
        false:
          "focus-visible:border-primary focus-visible:ring-3 focus-visible:ring-primary/12 data-popup-open:border-primary",
        true: "border-destructive-strong focus-visible:ring-3 focus-visible:ring-destructive-strong/12",
      },
    },
    defaultVariants: {
      variant: "outlined",
      size: "medium",
      error: false,
    },
  },
);

type SelectOption = {
  label: ReactNode;
  value: string;
  disabled?: boolean;
};

export type SelectProps = Omit<
  SelectRootProps<string>,
  "items" | "children" | "multiple"
> &
  VariantProps<typeof selectVariants> & {
    options: SelectOption[];
    className?: string;
    rootClassName?: string;
    popupClassName?: string;
    triggerProps?: ComponentProps<"button">;
    label?: ReactNode;
    helperText?: ReactNode;
    errorMessage?: ReactNode;
    placeholder?: ReactNode;
    emptyMessage?: ReactNode;
  };

function Select({
  options,
  className,
  rootClassName,
  popupClassName,
  triggerProps,
  variant = "outlined",
  size = "medium",
  error = false,
  label,
  helperText,
  errorMessage,
  placeholder = "Select an option",
  emptyMessage = "No options",
  disabled,
  ...props
}: SelectProps) {
  const hasError = Boolean(error) || Boolean(errorMessage);

  return (
    <Field.Root
      data-slot="select"
      className={cn("flex w-full flex-col gap-1.5", rootClassName)}
      disabled={disabled}
      invalid={hasError || undefined}
    >
      <SelectPrimitive.Root items={options} disabled={disabled} {...props}>
        {label ? (
          <SelectPrimitive.Label
            data-slot="select-label"
            className="wongnok-text-label font-bold text-foreground data-disabled:text-muted-foreground/50"
          >
            {label}
          </SelectPrimitive.Label>
        ) : null}

        <SelectPrimitive.Trigger
          data-slot="select-trigger"
          className={cn(
            selectVariants({ variant, size, error: hasError, className }),
          )}
          {...triggerProps}
        >
          <SelectPrimitive.Value
            data-slot="select-value"
            placeholder={placeholder}
            className="min-w-0 flex-1 truncate text-left data-placeholder:text-muted-foreground"
          />
          <SelectPrimitive.Icon
            data-slot="select-icon"
            className="flex shrink-0 items-center text-muted-foreground transition-transform group-data-popup-open/select:rotate-180"
          >
            <ChevronDown className="size-4" />
          </SelectPrimitive.Icon>
        </SelectPrimitive.Trigger>

        <SelectPrimitive.Portal>
          <SelectPrimitive.Positioner
            sideOffset={4}
            alignItemWithTrigger={false}
            className="z-50"
          >
            <SelectPrimitive.Popup
              data-slot="select-popup"
              className={cn(
                "max-h-[min(20rem,var(--available-height))] min-w-[var(--anchor-width)] origin-[var(--transform-origin)] overflow-y-auto rounded-lg border border-border bg-card p-1 shadow-md outline-none transition-[opacity,transform,scale] duration-150 data-ending-style:scale-95 data-ending-style:opacity-0 data-starting-style:scale-95 data-starting-style:opacity-0",
                popupClassName,
              )}
            >
              <SelectPrimitive.List>
                {options.length === 0 ? (
                  <div
                    data-slot="select-empty"
                    className="wongnok-text-sm px-2.5 py-1.5 text-muted-foreground"
                  >
                    {emptyMessage}
                  </div>
                ) : (
                  options.map((option) => (
                    <SelectPrimitive.Item
                      key={option.value}
                      data-slot="select-item"
                      value={option.value}
                      disabled={option.disabled}
                      className="wongnok-text-sm relative flex cursor-pointer items-center rounded-md py-1.5 pr-8 pl-2.5 text-foreground outline-none select-none not-data-disabled:data-highlighted:bg-primary-subtle not-data-disabled:data-highlighted:text-primary data-disabled:pointer-events-none data-disabled:text-muted-foreground/50 data-selected:font-bold"
                    >
                      <SelectPrimitive.ItemText className="min-w-0 flex-1 truncate">
                        {option.label}
                      </SelectPrimitive.ItemText>
                      <SelectPrimitive.ItemIndicator className="absolute right-2.5 flex items-center">
                        <Check className="size-4 text-primary" />
                      </SelectPrimitive.ItemIndicator>
                    </SelectPrimitive.Item>
                  ))
                )}
              </SelectPrimitive.List>
            </SelectPrimitive.Popup>
          </SelectPrimitive.Positioner>
        </SelectPrimitive.Portal>
      </SelectPrimitive.Root>

      {errorMessage ? (
        <Field.Error
          match
          data-slot="select-error"
          className="wongnok-text-xs text-destructive-strong"
        >
          {errorMessage}
        </Field.Error>
      ) : helperText ? (
        <Field.Description
          data-slot="select-helper-text"
          className="wongnok-text-xs text-muted-foreground"
        >
          {helperText}
        </Field.Description>
      ) : null}
    </Field.Root>
  );
}

export default Select;
export { Select, selectVariants };
export type { SelectOption };
