import type { ReactNode } from "react";

/** Shared chrome for one component's section: anchor target, heading, description. */
function LibrarySection({
  id,
  title,
  description,
  children,
}: {
  id: string;
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      className="scroll-mt-24 border-b border-border-subtle pb-14 last:border-b-0 last:pb-0"
    >
      <header className="mb-8 flex flex-col gap-2">
        <h2 className="wongnok-text-h2 text-foreground">{title}</h2>
        <p className="wongnok-text-body text-muted-foreground">{description}</p>
      </header>

      <div className="flex flex-col gap-10">{children}</div>
    </section>
  );
}

export default LibrarySection;
export { LibrarySection };
