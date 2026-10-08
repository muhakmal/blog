// Layout for generated Open Graph images (rendered by next/og, so inline styles only).
import { readFileSync } from "node:fs";
import path from "node:path";

export const ogSize = { width: 1200, height: 630 };

// Static TTFs (next/og can't read the site's woff2 webfonts). License: assets/fonts/OFL.txt.
const font = (file: string) => readFileSync(path.join(process.cwd(), "assets/fonts", file));
const fonts = [
  { name: "Plus Jakarta Sans", data: font("PlusJakartaSans-Medium.ttf"), weight: 500 as const, style: "normal" as const },
  { name: "Plus Jakarta Sans", data: font("PlusJakartaSans-Bold.ttf"), weight: 700 as const, style: "normal" as const },
  { name: "Plus Jakarta Sans", data: font("PlusJakartaSans-ExtraBold.ttf"), weight: 800 as const, style: "normal" as const },
];

export const ogOptions = { ...ogSize, fonts };

export default function OgCard({ eyebrow, title, footer }: { eyebrow: string; title: string; footer: string }) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        padding: 48,
        background: "#E0E5EC",
        fontFamily: "Plus Jakarta Sans",
        fontWeight: 500,
      }}
    >
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "56px 64px",
          borderRadius: 40,
          background: "#E0E5EC",
          boxShadow: "16px 16px 32px rgba(163,177,198,0.8), -16px -16px 32px rgba(255,255,255,0.9)",
          color: "#3D4852",
        }}
      >
        <div style={{ display: "flex", fontSize: 30, fontWeight: 700, color: "#5046E5", letterSpacing: 1 }}>
          {eyebrow}
        </div>
        <div
          style={{
            display: "flex",
            fontSize: title.length > 60 ? 56 : 68,
            fontWeight: 800,
            lineHeight: 1.15,
            letterSpacing: -1,
          }}
        >
          {title}
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 28 }}>
          <span style={{ fontWeight: 800, fontSize: 36, letterSpacing: -1 }}>muhakmal.</span>
          <span style={{ color: "#56606E" }}>{footer}</span>
        </div>
      </div>
    </div>
  );
}
