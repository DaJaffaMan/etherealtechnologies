# Terraform State Bucket
resource "google_storage_bucket" "terraform_state" {
  name          = "ethereal-technologies-terraform-state"
  location      = "US"
  force_destroy = false
  versioning {
    enabled = true
  }
}
