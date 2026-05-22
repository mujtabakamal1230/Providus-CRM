"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { CtaButton } from "@/components/ui/CtaButton";
import { Container } from "./Container";
import type { NavItem } from "@/types";

const navItems: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Industry", href: "/industries" },
  { label: "Platform Expertise", href: "/platform-expertise" },
  { label: "Blog", href: "/blog" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-white">
      <Container>
        <div className="flex h-18 items-center justify-between gap-8 py-4">
          {/* Logo */}
          <Link href="/" className="shrink-0">
            <Image
              src="/images/logo.png"
              alt="Providus CRM"
              width={160}
              height={40}
              priority
              className="h-8 w-auto"
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-7">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-p3 text-[#2E2E2E] hover:text-[#1D70C5] transition-colors whitespace-nowrap"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden lg:block shrink-0">
            <Link href="/contact">
              <CtaButton variant="filled" size="sm">
                Let&apos;s Connect
              </CtaButton>
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button
            className="lg:hidden p-2 text-[#2E2E2E]"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Nav */}
        {isOpen && (
          <div className="lg:hidden border-t border-gray-100 py-4 flex flex-col gap-3">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-p3 text-[#2E2E2E] hover:text-[#1D70C5] transition-colors px-2 py-1"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <div className="pt-3 border-t border-gray-100">
              <Link href="/contact" onClick={() => setIsOpen(false)}>
                <CtaButton variant="filled" size="sm" className="w-full">
                  Let&apos;s Connect
                </CtaButton>
              </Link>
            </div>
          </div>
        )}
      </Container>
    </header>
  );
}
