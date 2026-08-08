import { Search } from "lucide-react";

import { TextField } from "@/components/Bases";

import LibrarySection from "./LibrarySection";

const VARIANTS = ["outlined", "filled"] as const;
const SIZES = ["small", "medium", "large"] as const;

function TextFieldLibrary() {
  return (
    <LibrarySection
      id="text-field"
      title="TextField"
      description="Text input built on @base-ui/react/field + input."
    >
      {VARIANTS.map((variant) => (
        <div key={variant} className="flex flex-col gap-4">
          <h3 className="wongnok-text-h3 text-foreground">
            variant = <span className="text-primary">{variant}</span>
          </h3>

          <div className="overflow-x-auto">
            {/* No colour axis here, so the sizes lay out as one row of cells. */}
            <div className="grid w-max grid-cols-[repeat(3,minmax(0,max-content))] items-start gap-x-8 gap-y-5">
              {SIZES.map((size) => (
                <div
                  key={size}
                  className="w-56"
                  title={`variant=${variant}, size=${size}`}
                >
                  <TextField
                    variant={variant}
                    size={size}
                    label={`size=${size}`}
                    placeholder="Thai basil chicken"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}

      <div className="flex flex-col gap-4">
        <h3 className="wongnok-text-h3 text-foreground">States</h3>
        <div className="flex flex-wrap items-start gap-x-8 gap-y-5">
          <div className="flex w-56 flex-col items-start gap-2">
            <span className="wongnok-text-label text-muted-foreground">
              label only
            </span>
            <TextField label="Name" />
          </div>
          <div className="flex w-56 flex-col items-start gap-2">
            <span className="wongnok-text-label text-muted-foreground">
              defaultValue
            </span>
            <TextField label="Name" defaultValue="John Doe" />
          </div>
          <div className="flex w-56 flex-col items-start gap-2">
            <span className="wongnok-text-label text-muted-foreground">
              placeholder
            </span>
            <TextField label="Name" placeholder="e.g. Mali Wong" />
          </div>
          <div className="flex w-56 flex-col items-start gap-2">
            <span className="wongnok-text-label text-muted-foreground">
              helperText
            </span>
            <TextField
              label="Recipe name"
              helperText="Shown on the recipe card."
            />
          </div>
          <div className="flex w-56 flex-col items-start gap-2">
            <span className="wongnok-text-label text-muted-foreground">
              error
            </span>
            <TextField
              label="Recipe name"
              error
              helperText="Shown on the recipe card."
            />
          </div>
          <div className="flex w-56 flex-col items-start gap-2">
            <span className="wongnok-text-label text-muted-foreground">
              error + errorMessage
            </span>
            <TextField
              label="Recipe name"
              error
              helperText="Shown on the recipe card."
              errorMessage="Give it a name of at least 3 characters."
            />
          </div>
          <div className="flex w-56 flex-col items-start gap-2">
            <span className="wongnok-text-label text-muted-foreground">
              disabled
            </span>
            <TextField
              label="Email"
              defaultValue="mali.wong@email.com"
              disabled
              helperText="Managed by your account."
            />
          </div>
          <div className="flex w-56 flex-col items-start gap-2">
            <span className="wongnok-text-label text-muted-foreground">
              startAdornment
            </span>
            <TextField
              label="Search"
              placeholder="Search recipes"
              startAdornment={<Search aria-hidden />}
            />
          </div>
          <div className="flex w-56 flex-col items-start gap-2">
            <span className="wongnok-text-label text-muted-foreground">
              endAdornment
            </span>
            <TextField
              label="Price"
              defaultValue="120"
              endAdornment={<span className="wongnok-text-xs">THB</span>}
            />
          </div>
          <div className="flex w-56 flex-col items-start gap-2">
            <span className="wongnok-text-label text-muted-foreground">
              type=number
            </span>
            <TextField type="number" label="price" />
          </div>
          <div className="flex w-56 flex-col items-start gap-2">
            <span className="wongnok-text-label text-muted-foreground">
              type=number + min/step
            </span>
            <TextField
              type="number"
              label="Cooking time"
              defaultValue={45}
              min={1}
              step={5}
              endAdornment={<span className="wongnok-text-xs">min</span>}
              helperText="At least 1 minute."
            />
          </div>
          <div className="flex w-56 flex-col items-start gap-2">
            <span className="wongnok-text-label text-muted-foreground">
              filled + error
            </span>
            <TextField
              variant="filled"
              label="Cooking time"
              type="number"
              defaultValue={0}
              errorMessage="Give it at least 1 minute."
            />
          </div>
        </div>
      </div>
    </LibrarySection>
  );
}

export default TextFieldLibrary;
export { TextFieldLibrary };
