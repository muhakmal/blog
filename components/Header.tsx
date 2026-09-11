"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { usePathname } from "next/navigation";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  
  const navLinks = [
    { name: "Resume", href: "/" },
    { name: "Blog", href: "/posts" }
  ];

  return (
    <>
      <header className="sticky top-0 z-50 w-full bg-neu-bg/90 backdrop-blur-md py-4 px-6 md:px-12 flex justify-between items-center shadow-[0_5px_10px_rgba(0,0,0,0.05)] dark:shadow-[0_5px_10px_rgba(0,0,0,0.2)]">
        <Link href="/" className="font-display font-extrabold text-2xl tracking-tighter text-neu-fg hover:text-neu-accent transition-colors">
          muhakmal.
        </Link>
        
        <div className="hidden md:flex items-center gap-8">
          <nav className="flex gap-6 items-center">
            {navLinks.map((link) => (
              <Link 
                key={link.name}
                href={link.href} 
                className={`font-bold transition-colors ${
                  (pathname === link.href || (link.href !== "/" && pathname?.startsWith(link.href)))
                    ? "text-neu-accent" 
                    : "text-neu-muted hover:text-neu-fg"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>
          <ThemeToggle />
        </div>

        {/* Mobile Menu Icon */}
        <div className="md:hidden flex items-center gap-4">
          <ThemeToggle />
          <button 
            onClick={toggleMenu}
            aria-label="Toggle menu"
            className="flex items-center justify-center w-10 h-10 rounded-neu-inner shadow-neu-extruded cursor-pointer hover:shadow-neu-extruded-hover active:shadow-neu-inset-sm focus:outline-none focus:ring-2 focus:ring-neu-accent transition-all duration-300 text-neu-fg"
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer */}
      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-neu-bg pt-24 px-6">
          <nav className="flex flex-col gap-6">
            {navLinks.map((link) => (
              <Link 
                key={link.name}
                href={link.href} 
                onClick={() => setIsMenuOpen(false)}
                className={`font-display font-bold text-3xl transition-colors ${
                  (pathname === link.href || (link.href !== "/" && pathname?.startsWith(link.href)))
                    ? "text-neu-accent" 
                    : "text-neu-muted"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </>
  );
}
