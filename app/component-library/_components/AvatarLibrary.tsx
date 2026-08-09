import { Fragment } from "react";

import { Avatar, AvatarGroup } from "@/components/Bases";

import LibrarySection from "./LibrarySection";

const SIZES = ["small", "medium", "large"] as const;
const SPACINGS = ["small", "medium"] as const;

/* Row label -> the props that row demonstrates, so the size grid stays a
   two-axis loop. */
const SOURCES = [
  { label: "imageUrl", imageUrl: "https://i.pravatar.cc/150?img=12" },
  { label: "name only", imageUrl: undefined },
  { label: "broken imageUrl", imageUrl: "https://i.pravatar.cc/broken.jpg" },
] as const;

const TONE_NAMES = [
  "John Doe",
  "Alice Max",
  "Luna Holland",
  "Peter Quill",
  "Mia",
] as const;

const TEAM = [
  { name: "John Doe", imageUrl: "https://i.pravatar.cc/150?img=1" },
  { name: "Alice Max" },
  { name: "Luna Holland", imageUrl: "https://i.pravatar.cc/150?img=5" },
  { name: "Peter Quill", imageUrl: "https://i.pravatar.cc/150?img=8" },
  { name: "Mia Wong" },
];

function AvatarLibrary() {
  return (
    <LibrarySection
      id="avatar"
      title="Avatar"
      description="User identity chip with an initials fallback. Renders a <span>."
    >
      <div className="flex flex-col gap-4">
        <h3 className="wongnok-text-h3 text-foreground">
          variant = <span className="text-primary">circular</span>
        </h3>

        <div className="overflow-x-auto">
          {/* One column for the row labels, then one per size. */}
          <div className="grid w-max grid-cols-[auto_repeat(3,minmax(0,max-content))] items-center gap-x-8 gap-y-5">
            <div aria-hidden />
            {SIZES.map((size) => (
              <div
                key={size}
                className="wongnok-text-label text-muted-foreground"
              >
                size={size}
              </div>
            ))}

            {SOURCES.map((source) => (
              <Fragment key={source.label}>
                <div className="wongnok-text-label text-muted-foreground">
                  {source.label}
                </div>
                {SIZES.map((size) => (
                  <div
                    key={size}
                    className="flex items-center"
                    title={`size=${size}, ${source.label}`}
                  >
                    <Avatar
                      size={size}
                      name="John Doe"
                      imageUrl={source.imageUrl}
                    />
                  </div>
                ))}
              </Fragment>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <h3 className="wongnok-text-h3 text-foreground">Initials fallback</h3>
        <p className="wongnok-text-sm text-muted-foreground">
          The tone is hashed from the name, so one person keeps one color.
        </p>

        <div className="flex flex-wrap items-center gap-4">
          {TONE_NAMES.map((name) => (
            <div key={name} className="flex items-center gap-2">
              <Avatar name={name} />
              <span className="wongnok-text-sm text-muted-foreground">
                {name}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <h3 className="wongnok-text-h3 text-foreground">AvatarGroup</h3>

        <div className="overflow-x-auto">
          <div className="grid w-max grid-cols-[auto_repeat(2,minmax(0,max-content))] items-center gap-x-8 gap-y-5">
            <div aria-hidden />
            {SPACINGS.map((spacing) => (
              <div
                key={spacing}
                className="wongnok-text-label text-muted-foreground"
              >
                spacing={spacing}
              </div>
            ))}

            {SIZES.map((size) => (
              <Fragment key={size}>
                <div className="wongnok-text-label text-muted-foreground">
                  size={size}
                </div>
                {SPACINGS.map((spacing) => (
                  <div key={spacing} className="flex items-center">
                    <AvatarGroup
                      avatars={TEAM}
                      size={size}
                      spacing={spacing}
                      max={3}
                    />
                  </div>
                ))}
              </Fragment>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <p className="wongnok-text-sm text-muted-foreground">
            {/* `total` covers server-paginated lists: the chip counts people the
                array never carried. */}
            max=3, total=12 — the chip counts from{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
              total
            </code>
            , not the array.
          </p>
          <AvatarGroup avatars={TEAM} max={3} total={12} />
        </div>
      </div>
    </LibrarySection>
  );
}

export default AvatarLibrary;
export { AvatarLibrary };
