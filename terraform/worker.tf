# Cloudflare Worker — proxies requests to GCS bucket & redirects apex to www
# Handles:
# - Redirects root/apex (etherealtechnologies.co.uk) -> https://www.etherealtechnologies.co.uk
# - Path passthrough for static assets (images, css, js)
# - index.html serving for root and SPA routes (React Router)
# - 404 fallback to index.html for client-side routing

resource "cloudflare_workers_script" "gcs_proxy" {
  account_id = var.cloudflare_account_id
  name       = "ethereal-gcs-proxy"
  content    = <<-EOF
    const BUCKET_BASE = "https://storage.googleapis.com/${var.bucket_name}";

    async function handleRequest(request) {
      const url = new URL(request.url);

      // Redirect apex domain (etherealtechnologies.co.uk) to www.etherealtechnologies.co.uk with HTTPS
      if (url.hostname === "${var.domain_name}") {
        url.hostname = "www.${var.domain_name}";
        url.protocol = "https:";
        return Response.redirect(url.toString(), 301);
      }

      let path = url.pathname;

      // Serve index.html for root and SPA routes (no extension = likely a route)
      if (path === "/" || path === "") {
        path = "/index.html";
      } else if (!path.includes(".")) {
        // SPA fallback — serve index.html for React Router paths
        path = "/index.html";
      }

      const gcsUrl = BUCKET_BASE + path;
      const response = await fetch(gcsUrl);

      // If GCS returns 404, serve index.html (React Router catch-all)
      if (response.status === 404) {
        const indexResponse = await fetch(BUCKET_BASE + "/index.html");
        return new Response(indexResponse.body, {
          status: 200,
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
