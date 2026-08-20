/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import RecipeCard from "@/components/RecipeCard";
import { useQuery } from "@tanstack/react-query";

const RecipeList = () => {
  const { data, isPending, error } = useQuery({
    queryKey: ["todos"],
    queryFn: async () => {
      const response = await fetch("https://dummyjson.com/recipes");
      if (!response.ok) throw new Error("Failed to load todos");
      return response.json();
    },
  });

  if (isPending) {
    return (
      <div className="relative w-full h-62.5 flex justify-center items-center">
        <p>Loading ...</p>
      </div>
    );
  }

  const recipes = data.recipes;

  return (
    <div className="grid grid-cols-4 gap-4 mt-7">
      {recipes.map((recipe: any) => (
        <RecipeCard
          key={recipe.id}
          name={recipe.name}
          level={recipe.level ?? "EASY"}
          imageUrl={recipe.image}
          owner={recipe.owner ?? { name: "Dummy" }}
        />
      ))}
    </div>
  );
};

export default RecipeList;
