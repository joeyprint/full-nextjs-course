import { Container, Radio, RadioGroup, Select } from "@/components/Bases";
import { Controller, useFormContext } from "react-hook-form";

const recipeLevelOptions = [
  { label: "Easy", value: "EASY" },
  { label: "Medium", value: "MEDIUM" },
  { label: "Hard", value: "HARD" },
];

const RecipeCreationEffortFormFields = () => {
  const { control } = useFormContext();

  return (
    <Container className="mt-6">
      <div className="bg-white p-7 rounded-3xl">
        <p className="font-bold">Effort</p>
        <p className="wongnok-text-body text-muted-foreground">
          {`Helps cooks pick something that fits their evening.`}
        </p>
        <div className="flex w-full gap-6 mt-6">
          <div className={"flex-1 shrink-0"}>
            <Controller
              name={"level"}
              control={control}
              render={({ field }) => (
                <Select
                  label={"Menu Level of Recipe"}
                  options={recipeLevelOptions}
                  required
                  placeholder={"Select level of recipe"}
                  {...field}
                  value={field.value}
                  onValueChange={field.onChange}
                />
              )}
            />
          </div>
          <div className={"flex-1 shrink-0"}>
            <Controller
              name="time"
              control={control}
              render={({ field }) => (
                <RadioGroup
                  label={"Time to Make"}
                  orientation={"horizontal"}
                  variant={"outlined"}
                  className={"grid grid-cols-2"}
                  required
                  {...field}
                  value={field.value}
                  onChange={field.onChange}
                >
                  <Radio label={"5 - 10 mins"} value={"JUST_MINUTES"} />
                  <Radio label={"10 - 30 mins"} value={"HALF_HOUR"} />
                  <Radio label={"~1 hour"} value={"ABOUT_HOUR"} />
                  <Radio label={"More than 1 hour"} value={"MORE_THAN_HOUR"} />
                </RadioGroup>
              )}
            />
          </div>
        </div>
      </div>
    </Container>
  );
};

export default RecipeCreationEffortFormFields;
