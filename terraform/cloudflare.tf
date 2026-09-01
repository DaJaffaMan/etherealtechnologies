# Cloudflare DNS Zone for etherealtechnologies.co.uk
resource "cloudflare_zone" "main" {
  account_id = var.cloudflare_account_id
  zone       = var.domain_name
  plan       = "free"
}

# SSL mode: flexible (Cloudflare → GCS is HTTP, Cloudflare → user is HTTPS)
resource "cloudflare_zone_settings_override" "main" {
  zone_id = cloudflare_zone.main.id

  settings {
    ssl              = "flexible"
    always_use_https = "on"
    min_tls_version  = "1.2"
  }
}

# WWW — CNAME to GCS via Cloudflare Worker (proxied = Cloudflare SSL + CDN)
# Worker intercepts requests and rewrites them to the correct GCS bucket URL
resource "cloudflare_record" "www" {
  zone_id = cloudflare_zone.main.id
  name    = "www"
  content = "storage.googleapis.com"
  type    = "CNAME"
  proxied = true
  ttl     = 1 # Auto TTL when proxied
}

# Apex — CNAME flattened to www (Cloudflare handles this at the root — no RFC violation)
resource "cloudflare_record" "apex" {
  zone_id = cloudflare_zone.main.id
  name    = var.domain_name
  content = "www.${var.domain_name}"
  type    = "CNAME"
  proxied = true
  ttl     = 1
}

# MX Records — Google Workspace
resource "cloudflare_record" "mx_1" {
  zone_id  = cloudflare_zone.main.id
  name     = var.domain_name
  type     = "MX"
  content  = "aspmx.l.google.com"
  priority = 1
  ttl      = 3600
  proxied  = false
}

resource "cloudflare_record" "mx_2" {
  zone_id  = cloudflare_zone.main.id
  name     = var.domain_name
  type     = "MX"
  content  = "alt1.aspmx.l.google.com"
  priority = 5
  ttl      = 3600
  proxied  = false
}

resource "cloudflare_record" "mx_3" {
  zone_id  = cloudflare_zone.main.id
  name     = var.domain_name
  type     = "MX"
  content  = "alt2.aspmx.l.google.com"
  priority = 5
  ttl      = 3600
  proxied  = false
}

resource "cloudflare_record" "mx_4" {
  zone_id  = cloudflare_zone.main.id
  name     = var.domain_name
  type     = "MX"
  content  = "alt3.aspmx.l.google.com"
  priority = 10
  ttl      = 3600
  proxied  = false
}

resource "cloudflare_record" "mx_5" {
  zone_id  = cloudflare_zone.main.id
  name     = var.domain_name
  type     = "MX"
  content  = "alt4.aspmx.l.google.com"
  priority = 10
  ttl      = 3600
  proxied  = false
}

# TXT Records — Google site verification + SPF
resource "cloudflare_record" "txt_verification_1" {
  zone_id = cloudflare_zone.main.id
  name    = var.domain_name
  type    = "TXT"
  content = "google-site-verification=UNSHfmJjcJkjNQ8wxztqRu__l6BrZLIdXe6Vur2VSDo"
  ttl     = 300
  proxied = false
}

resource "cloudflare_record" "txt_verification_2" {
  zone_id = cloudflare_zone.main.id
  name    = var.domain_name
  type    = "TXT"
  content = "google-site-verification=cRnkEJmut92yS8Du-hV2O9f5gVYPnK5DrrAQOUdFcss"
  ttl     = 300
  proxied = false
}
