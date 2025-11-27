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
Terraform state is stored **remotely** in a Google Cloud Storage bucket (`ethereal-technologies-terraform-state`). This allows GitHub Actions to manage the infrastructure safely.

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
We have provided a helper script to generate the correct Service Account Key for the project.

1.  Run the setup script:
    ```bash
    ./setup_gcp_auth.sh
    ```
2.  Copy the **Raw JSON** output from the terminal.
3.  Paste it directly into the GitHub Secret `GOOGLE_SERVICES_JSON`.

*This command copies the output directly to your clipboard, ready to be pasted into GitHub Secrets.*

## DNS Configuration (Migration to Cloud DNS)

We have migrated DNS management to **Google Cloud DNS**. This allows for better integration with GCP services and easier management of subdomains.

### 1. Apply Terraform Changes
Run the **Terraform Apply** workflow in GitHub Actions. This will create the Cloud DNS Managed Zone and replicate your existing records.

### 2. Retrieve Nameservers
After the Terraform apply completes, check the **Run Terraform Apply** step logs in GitHub Actions. You will see an output named `nameservers` listing the assigned Google nameservers (e.g., `ns-cloud-a1.googledomains.com`).

Alternatively, you can retrieve them locally:
```bash
cd terraform
terraform output nameservers
```

### 3. Update Nameservers in Squarespace
1.  Log in to your **Squarespace** account.
2.  Navigate to **Domains** -> **DNS Settings**.
3.  Select **Use Custom Nameservers**.
4.  Enter the nameservers provided by the Terraform output.
5.  Save your changes.

> [!IMPORTANT]
> DNS propagation can take up to 48 hours. During this time, traffic will gradually shift to the new nameservers. Since we replicated existing records, there should be no downtime.
