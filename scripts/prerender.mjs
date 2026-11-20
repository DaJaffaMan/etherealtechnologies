import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");
const clientDir = path.join(rootDir, "dist", "client");
const serverEntryPath = path.join(rootDir, "dist", "server", "server.js");
const buildDir = path.join(rootDir, "build");

const SITE_ORIGIN = "https://www.etherealtechnologies.co.uk";
const ROUTES = [
  { path: "/", outFile: "index.html", priority: "1.0" },
  { path: "/agora", outFile: path.join("agora", "index.html"), priority: "0.9" },
  { path: "/work", outFile: path.join("work", "index.html"), priority: "0.9" },
  { path: "/about", outFile: path.join("about", "index.html"), priority: "0.8" },
  { path: "/contact", outFile: path.join("contact", "index.html"), priority: "0.8" },
];

function extractTitle(html) {
  const match = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  return match ? match[1].trim() : "(missing)";
}

function assertHtmlContract(routePath, html) {
  if (!html.includes("<!DOCTYPE html>")) {
    throw new Error(`Route ${routePath}: missing <!DOCTYPE html>`);
  }
  if (!/<title[^>]*>[^<]+<\/title>/i.test(html)) {
    throw new Error(`Route ${routePath}: missing <title>`);
  }
  if (!/<meta[^>]+name=["']description["'][^>]*>/i.test(html)) {
    throw new Error(`Route ${routePath}: missing <meta name="description">`);
  }
  if (!/<meta[^>]+property=["']og:image:alt["'][^>]*>/i.test(html)) {
    throw new Error(`Route ${routePath}: missing <meta property="og:image:alt">`);
  }

  if (routePath !== "/404") {
    const ldMatches = [...html.matchAll(/<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)];
    if (ldMatches.length === 0) {
      throw new Error(`Route ${routePath}: missing <script type="application/ld+json">`);
    }
    for (const match of ldMatches) {
      try {
        JSON.parse(match[1]);
      } catch (err) {
        throw new Error(`Route ${routePath}: invalid JSON-LD payload (${err.message})`);
      }
    }
  }
}

async function main() {
  if (!fs.existsSync(clientDir)) {
    throw new Error(`Missing client build output at ${clientDir}`);
  }
  if (!fs.existsSync(serverEntryPath)) {
    throw new Error(`Missing server build output at ${serverEntryPath}`);
  }

  fs.rmSync(buildDir, { recursive: true, force: true });
  fs.cpSync(clientDir, buildDir, { recursive: true });
  fs.rmSync(path.join(buildDir, ".vite"), { recursive: true, force: true });

  const serverModule = await import(pathToFileURL(serverEntryPath).href);
  const handleRequest = serverModule.handleRequest;
  if (typeof handleRequest !== "function") {
    throw new Error(`Expected handleRequest export from ${serverEntryPath}`);
  }

  const results = [];

  for (const route of ROUTES) {
    const requestUrl = `${SITE_ORIGIN}${route.path}`;
    const response = await handleRequest(
      new Request(requestUrl, {
        headers: { accept: "text/html" },
      })
    );

    if (response.status !== 200) {
      throw new Error(`Expected HTTP 200 for ${route.path}, received ${response.status}`);
    }

    const html = await response.text();
    assertHtmlContract(route.path, html);

    const destPath = path.join(buildDir, route.outFile);
    fs.mkdirSync(path.dirname(destPath), { recursive: true });
    fs.writeFileSync(destPath, html, "utf8");

    results.push({
      route: route.path,
      status: response.status,
      title: extractTitle(html),
      bytes: Buffer.byteLength(html, "utf8"),
    });
  }

  // Prerender 404.html
  const notFoundResponse = await handleRequest(
    new Request(`${SITE_ORIGIN}/404`, {
      headers: { accept: "text/html" },
    })
  );
  if (notFoundResponse.status !== 404) {
    throw new Error(`Expected HTTP 404 for /404, received ${notFoundResponse.status}`);
  }
  const notFoundHtml = await notFoundResponse.text();
  assertHtmlContract("/404", notFoundHtml);
  fs.writeFileSync(path.join(buildDir, "404.html"), notFoundHtml, "utf8");
  results.push({
    route: "/404",
    status: notFoundResponse.status,
    title: extractTitle(notFoundHtml),
    bytes: Buffer.byteLength(notFoundHtml, "utf8"),
  });

  // Generate sitemap.xml
  const today = new Date().toISOString().split("T")[0];
  const urlEntries = ROUTES.map(
    (route) => `  <url>
    <loc>${SITE_ORIGIN}${route.path}</loc>
    <lastmod>${today}</lastmod>
    <priority>${route.priority}</priority>
  </url>`
  ).join("\n");

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlEntries}
</urlset>
`;
  fs.writeFileSync(path.join(buildDir, "sitemap.xml"), sitemap, "utf8");

  console.log("\nPrerendered Static Site Summary:");
  console.table(results);
}

main().catch((err) => {
  console.error("Prerender failed:", err);
  process.exit(1);
});
