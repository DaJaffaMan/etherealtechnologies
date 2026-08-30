output "cloudflare_nameservers" {
  description = "Cloudflare nameservers — update these at your domain registrar to activate Cloudflare DNS"
  value       = cloudflare_zone.main.name_servers
}

output "bucket_url" {
  description = "The URL of the GCS bucket"
  value       = google_storage_bucket.static_site.url
}

output "website_url" {
  description = "Public website URL"
  value       = "https://www.${var.domain_name}"
}
