type GuardIssue = {
  check: string;
  detail: string;
};

const targetUrl = process.argv.slice(2).find((arg) => arg !== "--") ?? "http://localhost:3001/";
const devChunkPath = "/_next/static/chunks/main-app.js";

function isHttpUrl(value: string): boolean {
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

function formatIssues(issues: GuardIssue[]): string {
  return issues
    .map((issue) => `- ${issue.check}: ${issue.detail}`)
    .join("\n");
}

async function fetchText(url: string): Promise<{
  ok: boolean;
  status: number;
  headers: Headers;
  text: string;
}> {
  const response = await fetch(url, {
    cache: "no-store",
    redirect: "follow",
  });

  return {
    ok: response.ok,
    status: response.status,
    headers: response.headers,
    text: await response.text(),
  };
}

async function runGuard(urlValue: string): Promise<void> {
  if (!isHttpUrl(urlValue)) {
    console.error(`perf:guard expected an http(s) URL, received: ${urlValue}`);
    process.exit(1);
  }

  const pageUrl = new URL(urlValue);
  const page = await fetchText(pageUrl.toString());
  const issues: GuardIssue[] = [];

  if (!page.ok) {
    issues.push({
      check: "HTTP status",
      detail: `target returned ${page.status}`,
    });
  }

  const cacheControl = page.headers.get("cache-control") ?? "";
  if (cacheControl.toLowerCase().includes("no-store")) {
    issues.push({
      check: "Cache-Control",
      detail: `target returned "${cacheControl}", which is expected from next dev and invalid for Lighthouse performance audits`,
    });
  }

  if (page.text.includes("?v=")) {
    issues.push({
      check: "Dev asset query",
      detail: "HTML contains ?v= asset URLs, a common next dev marker",
    });
  }

  if (page.text.includes("eval-source-map")) {
    issues.push({
      check: "Source maps",
      detail: "HTML contains eval-source-map",
    });
  }

  if (page.text.includes(devChunkPath)) {
    issues.push({
      check: "Unminified dev chunk",
      detail: `HTML references ${devChunkPath}`,
    });
  }

  const devChunkUrl = new URL(devChunkPath, pageUrl.origin).toString();
  const devChunk = await fetch(devChunkUrl, {
    cache: "no-store",
    redirect: "follow",
  });

  if (devChunk.ok) {
    const contentType = devChunk.headers.get("content-type") ?? "";
    const chunkText = await devChunk.text();
    const isJavaScript = contentType.includes("javascript") || chunkText.length > 0;

    if (isJavaScript) {
      if (chunkText.includes("eval-source-map")) {
        issues.push({
          check: "Devtool marker",
          detail: `${devChunkPath} contains eval-source-map`,
        });
      }

      if (
        chunkText.includes("webpack-internal:///") ||
        chunkText.includes("eval(__webpack_require__") ||
        chunkText.includes("React Refresh") ||
        chunkText.includes("react-refresh")
      ) {
        issues.push({
          check: "Development runtime",
          detail: `${devChunkPath} contains development-only runtime markers`,
        });
      }
    }
  }

  if (issues.length > 0) {
    console.error(`perf:guard failed for ${pageUrl.toString()}`);
    console.error(formatIssues(issues));
    console.error(
      "\nRun a production server before Lighthouse: pnpm.cmd run perf:build; pnpm.cmd run perf:start",
    );
    process.exit(1);
  }

  console.log(`perf:guard passed for ${pageUrl.toString()}`);
  console.log("Target does not look like next dev. Lighthouse results are safe to trust.");
}

runGuard(targetUrl).catch((error: unknown) => {
  const message = error instanceof Error ? error.message : String(error);
  console.error(`perf:guard could not inspect ${targetUrl}: ${message}`);
  process.exit(1);
});
