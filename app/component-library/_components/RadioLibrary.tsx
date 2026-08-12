"use client";

import { type ReactNode, useState } from "react";

import { Button, Radio, RadioGroup } from "@/components/Bases";

import LibrarySection from "./LibrarySection";

const VARIANTS = ["default", "outlined"] as const;
const SIZES = ["small", "medium", "large"] as const;

const TIMES = [
  { label: "5 – 10 mins", value: "5-10" },
  { label: "10 – 30 mins", value: "10-30" },
  { label: "More than 1 hour", value: "60+" },
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
   map — proves `value` / `onChange` drive which radio reads as selected. */
function ControlledRadioGroup() {
  const [value, setValue] = useState("10-30");

  return (
    <RadioGroup
      label="Time to make"
      value={value}
      onChange={setValue}
      helperText={`value = ${value}`}
    >
      {TIMES.map((time) => (
        <Radio key={time.value} value={time.value} label={time.label} />
      ))}
    </RadioGroup>
  );
}

/* A standalone Radio — no RadioGroup ancestor, so `checked` and its own
   `onChange` are what drive it. */
function StandaloneRadio() {
  const [checked, setChecked] = useState(false);

  return (
    <div className="flex flex-col items-start gap-2">
      <Radio
        variant="outlined"
        name="standalone"
        value="agree"
        label="I wrote this recipe myself"
        checked={checked}
        onChange={() => setChecked(true)}
      />
      <Button
        size="small"
        variant="outlined"
        color="gray"
        onClick={() => setChecked(false)}
      >
        Reset (checked = {String(checked)})
      </Button>
    </div>
  );
}

/* A real form — the hidden input each Radio renders is what carries the group's
   `name` into the submission, so this is the only way to see it work. */
function FormRadioGroup() {
  const [submitted, setSubmitted] = useState<string | null>(null);

  return (
    <form
      className="flex w-full flex-col items-start gap-2"
      onSubmit={(event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        setSubmitted(String(data.get("time")));
      }}
    >
      <RadioGroup
        name="time"
        label="Time to make"
        required
        helperText="Required — submitting empty is blocked."
      >
        {TIMES.map((time) => (
          <Radio key={time.value} value={time.value} label={time.label} />
        ))}
      </RadioGroup>
      <Button size="small" type="submit">
        Submit
      </Button>
      {submitted ? (
        <span className="wongnok-text-xs text-muted-foreground">
          submitted time = {submitted}
        </span>
      ) : null}
    </form>
  );
}

function RadioLibrary() {
  return (
    <LibrarySection
      id="radio"
      title="Radio"
      description="Radio buttons built on @base-ui/react/radio. `variant` and `size` set on RadioGroup cascade to every Radio inside; a Radio's own props still win. A Radio used outside a group falls back to its own `checked` / `name`."
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
                  <RadioGroup
                    variant={variant}
                    size={size}
                    label={`size=${size}`}
                    defaultValue="10-30"
                  >
                    {TIMES.map((time) => (
                      <Radio
                        key={time.value}
                        value={time.value}
                        label={time.label}
                      />
                    ))}
                  </RadioGroup>
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
            <RadioGroup label="Time to make">
              {TIMES.map((time) => (
                <Radio key={time.value} value={time.value} label={time.label} />
              ))}
            </RadioGroup>
          </State>
          <State name="defaultValue">
            <RadioGroup label="Time to make" defaultValue="60+">
              {TIMES.map((time) => (
                <Radio key={time.value} value={time.value} label={time.label} />
              ))}
            </RadioGroup>
          </State>
          <State name="orientation=horizontal">
            <RadioGroup
              label="Time to make"
              orientation="horizontal"
              defaultValue="5-10"
            >
              {TIMES.map((time) => (
                <Radio key={time.value} value={time.value} label={time.label} />
              ))}
            </RadioGroup>
          </State>
          <State name="helperText">
            <RadioGroup
              label="Time to make"
              defaultValue="10-30"
              helperText="Shown as a badge on the recipe card."
            >
              {TIMES.map((time) => (
                <Radio key={time.value} value={time.value} label={time.label} />
              ))}
            </RadioGroup>
          </State>
          <State name="error">
            <RadioGroup
              label="Time to make"
              error
              helperText="Shown as a badge on the recipe card."
            >
              {TIMES.map((time) => (
                <Radio key={time.value} value={time.value} label={time.label} />
              ))}
            </RadioGroup>
          </State>
          <State name="errorMessage alone">
            <RadioGroup label="Time to make" errorMessage="Pick a time.">
              {TIMES.map((time) => (
                <Radio key={time.value} value={time.value} label={time.label} />
              ))}
            </RadioGroup>
          </State>
          <State name="outlined + errorMessage">
            <RadioGroup
              variant="outlined"
              label="Time to make"
              errorMessage="Pick a time."
            >
              {TIMES.map((time) => (
                <Radio key={time.value} value={time.value} label={time.label} />
              ))}
            </RadioGroup>
          </State>
          <State name="disabled group">
            <RadioGroup
              label="Time to make"
              defaultValue="10-30"
              disabled
              helperText="Locked while the recipe is under review."
            >
              {TIMES.map((time) => (
                <Radio key={time.value} value={time.value} label={time.label} />
              ))}
            </RadioGroup>
          </State>
          <State name="disabled group (outlined)">
            <RadioGroup
              variant="outlined"
              label="Time to make"
              defaultValue="10-30"
              disabled
            >
              {TIMES.map((time) => (
                <Radio key={time.value} value={time.value} label={time.label} />
              ))}
            </RadioGroup>
          </State>
          <State name="disabled item">
            <RadioGroup label="Time to make" defaultValue="5-10">
              <Radio value="5-10" label="5 – 10 mins" />
              <Radio value="10-30" label="10 – 30 mins (coming soon)" disabled />
              <Radio value="60+" label="More than 1 hour" />
            </RadioGroup>
          </State>
          <State name="per-Radio size override">
            <RadioGroup variant="outlined" size="small" label="Time to make">
              <Radio value="5-10" label="small (from group)" />
              <Radio value="10-30" label="large (own prop)" size="large" />
            </RadioGroup>
          </State>
          <State name="per-Radio onChange">
            <RadioGroup label="Time to make">
              {TIMES.map((time) => (
                <Radio
                  key={time.value}
                  value={time.value}
                  label={time.label}
                  onChange={(value) => console.log("picked", value)}
                />
              ))}
            </RadioGroup>
          </State>
          <State name="long labels (wrap)">
            <RadioGroup variant="outlined" label="Time to make">
              <Radio
                value="quick"
                label="Under 30 minutes — pantry staples, no special tools"
              />
              <Radio
                value="long"
                label="Multi-day fermentation, a stand mixer and a lot of patience"
              />
            </RadioGroup>
          </State>
          <State name="no label prop">
            <RadioGroup orientation="horizontal" defaultValue="5-10">
              {TIMES.map((time) => (
                <Radio key={time.value} value={time.value} />
              ))}
            </RadioGroup>
          </State>
          <State name="standalone Radio (checked)">
            <StandaloneRadio />
          </State>
          <State name="required in a form">
            <FormRadioGroup />
          </State>
          <State name="controlled value + onChange">
            <ControlledRadioGroup />
          </State>
        </div>
      </div>
    </LibrarySection>
  );
}

export default RadioLibrary;
export { RadioLibrary };
