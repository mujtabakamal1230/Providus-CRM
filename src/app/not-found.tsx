import Link from "next/link";
import { Heading, Text } from "@/components/ui/Typography";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";

export default function NotFound() {
  return (
    <Section background="blue-light" className="min-h-[60vh] flex items-center">
      <Container size="sm">
        <div className="flex flex-col items-center text-center gap-6">
          <Text variant="p1" className="text-[#1D70C5]">
            404
          </Text>
          <Heading as="h2">Page not found</Heading>
          <Text variant="p2" className="text-gray-600">
            Sorry, we couldn&apos;t find the page you&apos;re looking for.
          </Text>
          <Link href="/">
            <Button variant="primary" size="lg">
              Back to Home
            </Button>
          </Link>
        </div>
      </Container>
    </Section>
  );
}
