import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="max-w-2xl mx-auto px-6 py-32 flex flex-col items-center gap-6 text-center">
      <p aria-hidden className="font-display font-extrabold text-8xl text-neu-accent tracking-tighter">404</p>
      <h1 className="font-display font-bold text-3xl text-neu-fg">Halaman tidak ditemukan</h1>
      <p className="text-neu-muted text-lg">
        Mungkin tautannya sudah berubah, atau tulisannya sudah tidak ada. Coba cari di daftar tulisan.
      </p>
      <div className="flex flex-wrap justify-center gap-4 pt-2">
        <Link
          href="/posts"
          className="px-6 py-3 rounded-neu-sm bg-neu-accent text-neu-on-accent font-bold shadow-neu-accent hover:shadow-neu-accent-hover transition-all duration-300"
        >
          Lihat semua tulisan
        </Link>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-neu-sm bg-neu-bg border border-neu-edge text-neu-fg font-bold shadow-neu-extruded hover:shadow-neu-extruded-hover transition-all duration-300"
        >
          <ArrowLeft className="w-4 h-4" aria-hidden /> Beranda
        </Link>
      </div>
    </div>
  );
}
