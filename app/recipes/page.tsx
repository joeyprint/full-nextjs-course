import { Container } from "@/components/Bases";
import RecipeCard from "@/components/RecipeCard";

const RecipesPage = () => {
  return (
    <div className="pt-10 pb-8">
      <Container>
        <p className="wongnok-text-h2">All Recipes</p>
        <p className="wongnok-text-body text-muted-foreground mt-2">
          8 recipes from home cooks · page 1 of 7
        </p>
        <div className="grid grid-cols-4 gap-4 mt-7">
          {Array.from({ length: 12 }).map((_, index) => (
            <RecipeCard
              key={`recipe-${index}`}
              name={`recipe ${index + 1}`}
              level="EASY"
              owner={{ name: "john doe" }}
            />
          ))}
        </div>
      </Container>
    </div>
  );
};

export default RecipesPage;
