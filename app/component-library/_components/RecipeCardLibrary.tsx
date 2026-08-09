"use client";

import { useState } from "react";

import { RecipeCard, RecipeLevel } from "@/components/RecipeCard";

import LibrarySection from "./LibrarySection";

const SIZES = ["small", "medium"] as const;
const LEVELS = [
  RecipeLevel.EASY,
  RecipeLevel.MEDIUM,
  RecipeLevel.HARD,
] as const;

const PHOTO = "https://picsum.photos/seed/recipe-card/480/360";
const BROKEN_PHOTO = "https://picsum.photos/seed/does-not-exist.broken";

const OWNER = { name: "John Doe", imageUrl: "https://i.pravatar.cc/150?img=12" };
const OWNER_NO_IMAGE = { name: "Alice Max" };

const IMAGE_SOURCES = [
  { label: "imageUrl", imageUrl: PHOTO },
  { label: "no imageUrl", imageUrl: undefined },
  { label: "broken imageUrl", imageUrl: BROKEN_PHOTO },
] as const;

const RATINGS = [
  { label: "rating omitted", rating: undefined },
  { label: "rating={{}}", rating: {} },
  { label: "2.5 / 10", rating: { rating: 2.5, ratingCount: 10 } },
  { label: "5 / 1204", rating: { rating: 5, ratingCount: 1204 } },
] as const;

const FAVORITE_CARDS = [
  {
    id: "pad-thai",
    name: "Pad Thai Goong Sod with tamarind and fresh chives",
    level: RecipeLevel.MEDIUM,
  },
  { id: "khao-soi", name: "Khao Soi Gai", level: RecipeLevel.HARD },
  { id: "som-tam", name: "Som Tam Thai", level: RecipeLevel.EASY },
] as const;

function RecipeCardLibrary() {
  const [favorites, setFavorites] = useState<Record<string, boolean>>({
    "khao-soi": true,
  });

  const toggleFavorite = (id: string) =>
    setFavorites((current) => ({ ...current, [id]: !current[id] }));

  return (
    <LibrarySection
      id="recipe-card"
      title="RecipeCard"
      description="Composite card for one recipe: image, difficulty, owner, optional rating and favorite toggle. Renders an <article>."
    >
      <div className="flex flex-col gap-4">
        <h3 className="wongnok-text-h3 text-foreground">size</h3>

        <div className="flex flex-wrap items-start gap-6">
          {SIZES.map((size) => (
            <div key={size} className="flex flex-col gap-2">
              <span className="wongnok-text-label text-muted-foreground">
                size={size}
              </span>
              <RecipeCard
                size={size}
                name="Tom Yum Goong with Coconut Milk"
                imageUrl={PHOTO}
                level="EASY"
                owner={OWNER}
                rating={{ rating: 4.5, ratingCount: 128 }}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <h3 className="wongnok-text-h3 text-foreground">level</h3>
        <p className="wongnok-text-sm text-muted-foreground">
          A fixed mapping — amber Easy, brand Medium, neutral Hard — so
          difficulty reads by color before it reads as a word.
        </p>

        <div className="flex flex-wrap items-start gap-6">
          {LEVELS.map((level) => (
            <div key={level} className="flex flex-col gap-2">
              <span className="wongnok-text-label text-muted-foreground">
                level={level}
              </span>
              <RecipeCard
                size="small"
                name="Massaman Curry"
                imageUrl={PHOTO}
                level={level}
                owner={OWNER}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <h3 className="wongnok-text-h3 text-foreground">Image fallback</h3>
        <p className="wongnok-text-sm text-muted-foreground">
          A missing and a dead URL land on the same placeholder — the broken one
          swaps in on the image&apos;s error event.
        </p>

        <div className="flex flex-wrap items-start gap-6">
          {IMAGE_SOURCES.map((source) => (
            <div key={source.label} className="flex flex-col gap-2">
              <span className="wongnok-text-label text-muted-foreground">
                {source.label}
              </span>
              <RecipeCard
                size="small"
                name="Green Curry with Chicken"
                imageUrl={source.imageUrl}
                level="MEDIUM"
                owner={OWNER}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <h3 className="wongnok-text-h3 text-foreground">rating</h3>
        <p className="wongnok-text-sm text-muted-foreground">
          Omitting the prop hides the row entirely. Passing an empty object
          falls back to 0.0 / 0. The score always prints to one decimal.
        </p>

        <div className="flex flex-wrap items-start gap-6">
          {RATINGS.map((entry) => (
            <div key={entry.label} className="flex flex-col gap-2">
              <span className="wongnok-text-label text-muted-foreground">
                {entry.label}
              </span>
              <RecipeCard
                size="small"
                name="Grilled River Prawns"
                imageUrl={PHOTO}
                level="HARD"
                owner={OWNER}
                rating={entry.rating}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <h3 className="wongnok-text-h3 text-foreground">owner</h3>
        <p className="wongnok-text-sm text-muted-foreground">
          The avatar comes straight from{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
            Avatar
          </code>
          , so a missing owner image falls back to hashed initials.
        </p>

        <div className="flex flex-wrap items-start gap-6">
          {[OWNER, OWNER_NO_IMAGE].map((owner) => (
            <div key={owner.name} className="flex flex-col gap-2">
              <span className="wongnok-text-label text-muted-foreground">
                {"imageUrl" in owner ? "owner.imageUrl" : "initials fallback"}
              </span>
              <RecipeCard
                size="small"
                name="Mango Sticky Rice"
                imageUrl={PHOTO}
                level="EASY"
                owner={owner}
                rating={{ rating: 4, ratingCount: 42 }}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <h3 className="wongnok-text-h3 text-foreground">
          isFavorite / onFavorite
        </h3>
        <p className="wongnok-text-sm text-muted-foreground">
          The heart only renders when{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
            onFavorite
          </code>{" "}
          is passed — the card itself keeps no state.
        </p>
        <p className="wongnok-text-sm text-muted-foreground">
          Laid out in a grid so the cards stretch to equal height — that is what
          pins the level/rating row to the bottom regardless of how far the
          title wraps.
        </p>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {FAVORITE_CARDS.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              size="small"
              name={recipe.name}
              imageUrl={`${PHOTO}?v=${recipe.id}`}
              level={recipe.level}
              owner={OWNER}
              rating={{ rating: 3.5, ratingCount: 87 }}
              isFavorite={Boolean(favorites[recipe.id])}
              onFavorite={() => toggleFavorite(recipe.id)}
            />
          ))}
        </div>
      </div>
    </LibrarySection>
  );
}

export default RecipeCardLibrary;
export { RecipeCardLibrary };
