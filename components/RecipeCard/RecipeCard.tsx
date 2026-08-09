"use client";

import { cva, type VariantProps } from "class-variance-authority";
import { ChefHat, Heart, Star } from "lucide-react";
import { useState } from "react";

import { Avatar, Badge, type BadgeProps } from "@/components/Bases";
import { cn } from "@/lib/utils";

const RecipeLevel = {
  EASY: "EASY",
  MEDIUM: "MEDIUM",
  HARD: "HARD",
} as const;

type RecipeLevel = (typeof RecipeLevel)[keyof typeof RecipeLevel];

const LEVEL_BADGE: Record<
  RecipeLevel,
  { label: string; color: BadgeProps["color"] }
> = {
  EASY: { label: "Easy", color: "accent" },
  MEDIUM: { label: "Medium", color: "primary" },
  HARD: { label: "Hard", color: "gray" },
};

const recipeCardVariants = cva(
  "group/recipe-card relative flex w-full cursor-pointer flex-col overflow-hidden rounded-2xl border border-border-subtle bg-card text-card-foreground transition-[transform,box-shadow] duration-200 hover:-translate-y-1 hover:shadow-lg",
  {
    variants: {
      size: {
        small: "max-w-64",
        medium: "max-w-80",
      },
    },
    defaultVariants: {
      size: "medium",
    },
  },
);

type RecipeCardSize = NonNullable<
  NonNullable<VariantProps<typeof recipeCardVariants>["size"]>
>;

const SIZE_TOKENS: Record<
  RecipeCardSize,
  {
    body: string;
    title: string;
    heart: string;
    heartIcon: number;
    star: number;
    fallbackIcon: string;
  }
> = {
  small: {
    body: "gap-2 p-3",
    title: "wongnok-text-body font-semibold",
    heart: "size-7.5",
    heartIcon: 15,
    star: 13,
    fallbackIcon: "size-8",
  },
  medium: {
    body: "gap-2.5 p-4",
    title: "wongnok-text-base font-semibold",
    heart: "size-8.5",
    heartIcon: 17,
    star: 14,
    fallbackIcon: "size-10",
  },
};

export type RecipeCardOwner = {
  name: string;
  imageUrl?: string;
};

export type RecipeCardRating = {
  rating?: number;
  ratingCount?: number;
};

export type RecipeCardProps = Omit<
  React.ComponentProps<"article">,
  "children"
> &
  VariantProps<typeof recipeCardVariants> & {
    name: string;
    imageUrl?: string;
    level: RecipeLevel;
    owner: RecipeCardOwner;
    rating?: RecipeCardRating;
    isFavorite?: boolean;
    onFavorite?: () => void;
  };

function RecipeCard({
  className,
  size = "medium",
  name,
  imageUrl,
  level,
  owner,
  rating,
  isFavorite = false,
  onFavorite,
  ...props
}: RecipeCardProps) {
  const [imageFailed, setImageFailed] = useState(false);

  const tokens = SIZE_TOKENS[size ?? "medium"];
  const { label, color } = LEVEL_BADGE[level];
  const { rating: ratingValue = 0, ratingCount = 0 } = rating ?? {};

  return (
    <article
      data-slot="recipe-card"
      className={cn(recipeCardVariants({ size, className }))}
      {...props}
    >
      <div
        data-slot="recipe-card-media"
        className="relative aspect-4/3 w-full overflow-hidden bg-muted"
      >
        {imageUrl && !imageFailed ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            data-slot="recipe-card-image"
            src={imageUrl}
            alt={name}
            loading="lazy"
            onError={() => setImageFailed(true)}
            className="size-full object-cover"
          />
        ) : (
          <span
            data-slot="recipe-card-image-fallback"
            className="flex size-full items-center justify-center"
          >
            <ChefHat
              aria-hidden
              className={cn(tokens.fallbackIcon, "text-muted-foreground/40")}
            />
          </span>
        )}

        {onFavorite ? (
          <button
            data-slot="recipe-card-favorite"
            type="button"
            aria-pressed={isFavorite}
            aria-label={
              isFavorite
                ? `Remove ${name} from favorites`
                : `Add ${name} to favorites`
            }
            onClick={(event) => {
              event.stopPropagation();
              onFavorite();
            }}
            className={cn(
              "absolute top-2.5 right-2.5 flex items-center justify-center rounded-full bg-card/92 shadow-sm transition-transform duration-[180ms] ease-[cubic-bezier(0.34,1.6,0.64,1)] focus-visible:ring-3 focus-visible:ring-primary/30 focus-visible:outline-none",
              tokens.heart,
              isFavorite ? "scale-108" : "scale-100",
            )}
          >
            <Heart
              aria-hidden
              size={tokens.heartIcon}
              className={
                isFavorite
                  ? "fill-primary text-primary"
                  : "text-secondary-foreground"
              }
            />
          </button>
        ) : null}
      </div>

      <div
        data-slot="recipe-card-body"
        className={cn("flex flex-1 flex-col", tokens.body)}
      >
        <h3
          data-slot="recipe-card-name"
          className={cn("line-clamp-2 text-foreground", tokens.title)}
        >
          {name}
        </h3>

        <div data-slot="recipe-card-owner" className="flex items-center gap-2">
          <Avatar size="small" name={owner.name} imageUrl={owner.imageUrl} />
          <span className="wongnok-text-xs truncate text-muted-foreground">
            {owner.name}
          </span>
        </div>

        <div
          data-slot="recipe-card-meta"
          className="mt-auto flex items-center justify-between gap-2"
        >
          <Badge data-slot="recipe-card-level" color={color} size="medium">
            {label}
          </Badge>

          {rating ? (
            <span
              data-slot="recipe-card-rating"
              role="img"
              aria-label={`${ratingValue} out of 5 stars, ${ratingCount} ratings`}
              className="flex shrink-0 items-center gap-1.25"
            >
              <Star
                aria-hidden
                size={tokens.star}
                className="fill-accent text-accent"
              />
              <span className="wongnok-text-xs font-semibold text-secondary-foreground">
                {ratingValue.toFixed(1)}
              </span>
              <span className="wongnok-text-xs text-muted-foreground/70">
                ({ratingCount})
              </span>
            </span>
          ) : null}
        </div>
      </div>
    </article>
  );
}

export default RecipeCard;
export { RecipeCard, recipeCardVariants, RecipeLevel };
