# Ethereal Technologies Corporate Site

The official corporate web platform, engineering consultancy portal, and interactive technical portfolio for **Ethereal Technologies** (Bristol, UK). 

The site serves as a live digital sandbox showcasing production architectures, full-stack competencies, and active startup ventures. It is built with **React**, **TypeScript**, and **Tailwind CSS**, hosted on **Google Cloud Storage (GCS)**, and delivered globally via **Cloudflare** (DNS, SSL, CDN, and Edge Workers).

---

## What the Site Does

The platform is designed to provide prospective clients, partners, and engineering teams with transparent, interactive demonstrations of high-impact software engineering capabilities:

* **Venture Showcase**: Spotlights active production applications, prominently featuring the [Agora Mobile Platform](https://agora.cleaning) (a two-sided service marketplace on Google Play) built with Flutter, NestJS, Neo4j, and Stripe Connect.
* **Interactive Developer Lab (`DevLab`)**: An in-browser engineering playground featuring real-time client-side demonstrations:
  * **Cryptography & Hashing**: Web Crypto API demonstrations of SHA-256 generation, salt injection, avalanche effect analysis, and comparative benchmarking of key derivation functions (PBKDF2, Bcrypt, Scrypt, Argon2).
  * **Database Architecture Simulator (OLTP vs OLAP)**: Live client-side simulation processing 50,000+ IoT records to contrast row-oriented (relational) scan overhead against columnar (star-schema) analytical aggregations.
  * **Cloud Architecture Simulator**: An interactive topological blueprint of Agora's distributed cloud stack (Flutter client &rarr; Fastify / NestJS / Apollo GraphQL Gateway &rarr; Firebase Auth Guard &rarr; Neo4j Graph DB, Companies House API, and Google Maps Distance Matrix).
  * **Bitwise Roadside Protocols**: An interactive byte packet encoder/decoder demonstrating bitwise shift message parsing, reverse-engineered from roadside variable message signs (VMS).
  * **Automated Unit Test Runner**: A browser-embedded test runner executing test suites for the algorithmic lab modules with live execution progress and console output.
* **Interactive Skills & Experience Matrix**: A dynamic multi-category filtering interface linking technical proficiencies directly to verified enterprise and startup roles (Agora, Costain Group PLC, Homelink, Octopus Energy, Sero, Superdry, BJSS, etc.).
* **Modern UI/UX & Native View Transitions**: Built with a responsive glassmorphic design system, dynamic scroll progress indicators, and fluid theme switching (Dark, Light, System) powered by the native CSS **View Transitions API** (`document.startViewTransition`) with reduced-motion support.

---

## Architecture & Infrastructure

```
                                  +---------------------------------------+
                                  |            Client Browser             |
                                  +---------------------------------------+
                                                      |
                                                      v  (HTTPS / TLS 1.2+)
                                  +---------------------------------------+
                                  |            Cloudflare Edge            |
                                  |  - DNS (Apex & Subdomains)            |
                                  |  - SSL Termination (Flexible mode)    |
                                  |  - Global CDN Caching                 |
                                  +---------------------------------------+
                                                      |
                                                      v
                                  +---------------------------------------+
                                  |  Cloudflare Worker: ethereal-gcs-proxy|
                                  |  - Apex -> www 301 Redirect           |
                                  |  - SPA URL Rewrites (Client Router)   |
                                  |  - Fallback /index.html on 404        |
                                  +---------------------------------------+
                                                      |
                                                      v  (Public GCS URL)
+-----------------------------------------------------------------------------------------+
| Google Cloud Platform (GCP)                                                            |
|                                                                                         |
|   +---------------------------------------------+   +---------------------------------+ |
|   |  GCS Bucket: ethereal-technologies-         |   |  GCS Bucket: ethereal-          | |
|   |  corporate-site                             |   |  technologies-terraform-state   | |
|   |  (Static build artifacts: HTML, CSS, JS)    |   |  (Remote Terraform State)       | |
|   +---------------------------------------------+   +---------------------------------+ |
+-----------------------------------------------------------------------------------------+
```

* **Frontend**: React 18 (TypeScript), Tailwind CSS, FontAwesome Icons.
* **Edge / CDN & DNS**: Cloudflare DNS Zone with automated HTTPS enforcement and CDN caching.
* **Edge Compute (Worker)**: A lightweight Cloudflare Worker script (`ethereal-gcs-proxy`) intercepts incoming requests to proxy files directly from the origin GCS bucket and seamlessly handle single-page application (SPA) client-side routes.
* **Static Origin Storage**: Google Cloud Storage (`ethereal-technologies-corporate-site`) configured for public static web hosting.
* **Infrastructure as Code (IaC)**: Terraform (v1.5.7+) managing GCP storage resources, Cloudflare DNS records, Cloudflare Zone settings, and Cloudflare Worker scripts/routes.
* **Remote State**: Stored remotely in a dedicated versioned GCS bucket (`ethereal-technologies-terraform-state`).
* **CI/CD**: Automated build, infrastructure provisioning, and deployment via GitHub Actions.

---

## Prerequisites

Ensure you have the following installed locally:

* **Node.js**: v18+ (v22 recommended, managed via `.tool-versions`)
* **pnpm**: v9+ (`pnpm 9.1.0` pinned in `.tool-versions`)
* **Terraform**: v1.5.7+
* **Google Cloud SDK (`gcloud`)**: For local GCP administrative actions
* **SOPS & age**: (Optional) For encrypting/decrypting local sensitive Terraform variable files

---

## Local Development

1. **Install dependencies**:
   ```bash
   pnpm install --frozen-lockfile
   ```

2. **Start the local development server**:
   ```bash
   pnpm start
   ```
   The site will be available at [http://localhost:3000](http://localhost:3000).

3. **Run unit tests**:
   ```bash
   pnpm test
   ```

4. **Create a production build**:
   ```bash
   pnpm run build
   ```

---

## Infrastructure Management (Terraform)

All infrastructure is defined as code in the `terraform/` directory.

### Key Files
* `main.tf`: Configures the GCP and Cloudflare providers, GCS static site bucket, and public IAM read permissions.
* `cloudflare.tf`: Manages the Cloudflare DNS zone, Apex/WWW CNAME records, Google Workspace mail routing (MX, SPF, DMARC), Google site verification TXT records, and NS record delegation for the `dev.agora` subdomain.
* `worker.tf`: Implements and binds the `ethereal-gcs-proxy` Cloudflare Worker for request rewriting and apex-to-www redirection.
* `state_bucket.tf`: Provisions the versioned GCS bucket used for remote state storage.
* `variables.tf`: Defines required input variables (`domain_name`, `bucket_name`, `project_id`, `region`, `cloudflare_account_id`, `cloudflare_api_token`).
* `outputs.tf`: Exports `cloudflare_nameservers`, `bucket_url`, and `website_url`.

### Local Execution
To inspect or plan infrastructure changes locally:

```bash
cd terraform
terraform init
terraform plan -var="cloudflare_api_token=<YOUR_CLOUDFLARE_TOKEN>"
```

> [!NOTE]
> Sensitive configuration variables can be stored encrypted with SOPS and age in `terraform/secrets.yaml`. Never commit decrypted secret files (`secrets.dec.yaml`).

---

## Deployment (CI/CD)

Deployments are fully automated via GitHub Actions on every push to the `main` branch ([`.github/workflows/deploy.yml`](.github/workflows/deploy.yml)).

### Deployment Pipeline Workflow:
1. **Build Step**: Checks out code, sets up Node.js with `pnpm` caching, installs dependencies (`pnpm install --frozen-lockfile`), and compiles the production bundle (`pnpm run build`).
2. **GCP Authentication**: Authenticates against Google Cloud using the Service Account key stored in GitHub Secrets.
3. **Terraform Apply**: Runs `terraform init`, `terraform plan`, and `terraform apply -auto-approve` using `TF_VAR_cloudflare_api_token` to synchronize DNS, Worker, and GCS infrastructure.
4. **GCS Artifact Upload**: Syncs the contents of the `build/` directory directly into the static GCS bucket (`ethereal-technologies-corporate-site`).

### Required GitHub Secrets

To enable the deployment workflow, ensure the following repository secrets are configured in GitHub Settings (&rarr; Secrets and variables &rarr; Actions):

| Secret Name | Description | Source / Format |
|---|---|---|
| `GOOGLE_SERVICES_JSON` | GCP Service Account credentials JSON with Owner or Storage Admin / Viewer permissions | Generated via `./setup_gcp_auth.sh` or GCP Console |
| `CLOUDFLARE_API_TOKEN` | Cloudflare API token with `Zone:Edit`, `DNS:Edit`, and `Workers Scripts:Edit` permissions | Cloudflare Dashboard &rarr; API Tokens |

#### Generating GCP Credentials
A convenience script is included to generate a dedicated service account key:
```bash
./setup_gcp_auth.sh
```
Copy the raw JSON output and add it as the `GOOGLE_SERVICES_JSON` secret in GitHub.

---

## Domain & DNS Routing

* **Primary DNS**: Managed completely via Cloudflare DNS. Nameservers output by Terraform (`terraform output cloudflare_nameservers`) are configured at the domain registrar.
* **Apex Redirection**: The apex domain (`etherealtechnologies.co.uk`) redirects via HTTP 301 to `https://www.etherealtechnologies.co.uk` at the Cloudflare Worker layer.
* **Email Configuration**: Fully configured with Google Workspace mail exchange (`aspmx.l.google.com`), SPF validation (`v=spf1 include:_spf.google.com ~all`), and DMARC enforcement (`v=DMARC1; p=none;`).
* **Subdomain Delegation**: `dev.agora.etherealtechnologies.co.uk` NS records are delegated directly to dedicated Google Cloud DNS servers for the Agora environment.
