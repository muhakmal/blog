import type { Metadata } from "next";
import { Plus_Jakarta_Sans, DM_Sans } from "next/font/google";
import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { ThemeProvider } from "next-themes";
import { getSortedPostsData } from "../lib/posts";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL, absoluteUrl } from "../lib/site";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_NAME,
    template: `%s — ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  alternates: {
    canonical: absoluteUrl("/"),
    types: {
      "application/rss+xml": [{ url: absoluteUrl("/feed.xml"), title: `${SITE_NAME} RSS` }],
    },
  },
  openGraph: {
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    url: absoluteUrl("/"),
    siteName: SITE_NAME,
    locale: "id_ID",
    type: "website",
    images: [{ url: absoluteUrl("/og.png"), width: 1200, height: 630, alt: SITE_NAME }],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    creator: "@ayeakmal",
    images: [absoluteUrl("/og.png")],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning className={`${plusJakarta.variable} ${dmSans.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-body bg-neu-bg text-neu-fg transition-colors duration-300">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:px-4 focus:py-2 focus:rounded-neu-inner focus:bg-neu-accent focus:text-neu-on-accent focus:font-bold"
          >
            Langsung ke konten
          </a>
          <Header postSlugs={getSortedPostsData().map((post) => post.slug)} />
          <main id="main" tabIndex={-1} className="flex-grow focus:outline-none">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
