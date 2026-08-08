import type { Metadata } from "next";

import BadgeLibrary from "./_components/BadgeLibrary";
import ButtonLibrary from "./_components/ButtonLibrary";
import LibraryNav from "./_components/LibraryNav";
import TextFieldLibrary from "./_components/TextFieldLibrary";

export const metadata: Metadata = {
  title: "Component Library",
  description: "Every variant of every base component.",
};

export default function ComponentLibraryPage() {
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-10 px-6 py-12 lg:grid lg:grid-cols-[200px_minmax(0,1fr)] lg:gap-16">
      {/* `lg:self-start` is what gives the sticky child room to travel — a grid
          item stretches to row height by default and would never stick. */}
      <aside className="lg:sticky lg:top-12 lg:max-h-[calc(100dvh-6rem)] lg:self-start lg:overflow-y-auto">
        <LibraryNav />
      </aside>

      {/* `min-w-0` lets the wide grids scroll inside their own box instead of
          blowing out the column. */}
      <main className="flex min-w-0 flex-col gap-14">
        <header className="flex flex-col gap-2">
          <h1 className="wongnok-text-h1 text-foreground">Component Library</h1>
          <p className="wongnok-text-body text-muted-foreground">
            Every variant of every component in{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
              @/components/Bases
            </code>
            .
          </p>
        </header>

        <ButtonLibrary />
        <BadgeLibrary />
        <TextFieldLibrary />
      </main>
    </div>
  );
}
