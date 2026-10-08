// Client-safe search helpers (no Node imports), shared by lib/posts.ts and PostsExplorer.

// Lowercase and drop diacritics so "café" matches "cafe".
export function normalizeText(value: string) {
  return value.normalize("NFKD").replace(/\p{M}/gu, "").toLowerCase();
}

export function toSearchTerms(query: string) {
  return normalizeText(query).split(/[^\p{L}\p{N}]+/u).filter(Boolean);
}

// Levenshtein distance capped at `max`: returns max + 1 as soon as it is exceeded.
function editDistance(a: string, b: string, max: number) {
  if (Math.abs(a.length - b.length) > max) return max + 1;
  let prev = Array.from({ length: b.length + 1 }, (_, i) => i);
  for (let i = 1; i <= a.length; i++) {
    const curr = [i];
    let rowMin = i;
    for (let j = 1; j <= b.length; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      curr[j] = Math.min(prev[j] + 1, curr[j - 1] + 1, prev[j - 1] + cost);
      rowMin = Math.min(rowMin, curr[j]);
    }
    if (rowMin > max) return max + 1;
    prev = curr;
  }
  return prev[b.length];
}

// Typos allowed per term: none for short words, 1 from 5 letters, 2 from 9.
function allowedTypos(term: string) {
  if (term.length >= 9) return 2;
  if (term.length >= 5) return 1;
  return 0;
}

export type SearchIndexEntry = { text: string; words: string[] };

export function buildSearchEntry(parts: string[]): SearchIndexEntry {
  const text = normalizeText(parts.join(" "));
  const words = Array.from(new Set(text.split(/[^\p{L}\p{N}]+/u).filter((w) => w.length > 2)));
  return { text, words };
}

// Every term must appear as a substring, or be within a few typos of a word (typos only
// compared against the word's prefix, so "strateg" still finds "strategy").
export function matchesAll(entry: SearchIndexEntry, terms: string[]) {
  return terms.every((term) => {
    if (entry.text.includes(term)) return true;
    const max = allowedTypos(term);
    if (max === 0) return false;
    return entry.words.some(
      (word) => editDistance(term, word, max) <= max || editDistance(term, word.slice(0, term.length), max) <= max
    );
  });
}
