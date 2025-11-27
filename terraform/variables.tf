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
  description = "The name of the GCS bucket (must be globally unique)"
  type        = string
}
