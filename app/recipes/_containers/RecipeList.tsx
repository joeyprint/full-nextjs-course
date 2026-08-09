"use client";

import RecipeCard from "@/components/RecipeCard";
import { RECIPES_MOCK_DATA } from "./recipes";

const RecipeList = () => {
  return (
    <>
      {RECIPES_MOCK_DATA.map((recipe) => (
        <RecipeCard
          key={recipe.id}
          name={recipe.name}
          level={recipe.level}
          imageUrl={recipe.imageUrl}
          owner={recipe.owner}
        />
      ))}
    </>
  );
};

export default RecipeList;
