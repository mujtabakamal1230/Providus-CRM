"use client";

import { Heading } from "@/components/ui/Typography";
import { Text } from "@/components/ui/Typography";

export default function Error({ reset }: { error?: Error & { digest?: string }; reset: () => void }) {
  return (
    <section className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center max-w-md mx-auto py-20">
        <Heading as="h1" className="text-black mb-4">
          Something went wrong
        </Heading>
        <Text variant="p2" className="text-gray-600 mb-8">
          An unexpected error occurred. Please try again.
        </Text>
        <button
          onClick={() => reset()}
          className="bg-brand-green text-white px-6 py-3 rounded-full hover:bg-[#2e8b16] transition-colors"
        >
          Try again
        </button>
      </div>
    </section>
  );
}
