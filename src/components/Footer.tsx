import { ArrowUp } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-border px-6 py-8">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <p className="text-sm text-muted">
          &copy; {new Date().getFullYear()} Daniel King Media. All rights
          reserved.
        </p>
        <a
          href="#home"
          className="text-muted transition-colors hover:text-foreground"
          aria-label="Back to top"
        >
          <ArrowUp size={20} />
        </a>
      </div>
    </footer>
  );
}
