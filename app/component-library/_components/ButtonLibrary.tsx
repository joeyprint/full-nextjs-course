import { Fragment } from "react";

import { Button } from "@/components/Bases";

import LibrarySection from "./LibrarySection";

const VARIANTS = ["contained", "outlined"] as const;
const COLORS = ["primary", "accent", "error", "gray"] as const;
const SIZES = ["small", "medium", "large"] as const;

function ButtonLibrary() {
  return (
    <LibrarySection
      id="button"
      title="Button"
      description="Action trigger built on @base-ui/react/button."
    >
      {VARIANTS.map((variant) => (
        <div key={variant} className="flex flex-col gap-4">
          <h3 className="wongnok-text-h3 text-foreground">
            variant = <span className="text-primary">{variant}</span>
          </h3>

          <div className="overflow-x-auto">
            {/* One column for the row labels, then one per size. */}
            <div className="grid w-max grid-cols-[auto_repeat(3,minmax(0,max-content))] items-center gap-x-8 gap-y-5">
              <div aria-hidden />
              {SIZES.map((size) => (
                <div
                  key={size}
                  className="wongnok-text-label text-muted-foreground"
                >
                  size={size}
                </div>
              ))}

              {COLORS.map((color) => (
                <Fragment key={color}>
                  <div className="wongnok-text-label text-muted-foreground">
                    color={color}
                  </div>
                  {SIZES.map((size) => (
                    <div
                      key={size}
                      className="flex items-center"
                      title={`variant=${variant}, color=${color}, size=${size}`}
                    >
                      <Button variant={variant} color={color} size={size}>
                        Button
                      </Button>
                    </div>
                  ))}
                </Fragment>
              ))}
            </div>
          </div>
        </div>
      ))}

      <div className="flex flex-col gap-4">
        <h3 className="wongnok-text-h3 text-foreground">States</h3>
        <div className="flex flex-wrap items-start gap-x-8 gap-y-5">
          <div className="flex flex-col items-start gap-2">
            <span className="wongnok-text-label text-muted-foreground">
              loading
            </span>
            <Button loading>Button</Button>
          </div>
          <div className="flex flex-col items-start gap-2">
            <span className="wongnok-text-label text-muted-foreground">
              disabled
            </span>
            <Button disabled>Button</Button>
          </div>
          <div className="flex flex-col items-start gap-2">
            <span className="wongnok-text-label text-muted-foreground">
              outlined + disabled
            </span>
            <Button variant="outlined" disabled>
              Button
            </Button>
          </div>
        </div>
      </div>
    </LibrarySection>
  );
}

export default ButtonLibrary;
export { ButtonLibrary };
