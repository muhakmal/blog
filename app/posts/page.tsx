"use client";

import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import PostCard from "../../components/PostCard";

// Definisi type (sementara, biasanya di import)
type PostData = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  categories: string[];
  readingTime: string;
};

export default function PostsPage() {
  const [posts, setPosts] = useState<PostData[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<PostData[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("Semua");
  const [categories, setCategories] = useState<string[]>(["Semua"]);

  useEffect(() => {
    // Fetch data (karena static export, kita bisa menggunakan API route atau JSON, 
    // tapi karena ini Next.js app router static, data-fetching pada client component 
    // agak tricky jika tidak ada API. 
    // Sebagai alternatif, kita bisa buat ini Server Component yang passing initial data ke Client Component.
    
    // Tapi karena perintah plan adalah buat client component untuk search fungsional,
    // Kita akan fetch data post list dari build time.
    fetch('/blog/api/posts.json')
      .then(res => res.json())
      .catch(() => []) // fallback
      .then(data => {
         setPosts(data);
         setFilteredPosts(data);
         
         const allCats = new Set<string>();
         data.forEach((p: PostData) => {
           p.categories?.forEach(c => allCats.add(c));
         });
         setCategories(["Semua", ...Array.from(allCats)]);
      });
  }, []);

  useEffect(() => {
    let result = posts;
    
    // Filter by category
    if (activeCategory !== "Semua") {
      result = result.filter(post => post.categories?.includes(activeCategory));
    }
    
    // Filter by search query
    if (searchQuery.trim() !== "") {
      const q = searchQuery.toLowerCase();
      result = result.filter(post => 
        post.title.toLowerCase().includes(q) || 
        post.excerpt?.toLowerCase().includes(q)
      );
    }
    
    setFilteredPosts(result);
  }, [searchQuery, activeCategory, posts]);

  return (
    <div className="max-w-5xl mx-auto px-6 md:px-12 py-16 flex flex-col gap-12">
      <header className="flex flex-col gap-6 text-center">
        <h1 className="font-display font-extrabold text-4xl md:text-5xl tracking-tight text-neu-fg">
          Semua Tulisan
        </h1>
        <p className="text-neu-muted text-lg max-w-2xl mx-auto">
          Catatan, pemikiran, dan perjalanan tentang produk, teknologi, dan kehidupan.
        </p>
      </header>

      {/* Search & Filter Section */}
      <div className="flex flex-col gap-6 w-full max-w-3xl mx-auto">
        <div className="relative w-full">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-neu-muted">
            <Search className="h-5 w-5" />
          </div>
          <input
            type="text"
            placeholder="Cari tulisan..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-4 rounded-neu bg-neu-bg shadow-neu-inset-deep focus:outline-none focus:ring-2 focus:ring-neu-accent text-neu-fg placeholder-neu-muted transition-all duration-300"
          />
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-neu-sm font-medium text-sm transition-all duration-300 ${
                activeCategory === cat 
                  ? "bg-neu-bg shadow-neu-inset text-neu-accent" 
                  : "bg-neu-bg shadow-neu-extruded-sm text-neu-muted hover:text-neu-fg hover:shadow-neu-extruded"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Post Grid */}
      {filteredPosts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-4">
          {filteredPosts.map((post) => (
            <PostCard key={post.slug} post={post as any} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 text-neu-muted font-medium">
          Tidak ada tulisan yang ditemukan.
        </div>
      )}
    </div>
  );
}
