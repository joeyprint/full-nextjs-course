import { Search } from "lucide-react";
import Link from "next/link";

import { Button, Container, TextField } from "@/components/Bases";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "/", label: "Home", active: true },
  { href: "/recipes", label: "Recipes", active: false },
] as const;

function Navbar() {
  return (
    <header
      data-slot="navbar"
      className="fixed inset-x-0 top-0 z-50 border-b border-border-subtle bg-card"
    >
      <Container className="flex h-16 items-center justify-between gap-6">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex shrink-0 items-center gap-2">
            <span className="wongnok-text-base flex size-8.5 items-center justify-center rounded-lg bg-linear-135 from-primary to-primary-hover font-bold text-primary-foreground">
              W
            </span>
            <span className="wongnok-text-h3 font-bold tracking-tight text-foreground">
              Wongnok
            </span>
          </Link>

          <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                aria-current={link.active ? "page" : undefined}
                className={cn(
                  "wongnok-text-sm rounded-md px-3.5 py-2 font-medium transition-colors",
                  link.active
                    ? "text-primary"
                    : "text-secondary-foreground hover:bg-muted",
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-6">
          <TextField
            type="search"
            placeholder="Search recipes..."
            aria-label="Search recipes"
            startAdornment={<Search />}
            rootClassName="hidden w-65 lg:flex"
            className="h-9.5"
          />
          <Button
            variant="outlined"
            color="gray"
            size="small"
            className="lg:hidden"
          >
            Search
          </Button>
          <Button className="hidden h-10 lg:inline-flex">Sign in</Button>
          <Button
            variant="outlined"
            color="gray"
            size="small"
            className="lg:hidden"
          >
            Menu
          </Button>
        </div>
      </Container>
    </header>
  );
}

export default Navbar;
export { Navbar };
