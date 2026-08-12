"use client";

import { type ReactNode, useState } from "react";

import { Button, Select, type SelectOption } from "@/components/Bases";

import LibrarySection from "./LibrarySection";

const VARIANTS = ["outlined", "filled"] as const;
const SIZES = ["small", "medium", "large"] as const;

const LEVELS: SelectOption[] = [
  { label: "Easy", value: "EASY" },
  { label: "Medium", value: "MEDIUM" },
  { label: "Hard", value: "HARD" },
];

/** One labelled cell in the States grid. */
function State({ name, children }: { name: string; children: ReactNode }) {
  return (
    <div className="flex w-64 flex-col items-start gap-2">
      <span className="wongnok-text-label text-muted-foreground">{name}</span>
      {children}
    </div>
  );
}

/* Lives here rather than in the grid below so the state hook stays out of the
   map — proves `value` / `onValueChange` drive the trigger's label. */
function ControlledSelect() {
  const [value, setValue] = useState<string | null>("MEDIUM");

  return (
    <Select
      label="Level"
      options={LEVELS}
      value={value}
      onValueChange={setValue}
      helperText={`value = ${value ?? "null"}`}
    />
  );
}

/* A real form — the hidden input Select.Root renders is what carries `name`
   into the submission, so this is the only way to see it work. */
function FormSelect() {
  const [submitted, setSubmitted] = useState<string | null>(null);

  return (
    <form
      className="flex w-full flex-col items-start gap-2"
      onSubmit={(event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        setSubmitted(String(data.get("level")));
      }}
    >
      <Select
        name="level"
        label="Level"
        options={LEVELS}
        required
        helperText="Required — submitting empty is blocked."
      />
      <Button size="small" type="submit">
        Submit
      </Button>
      {submitted ? (
        <span className="wongnok-text-xs text-muted-foreground">
          submitted level = {submitted}
        </span>
      ) : null}
    </form>
  );
}

function SelectLibrary() {
  return (
    <LibrarySection
      id="select"
      title="Select"
      description="Dropdown built on @base-ui/react/select. `options` is required; each option takes a `label`, a `value`, and an optional `disabled`."
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
                  <Select
                    variant={variant}
                    size={size}
                    label={`size=${size}`}
                    options={LEVELS}
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
            <Select label="Level" options={LEVELS} />
          </State>
          <State name="placeholder">
            <Select
              label="Level"
              options={LEVELS}
              placeholder="How hard is it?"
            />
          </State>
          <State name="defaultValue">
            <Select label="Level" options={LEVELS} defaultValue="HARD" />
          </State>
          <State name="helperText">
            <Select
              label="Level"
              options={LEVELS}
              helperText="Shown as a badge on the recipe card."
            />
          </State>
          <State name="error">
            <Select
              label="Level"
              options={LEVELS}
              error
              helperText="Shown as a badge on the recipe card."
            />
          </State>
          <State name="error + errorMessage">
            <Select
              label="Level"
              options={LEVELS}
              error
              helperText="Shown as a badge on the recipe card."
              errorMessage="Pick a level."
            />
          </State>
          <State name="errorMessage alone">
            <Select
              label="Level"
              options={LEVELS}
              errorMessage="Pick a level."
            />
          </State>
          <State name="disabled">
            <Select
              label="Level"
              options={LEVELS}
              defaultValue="EASY"
              disabled
              helperText="Locked while the recipe is under review."
            />
          </State>
          <State name="disabled option">
            <Select
              label="Level"
              options={[
                { label: "Easy", value: "EASY" },
                {
                  label: "Medium (coming soon)",
                  value: "MEDIUM",
                  disabled: true,
                },
                { label: "Hard", value: "HARD" },
              ]}
              helperText="The middle row can be highlighted but not selected."
            />
          </State>
          <State name="options={[]}">
            <Select label="Level" options={[]} />
          </State>
          <State name="emptyMessage">
            <Select
              label="Level"
              options={[]}
              emptyMessage="No levels configured yet."
            />
          </State>
          <State name="long labels (truncate)">
            <Select
              label="Level"
              options={[
                {
                  label:
                    "Easy — under 30 minutes, pantry staples, no special tools",
                  value: "EASY",
                },
                {
                  label:
                    "Hard — multi-day fermentation, a stand mixer and patience",
                  value: "HARD",
                },
              ]}
              defaultValue="HARD"
            />
          </State>
          <State name="many options (scrolls)">
            <Select
              label="Servings"
              options={Array.from({ length: 20 }, (_, index) => ({
                label: `${index + 1} serving${index === 0 ? "" : "s"}`,
                value: String(index + 1),
              }))}
            />
          </State>
          <State name="filled + error">
            <Select
              variant="filled"
              label="Level"
              options={LEVELS}
              errorMessage="Pick a level."
            />
          </State>
          <State name="required in a form">
            <FormSelect />
          </State>
          <State name="controlled value + onValueChange">
            <ControlledSelect />
          </State>
        </div>
      </div>
    </LibrarySection>
  );
}

export default SelectLibrary;
export { SelectLibrary };
