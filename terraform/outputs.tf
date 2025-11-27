output "load_balancer_ip" {
  description = "The global IP address of the load balancer"
  value       = google_compute_global_address.default.address
}

output "bucket_url" {
  description = "The URL of the GCS bucket"
  value       = google_storage_bucket.static_site.url
}
