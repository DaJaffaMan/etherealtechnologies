# Ethereal Technologies Corporate Site

This repository contains the source code for the Ethereal Technologies corporate website, built with React and deployed to Google Cloud Platform (GCP).

## Architecture & Tools

-   **Frontend**: React (Create React App)
-   **Infrastructure**: Terraform
-   **Cloud Provider**: Google Cloud Platform (GCP)
    -   **Storage**: Google Cloud Storage (GCS) for static site hosting.
    -   **Networking**: Global HTTPS Load Balancer with Google-managed SSL certificates.
-   **CI/CD**: GitHub Actions for automated building and deployment.

## Prerequisites

-   Node.js (v18+)
-   Terraform (v1.5.7+)
-   GCP Account & Project (`ethereal-technologies`)

## Local Development

1.  Install dependencies:
    ```bash
    npm install
    ```
2.  Start the development server:
    ```bash
    npm start
    ```

## Infrastructure (Terraform)

The infrastructure is managed via Terraform in the `terraform/` directory.

### State Management
Terraform state is stored **locally** in `terraform/terraform.tfstate` and is **ignored** by Git. Do not delete this file if you want to manage existing resources.

### Configuration
Variables are defined in `terraform/variables.tf`.
-   `domain_name`: `etherealtechnologies.co.uk`
-   `bucket_name`: `ethereal-technologies-corporate-site`
-   `project_id`: `ethereal-technologies`

### Applying Changes
```bash
cd terraform
terraform init
terraform plan
terraform apply
```

## Deployment (CI/CD)

Deployments are automated using GitHub Actions on push to the `main` branch.

### Secrets Configuration

The workflow requires a Service Account Key to authenticate with GCP. This key is stored as a **Base64 encoded** GitHub Secret.

**Secret Name**: `GOOGLE_SERVICES_JSON`

#### Generating the Secret
To generate the base64 encoded string from your local service account key file (assumed to be at `$HOME/.config/gcloud/serviceAccountKey.json`), run the following command:

```bash
base64 -i $HOME/.config/gcloud/serviceAccountKey.json | tr -d '\n' | pbcopy
```

*This command copies the output directly to your clipboard, ready to be pasted into GitHub Secrets.*

## DNS Configuration

The Terraform output provides the Load Balancer IP address. You must configure your domain's DNS A record to point to this IP.

```bash
# Get the IP address
cd terraform
terraform output load_balancer_ip
```
