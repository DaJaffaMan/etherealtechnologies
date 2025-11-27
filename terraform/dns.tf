# Cloud DNS Managed Zone
resource "google_dns_managed_zone" "default" {
  name        = "ethereal-technologies-zone"
  dns_name    = "${var.domain_name}."
  description = "DNS zone for ${var.domain_name}"
  visibility  = "public"
}

# Root A Record - Points to the Global Load Balancer
resource "google_dns_record_set" "root_a" {
  name         = google_dns_managed_zone.default.dns_name
  managed_zone = google_dns_managed_zone.default.name
  type         = "A"
  ttl          = 300

  rrdatas = [google_compute_global_address.default.address]
}

# WWW CNAME Record - Points to root
resource "google_dns_record_set" "www_cname" {
  name         = "www.${google_dns_managed_zone.default.dns_name}"
  managed_zone = google_dns_managed_zone.default.name
  type         = "CNAME"
  ttl          = 300

  rrdatas = ["${var.domain_name}."]
}

# MX Records - Google Workspace
resource "google_dns_record_set" "mx" {
  name         = google_dns_managed_zone.default.dns_name
  managed_zone = google_dns_managed_zone.default.name
  type         = "MX"
  ttl          = 3600

  rrdatas = [
    "1 aspmx.l.google.com.",
    "5 alt1.aspmx.l.google.com.",
    "5 alt2.aspmx.l.google.com.",
    "10 alt3.aspmx.l.google.com.",
    "10 alt4.aspmx.l.google.com."
  ]
}

# TXT Records - Verification and SPF
resource "google_dns_record_set" "txt" {
  name         = google_dns_managed_zone.default.dns_name
  managed_zone = google_dns_managed_zone.default.name
  type         = "TXT"
  ttl          = 300

  rrdatas = [
    "\"google-site-verification=UNSHfmJjcJkjNQ8wxztqRu__l6BrZLIdXe6Vur2VSDo\"",
    "\"google-site-verification=cRnkEJmut92yS8Du-hV2O9f5gVYPnK5DrrAQOUdFcss\""
  ]
}
