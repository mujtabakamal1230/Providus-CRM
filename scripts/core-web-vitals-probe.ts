import { chromium, type Browser, type CDPSession, type Page } from "@playwright/test";

type RectSnapshot = {
  x: number;
  y: number;
  width: number;
  height: number;
};

type LayoutShiftSource = {
  tagName: string;
  id: string;
  className: string;
  text: string;
  previousRect: RectSnapshot | null;
  currentRect: RectSnapshot | null;
};

type LayoutShiftRecord = {
  value: number;
  startTime: number;
  sources: LayoutShiftSource[];
};

type LcpRecord = {
  startTime: number;
  size: number;
  url: string;
  element: {
    tagName: string;
    id: string;
    className: string;
    text: string;
  } | null;
};

type ResourceSummary = {
  name: string;
  initiatorType: string;
  transferSize: number;
  decodedBodySize: number;
};

type LayoutShiftAttribution = {
  node?: Node;
  previousRect?: DOMRectReadOnly;
  currentRect?: DOMRectReadOnly;
};

type LayoutShiftEntry = PerformanceEntry & {
  value: number;
  hadRecentInput: boolean;
  sources?: LayoutShiftAttribution[];
};

type LargestContentfulPaintEntry = PerformanceEntry & {
  size: number;
  url: string;
  element?: Element;
};

type ProbePageResult = {
  path: string;
  url: string;
  lcpMs: number | null;
  lcp: LcpRecord | null;
  cls: number;
  layoutShifts: LayoutShiftRecord[];
  totalTransferKb: number;
  scriptTransferKb: number;
  imageTransferKb: number;
  cssTransferKb: number;
  topResources: ResourceSummary[];
};

type ProbeOptions = {
  baseUrl: string;
  paths: string[];
};

type TraceEvent = {
  name: string;
  ts?: number;
  args?: {
    data?: {
      documentLoaderURL?: string;
      frame?: string;
      imageUrl?: string;
      nodeName?: string;
      size?: number;
      type?: string;
    };
    frame?: string;
  };
};

type TraceLcpResult = {
  lcpMs: number;
  lcp: LcpRecord;
};

declare global {
  interface Window {
    __providusCwvProbe?: {
      cls: number;
      layoutShifts: LayoutShiftRecord[];
      lcpEntries: LcpRecord[];
    };
  }
}

const defaultPaths = [
  "/",
  "/about",
  "/platform-expertise",
  "/case-studies",
  "/blog",
  "/industries",
  "/services/salesforce-consulting-services",
];

const budgets = {
  lcpMs: 2500,
  cls: 0.1,
  totalTransferKb: 1500,
  scriptTransferKb: 300,
};

function parseArgs(args: string[]): ProbeOptions {
  let baseUrl = "http://localhost:3001";
  const paths: string[] = [];

  for (let index = 0; index < args.length; index += 1) {
    const value = args[index];

    if (value === "--") {
      continue;
    }

    if (value === "--base") {
      const nextValue = args[index + 1];
      if (!nextValue) {
        throw new Error("--base requires a URL value");
      }
      baseUrl = nextValue;
      index += 1;
      continue;
    }

    paths.push(value.startsWith("/") ? value : `/${value}`);
  }

  return {
    baseUrl: baseUrl.replace(/\/$/, ""),
    paths: paths.length > 0 ? paths : defaultPaths,
  };
}

function toKb(bytes: number): number {
  return Math.round((bytes / 1024) * 10) / 10;
}

function getStatusIcon(passed: boolean): string {
  return passed ? "PASS" : "FAIL";
}

async function collectTraceLcp<T>(
  session: CDPSession,
  action: () => Promise<T>,
  currentUrl: string,
): Promise<{ value: T; traceLcp: TraceLcpResult | null }> {
  const events: TraceEvent[] = [];

  session.on("Tracing.dataCollected", (payload) => {
    const value = (payload as { value?: unknown[] }).value;
    if (value) {
      events.push(...(value as TraceEvent[]));
    }
  });

  await session.send("Tracing.start", {
    categories: "loading,blink.user_timing,devtools.timeline",
    options: "sampling-frequency=10000",
  });

  const value = await action();
  await session.send("Tracing.end");
  await new Promise<void>((resolve) => {
    session.once("Tracing.tracingComplete", () => resolve());
  });

  return {
    value,
    traceLcp: getTraceLcp(events, currentUrl),
  };
}

function getTraceLcp(events: TraceEvent[], currentUrl: string): TraceLcpResult | null {
  const navigationStart = events.find(
    (event) =>
      event.name === "navigationStart" &&
      event.ts !== undefined &&
      event.args?.data?.documentLoaderURL === currentUrl,
  );

  if (!navigationStart?.ts) {
    return null;
  }

  const frame = navigationStart.args?.frame || navigationStart.args?.data?.frame;
  const candidates = events.filter(
    (event) =>
      event.name === "largestContentfulPaint::Candidate" &&
      event.ts !== undefined &&
      event.ts >= navigationStart.ts! &&
      (!frame || event.args?.frame === frame),
  );
  const candidate = candidates.at(-1);

  if (!candidate?.ts) {
    return null;
  }

  const data = candidate.args?.data;
  const lcpMs = Math.max(0, Math.round((candidate.ts - navigationStart.ts) / 1000));

  return {
    lcpMs,
    lcp: {
      startTime: lcpMs,
      size: data?.size ?? 0,
      url: data?.imageUrl ?? "",
      element: {
        tagName: data?.type ?? data?.nodeName ?? "trace",
        id: "",
        className: "",
        text: data?.nodeName ?? data?.type ?? "trace LCP candidate",
      },
    },
  };
}

async function installObservers(page: Page): Promise<void> {
  await page.addInitScript(() => {
    function rectToSnapshot(rect: DOMRectReadOnly | undefined): RectSnapshot | null {
      if (!rect) {
        return null;
      }

      return {
        x: Math.round(rect.x),
        y: Math.round(rect.y),
        width: Math.round(rect.width),
        height: Math.round(rect.height),
      };
    }

    function elementToSummary(node: Node | undefined): {
      tagName: string;
      id: string;
      className: string;
      text: string;
    } {
      if (!(node instanceof Element)) {
        return {
          tagName: "unknown",
          id: "",
          className: "",
          text: "",
        };
      }

      return {
        tagName: node.tagName.toLowerCase(),
        id: node.id,
        className: typeof node.className === "string" ? node.className : "",
        text: (node.textContent ?? "").trim().replace(/\s+/g, " ").slice(0, 120),
      };
    }

    window.__providusCwvProbe = {
      cls: 0,
      layoutShifts: [],
      lcpEntries: [],
    };

    new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        const layoutEntry = entry as LayoutShiftEntry;
        if (layoutEntry.hadRecentInput) {
          continue;
        }

        const sources = (layoutEntry.sources ?? []).map((source: LayoutShiftAttribution) => ({
          ...elementToSummary(source.node),
          previousRect: rectToSnapshot(source.previousRect),
          currentRect: rectToSnapshot(source.currentRect),
        }));

        window.__providusCwvProbe!.cls += layoutEntry.value;
        window.__providusCwvProbe!.layoutShifts.push({
          value: layoutEntry.value,
          startTime: layoutEntry.startTime,
          sources,
        });
      }
    }).observe({ type: "layout-shift", buffered: true });

    new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        const lcpEntry = entry as LargestContentfulPaintEntry;
        window.__providusCwvProbe!.lcpEntries.push({
          startTime: lcpEntry.startTime,
          size: lcpEntry.size,
          url: lcpEntry.url,
          element: lcpEntry.element ? elementToSummary(lcpEntry.element) : null,
        });
      }
    }).observe({ type: "largest-contentful-paint", buffered: true });
  });
}

async function probePath(browser: Browser, baseUrl: string, path: string): Promise<ProbePageResult> {
  const page = await browser.newPage({
    viewport: { width: 1350, height: 900 },
    deviceScaleFactor: 1,
  });
  const url = `${baseUrl}${path}`;
  const session = await page.context().newCDPSession(page);

  await installObservers(page);
  const traced = await collectTraceLcp(
    session,
    async () => {
      await page.goto(url, { waitUntil: "networkidle" });
      await page.waitForTimeout(3000);
    },
    url,
  );
  await traced.value;

  const result = (await page.evaluate(`(() => {
      const currentPath = ${JSON.stringify(path)};
      const currentUrl = ${JSON.stringify(url)};
      const probe = window.__providusCwvProbe ?? {
        cls: 0,
        layoutShifts: [],
        lcpEntries: [],
      };

      const resources = performance
        .getEntriesByType("resource")
        .filter((entry) => "transferSize" in entry);

      const transferByType = (type) =>
        resources
          .filter((resource) => resource.initiatorType === type)
          .reduce((sum, resource) => sum + resource.transferSize, 0);

      const elementToSummary = (node) => {
        if (!(node instanceof Element)) {
          return null;
        }

        return {
          tagName: node.tagName.toLowerCase(),
          id: node.id,
          className: typeof node.className === "string" ? node.className : "",
          text: (node.textContent ?? "").trim().replace(/\\s+/g, " ").slice(0, 120),
        };
      };

      const bufferedLcpEntries = performance
        .getEntriesByType("largest-contentful-paint")
        .map((entry) => ({
          startTime: entry.startTime,
          size: entry.size ?? 0,
          url: entry.url ?? "",
          element: elementToSummary(entry.element),
        }));

      const lcpEntries = probe.lcpEntries.length > 0 ? probe.lcpEntries : bufferedLcpEntries;

      const totalTransfer = resources.reduce((sum, resource) => sum + resource.transferSize, 0);
      const topResources = [...resources]
        .sort((first, second) => second.transferSize - first.transferSize)
        .slice(0, 5)
        .map((resource) => ({
          name: resource.name,
          initiatorType: resource.initiatorType,
          transferSize: resource.transferSize,
          decodedBodySize: resource.decodedBodySize,
        }));

      const lcp = lcpEntries.at(-1) ?? null;

      return {
        path: currentPath,
        url: currentUrl,
        lcpMs: lcp?.startTime ?? null,
        lcp,
        cls: probe.cls,
        layoutShifts: probe.layoutShifts,
        totalTransferKb: Math.round((totalTransfer / 1024) * 10) / 10,
        scriptTransferKb: Math.round((transferByType("script") / 1024) * 10) / 10,
        imageTransferKb: Math.round((transferByType("img") / 1024) * 10) / 10,
        cssTransferKb: Math.round((transferByType("css") / 1024) * 10) / 10,
        topResources: topResources.map((resource) => ({
          ...resource,
          transferSize: Math.round((resource.transferSize / 1024) * 10) / 10,
          decodedBodySize: Math.round((resource.decodedBodySize / 1024) * 10) / 10,
        })),
      };
    })()`)) as ProbePageResult;

  await page.close();
  return traced.traceLcp && result.lcpMs === null
    ? {
        ...result,
        lcpMs: traced.traceLcp.lcpMs,
        lcp: traced.traceLcp.lcp,
      }
    : result;
}

function printResult(result: ProbePageResult): boolean {
  const lcpPassed = result.lcpMs !== null && result.lcpMs <= budgets.lcpMs;
  const clsPassed = result.cls <= budgets.cls;
  const totalPassed = result.totalTransferKb <= budgets.totalTransferKb;
  const scriptPassed = result.scriptTransferKb <= budgets.scriptTransferKb;
  const passed = lcpPassed && clsPassed && totalPassed && scriptPassed;

  console.log(`\n${result.path}`);
  console.log(`  LCP: ${result.lcpMs === null ? "n/a" : `${Math.round(result.lcpMs)}ms`} ${getStatusIcon(lcpPassed)}`);
  console.log(`  CLS: ${result.cls.toFixed(4)} ${getStatusIcon(clsPassed)}`);
  console.log(`  Transfer: ${result.totalTransferKb}KB total ${getStatusIcon(totalPassed)}`);
  console.log(`  JS: ${result.scriptTransferKb}KB ${getStatusIcon(scriptPassed)} | Images: ${result.imageTransferKb}KB | CSS: ${result.cssTransferKb}KB`);

  if (result.lcp?.element) {
    const lcpText = result.lcp.element.text ? ` "${result.lcp.element.text}"` : "";
    const lcpUrl = result.lcp.url ? ` ${result.lcp.url}` : "";
    console.log(`  LCP element: <${result.lcp.element.tagName}>${lcpText}${lcpUrl}`);
  }

  if (result.layoutShifts.length > 0) {
    const topShift = [...result.layoutShifts].sort((first, second) => second.value - first.value)[0];
    const source = topShift.sources[0];
    const sourceLabel = source
      ? `<${source.tagName}${source.id ? `#${source.id}` : ""}> ${source.text}`.trim()
      : "unknown source";
    console.log(`  Top layout shift: ${topShift.value.toFixed(4)} at ${Math.round(topShift.startTime)}ms from ${sourceLabel}`);
  }

  if (result.topResources.length > 0) {
    console.log("  Largest transfers:");
    for (const resource of result.topResources.slice(0, 3)) {
      const name = resource.name.replace(result.url.split(result.path)[0], "");
      console.log(`    - ${resource.transferSize}KB ${resource.initiatorType} ${name}`);
    }
  }

  return passed;
}

async function main(): Promise<void> {
  const options = parseArgs(process.argv.slice(2));
  const browser = await chromium.launch();
  const results: ProbePageResult[] = [];

  try {
    for (const path of options.paths) {
      results.push(await probePath(browser, options.baseUrl, path));
    }
  } finally {
    await browser.close();
  }

  console.log(`Core Web Vitals probe for ${options.baseUrl}`);
  console.log("Budgets: LCP <= 2500ms, CLS <= 0.1, total transfer <= 1500KB, JS transfer <= 300KB");
  console.log("TBT is not measured here; use Lighthouse for TBT.");

  const allPassed = results.map(printResult).every(Boolean);

  if (!allPassed) {
    console.error("\nperf:vitals failed one or more budgets.");
    process.exit(1);
  }

  console.log("\nperf:vitals passed all measured budgets.");
}

main().catch((error: unknown) => {
  const message = error instanceof Error ? error.message : String(error);
  console.error(`perf:vitals failed: ${message}`);
  process.exit(1);
});
