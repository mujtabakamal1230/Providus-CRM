"use client";

import { Heading } from "@/components/ui/Typography";
import { Text } from "@/components/ui/Typography";

export default function GlobalError() {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center max-w-md mx-auto py-20 px-4">
          <Heading as="h1" className="text-black mb-4">
            Application Error
          </Heading>
          <Text variant="p2" className="text-gray-600 mb-8">
            Something went wrong. Please refresh the page or try again later.
          </Text>
          <button
            onClick={() => window.location.reload()}
            className="bg-brand-green text-white px-6 py-3 rounded-full hover:bg-[#2e8b16] transition-colors"
          >
            Refresh page
          </button>
        </div>
      </body>
    </html>
  );
}
