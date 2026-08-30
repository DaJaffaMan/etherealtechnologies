variable "project_id" {
  description = "The GCP project ID"
  type        = string
  default     = "ethereal-technologies"
}

variable "region" {
  description = "The GCP region"
  type        = string
  default     = "us-central1"
}

variable "domain_name" {
  description = "The domain name for the website"
  type        = string
}

variable "bucket_name" {
  description = "The name of the GCS bucket — must match www.<domain_name> for CNAME routing"
  type        = string
}

variable "cloudflare_api_token" {
  description = "Cloudflare API token with Zone:Write, DNS:Write, Zone Settings:Write permissions"
  type        = string
  sensitive   = true
}

variable "cloudflare_account_id" {
  description = "Cloudflare Account ID"
  type        = string
}
