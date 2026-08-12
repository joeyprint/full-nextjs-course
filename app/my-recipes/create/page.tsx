"use client";

import { Button, Container } from "@/components/Bases";
import {
  RecipeCreationDishFormFields,
  RecipeCreationEffortFormFields,
  RecipeCreationHowFormFields,
  RecipeCreationIngredientFormFields,
} from "./_components";
import { SubmitEvent } from "react";

const RecipeCreationPage = () => {
  const handleSubmit = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    console.log("NAME:", formData.get("name"));
    console.log("DESCRIPTION:", formData.get("description"));
  };

  return (
    <div className="pt-12 pb-24">
      <form onSubmit={handleSubmit}>
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
    </div>
  );
};

export default RecipeCreationPage;
