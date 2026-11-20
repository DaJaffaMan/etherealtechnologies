export type ServiceDomainId = "cloud" | "fullstack" | "data-legacy" | "leadership";

export interface ServicePillar {
  readonly id: ServiceDomainId;
  readonly index: string;
  readonly category: string;
  readonly title: string;
  readonly summary: string;
  readonly deliverables: readonly string[];
  readonly technologies: readonly string[];
}

export const SERVICE_PILLARS: readonly ServicePillar[] = [
  {
    id: "cloud",
    index: "01",
    category: "CLOUD & PLATFORM",
    title: "Cloud & IaC Architecture",
    summary:
      "Production AWS & GCP infrastructure codified with Terraform and Pulumi, backed by event-driven APIs and federated GraphQL supergraphs.",
    deliverables: [
      "Repeatable multi-environment Terraform & Pulumi estates",
      "Event-driven queues, serverless pipelines & edge caching",
      "Federated GraphQL supergraphs & API gateway consolidation",
    ],
    technologies: ["AWS", "GCP", "Terraform", "Pulumi", "GraphQL", "Docker"],
  },
  {
    id: "fullstack",
    index: "02",
    category: "PRODUCT DELIVERY",
    title: "Full-Stack & Mobile Apps",
    summary:
      "Zero-to-one web and cross-platform mobile applications engineered in TypeScript, Solid/React, Flutter, and NestJS with strict end-to-end typing.",
    deliverables: [
      "Cross-platform Flutter mobile releases & responsive SSR/SSG web apps",
      "Typed backend APIs (NestJS, Fastify, Spring Boot) & multi-party Stripe flows",
      "Unified Tailwind design systems built for rapid multi-brand theming",
    ],
    technologies: ["TypeScript", "SolidJS", "React", "Flutter", "NestJS", "Stripe"],
  },
  {
    id: "data-legacy",
    index: "03",
    category: "MODERNISATION",
    title: "Legacy & Data Systems",
    summary:
      "De-risking undocumented monoliths and roadside/embedded hardware protocols alongside OLTP-to-OLAP analytics and Neo4j graph modelling.",
    deliverables: [
      "Incremental monolith dismantling (PHP, Java 6 WAR -> Java 21 Spring Boot)",
      "OLTP query isolation & star-schema OLAP analytics migrations",
      "Graph database architecture (Neo4j), PostgreSQL, and isolated test harnesses",
    ],
    technologies: ["Java 21", "PostgreSQL", "Neo4j", "OLAP", "Spring Boot", "Angular"],
  },
  {
    id: "leadership",
    index: "04",
    category: "LEADERSHIP",
    title: "Technical Leadership",
    summary:
      "Interim tech leadership to bridge external consultancy handovers in-house, raise engineering standards, and accelerate developer onboarding.",
    deliverables: [
      "Interim Tech Lead & team mentoring during scale-up or restructuring",
      "Consultancy-to-in-house platform transition & handover governance",
      "Reproducible local environments cutting onboarding from days to hours",
    ],
    technologies: ["Architecture Review", "CI/CD", "Mentoring", "GDS Compliance", "Product Delivery"],
  },
];

export interface EngagementModel {
  readonly id: string;
  readonly index: string;
  readonly title: string;
  readonly cadence: string;
  readonly summary: string;
  readonly deliverables: readonly string[];
  readonly engagementParam: string;
  readonly ctaLabel: string;
}

export const ENGAGEMENT_MODELS: readonly EngagementModel[] = [
  {
    id: "audit",
    index: "01",
    title: "Architecture & Modernisation Audit",
    cadence: "1–2 Weeks · Fixed Scope",
    summary:
      "Rapid technical due diligence, legacy monolith de-risking, or cloud/database bottleneck diagnosis with an actionable execution roadmap.",
    deliverables: [
      "Line-by-line system, protocol & bottleneck audit",
      "Target cloud / data architecture & migration plan",
      "Prioritised engineering sequence to unblock delivery",
    ],
    engagementParam: "Legacy System Modernisation",
    ctaLabel: "Book an Audit",
  },
  {
    id: "embedded",
    index: "02",
    title: "Embedded Principal Delivery",
    cadence: "Sprint / Quarterly",
    summary:
      "Senior hands-on engineering and interim technical leadership embedded directly alongside your team to ship critical milestones or transition agency builds in-house.",
    deliverables: [
      "Hands-on full-stack, GraphQL & Terraform PR delivery",
      "Team mentoring, onboarding acceleration & CI/CD guardrails",
      "Clean knowledge transfer for long-term team autonomy",
    ],
    engagementParam: "Technical Leadership / Advisory",
    ctaLabel: "Discuss Embedded Support",
  },
  {
    id: "zero-to-one",
    index: "03",
    title: "Zero-to-One Product & Platform Build",
    cadence: "Milestone / Retainer",
    summary:
      "End-to-end engineering of greenfield web, mobile, and marketplace platforms — from schema and cloud IaC to production app store release.",
    deliverables: [
      "Greenfield Flutter, TypeScript / Solid / React & API stack",
      "Multi-party Stripe payments, auth & graph/SQL data layers",
      "Production GCP / AWS Terraform estate & deployment pipelines",
    ],
    engagementParam: "Full-Stack / Mobile Delivery",
    ctaLabel: "Scope a Build",
  },
];

