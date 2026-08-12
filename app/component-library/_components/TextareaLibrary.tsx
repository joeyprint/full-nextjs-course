"use client";

import { type ReactNode, useState } from "react";

import { Textarea } from "@/components/Bases";

import LibrarySection from "./LibrarySection";

const VARIANTS = ["outlined", "filled"] as const;
const SIZES = ["small", "medium", "large"] as const;

const SAMPLE =
  "A weeknight stir-fry my mother makes with whatever basil is left.";

/** One labelled cell in the States grid. */
function State({
  name,
  children,
}: {
  name: string;
  children: ReactNode;
}) {
  return (
    <div className="flex w-64 flex-col items-start gap-2">
      <span className="wongnok-text-label text-muted-foreground">{name}</span>
      {children}
    </div>
  );
}

/* Lives here rather than in the grid below so the state hook stays out of the
   map — proves `value` / `onChange` reach the underlying <textarea>. */
function ControlledTextarea() {
  const [value, setValue] = useState(SAMPLE);

  return (
    <Textarea
      label="Description"
      value={value}
      onChange={(event) => setValue(event.target.value)}
      maxLength={300}
      helperText={`${value.length} / 300`}
    />
  );
}

function TextareaLibrary() {
  return (
    <LibrarySection
      id="textarea"
      title="Textarea"
      description="Multi-line text input built on @base-ui/react/field. Three rows by default; `rows` adjusts the resting height."
    >
      {VARIANTS.map((variant) => (
        <div key={variant} className="flex flex-col gap-4">
          <h3 className="wongnok-text-h3 text-foreground">
            variant = <span className="text-primary">{variant}</span>
          </h3>

          <div className="overflow-x-auto">
            <div className="grid w-max grid-cols-[repeat(3,minmax(0,max-content))] items-start gap-x-8 gap-y-5">
              {SIZES.map((size) => (
                <div
                  key={size}
                  className="w-64"
                  title={`variant=${variant}, size=${size}`}
                >
                  <Textarea
                    variant={variant}
                    size={size}
                    label={`size=${size}`}
                    placeholder="Thai basil chicken, start to finish"
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
          <State name="label only">
            <Textarea label="Description" />
          </State>
          <State name="defaultValue">
            <Textarea label="Description" defaultValue={SAMPLE} />
          </State>
          <State name="placeholder">
            <Textarea
              label="Description"
              placeholder="Tell cooks what makes this dish yours"
            />
          </State>
          <State name="helperText">
            <Textarea
              label="Description"
              helperText="Shown under the title on the recipe page."
            />
          </State>
          <State name="error">
            <Textarea
              label="Description"
              error
              helperText="Shown under the title on the recipe page."
            />
          </State>
          <State name="error + errorMessage">
            <Textarea
              label="Description"
              error
              helperText="Shown under the title on the recipe page."
              errorMessage="Write at least 20 characters."
            />
          </State>
          <State name="errorMessage alone">
            <Textarea
              label="Description"
              errorMessage="Write at least 20 characters."
            />
          </State>
          <State name="disabled">
            <Textarea
              label="Description"
              defaultValue={SAMPLE}
              disabled
              helperText="Locked while the recipe is under review."
            />
          </State>
          <State name="rows=5">
            <Textarea label="Description" rows={5} defaultValue={SAMPLE} />
          </State>
          <State name="rows=8 + maxLength">
            <Textarea
              label="Method"
              rows={8}
              maxLength={600}
              placeholder="One step per line"
              helperText="600 characters max."
            />
          </State>
          <State name="filled + error">
            <Textarea
              variant="filled"
              label="Description"
              defaultValue="Too short."
              errorMessage="Write at least 20 characters."
            />
          </State>
          <State name="controlled value + onChange">
            <ControlledTextarea />
          </State>
        </div>
      </div>
    </LibrarySection>
  );
}

export default TextareaLibrary;
export { TextareaLibrary };
