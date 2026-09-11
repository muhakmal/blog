"use client";

import { useState, useSyncExternalStore } from "react";
import { Check, Link2, Share2 } from "lucide-react";

const buttonClass =
  "inline-flex items-center gap-2 px-4 py-2 rounded-neu-sm bg-neu-bg border border-neu-edge shadow-neu-extruded-sm hover:-translate-y-0.5 hover:shadow-neu-extruded hover:text-neu-accent active:translate-y-0 active:shadow-neu-inset-sm motion-reduce:hover:translate-y-0 transition-all duration-300 text-sm font-bold text-neu-muted";

const subscribe = () => () => {};

export default function ShareButtons({ title, url }: { title: string; url: string }) {
  const [copied, setCopied] = useState(false);
  // Web Share is client-only; false during SSR avoids a hydration mismatch.
  const canShare = useSyncExternalStore(subscribe, () => "share" in navigator, () => false);

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.prompt("Salin tautan ini:", url);
    }
  };

  const nativeShare = () => navigator.share?.({ title, url }).catch(() => {});

  const encodedUrl = encodeURIComponent(url);
  const encodedText = encodeURIComponent(title);
  const links = [
    { name: "WhatsApp", href: `https://wa.me/?text=${encodedText}%20${encodedUrl}` },
    { name: "LinkedIn", href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}` },
    { name: "X", href: `https://x.com/intent/post?text=${encodedText}&url=${encodedUrl}` },
  ];

  return (
    <div className="flex flex-wrap items-center gap-3">
      <span className="text-sm font-bold text-neu-fg mr-1">Bagikan:</span>
      {links.map((link) => (
        <a key={link.name} href={link.href} target="_blank" rel="noopener noreferrer" className={buttonClass}>
          {link.name}
        </a>
      ))}
      <button type="button" onClick={copyLink} className={buttonClass}>
        {copied ? <Check className="w-4 h-4" aria-hidden /> : <Link2 className="w-4 h-4" aria-hidden />}
        <span aria-live="polite">{copied ? "Tersalin!" : "Salin tautan"}</span>
      </button>
      {canShare && (
        <button type="button" onClick={nativeShare} className={`${buttonClass} sm:hidden`}>
          <Share2 className="w-4 h-4" aria-hidden /> Lainnya
        </button>
      )}
    </div>
  );
}
