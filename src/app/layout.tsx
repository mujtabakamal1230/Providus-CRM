import type { Metadata } from "next";
import { Afacad, Roboto } from "next/font/google";
import { Navbar, Footer } from "@/components/layout";
import "@/styles/globals.css";

// ─── Fonts ────────────────────────────────────────────────────
const afacad = Afacad({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
});

const roboto = Roboto({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "600"],
  display: "swap",
});

// ─── Metadata ─────────────────────────────────────────────────
export const metadata: Metadata = {
  title: {
    default: "Brand — Build faster with a design system that scales",
    template: "%s | Brand",
  },
  description:
    "A production-ready Next.js starter with a consistent design system, reusable components, and TypeScript.",
  keywords: ["next.js", "design system", "typescript", "tailwind"],
  openGraph: {
    type: "website",
    title: "Brand — Build faster with a design system that scales",
    description:
      "A production-ready Next.js starter with a consistent design system.",
  },
};

// ─── Layout ───────────────────────────────────────────────────
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${afacad.variable} ${roboto.variable}`}>
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
