"use client";

import React from "react";
import Image from "next/image";
import { Heading, Text } from "@/components/ui/Typography";
import { CtaButton } from "@/components/ui/CtaButton";
import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/ui/Reveal";
import { motion } from "framer-motion";

interface HeroSectionProps {
  title?: React.ReactNode;
  description?: string;
  image?: string;
  imageClassName?: string;
  hideImage?: boolean;
  categories?: string[];
  activeCategory?: string;
  onCategoryChange?: (category: string) => void;
}

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.06,
    },
  },
};

const wordVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.025,
    },
  },
};

const letterVariants = {
  hidden: {
    opacity: 0,
    filter: "blur(12px)",
    scale: 0.8,
    y: 12,
  },
  visible: {
    opacity: 1,
    filter: "blur(0px)",
    scale: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.2, 0.65, 0.3, 1] as [number, number, number, number],
    },
  },
};

interface BlurScaleHeadingProps {
  children: React.ReactNode;
  className?: string;
}

export function BlurScaleHeading({ children, className }: BlurScaleHeadingProps) {
  const renderNode = (node: React.ReactNode, path: string): React.ReactNode => {
    if (!node) return null;

    if (typeof node === "string" || typeof node === "number") {
      const tokens = String(node).split(/(\s+)/).filter(Boolean);

      return (
        <React.Fragment key={path}>
          {tokens.map((token, tokenIndex) => {
            const tokenPath = `${path}-${tokenIndex}`;

            if (/^\s+$/.test(token)) {
              return (
                <React.Fragment key={tokenPath}>
                  {token}
                </React.Fragment>
              );
            }

            return (
              <motion.span
                key={tokenPath}
                className="inline-block whitespace-nowrap"
                variants={wordVariants}
              >
                {token.split("").map((character, characterIndex) => (
                  <motion.span
                    key={`${tokenPath}-${characterIndex}`}
                    variants={letterVariants}
                    className="inline-block will-change-[transform,filter,opacity]"
                    style={{ transformOrigin: "center bottom" }}
                  >
                    {character}
                  </motion.span>
                ))}
              </motion.span>
            );
          })}
        </React.Fragment>
      );
    }

    if (React.isValidElement<{ children?: React.ReactNode }>(node)) {
      if (node.props.children !== undefined) {
        const parsedChildren = React.Children.map(
          node.props.children,
          (child, childIndex) => renderNode(child, `${path}-${childIndex}`)
        );

        return React.cloneElement(node, {
          key: path,
          children: parsedChildren,
        });
      }

      return (
        <motion.span
          key={path}
          variants={letterVariants}
          className="inline-block align-middle will-change-[transform,filter,opacity]"
        >
          {node}
        </motion.span>
      );
    }

    return node;
  };

  return (
    <motion.span
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={className}
    >
      {React.Children.map(children, (child, index) =>
        renderNode(child, String(index))
      )}
    </motion.span>
  );
}


export function HeroSection({
  title,
  description,
  image = "/images/hero-img.png",
  imageClassName = "object-cover object-center",
  hideImage = false,
  categories,
  activeCategory,
  onCategoryChange
}: HeroSectionProps) {
  const defaultTitle = (
    <>
      Custom Salesforce Solutions For Your CRM Innovation Goals{" "}
      <Image
        src="/images/green-line.svg"
        alt=""
        aria-hidden="true"
        width={60}
        height={20}
        className="inline-block h-[0.7em] w-auto align-baseline ml-1"
      />
    </>
  );

  const defaultDescription = "Future-proof customer operations and business processes with ProviduseCRM, a certified Salesforce partner, reinventing CRM systems for organisations in the UK.";

  return (
    <section className="mt-4">
      <Container>
        <div
          className={`rounded-3xl flex flex-col overflow-hidden bg-cover bg-center ${hideImage ? "min-h-[350px] lg:min-h-[450px]" : "min-h-[620px] lg:min-h-[calc(100vh-120px)]"
            }`}
          style={{
            backgroundImage: "url('/images/hero-bg.png')",
          }}
        >
          {hideImage ? (
            <div className="flex flex-col items-center justify-center flex-1 w-full px-6 py-12 text-center gap-6">
              <div className="flex items-center justify-center">
                <Heading as="h1" className="text-white text-center flex items-center justify-center flex-wrap gap-x-4">
                  <BlurScaleHeading>
                    {title || defaultTitle}
                  </BlurScaleHeading>
                </Heading>
              </div>

              {categories && categories.length > 0 && (
                <Reveal direction="up" delay={0.3}>
                  <div className="flex flex-wrap items-center justify-center gap-2 max-w-4xl mt-2">
                    {categories.map((category) => (
                      <button
                        key={category}
                        onClick={() => onCategoryChange?.(category)}
                        className={`px-5 py-2 text-[14px] rounded-full transition-all border font-medium cursor-pointer ${activeCategory === category
                          ? "bg-white text-brand-blue border-white shadow-sm"
                          : "bg-transparent text-white border-white/30 hover:border-white/70"
                          }`}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </Reveal>
              )}
            </div>
          ) : (
            <div className="grid lg:grid-cols-2 flex-1">
              {/* Left — content */}
              <div className="flex flex-col justify-center gap-8 px-8 py-16 md:px-12 lg:px-16 lg:py-20">
                <Reveal direction="up" delay={0.1}>
                  {/* Salesforce Partner Badge */}
                  <div className="flex items-center gap-4 w-fit">
                    <div className="shrink-0 bg-white rounded-sm overflow-hidden">
                      <Image
                        src="/images/salesforce-partner.png"
                        alt="Salesforce Partner"
                        width={66}
                        height={71}
                        className="h-auto w-[66px] object-contain bg-white"
                      />
                    </div>
                    <div className="flex flex-col">
                      <Text variant="p4" className="text-white/85 leading-tight">
                        Certified
                      </Text>
                      <Text variant="p4" className="text-white font-semibold leading-snug">
                        Salesforce Partner
                      </Text>
                      <Text variant="p4" className="text-white/85 leading-tight">
                        in the UK
                      </Text>
                    </div>
                  </div>
                </Reveal>

                {/* Heading + squiggle */}
                <div>
                  <Heading as="h1" className="text-white">
                    <BlurScaleHeading>
                      {title || defaultTitle}
                    </BlurScaleHeading>
                  </Heading>
                </div>

                <Reveal direction="up" delay={0.25}>
                  {/* Subtext */}
                  <Text variant="p2" className="text-white/85 max-w-md">
                    {description || defaultDescription}
                  </Text>
                </Reveal>

                <Reveal direction="up" delay={0.35}>
                  {/* CTA */}
                  <div>
                    <CtaButton variant="white" size="md">
                      Book a Call
                    </CtaButton>
                  </div>
                </Reveal>
              </div>

              {/* Right — image */}
              <div className="relative hidden lg:block p-4 pl-0 py-4 pr-4 h-full">
                <Reveal direction="left" delay={0.3} width="100%" height="100%">
                  <div className="relative w-full h-full rounded-[32px] overflow-hidden">
                    <Image
                      src={image}
                      alt="Business meeting"
                      fill
                      sizes="(min-width: 1024px) 50vw, 0px"
                      className={imageClassName}
                      priority
                    />
                  </div>
                </Reveal>
              </div>
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
