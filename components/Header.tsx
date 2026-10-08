"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import ThemeToggle from "./ThemeToggle";

const navLinks = [
  { name: "Resume", href: "/" },
  { name: "Blog", href: "/posts" },
];

// "Resume" is only the home page; the post list, posts, tags and categories belong to "Blog".
// Anything else (e.g. a 404) highlights neither.
function isActive(pathname: string | null, href: string, postSlugs: Set<string>) {
  if (!pathname) return false;
  const path = pathname.replace(/\/+$/, "") || "/";
  if (href === "/") return path === "/";
  return /^\/(posts|tag|kategori)(\/|$)/.test(path) || postSlugs.has(path.slice(1));
}

export default function Header({ postSlugs }: { postSlugs: string[] }) {
  const slugSet = useMemo(() => new Set(postSlugs), [postSlugs]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const [lastPathname, setLastPathname] = useState(pathname);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);

  // Close the drawer whenever the route changes (including back/forward).
  if (pathname !== lastPathname) {
    setLastPathname(pathname);
    setIsMenuOpen(false);
  }

  useEffect(() => {
    if (!isMenuOpen) return;

    const page = [document.getElementById("main"), document.querySelector("footer")];
    page.forEach((el) => el && (el.inert = true));
    document.body.style.overflow = "hidden";
    drawerRef.current?.querySelector("a")?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);

    // The drawer is mobile-only: close it (and release the page) once the viewport reaches md.
    const desktop = window.matchMedia("(min-width: 768px)");
    const onViewportChange = () => desktop.matches && setIsMenuOpen(false);
    onViewportChange();
    desktop.addEventListener("change", onViewportChange);

    return () => {
      desktop.removeEventListener("change", onViewportChange);
      page.forEach((el) => el && (el.inert = false));
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [isMenuOpen]);

  return (
    <>
      <header
        style={{ viewTransitionName: "site-header" }}
        className="print:hidden sticky top-0 z-50 w-full bg-neu-bg/90 backdrop-blur-md py-4 px-6 md:px-12 flex justify-between items-center shadow-[0_5px_10px_rgba(0,0,0,0.05)] dark:shadow-[0_5px_10px_rgba(0,0,0,0.2)]"
      >
        <Link href="/" className="font-display font-extrabold text-2xl tracking-tighter text-neu-fg hover:text-neu-accent transition-colors">
          muhakmal.
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <nav aria-label="Navigasi utama" className="flex gap-6 items-center">
            {navLinks.map((link) => {
              const active = isActive(pathname, link.href, slugSet);
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className={`font-bold transition-colors ${active ? "text-neu-accent" : "text-neu-muted hover:text-neu-fg"}`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>
          <ThemeToggle />
        </div>

        {/* Mobile Menu Icon */}
        <div className="md:hidden flex items-center gap-4">
          <ThemeToggle />
          <button
            ref={menuButtonRef}
            onClick={() => setIsMenuOpen((open) => !open)}
            aria-label={isMenuOpen ? "Tutup menu" : "Buka menu"}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            className="flex items-center justify-center w-10 h-10 rounded-neu-inner bg-neu-bg shadow-neu-extruded cursor-pointer hover:shadow-neu-extruded-hover active:shadow-neu-inset-sm transition-all duration-300 text-neu-fg"
          >
            {isMenuOpen ? <X className="w-5 h-5" aria-hidden /> : <Menu className="w-5 h-5" aria-hidden />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer */}
      <div
        id="mobile-menu"
        ref={drawerRef}
        hidden={!isMenuOpen}
        className="md:hidden fixed inset-0 z-40 bg-neu-bg pt-24 px-6 animate-drawer-in"
      >
        <nav aria-label="Navigasi utama" className="flex flex-col gap-6">
          {navLinks.map((link) => {
            const active = isActive(pathname, link.href, slugSet);
            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                aria-current={active ? "page" : undefined}
                className={`font-display font-bold text-3xl transition-colors ${active ? "text-neu-accent" : "text-neu-muted"}`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>
      </div>
    </>
  );
}
