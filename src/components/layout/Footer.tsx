import Link from "next/link";
import Image from "next/image";
import { Container } from "./Container";
import { Text } from "@/components/ui/Typography";
import { Reveal } from "../ui/Reveal";

const footerLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Industries", href: "/industries" },
  { label: "Platform Expertise", href: "/platform-expertise" },
  { label: "Blog", href: "/blog" },
];

const socialLinks = [
  { icon: "instagram", href: "https://www.instagram.com/lifeatprovidus" },
  { icon: "twitter", href: "https://x.com/Providustechllc" },
  { icon: "youtube", href: "https://www.youtube.com/@ProvidusTech" },
  { icon: "linkedin", href: "https://www.linkedin.com/company/providus-technologies" },
  { icon: "facebook", href: "https://www.facebook.com/share/1ASdLhT26p/" },
];

export function Footer() {
  return (
    <footer className="bg-[#124F87] text-white pt-20 pb-10">
      <Container>
        {/* Top Part: Text and Newsletter */}
        <div className="flex flex-col lg:flex-row justify-between items-center gap-12 mb-16">
          <div className="max-w-md">
            <Text variant="p3" className="text-white leading-relaxed">
              Our team of Salesforce experts is looking forward to solving your key CRM
              challenges and helping you drive intelligent automation across your
              processes and sustainable growth.
            </Text>
          </div>

          {/* Info Items */}
          <div className="flex flex-col gap-3">
            {/* Pin Address */}
            <Reveal direction="up" delay={0.2}>
              <div className="flex items-start gap-4">
                <div className="shrink-0 bg-transparent rounded-full flex items-center justify-center pt-1 text-brand-green-light">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
                <span className="font-body font-normal text-base text-white/90 leading-relaxed max-w-sm">
                  1st Floor, Portfolio Place 498 Broadway Oldham, United Kingdom OL9 9PY
                </span>
              </div>
            </Reveal>

            {/* Email Address */}
            <Reveal direction="up" delay={0.3}>
              <div className="flex items-center gap-4">
                <div className="shrink-0 bg-transparent rounded-full flex items-center justify-center text-brand-green-light">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                </div>
                <a
                  href="mailto:connect@providuscrm.co.uk"
                  className="font-body font-normal text-base text-white hover:text-brand-green-light transition-colors leading-relaxed"
                >
                  connect@providuscrm.co.uk
                </a>
              </div>
            </Reveal>

            {/* Phone Number */}
            <Reveal direction="up" delay={0.4}>
              <div className="flex items-center gap-4">
                <div className="shrink-0 bg-transparent rounded-full flex items-center justify-center text-brand-green-light">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                </div>
                <a
                  href="tel:+971581090882"
                  className="font-body font-normal text-base text-white hover:text-brand-green-light transition-colors leading-relaxed"
                >
                  +971 58 109 0882
                </a>
              </div>
            </Reveal>
          </div>

          {/* <div className="w-full lg:max-w-md">
            <div className="relative flex items-center bg-white rounded-full p-1 pl-6">
              <input
                type="email"
                placeholder="Enter your email"
                className="bg-transparent border-none outline-none text-gray-800 placeholder-gray-400 w-full text-[14px]"
              />
              <button className="bg-[#38A81B] text-white px-6 py-2.5 rounded-full font-semibold hover:bg-[#2e8b16] transition-colors">
                Subscribe
              </button>
            </div>
          </div> */}
        </div>

        {/* Mid Part: Links, Socials, and Logo */}
        <div className="flex flex-col lg:flex-row justify-between items-center gap-10 py-10 border-t border-white/10 border-b border-white/10">
          <nav className="flex flex-wrap justify-center gap-x-8 gap-y-4">
            {footerLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="typography-p2 text-white hover:text-white/80 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            {socialLinks.map((social) => (
              <Link
                key={social.icon}
                href={social.href}
                className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 transition-colors"
              >
                <span className="sr-only">{social.icon}</span>
                <Image
                  src={`/images/${social.icon}.svg`}
                  alt={`${social.icon} icon`}
                  width={20}
                  height={20}
                  className="w-5 h-5 object-contain"
                />
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <Image
              src="/images/logo-footer.svg"
              alt="Providus CRM"
              width={160}
              height={40}
              className="h-10 w-auto"
            />
          </div>
        </div>

        {/* Lower Footer */}
        <div className="mt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <Text className="text-xs! leading-6.25! font-roboto text-white/60">
            © Copyright 2025, All Rights Reserved
          </Text>

          <div className="flex gap-6">
            <Link href="/faq" className="text-xs! leading-6! font-roboto text-white/60 hover:text-white">
              FAQ
            </Link>
            <Link href="/terms" className="text-xs! leading-6! font-roboto text-white/60 hover:text-white">
              Term of Service
            </Link>
            <Link href="/privacy" className="text-xs! leading-6! font-roboto text-white/60 hover:text-white">
              Privacy Policy
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
