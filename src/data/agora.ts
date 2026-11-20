export interface AgoraHighlight {
  readonly label: string;
  readonly value: string;
  readonly detail: string;
}

export interface AgoraArchitectureLayer {
  readonly index: string;
  readonly tag: string;
  readonly title: string;
  readonly description: string;
  readonly stack: readonly string[];
}

export interface AgoraScreenShowcase {
  readonly id: string;
  readonly badge: string;
  readonly title: string;
  readonly caption: string;
  readonly lightSrc: string;
  readonly darkSrc: string;
  readonly alt: string;
  readonly width: number;
  readonly height: number;
}

export interface AgoraTrustPillar {
  readonly id: string;
  readonly tag: string;
  readonly title: string;
  readonly metric: string;
  readonly description: string;
}

export type AgoraNodeId = "flutter" | "firebase" | "nestjs" | "neo4j" | "stripe" | "gcp";

export interface AgoraBlueprintNode {
  readonly id: AgoraNodeId;
  readonly step: string;
  readonly label: string;
  readonly layer: string;
  readonly role: string;
  readonly summary: string;
  readonly decisions: readonly string[];
  readonly technologies: readonly string[];
}

export interface AgoraData {
  readonly name: string;
  readonly tagline: string;
  readonly headline: string;
  readonly lead: string;
  readonly spotlightSummary: string;
  readonly websiteUrl: string;
  readonly playStoreUrl: string;
  readonly iconPath: string;
  readonly statusBadge: string;
  readonly highlights: readonly AgoraHighlight[];
  readonly stackBadges: readonly string[];
  readonly screens: readonly AgoraScreenShowcase[];
  readonly trustPillars: readonly AgoraTrustPillar[];
  readonly architectureNodes: readonly AgoraBlueprintNode[];
  readonly architectureLayers: readonly AgoraArchitectureLayer[];
  readonly whyItMattersTitle: string;
  readonly whyItMattersBody: string;
  readonly whyItMattersPoints: readonly string[];
}

export const AGORA: AgoraData = {
  name: "Agora",
  tagline: "Flagship Product · Built & Operated by Ethereal Technologies",
  headline: "Agora — A two-sided cleaning marketplace engineered from the ground up",
  lead: "Agora is a live production platform connecting UK households with independent local cleaning professionals across web and Google Play. Conceived, architected, and operated in-house by Ethereal Technologies, it combines fintech-grade Stripe escrow protection, room-by-room photo proof, and zero per-lead fees for cleaners.",
  spotlightSummary:
    "We don't just advise on software architecture — we ship and operate our own. Agora is live on web and Google Play with independent cleaners onboarded, backed by Stripe Escrow Protection, a 48h Spotless Guarantee, Neo4j graph matching, and multi-party Stripe Connect payouts.",
  websiteUrl: "https://agora.cleaning",
  playStoreUrl: "https://play.google.com/store/apps/details?id=cleaning.agora&hl=en",
  iconPath: "/agora-icon.webp",
  statusBadge: "Live in Production",
  highlights: [
    {
      label: "Distribution",
      value: "Web & Google Play",
      detail: "Production cross-platform release live at agora.cleaning and on Google Play.",
    },
    {
      label: "Supply Network",
      value: "Onboarded Cleaners",
      detail: "Independent local pros with verified profiles, schedules & £0 per-lead fees.",
    },
    {
      label: "Escrow & Payouts",
      value: "Stripe Connect",
      detail: "Pre-authorised escrow checkout, 48h Spotless Guarantee & ~88% pro take-home.",
    },
    {
      label: "Engineering Ownership",
      value: "100% End-to-End",
      detail: "Flutter client, NestJS GraphQL API, Neo4j graph engine, and GCP Terraform IaC.",
    },
  ],
  stackBadges: [
    "Flutter",
    "NestJS",
    "GraphQL",
    "Neo4j",
    "Stripe Connect",
    "Firebase Auth",
    "GCP",
    "Terraform",
  ],
  screens: [
    {
      id: "cleaner-profile",
      badge: "DISCOVERY & TRUST",
      title: "Verified Pro Profiles & Before/After Proof",
      caption:
        "Stripe-verified cleaner badges, lockbox return reliability scores, and interactive before/after restoration galleries.",
      lightSrc: "/agora-screens/light/cleaner-profile.webp",
      darkSrc: "/agora-screens/dark/cleaner-profile.webp",
      alt: "Agora mobile screen showing a verified cleaner profile with before and after restoration photos",
      width: 873,
      height: 1806,
    },
    {
      id: "live-tracker",
      badge: "IN-FLIGHT EXECUTION",
      title: "Live Job Tracker & Room Checklists",
      caption:
        "Real-time clean completion progress, dynamic add-on extensions, and timestamped room-by-room photo verification.",
      lightSrc: "/agora-screens/light/live-tracker.webp",
      darkSrc: "/agora-screens/dark/live-tracker.webp",
      alt: "Agora live job progress screen displaying room-by-room checklists and verified completion photos",
      width: 873,
      height: 1806,
    },
    {
      id: "payout-settings",
      badge: "FINTECH & ESCROW",
      title: "Stripe Escrow & 10% Fair Payouts",
      caption:
        "24-hour escrow clearance, instant cash-out via Stripe Connect, and transparent fee reporting (~88% cleaner take-home).",
      lightSrc: "/agora-screens/light/payout-settings.webp",
      darkSrc: "/agora-screens/dark/payout-settings.webp",
      alt: "Agora earnings and payouts screen showing Stripe escrow balance, instant cash out, and flat 10% fee breakdown",
      width: 873,
      height: 1806,
    },
  ],
  trustPillars: [
    {
      id: "escrow",
      tag: "PAYMENT SAFETY",
      title: "Stripe Escrow Protection",
      metric: "Charged After Clean",
      description:
        "Customer funds are pre-authorised at booking and held safely in Stripe Connect escrow until the clean is verified complete.",
    },
    {
      id: "spotless",
      tag: "QUALITY GUARANTEE",
      title: "48h Spotless Guarantee & Photo Proof",
      metric: "Room-by-Room Proof",
      description:
        "Cleaners complete interactive room checklists with timestamped before/after photos, backed by a 48-hour spotless resolution guarantee.",
    },
    {
      id: "fair-fees",
      tag: "CLEANER ECONOMICS",
      title: "£0 Per-Lead Fees · Flat 10% Commission",
      metric: "~88% Net Take-Home",
      description:
        "Cleaners keep 100% of tips and pay zero pay-to-bid lead charges — taking home ~88% versus 30–45% traditional agency margins.",
    },
    {
      id: "lockbox",
      tag: "ACCESS SECURITY",
      title: "Encrypted Time-Windowed Lockbox Access",
      metric: "E2E Encrypted PINs",
      description:
        "Property key safe codes are end-to-end encrypted, scoped strictly to the active booking window, and protected by screenshot shields.",
    },
  ],
  architectureNodes: [
    {
      id: "flutter",
      step: "01",
      label: "Flutter Client",
      layer: "CLIENT LAYER",
      role: "Cross-Platform Mobile & Web App",
      summary:
        "Single Flutter codebase delivering native Android (Google Play) and responsive web experiences for homeowners and independent cleaners.",
      decisions: [
        "Unified booking wizard with property blueprint estimator & tiered add-ons",
        "In-flight cleaner checklist UI with structured before/after photo proof upload",
        "Strict screenshot shielding & time-windowed PIN reveal for home access",
      ],
      technologies: ["Flutter", "Dart", "Responsive Web", "Google Play"],
    },
    {
      id: "firebase",
      step: "02",
      label: "Firebase Auth",
      layer: "IDENTITY EDGE",
      role: "Role-Isolated Identity & Guards",
      summary:
        "Verifies JWT claims at the API boundary to isolate customer, cleaner, and admin capabilities without maintaining custom password infrastructure.",
      decisions: [
        "Stateless JWT verification inside Fastify/NestJS GraphQL context guards",
        "Fine-grained role claims separating homeowner bookings from cleaner payouts",
        "Seamless Google & email sign-in unified across mobile and web clients",
      ],
      technologies: ["Firebase Auth", "JWT Guards", "RBAC Claims"],
    },
    {
      id: "nestjs",
      step: "03",
      label: "NestJS GraphQL",
      layer: "API GATEWAY",
      role: "Fastify + Apollo Domain Core",
      summary:
        "Strongly typed GraphQL schema powered by NestJS on Fastify, orchestrating quote calculation, booking state machines, and external webhooks.",
      decisions: [
        "Single typed GraphQL contract shared across mobile, search web, and admin portals",
        "Deterministic booking lifecycle state machine (Confirmed → In Progress → Verified)",
        "Idempotent Stripe webhook handlers preventing duplicate payout or escrow transitions",
      ],
      technologies: ["NestJS", "Fastify", "Apollo GraphQL", "TypeScript"],
    },
    {
      id: "neo4j",
      step: "04",
      label: "Neo4j Graph",
      layer: "DATA & MATCHING",
      role: "Connected Marketplace Graph DB",
      summary:
        "Models cleaners, service radii, availability windows, repeat bookings, and verified property relationships natively as a graph.",
      decisions: [
        "Fast Cypher traversal for postcode radius, recurring slots & cleaner reliability rank",
        "First-class repeat-client & preferred-cleaner relationship modelling without heavy joins",
        "Consistent property blueprint & room-checklist graph schema",
      ],
      technologies: ["Neo4j", "Cypher", "Graph Modelling", "Google Maps Matrix"],
    },
    {
      id: "stripe",
      step: "05",
      label: "Stripe Connect",
      layer: "FINTECH & ESCROW",
      role: "Multi-Party Escrow & Payouts",
      summary:
        "Handles customer pre-authorisations, escrow holds, automated 10% platform fee splits, instant payouts, and cleaner identity KYC.",
      decisions: [
        "Pre-authorised payment intents that capture/release post-clean rather than upfront risk",
        "Transparent fee splitting preserving 100% of tips & ~88% net take-home for pros",
        "Built-in Stripe Connect onboarding and automated UK bank settlement",
      ],
      technologies: ["Stripe Connect", "Escrow Flows", "Connect KYC", "Webhooks"],
    },
    {
      id: "gcp",
      step: "06",
      label: "GCP + Terraform",
      layer: "CLOUD INFRASTRUCTURE",
      role: "Repeatable IaC & Cloud Run",
      summary:
        "Entire cloud topology — Cloud Run containers, DNS, secrets, IAM boundaries, and storage buckets — codified in Terraform across environments.",
      decisions: [
        "Environment parity between dev.agora and production via modular Terraform states",
        "Least-privilege GCP service accounts and automated secret injection",
        "Pay-per-request serverless compute keeping unit economics lean at early scale",
      ],
      technologies: ["Terraform", "Google Cloud", "Cloud Run", "GCS"],
    },
  ],
  architectureLayers: [
    {
      index: "01",
      tag: "CLIENT LAYER",
      title: "Cross-Platform Flutter & Web",
      description:
        "Unified consumer booking journeys, property blueprint estimation, cleaner onboarding workflows, and real-time availability management.",
      stack: ["Flutter", "Dart", "Responsive Web", "Google Play Release"],
    },
    {
      index: "02",
      tag: "DOMAIN & GRAPH ENGINE",
      title: "NestJS + GraphQL + Neo4j",
      description:
        "Fastify-backed NestJS GraphQL API resolving geographic service discovery, tiered pricing models, and availability graphs stored in Neo4j.",
      stack: ["NestJS", "Fastify", "Apollo GraphQL", "Neo4j Graph DB"],
    },
    {
      index: "03",
      tag: "PAYMENTS & INFRASTRUCTURE",
      title: "Stripe Connect + GCP Terraform",
      description:
        "Multi-party marketplace payouts via Stripe Connect, identity verification with Firebase Auth, and repeatable GCP cloud infrastructure via Terraform.",
      stack: ["Stripe Connect", "Firebase Auth", "Google Cloud", "Terraform"],
    },
  ],
  whyItMattersTitle: "Why building our own product makes us sharper consultants",
  whyItMattersBody:
    "Operating Agora in production means Ethereal Technologies navigates the exact same trade-offs your engineering leadership faces every week: shipping user value quickly without accumulating fragile shortcuts, keeping cloud bills lean, passing mobile store reviews, and maintaining zero-downtime payment flows.",
  whyItMattersPoints: [
    "Proven zero-to-one execution across mobile, API, graph data, and cloud IaC",
    "First-hand accountability for reliability, security boundaries, and Stripe escrow compliance",
    "Pragmatic prioritisation — engineering decisions tied directly to business outcomes",
  ],
};
