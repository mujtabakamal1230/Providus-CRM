import { revalidatePath, revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { revalidateSecret } from "@/sanity/env";

interface SanityWebhookBody {
  _type?: string;
  slug?: {
    current?: string;
  };
}

export async function POST(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get("secret");

  if (!revalidateSecret || secret !== revalidateSecret) {
    return NextResponse.json({ message: "Invalid secret" }, { status: 401 });
  }

  const body = (await request.json().catch(() => ({}))) as SanityWebhookBody;
  const slug = body.slug?.current;

  if (body._type === "post") {
    revalidateTag("posts");
    revalidatePath("/blog");

    if (slug) {
      revalidatePath(`/blog/${slug}`);
    }
  }

  if (body._type === "caseStudy") {
    revalidateTag("case-studies");
    revalidatePath("/case-studies");

    if (slug) {
      revalidatePath(`/case-studies/${slug}`);
    }
  }

  if (body._type === "category") {
    revalidateTag("categories");
    revalidatePath("/blog");
  }

  return NextResponse.json({ revalidated: true, now: Date.now() });
}
