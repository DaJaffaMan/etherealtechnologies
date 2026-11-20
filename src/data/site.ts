import type { FaqItem } from "./faqs";
import { ENGAGEMENT_MODELS } from "./services";
import { CASE_STUDIES, CERTIFICATIONS } from "./work";

export interface NavLinkItem {
  readonly label: string;
  readonly href: string;
}

export interface SiteConfig {
  readonly name: string;
  readonly shortMark: string;
  readonly legalName: string;
  readonly companyNumber: string;
  readonly vatNumber: string;
  readonly tagline: string;
  readonly description: string;
  readonly baseUrl: string;
  readonly location: string;
  readonly region: string;
  readonly areaServed: readonly string[];
  readonly founder: string;
  readonly email: string;
  readonly phoneDisplay: string;
  readonly phoneHref: string;
  readonly githubUrl: string;
  readonly linkedinUrl: string;
  readonly companiesHouseUrl: string;
  readonly ogImage: string;
  readonly ogImageAlt: string;
  readonly copyrightYear: number;
}

export const SITE: SiteConfig = {
  name: "Ethereal Technologies",
  shortMark: "ET",
  legalName: "Ethereal Technologies Ltd",
  companyNumber: "11274880",
  vatNumber: "GB291330321",
  tagline: "Principal-Led Software Consultancy & Product Studio",
  description:
    "Principal-led UK software consultancy specialising in cloud architecture, legacy modernisation, and full-stack product delivery — and the studio behind Agora.",
  baseUrl: "https://www.etherealtechnologies.co.uk",
  location: "Bristol, UK",
  region: "Bristol, UK · Remote UK & International",
  areaServed: ["United Kingdom", "Europe", "Remote International"],
  founder: "Jack Jefferies",
  email: "jack@etherealtechnologies.co.uk",
  phoneDisplay: "+44 7506 479 737",
  phoneHref: "tel:+447506479737",
  githubUrl: "https://github.com/DaJaffaMan",
  linkedinUrl: "https://www.linkedin.com/in/jack-jefferies",
  companiesHouseUrl: "https://find-and-update.company-information.service.gov.uk/company/11274880",
  ogImage: "https://www.etherealtechnologies.co.uk/og-preview.jpg?v=5",
  ogImageAlt:
    "Ethereal Technologies — Principal-Led Software Consultancy & Product Studio in Bristol, UK, creators of Agora",
  copyrightYear: 2026,
};

export const SCHEMA_IDS = {
  organization: `${SITE.baseUrl}/#organization`,
  website: `${SITE.baseUrl}/#website`,
  founder: `${SITE.baseUrl}/#founder`,
  agora: "https://agora.cleaning/#software",
  agoraOrg: "https://agora.cleaning/#organization",
} as const;

export interface AvailabilityInfo {
  readonly status: string;
  readonly detail: string;
}

export const AVAILABILITY: AvailabilityInfo = {
  status: "Available for select Q1/Q2 engagements",
  detail: "Architecture audits, embedded principal delivery & zero-to-one platform builds",
};

export const NAV_LINKS: readonly NavLinkItem[] = [
  { label: "Home", href: "/" },
  { label: "Agora", href: "/agora" },
  { label: "Work", href: "/work" },
  { label: "About", href: "/about" },
];

export const CLIENT_ORGS: readonly string[] = [
  "Costain",
  "Octopus Energy",
  "Sero",
  "Superdry",
  "BJSS",
  "Homelink",
  "Nominet",
];

export interface JsonLdDocument {
  readonly "@context": "https://schema.org";
  readonly "@graph"?: readonly Record<string, unknown>[];
  readonly [key: string]: unknown;
}

export interface BreadcrumbEntry {
  readonly name: string;
  readonly path: string;
}

function canonicalFor(path: string): string {
  const clean = path === "/" ? "/" : path.replace(/\/+$/, "");
  return `${SITE.baseUrl}${clean}`;
}

export function buildBreadcrumbNode(items: readonly BreadcrumbEntry[]): Record<string, unknown> {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((entry, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: entry.name,
      item: canonicalFor(entry.path),
    })),
  };
}

export function buildFaqNode(pagePath: string, faqs: readonly FaqItem[]): Record<string, unknown> {
  const pageUrl = canonicalFor(pagePath);
  return {
    "@type": "FAQPage",
    "@id": `${pageUrl}#faq`,
    url: pageUrl,
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function buildHomeGraph(faqs: readonly FaqItem[]): JsonLdDocument {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": SCHEMA_IDS.website,
        url: `${SITE.baseUrl}/`,
        name: SITE.name,
        description: SITE.description,
        inLanguage: "en-GB",
        publisher: { "@id": SCHEMA_IDS.organization },
      },
      {
        "@type": ["Organization", "ProfessionalService"],
        "@id": SCHEMA_IDS.organization,
        name: SITE.name,
        legalName: SITE.legalName,
        identifier: {
          "@type": "PropertyValue",
          propertyID: "UK Companies House",
          value: SITE.companyNumber,
        },
        vatID: SITE.vatNumber,
        url: `${SITE.baseUrl}/`,
        logo: {
          "@type": "ImageObject",
          url: `${SITE.baseUrl}/logo.svg?v=3`,
        },
        image: SITE.ogImage,
        email: SITE.email,
        telephone: SITE.phoneDisplay,
        description: SITE.description,
        areaServed: [...SITE.areaServed],
        founder: { "@id": SCHEMA_IDS.founder },
        address: {
          "@type": "PostalAddress",
          addressLocality: "Bristol",
          addressCountry: "GB",
        },
        sameAs: [SITE.githubUrl, SITE.linkedinUrl, SITE.companiesHouseUrl],
        subOrganization: {
          "@type": "Organization",
          "@id": SCHEMA_IDS.agoraOrg,
          name: "Agora Cleaning",
          url: "https://agora.cleaning",
        },
        brand: {
          "@type": "Brand",
          name: "Agora",
          url: "https://agora.cleaning",
          logo: `${SITE.baseUrl}/agora-icon.webp`,
        },
        owns: { "@id": SCHEMA_IDS.agora },
        subjectOf: [
          {
            "@type": "DigitalDocument",
            name: "Ethereal Technologies AI & LLM Overview (llms.txt)",
            url: `${SITE.baseUrl}/llms.txt`,
            encodingFormat: "text/markdown",
          },
          {
            "@type": "DigitalDocument",
            name: "Ethereal Technologies Complete Engineering Reference (llms-full.txt)",
            url: `${SITE.baseUrl}/llms-full.txt`,
            encodingFormat: "text/markdown",
          },
        ],
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Software Consultancy & Product Delivery Services",
          itemListElement: ENGAGEMENT_MODELS.map((model) => ({
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: model.title,
              description: model.summary,
              serviceType: model.engagementParam,
              provider: { "@id": SCHEMA_IDS.organization },
              areaServed: [...SITE.areaServed],
            },
          })),
        },
      },
      {
        "@type": "Person",
        "@id": SCHEMA_IDS.founder,
        name: SITE.founder,
        jobTitle: "Founder & Principal Software Consultant",
        url: `${SITE.baseUrl}/about`,
        worksFor: { "@id": SCHEMA_IDS.organization },
      },
      buildFaqNode("/", faqs),
    ],
  };
}

export function buildAgoraGraph(faqs: readonly FaqItem[]): JsonLdDocument {
  return {
    "@context": "https://schema.org",
    "@graph": [
      buildBreadcrumbNode([
        { name: "Home", path: "/" },
        { name: "Agora", path: "/agora" },
      ]),
      {
        "@type": "SoftwareApplication",
        "@id": SCHEMA_IDS.agora,
        name: "Agora",
        applicationCategory: "LifestyleApplication",
        operatingSystem: "Android, Web",
        url: "https://agora.cleaning",
        downloadUrl: "https://play.google.com/store/apps/details?id=cleaning.agora&hl=en",
        image: `${SITE.baseUrl}/agora-icon.webp`,
        description:
          "A two-sided professional UK cleaning services marketplace platform built and operated in-house by Ethereal Technologies Ltd, featuring Stripe Connect escrow, a 48h Spotless Guarantee, room-by-room photo verification, and Neo4j matching.",
        featureList: [
          "Stripe Connect T-72h Pre-Auth Escrow Protection",
          "48h Spotless Guarantee with timestamped photo proof",
          "£0 per-lead fees and flat 10% Agora commission for independent cleaners",
          "Encrypted time-windowed lockbox PIN access",
          "Real-time availability and Neo4j geospatial matching",
        ],
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "GBP",
        },
        creator: { "@id": SCHEMA_IDS.organization },
        publisher: { "@id": SCHEMA_IDS.organization },
        provider: { "@id": SCHEMA_IDS.agoraOrg },
      },
      buildFaqNode("/agora", faqs),
    ],
  };
}

export function buildWorkGraph(): JsonLdDocument {
  return {
    "@context": "https://schema.org",
    "@graph": [
      buildBreadcrumbNode([
        { name: "Home", path: "/" },
        { name: "Work & Case Studies", path: "/work" },
      ]),
      {
        "@type": "CollectionPage",
        "@id": `${SITE.baseUrl}/work#page`,
        url: `${SITE.baseUrl}/work`,
        name: `Selected Work & Case Studies | ${SITE.name}`,
        description:
          "Client engineering case studies across national infrastructure, clean energy, IoT analytics, net-zero PropTech, and global retail.",
        about: { "@id": SCHEMA_IDS.organization },
        mainEntity: {
          "@type": "ItemList",
          itemListElement: CASE_STUDIES.map((study, index) => ({
            "@type": "ListItem",
            position: index + 1,
            item: {
              "@type": "CreativeWork",
              name: `${study.client} — ${study.headline}`,
              description: study.summary,
              author: { "@id": SCHEMA_IDS.organization },
              keywords: study.stack.join(", "),
            },
          })),
        },
      },
    ],
  };
}

export function buildAboutGraph(): JsonLdDocument {
  return {
    "@context": "https://schema.org",
    "@graph": [
      buildBreadcrumbNode([
        { name: "Home", path: "/" },
        { name: "About", path: "/about" },
      ]),
      {
        "@type": "AboutPage",
        "@id": `${SITE.baseUrl}/about#page`,
        url: `${SITE.baseUrl}/about`,
        name: `About & Principal Profile | ${SITE.name}`,
        mainEntity: { "@id": SCHEMA_IDS.founder },
        about: { "@id": SCHEMA_IDS.organization },
      },
      {
        "@type": "Person",
        "@id": SCHEMA_IDS.founder,
        name: SITE.founder,
        jobTitle: "Founder & Principal Software Consultant",
        worksFor: { "@id": SCHEMA_IDS.organization },
        url: `${SITE.baseUrl}/about`,
        image: `${SITE.baseUrl}/profile.webp`,
        email: SITE.email,
        sameAs: [SITE.githubUrl, SITE.linkedinUrl],
        knowsAbout: [
          "Cloud Architecture",
          "AWS",
          "Google Cloud Platform",
          "Terraform",
          "TypeScript",
          "SolidJS",
          "GraphQL",
          "Neo4j",
          "Flutter",
          "Legacy System Modernisation",
        ],
        hasCredential: CERTIFICATIONS.map((cert) => ({
          "@type": "EducationalOccupationalCredential",
          name: cert.name,
          recognizedBy: {
            "@type": "Organization",
            name: cert.issuer,
          },
        })),
      },
    ],
  };
}

export function buildContactGraph(): JsonLdDocument {
  return {
    "@context": "https://schema.org",
    "@graph": [
      buildBreadcrumbNode([
        { name: "Home", path: "/" },
        { name: "Contact", path: "/contact" },
      ]),
      {
        "@type": "ContactPage",
        "@id": `${SITE.baseUrl}/contact#page`,
        url: `${SITE.baseUrl}/contact`,
        name: `Contact & Consultancy Inquiries | ${SITE.name}`,
        description:
          "Start a principal-led consultancy engagement, architecture audit, or product build inquiry with Ethereal Technologies Ltd.",
        mainEntity: {
          "@type": "Organization",
          "@id": SCHEMA_IDS.organization,
          name: SITE.name,
          legalName: SITE.legalName,
          identifier: SITE.companyNumber,
          vatID: SITE.vatNumber,
          contactPoint: {
            "@type": "ContactPoint",
            contactType: "Consultancy Inquiries",
            email: SITE.email,
            telephone: SITE.phoneDisplay,
            areaServed: [...SITE.areaServed],
            availableLanguage: ["English", "Japanese"],
          },
        },
      },
    ],
  };
}
