"use client";

import { Container } from "@/components/Bases";
import RecipeList from "./_containers/RecipeList";

const RecipesPage = () => {
  return (
    <div className="pt-10 pb-8">
      <Container>
        <p className="wongnok-text-h2">All Recipes</p>
        <p className="wongnok-text-body text-muted-foreground mt-2">
          8 recipes from home cooks · page 1 of 7
        </p>
        <RecipeList />
      </Container>
    </div>
  );
};

export default RecipesPage;
