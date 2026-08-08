import { cn } from "@/lib/utils";

export type ContainerProps = React.ComponentProps<"div">;

function Container({ className, ...props }: ContainerProps) {
  return (
    <div
      data-slot="container"
      className={cn("mx-auto w-full max-w-320 px-4 lg:px-5", className)}
      {...props}
    />
  );
}

export default Container;
export { Container };
