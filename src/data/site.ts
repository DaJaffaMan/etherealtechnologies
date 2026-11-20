export interface NavLinkItem {
  readonly label: string;
  readonly href: string;
}

export interface SiteConfig {
  readonly name: string;
  readonly shortMark: string;
  readonly legalName: string;
  readonly tagline: string;
  readonly description: string;
  readonly baseUrl: string;
  readonly location: string;
  readonly region: string;
  readonly founder: string;
  readonly email: string;
  readonly phoneDisplay: string;
  readonly phoneHref: string;
  readonly githubUrl: string;
  readonly linkedinUrl: string;
  readonly ogImage: string;
  readonly copyrightYear: number;
}

export const SITE: SiteConfig = {
  name: "Ethereal Technologies",
  shortMark: "ET",
  legalName: "Ethereal Technologies Ltd",
  tagline: "Principal-Led Software Consultancy & Product Studio",
  description:
    "Principal-led UK software consultancy specialising in cloud architecture, legacy modernisation, and full-stack product delivery — and the studio behind Agora.",
  baseUrl: "https://www.etherealtechnologies.co.uk",
  location: "Bristol, UK",
  region: "United Kingdom (Remote UK & International)",
  founder: "Jack Jefferies",
  email: "jack@etherealtechnologies.co.uk",
  phoneDisplay: "+44 7506 479 737",
  phoneHref: "tel:+447506479737",
  githubUrl: "https://github.com/Dajaffaman",
  linkedinUrl: "https://www.linkedin.com/in/jack-jefferies",
  ogImage: "https://www.etherealtechnologies.co.uk/og-preview.jpg?v=4",
  copyrightYear: 2026,
};

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
  readonly [key: string]: unknown;
}

export function buildOrganizationSchema(): JsonLdDocument {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE.name,
    legalName: SITE.legalName,
    url: SITE.baseUrl,
    logo: `${SITE.baseUrl}/logo.svg`,
    email: SITE.email,
    telephone: SITE.phoneDisplay,
    description: SITE.description,
    founder: {
      "@type": "Person",
      name: SITE.founder,
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Bristol",
      addressCountry: "GB",
    },
    sameAs: [SITE.githubUrl, SITE.linkedinUrl, "https://agora.cleaning"],
  };
}

export function buildPersonSchema(): JsonLdDocument {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: SITE.founder,
    jobTitle: "Founder & Principal Software Consultant",
    worksFor: {
      "@type": "Organization",
      name: SITE.name,
      url: SITE.baseUrl,
    },
    url: `${SITE.baseUrl}/about`,
    image: `${SITE.baseUrl}/profile.jpeg`,
    email: SITE.email,
    sameAs: [SITE.githubUrl, SITE.linkedinUrl],
    knowsAbout: [
      "Cloud Architecture",
      "AWS",
      "Google Cloud Platform",
      "Terraform",
      "TypeScript",
      "GraphQL",
      "Neo4j",
      "Flutter",
      "Legacy System Modernisation",
    ],
  };
}

export function buildAgoraSoftwareSchema(): JsonLdDocument {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Agora",
    applicationCategory: "LifestyleApplication",
    operatingSystem: "Android, Web",
    url: "https://agora.cleaning",
    downloadUrl: "https://play.google.com/store/apps/details?id=cleaning.agora&hl=en",
    description:
      "A two-sided professional cleaning services marketplace platform built and operated by Ethereal Technologies, featuring real-time availability, tiered pricing, and Stripe Connect payouts.",
    creator: {
      "@type": "Organization",
      name: SITE.name,
      url: SITE.baseUrl,
    },
  };
}
