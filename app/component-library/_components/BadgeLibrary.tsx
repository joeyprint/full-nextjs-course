import { Fragment } from "react";

import { Badge } from "@/components/Bases";

import LibrarySection from "./LibrarySection";

const VARIANTS = ["contained", "outlined"] as const;
const COLORS = ["primary", "accent", "success", "error", "gray"] as const;
const SIZES = ["medium", "large"] as const;

function BadgeLibrary() {
  return (
    <LibrarySection
      id="badge"
      title="Badge"
      description="Static status label. Renders a <span>."
    >
      {VARIANTS.map((variant) => (
        <div key={variant} className="flex flex-col gap-4">
          <h3 className="wongnok-text-h3 text-foreground">
            variant = <span className="text-primary">{variant}</span>
          </h3>

          <div className="overflow-x-auto">
            {/* One column for the row labels, then one per size. */}
            <div className="grid w-max grid-cols-[auto_repeat(2,minmax(0,max-content))] items-center gap-x-8 gap-y-5">
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
                      <Badge variant={variant} color={color} size={size}>
                        Badge
                      </Badge>
                    </div>
                  ))}
                </Fragment>
              ))}
            </div>
          </div>
        </div>
      ))}
    </LibrarySection>
  );
}

export default BadgeLibrary;
export { BadgeLibrary };
