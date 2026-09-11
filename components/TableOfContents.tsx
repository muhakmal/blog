"use client";

import { useEffect, useState } from "react";

interface Heading {
  id: string;
  text: string;
  level: number;
}

export default function TableOfContents() {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    // Collect all headings
    const elements = Array.from(document.querySelectorAll("article h2, article h3"));
    const headingData = elements.map((element) => ({
      id: element.id,
      text: element.textContent || "",
      level: Number(element.tagName.charAt(1)),
    }));
    setHeadings(headingData);

    // Setup intersection observer for highlighting active section
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-100px 0px -66% 0px" }
    );

    elements.forEach((elem) => observer.observe(elem));
    return () => observer.disconnect();
  }, []);

  if (headings.length === 0) return null;

  return (
    <div className="hidden lg:block sticky top-24 w-64 p-6 rounded-neu bg-neu-bg shadow-neu-inset-sm">
      <h4 className="font-display font-bold text-lg text-neu-fg mb-4">Daftar Isi</h4>
      <nav className="flex flex-col gap-2">
        {headings.map((heading) => (
          <a
            key={heading.id}
            href={`#${heading.id}`}
            className={`text-sm transition-colors duration-200 ${
              heading.level === 3 ? "ml-4" : ""
            } ${
              activeId === heading.id
                ? "text-neu-accent font-bold"
                : "text-neu-muted hover:text-neu-fg"
            }`}
          >
            {heading.text}
          </a>
        ))}
      </nav>
    </div>
  );
}
