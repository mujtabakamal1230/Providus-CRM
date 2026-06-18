import { Footer, Navbar } from "@/components/layout";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only absolute top-4 left-4 z-[100] bg-white text-brand-blue px-4 py-2 rounded-lg font-semibold shadow-md"
      >
        Skip to main content
      </a>
      <Navbar />
      <main id="main-content" aria-label="Main content">{children}</main>
      <Footer />
    </>
  );
}
