import type { Metadata } from "next";
import { Afacad, Roboto } from "next/font/google";
import "@/styles/globals.css";

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

export const metadata: Metadata = {
  title: {
    default: "Providus CRM | Certified Salesforce Partner UK",
    template: "%s | Providus CRM",
  },
  description:
    "Providus CRM provides certified Salesforce consulting, implementation, development, integration, migration, and managed services in the UK.",
  keywords: ["Salesforce consulting", "CRM consulting", "Providus CRM"],
  openGraph: {
    type: "website",
    title: "Providus CRM | Certified Salesforce Partner UK",
    description:
      "Certified Salesforce consulting, implementation, development, integration, migration, and managed services in the UK.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${afacad.variable} ${roboto.variable}`}>
      <head>
        <link rel="preconnect" href="https://cdn.sanity.io" crossOrigin="anonymous" />
      </head>
      <body>{children}</body>
    </html>
  );
}
