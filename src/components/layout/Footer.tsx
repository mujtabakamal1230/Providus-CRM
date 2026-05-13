import Link from "next/link";
import Image from "next/image";
import { Container } from "./Container";
import { Text } from "@/components/ui/Typography";

const footerLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Industry", href: "/industry" },
  { label: "Platform Expertise", href: "/expertise" },
  { label: "Blog", href: "/blog" },
];

const socialLinks = [
  { icon: "facebook", href: "#" },
  { icon: "twitter", href: "#" },
  { icon: "instagram", href: "#" },
  { icon: "linkedin", href: "#" },
];

export function Footer() {
  return (
    <footer className="bg-[#124F87] text-white pt-20 pb-10">
      <Container>
        {/* Top Part: Text and Newsletter */}
        <div className="flex flex-col lg:flex-row justify-between items-start gap-12 mb-16">
          <div className="max-w-md">
            <Text variant="p3" className="text-white leading-relaxed">
              Our team of Salesforce experts is looking forward to solving your key CRM
              challenges and helping you drive intelligent automation across your
              processes and sustainable growth.
            </Text>
          </div>

          <div className="w-full lg:max-w-md">
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
          </div>
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
                {/* Social Icon Placeholder - would use SVGs here */}
                <div className="w-5 h-5 bg-white/40 rounded-sm" />
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <Image
              src="/images/logo-footer.png"
              alt="Providus CRM"
              width={160}
              height={40}
              className="h-10 w-auto"
            />
          </div>
        </div>

        {/* Lower Footer */}
        <div className="mt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <Text className="!text-[10px] !leading-[25px] font-roboto text-white/60">
            © Copyright 2025, All Rights Reserved
          </Text>

          <div className="flex gap-6">
            <Link href="/faq" className="text-[10px] leading-[25px] font-roboto text-white/60 hover:text-white">
              FAQ
            </Link>
            <Link href="/terms" className="text-[10px] leading-[25px] font-roboto text-white/60 hover:text-white">
              Term of Service
            </Link>
            <Link href="/privacy" className="text-[10px] leading-[25px] font-roboto text-white/60 hover:text-white">
              Privacy Policy
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
