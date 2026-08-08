import { SECTIONS } from "./sections";

/**
 * Wrapping row of chips on mobile, vertical list on desktop.
 * Plain `<a href="#id">` rather than `next/link` — for same-document fragments
 * an anchor is the right primitive and sidesteps Next's router entirely.
 */
function LibraryNav() {
  return (
    <nav aria-label="Components">
      <p className="wongnok-text-label mb-3 text-muted-foreground">Components</p>
      <ul className="flex flex-wrap gap-x-2 gap-y-2 lg:flex-col lg:gap-1">
        {SECTIONS.map((section) => (
          <li key={section.id}>
            <a
              href={`#${section.id}`}
              className="wongnok-text-sm block rounded-md px-3 py-1.5 text-muted-foreground transition-colors hover:bg-primary-subtle hover:text-primary"
            >
              {section.title}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default LibraryNav;
export { LibraryNav };
