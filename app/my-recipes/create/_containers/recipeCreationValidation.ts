import z from "zod";

const ingredientSchema = z.object({
  value: z.string({ error: "Please input ingredient" }).nonempty({
    error: "Please input ingredient",
  }),
});

const howToMakeSchema = z.object({
  value: z.string({ error: "Please input how to make" }).nonempty({
    error: "Please input how to make",
  }),
});

export const recipeCreationSchema = z.object({
  name: z.string().nonempty({ error: "Please input name of recipe" }),
  description: z
    .string()
    .nonempty({ error: "Please input description of recipe" }),
  imageUrl: z
    .url({ error: "Please input in URL format" })
    .or(z.literal(""))
    .optional(),
  level: z.enum(["EASY", "MEDIUM", "HARD"], {
    error: "Please select level of recipe",
  }),
  time: z.enum(["JUST_MINUTES", "HALF_HOUR", "ABOUT_HOUR", "MORE_THAN_HOUR"], {
    error: "Please select time to make",
  }),
  ingredient: z
    .array(ingredientSchema)
    .min(1, { error: "Please add at least one ingredient" }),
  howToMakes: z
    .array(howToMakeSchema)
    .min(1, { error: "Please add at least one step" }),
});

export type RecipeCreationFormValues = z.infer<typeof recipeCreationSchema>;
