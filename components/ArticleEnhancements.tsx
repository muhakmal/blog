"use client";

import { useEffect } from "react";

// Progressive enhancements for the rendered markdown in [data-article-body]:
// copy buttons on code blocks and a readable placeholder for images that fail to load.
export default function ArticleEnhancements() {
  useEffect(() => {
    const body = document.querySelector<HTMLElement>("[data-article-body]");
    if (!body) return;
    const cleanups: Array<() => void> = [];

    body.querySelectorAll("pre").forEach((pre) => {
      if (pre.parentElement?.classList.contains("code-block")) return;
      const wrapper = document.createElement("div");
      wrapper.className = "code-block";
      pre.replaceWith(wrapper);
      wrapper.appendChild(pre);

      const button = document.createElement("button");
      button.type = "button";
      button.className = "copy-code-button";
      button.textContent = "Salin";
      button.setAttribute("aria-label", "Salin kode");
      let timer: ReturnType<typeof setTimeout>;
      const onClick = async () => {
        try {
          await navigator.clipboard.writeText(pre.textContent ?? "");
          button.textContent = "Tersalin!";
          button.dataset.copied = "true";
        } catch {
          button.textContent = "Gagal";
        }
        clearTimeout(timer);
        timer = setTimeout(() => {
          button.textContent = "Salin";
          delete button.dataset.copied;
        }, 2000);
      };
      button.addEventListener("click", onClick);
      wrapper.appendChild(button);
      cleanups.push(() => {
        clearTimeout(timer);
        button.removeEventListener("click", onClick);
        wrapper.replaceWith(pre);
      });
    });

    const replaceBrokenImage = (img: HTMLImageElement) => {
      const placeholder = document.createElement("span");
      placeholder.className = "image-missing";
      placeholder.setAttribute("role", "img");
      const label = img.alt ? `Gambar tidak tersedia: ${img.alt}` : "Gambar tidak tersedia";
      placeholder.setAttribute("aria-label", label);
      placeholder.textContent = label;
      img.replaceWith(placeholder);
    };

    body.querySelectorAll("img").forEach((img) => {
      // `complete` with no pixels means the request already failed.
      if (img.complete && img.naturalWidth === 0) {
        replaceBrokenImage(img);
        return;
      }
      const onError = () => replaceBrokenImage(img);
      img.addEventListener("error", onError, { once: true });
      cleanups.push(() => img.removeEventListener("error", onError));
    });

    return () => cleanups.forEach((cleanup) => cleanup());
  }, []);

  return null;
}
