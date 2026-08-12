import { Container, Textarea, TextField } from "@/components/Bases";

const RecipeCreationDishFormFields = () => {
  return (
    <Container className="mt-6">
      <div className="bg-white p-7 mt-6 rounded-3xl">
        <p className="font-bold">The dish</p>
        <p className="wongnok-text-body text-muted-foreground">
          {`Give it a name people will recognise, and a line about why it's good.`}
        </p>
        <TextField
          name={"name"}
          label={"Menu Name"}
          placeholder={"e.g. Thai basil chicken with a crisp fried egg"}
          required
          rootClassName={"mt-6"}
        />
        <Textarea
          name={"description"}
          label={"Menu Description"}
          placeholder={
            "Two or three sentences — what it tastes like, when you cook it, any shortcut you love."
          }
          required
          rootClassName={"mt-6"}
        />
        <TextField
          name={"imageUrl"}
          label={"Image URL"}
          placeholder={"https://…/my-dish.jpg"}
          helperText={"Paste a link to a photo — landscape works best."}
          rootClassName={"mt-6"}
        />
      </div>
    </Container>
  );
};

export default RecipeCreationDishFormFields;
