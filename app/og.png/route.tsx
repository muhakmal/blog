import { ImageResponse } from "next/og";
import OgCard, { ogOptions } from "../../components/OgCard";
import { profileData } from "../../data/profile";

// Served as /og.png (a real .png file, so GitHub Pages sends Content-Type: image/png).
export const dynamic = "force-static";

export function GET() {
  return new ImageResponse(
    <OgCard eyebrow="CV & BLOG" title={`${profileData.name} — ${profileData.role}`} footer="Payment · Fintech · Produk digital" />,
    ogOptions
  );
}
