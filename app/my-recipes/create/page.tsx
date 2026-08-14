"use client";

import { Button, Container } from "@/components/Bases";
import {
  RecipeCreationDishFormFields,
  RecipeCreationEffortFormFields,
  RecipeCreationHowFormFields,
  RecipeCreationIngredientFormFields,
} from "./_components";
import { FormProvider, useForm } from "react-hook-form";

interface RecipeCreationFormValues {
  name: string;
  description: string;
  imageUrl?: string;
  level: string;
  time: string;
  ingredient: { value: string }[];
  howToMakes: { value: string }[];
}

const defaultRecipeCreationValue: RecipeCreationFormValues = {
  time: "JUST_MINUTES",
  ingredient: [{}],
  howToMakes: [{}],
} as RecipeCreationFormValues;

const RecipeCreationPage = () => {
  const formContext = useForm<RecipeCreationFormValues>({
    defaultValues: { ...defaultRecipeCreationValue },
    mode: "onTouched",
  });

  const handleSubmit = (formValues: RecipeCreationFormValues) => {
    console.log("FORM_VALUES:", formValues);
  };

  return (
    <div className="pt-12 pb-24">
      <FormProvider {...formContext}>
        <form noValidate onSubmit={formContext.handleSubmit(handleSubmit)}>
          <Container>
            <p className="wongnok-text-h2">Create Recipe</p>
          </Container>
          <RecipeCreationDishFormFields />
          <RecipeCreationEffortFormFields />
          <RecipeCreationIngredientFormFields />
          <RecipeCreationHowFormFields />
          <Container className="mt-6">
            <div className="flex justify-end gap-4">
              <Button
                type={"button"}
                variant={"outlined"}
                size={"large"}
                color={"gray"}
              >
                Cancel
              </Button>
              <Button type={"submit"} size={"large"}>
                Create Recipe
              </Button>
            </div>
          </Container>
        </form>
      </FormProvider>
    </div>
  );
};

export default RecipeCreationPage;
