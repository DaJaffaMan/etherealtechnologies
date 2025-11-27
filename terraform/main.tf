terraform {
  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "~> 4.0"
    }
  }
  backend "gcs" {
    bucket = "ethereal-technologies-terraform-state"
    prefix = "terraform/state"
  }
}

provider "google" {
  project = var.project_id
  region  = var.region
}

# GCS Bucket for Static Site
resource "google_storage_bucket" "static_site" {
  name          = var.bucket_name
  location      = "US"
  force_destroy = true

  website {
    main_page_suffix = "index.html"
    not_found_page   = "index.html" # React router handling
  }

  cors {
    origin          = ["*"]
    method          = ["GET", "HEAD", "OPTIONS"]
    response_header = ["*"]
    max_age_seconds = 3600
  }
}

# Make bucket public
resource "google_storage_bucket_iam_member" "public_rule" {
  bucket = google_storage_bucket.static_site.name
  role   = "roles/storage.objectViewer"
  member = "allUsers"
}

# Reserve a global IP for the Load Balancer
resource "google_compute_global_address" "default" {
  name = "website-lb-ip"
}

# Managed SSL Certificate
resource "google_compute_managed_ssl_certificate" "default" {
  name = "website-ssl-cert-v2"

  managed {
    domains = [var.domain_name, "www.${var.domain_name}"]
  }
}

# Backend Bucket
resource "google_compute_backend_bucket" "default" {
  name        = "website-backend-bucket"
  bucket_name = google_storage_bucket.static_site.name
  enable_cdn  = true
}

# URL Map
resource "google_compute_url_map" "default" {
  name            = "website-url-map"
  default_service = google_compute_backend_bucket.default.id
}

# HTTPS Proxy
resource "google_compute_target_https_proxy" "default" {
  name             = "website-https-proxy"
  url_map          = google_compute_url_map.default.id
  ssl_certificates = [google_compute_managed_ssl_certificate.default.id]
}

# Forwarding Rule
resource "google_compute_global_forwarding_rule" "default" {
  name       = "website-forwarding-rule"
  target     = google_compute_target_https_proxy.default.id
  port_range = "443"
  ip_address = google_compute_global_address.default.address
}

# HTTP Proxy (Redirect to HTTPS) - Optional but recommended
resource "google_compute_url_map" "https_redirect" {
  name = "website-https-redirect"

  default_url_redirect {
    https_redirect         = true
    redirect_response_code = "MOVED_PERMANENTLY_DEFAULT"
    strip_query            = false
  }
}

resource "google_compute_target_http_proxy" "https_redirect" {
  name    = "website-http-proxy"
  url_map = google_compute_url_map.https_redirect.id
}

resource "google_compute_global_forwarding_rule" "https_redirect" {
  name       = "website-http-forwarding-rule"
  target     = google_compute_target_http_proxy.https_redirect.id
  port_range = "80"
  ip_address = google_compute_global_address.default.address
}
