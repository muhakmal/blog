import Link from "next/link";
import { Menu } from "lucide-react";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full bg-neu-bg/80 backdrop-blur-md py-4 px-6 md:px-12 flex justify-between items-center shadow-neu-extruded-sm">
      <Link href="/" className="font-display font-extrabold text-xl tracking-tight text-neu-fg hover:text-neu-accent transition-colors">
        muhakmal.
      </Link>
      <nav className="hidden md:flex gap-6 items-center">
        <Link href="/" className="font-medium hover:text-neu-accent transition-colors">Resume</Link>
        <Link href="/posts" className="font-medium hover:text-neu-accent transition-colors">Blog</Link>
      </nav>
      {/* Mobile Menu Icon */}
      <div className="md:hidden flex items-center justify-center w-10 h-10 rounded-neu-inner shadow-neu-extruded cursor-pointer hover:shadow-neu-extruded-hover active:shadow-neu-inset-sm transition-all duration-300">
        <Menu className="w-5 h-5 text-neu-fg" />
      </div>
    </header>
  );
}
