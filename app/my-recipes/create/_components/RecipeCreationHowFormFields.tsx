import { Button, Container, Textarea } from "@/components/Bases";
import { XIcon } from "lucide-react";
import { useFieldArray, useFormContext } from "react-hook-form";

import type { RecipeCreationFormValues } from "../_containers/recipeCreationValidation";

const RecipeCreationHowFormFields = () => {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<RecipeCreationFormValues>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "howToMakes",
  });

  const howToMakeListError =
    errors.howToMakes?.root?.message ?? errors.howToMakes?.message;

  const handleAddNewIngredient = () => {
    append({ value: "" });
  };

  const handleRemoveIngredient = (index: number) => {
    remove(index);
  };

  return (
    <Container className="mt-6">
      <div className="bg-white p-7  rounded-3xl">
        <p className="font-bold">How to Make</p>
        <p className="wongnok-text-body text-muted-foreground">
          {`Write it the way you'd say it out loud. Short steps are easiest to follow.`}
        </p>
        {fields.map((_, index) => (
          <div key={index} className="flex items-start gap-4 mt-6">
            <div className="p-2 w-6 h-6 wongnok-text-xs font-bold bg-primary-subtle text-primary relative rounded-4xl">
              <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                {index + 1}
              </p>
            </div>
            <Textarea
              placeholder={`Step ${index + 1} — what happens, and how you know it's ready.`}
              rootClassName="w-full"
              {...register(`howToMakes.${index}.value`)}
              errorMessage={errors.howToMakes?.[index]?.value?.message}
            />
            <Button
              type={"button"}
              variant={"outlined"}
              color={"error"}
              onClick={() => handleRemoveIngredient(index)}
            >
              <XIcon />
            </Button>
          </div>
        ))}
        {howToMakeListError && (
          <p className="wongnok-text-xs text-destructive-strong mt-6">
            {howToMakeListError}
          </p>
        )}
        <Button className={"mt-4"} onClick={handleAddNewIngredient}>
          Add How to Make
        </Button>
      </div>
    </Container>
  );
};

export default RecipeCreationHowFormFields;
