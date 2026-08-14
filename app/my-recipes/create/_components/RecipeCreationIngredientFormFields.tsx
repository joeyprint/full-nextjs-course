import { Button, Container, TextField } from "@/components/Bases";
import { XIcon } from "lucide-react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { Fragment } from "react/jsx-runtime";

const RecipeCreationIngredientFormFields = () => {
  const { register } = useFormContext();
  const { fields, append, remove } = useFieldArray({ name: "ingredient" });

  const handleAddNewIngredient = () => {
    append("");
  };

  const handleRemoveIngredient = (index: number) => {
    remove(index);
  };

  return (
    <Container className="mt-6">
      <div className="bg-white p-7 rounded-3xl">
        <p className="font-bold">Ingredients</p>
        <p className="wongnok-text-body text-muted-foreground">
          {`One per line, with the amount.`}
        </p>
        {fields.map((field, index) => (
          <div key={field.id} className="flex items-center gap-4 mt-6">
            <div className="p-2 w-6 h-6 wongnok-text-xs font-bold bg-primary-subtle text-primary relative rounded-4xl">
              <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                {index + 1}
              </p>
            </div>
            <TextField
              placeholder={"e.g. 2 tbsp fish sauce"}
              rootClassName="w-full"
              {...register(`ingredient.${index}.value`)}
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
        <Button className={"mt-4"} onClick={handleAddNewIngredient}>
          Add Ingredient
        </Button>
      </div>
    </Container>
  );
};

export default RecipeCreationIngredientFormFields;
