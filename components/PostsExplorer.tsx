"use client";

import { useDeferredValue, useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import { Search, X } from "lucide-react";
import PostList from "./PostList";
import type { SearchablePost } from "../lib/posts";

type Props = {
  posts: SearchablePost[];
  categories: { name: string; count: number }[];
};

// Filters live in the query string so filtered views can be shared and bookmarked.
// A tiny store over location.search (instead of useSearchParams) keeps the page fully
// server-rendered: the server snapshot is "no filters", the client reads the real URL.
const listeners = new Set<() => void>();

function subscribeToUrl(listener: () => void) {
  listeners.add(listener);
  window.addEventListener("popstate", listener);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("popstate", listener);
  };
}

function updateUrl(changes: Record<string, string>) {
  const params = new URLSearchParams(window.location.search);
  for (const [key, value] of Object.entries(changes)) {
    if (value) params.set(key, value);
    else params.delete(key);
  }
  const qs = params.toString();
  window.history.replaceState(window.history.state, "", qs ? `?${qs}` : window.location.pathname);
  listeners.forEach((listener) => listener());
}

const chipBase = "px-4 py-2 rounded-neu-sm font-medium text-sm border border-neu-edge transition-all duration-300";
const chipActive = "bg-neu-bg shadow-neu-inset text-neu-accent font-bold";
const chipIdle = "bg-neu-bg shadow-neu-extruded-sm text-neu-muted hover:text-neu-fg hover:shadow-neu-extruded";

export default function PostsExplorer({ posts, categories }: Props) {
  const search = useSyncExternalStore(subscribeToUrl, () => window.location.search, () => "");
  const searchParams = new URLSearchParams(search);
  const urlQuery = searchParams.get("q") ?? "";
  const category = searchParams.get("kategori") ?? "";
  const tag = searchParams.get("tag") ?? "";

  // The input keeps its own state for snappy typing; re-sync when the URL changes elsewhere (back/forward).
  const [query, setQuery] = useState(urlQuery);
  const [syncedQuery, setSyncedQuery] = useState(urlQuery);
  if (urlQuery !== syncedQuery) {
    setSyncedQuery(urlQuery);
    setQuery(urlQuery);
  }
  const deferredQuery = useDeferredValue(query);
  const inputRef = useRef<HTMLInputElement>(null);

  // Press "/" anywhere to jump to the search box.
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement;
      if (event.key !== "/" || target.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName)) return;
      event.preventDefault();
      inputRef.current?.focus();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  const haystacks = useMemo(
    () =>
      new Map(
        posts.map((post) => [
          post.slug,
          [post.title, post.excerpt, post.tags.join(" "), post.categories.join(" "), post.searchText]
            .join(" ")
            .toLowerCase(),
        ])
      ),
    [posts]
  );

  const filtered = useMemo(() => {
    const terms = deferredQuery.toLowerCase().split(/\s+/).filter(Boolean);
    return posts.filter((post) => {
      if (category && !post.categories.includes(category)) return false;
      if (tag && !post.tags.some((t) => t.toLowerCase() === tag.toLowerCase())) return false;
      const haystack = haystacks.get(post.slug) ?? "";
      return terms.every((term) => haystack.includes(term));
    });
  }, [posts, haystacks, deferredQuery, category, tag]);

  const isFiltering = Boolean(deferredQuery.trim() || category || tag);

  const onQueryChange = (value: string) => {
    setQuery(value);
    updateUrl({ q: value });
  };

  const resetFilters = () => {
    setQuery("");
    updateUrl({ q: "", kategori: "", tag: "" });
    inputRef.current?.focus();
  };

  return (
    <>
      <div role="search" className="flex flex-col gap-6 w-full max-w-3xl mx-auto">
        <div className="relative w-full">
          <label htmlFor="post-search" className="sr-only">
            Cari tulisan
          </label>
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-neu-muted pointer-events-none" aria-hidden />
          <input
            ref={inputRef}
            id="post-search"
            type="search"
            placeholder="Cari judul, isi, atau tag…"
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            onKeyDown={(e) => e.key === "Escape" && query && (e.preventDefault(), onQueryChange(""))}
            autoComplete="off"
            className="w-full pl-12 pr-14 py-4 rounded-neu bg-neu-bg shadow-neu-inset-deep border border-neu-edge text-neu-fg placeholder:text-neu-muted transition-all duration-300 [&::-webkit-search-cancel-button]:hidden"
          />
          {query ? (
            <button
              type="button"
              onClick={() => onQueryChange("")}
              aria-label="Hapus pencarian"
              className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full text-neu-muted hover:text-neu-accent"
            >
              <X className="h-4 w-4" aria-hidden />
            </button>
          ) : (
            <kbd className="hidden md:block absolute right-4 top-1/2 -translate-y-1/2 px-2 py-0.5 rounded-md shadow-neu-extruded-sm text-xs font-bold text-neu-muted">
              /
            </kbd>
          )}
        </div>

        <div role="group" aria-label="Filter kategori" className="flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            aria-pressed={!category}
            onClick={() => updateUrl({ kategori: "" })}
            className={`${chipBase} ${!category ? chipActive : chipIdle}`}
          >
            Semua <span className="opacity-70">({posts.length})</span>
          </button>
          {categories.map((cat) => (
            <button
              key={cat.name}
              type="button"
              aria-pressed={category === cat.name}
              onClick={() => updateUrl({ kategori: category === cat.name ? "" : cat.name })}
              className={`${chipBase} ${category === cat.name ? chipActive : chipIdle}`}
            >
              {cat.name} <span className="opacity-70">({cat.count})</span>
            </button>
          ))}
        </div>

        {tag && (
          <div className="flex justify-center">
            <button
              type="button"
              onClick={() => updateUrl({ tag: "" })}
              className={`${chipBase} ${chipActive} inline-flex items-center gap-2`}
            >
              Tag: #{tag} <X className="w-4 h-4" aria-hidden />
              <span className="sr-only">(hapus filter tag)</span>
            </button>
          </div>
        )}
      </div>

      <p aria-live="polite" className="text-center text-sm font-medium text-neu-muted -mt-4">
        {isFiltering ? `Menampilkan ${filtered.length} dari ${posts.length} tulisan` : `${posts.length} tulisan`}
      </p>

      {filtered.length > 0 ? (
        <>
          {isFiltering && <h2 className="sr-only">Hasil pencarian</h2>}
          <PostList posts={filtered} grouped={!isFiltering} />
        </>
      ) : (
        <div className="flex flex-col items-center gap-4 text-center py-12 text-neu-muted font-medium">
          <p>Tidak ada tulisan yang cocok dengan pencarianmu.</p>
          <button type="button" onClick={resetFilters} className={`${chipBase} ${chipIdle} font-bold`}>
            Reset pencarian
          </button>
        </div>
      )}
    </>
  );
}
