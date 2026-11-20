# Cloudflare Worker — proxies requests to GCS bucket & redirects apex to www
# Handles:
# - Redirects root/apex (etherealtechnologies.co.uk) -> https://www.etherealtechnologies.co.uk
# - Path passthrough for static assets (images, css, js)
# - Prerendered SSG route resolution (/agora -> /agora/index.html)
# - 404.html response with HTTP 404 status for unknown routes

resource "cloudflare_workers_script" "gcs_proxy" {
  account_id = var.cloudflare_account_id
  name       = "ethereal-gcs-proxy"
  content    = <<-EOF
    const BUCKET_BASE = "https://storage.googleapis.com/${var.bucket_name}";

    function isStaticAsset(pathname) {
      const lastSegment = pathname.split("/").pop() || "";
      return lastSegment.includes(".");
    }

    async function handleRequest(request) {
      const url = new URL(request.url);

      // Redirect apex domain (etherealtechnologies.co.uk) to www.etherealtechnologies.co.uk with HTTPS
      if (url.hostname === "${var.domain_name}") {
        url.hostname = "www.${var.domain_name}";
        url.protocol = "https:";
        return Response.redirect(url.toString(), 301);
      }

      const rawPath = url.pathname;
      const assetRequest = isStaticAsset(rawPath);
      let path = rawPath;

      // Resolve root and extensionless SSG routes to their prerendered index.html
      if (path === "/" || path === "") {
        path = "/index.html";
      } else if (!assetRequest) {
        path = path.endsWith("/") ? path + "index.html" : path + "/index.html";
      }

      const gcsUrl = BUCKET_BASE + path;
      const response = await fetch(gcsUrl);

      if (response.status === 404) {
        if (assetRequest) {
          return response;
        }
        const notFoundResponse = await fetch(BUCKET_BASE + "/404.html");
        if (notFoundResponse.ok) {
          return new Response(notFoundResponse.body, {
            status: 404,
            headers: notFoundResponse.headers,
          });
        }
        const indexResponse = await fetch(BUCKET_BASE + "/index.html");
        return new Response(indexResponse.body, {
          status: 404,
          headers: indexResponse.headers,
        });
      }

      return response;
    }

    addEventListener("fetch", (event) => {
      event.respondWith(handleRequest(event.request));
    });
  EOF
}

# Route for www.etherealtechnologies.co.uk
resource "cloudflare_workers_route" "gcs_proxy_route" {
  zone_id     = cloudflare_zone.main.id
  pattern     = "www.${var.domain_name}/*"
  script_name = cloudflare_workers_script.gcs_proxy.name
}

# Route for apex etherealtechnologies.co.uk (redirects to www)
resource "cloudflare_workers_route" "gcs_proxy_route_apex" {
  zone_id     = cloudflare_zone.main.id
  pattern     = "${var.domain_name}/*"
  script_name = cloudflare_workers_script.gcs_proxy.name
}
