import type { ServiceDomainId } from "./services";

export interface CaseStudyMetric {
  readonly value: string;
  readonly label: string;
}

export interface CaseStudy {
  readonly id: string;
  readonly client: string;
  readonly sector: string;
  readonly period: string;
  readonly role: string;
  readonly headline: string;
  readonly summary: string;
  readonly challenge: string;
  readonly solution: string;
  readonly impact: string;
  readonly metrics: readonly CaseStudyMetric[];
  readonly domains: readonly ServiceDomainId[];
  readonly stack: readonly string[];
}

export interface TrackRecordEntry {
  readonly company: string;
  readonly role: string;
  readonly duration: string;
  readonly summary: string;
  readonly skills: readonly string[];
}

export interface CertificationItem {
  readonly name: string;
  readonly issuer: string;
  readonly year: string;
  readonly badge: string;
}

export interface LanguageItem {
  readonly name: string;
  readonly level: string;
  readonly code: string;
}

export const CASE_STUDIES: readonly CaseStudy[] = [
  {
    id: "costain",
    client: "Costain Group PLC",
    sector: "National Infrastructure",
    period: "Apr 2024 – Sep 2024",
    role: "Full Stack Engineer",
    headline: "Motorway Variable Message Sign Legacy Modernisation",
    summary:
      "Reverse-engineered an undocumented roadside C/Java 6 system into a Java 21 Spring Boot API & greenfield Angular operator platform in 5 months.",
    challenge:
      "A mission-critical legacy motorway Variable Message Sign (VMS) estate lacked documentation and hid undocumented dependencies on legacy C servers inside roadside junction boxes.",
    solution:
      "Audited the codebase line-by-line to decode bitwise-shifted byte protocols, migrated the Java 6 WAR monolith to an isolated Java 21+ Spring Boot/Spring Data API, built an isolated stub message board to de-risk testing, and delivered a greenfield Angular operator interface.",
    impact:
      "De-risked modernisation of critical roadside telemetry within a five-month tenure with full protocol test coverage.",
    metrics: [
      { value: "5 Months", label: "End-to-end delivery" },
      { value: "Java 6 → 21", label: "Monolith modernised" },
      { value: "Roadside C", label: "Bitwise protocol decoded" },
    ],
    domains: ["data-legacy", "fullstack"],
    stack: ["Java 21", "Spring Boot", "Angular", "Bitwise Protocols"],
  },
  {
    id: "octopus-energy",
    client: "Octopus Energy Hydrogen",
    sector: "Clean Energy",
    period: "Dec 2023 – Jun 2024",
    role: "Fullstack Cloud & DevOps Engineer",
    headline: "Real-Time National Grid Telemetry Platform",
    summary:
      "Sole engineer delivering an SSR energy monitoring dashboard ingesting half-hourly UK national grid demand through high-throughput queues.",
    challenge:
      "Needed a responsive, mobile-friendly energy monitoring platform capable of ingesting and visualising half-hourly British grid demand under tight two-week launch deadlines.",
    solution:
      "Owned end-to-end UI/UX, SSR Next.js frontend, high-throughput message queue ingestion, database architecture, and rollback-safe Vercel and AWS Terraform CI/CD pipelines.",
    impact:
      "Shipped production telemetry ahead of milestone deadlines with scalable queue-backed data processing.",
    metrics: [
      { value: "2-Week", label: "Launch milestones" },
      { value: "30-Min Feed", label: "UK National Grid API" },
      { value: "Sole Engineer", label: "Full-stack & DevOps" },
    ],
    domains: ["cloud", "fullstack"],
    stack: ["TypeScript", "React", "Next.js", "AWS", "Terraform", "Vercel"],
  },
  {
    id: "homelink",
    client: "Homelink",
    sector: "IoT & Connected Homes",
    period: "Jan 2024 – Apr 2024",
    role: "Fullstack Cloud Engineer (Senior Lead)",
    headline: "OLTP-to-OLAP IoT Analytics Migration & Team Enablement",
    summary:
      "Eliminated live dashboard bottlenecks by decoupling star-schema analytics, unblocked European i18n, and cut engineer onboarding from days to hours.",
    challenge:
      "Heavy analytical queries were locking the live transactional OLTP database, a European multilingual launch was stalled, and local onboarding took days.",
    solution:
      "Isolated slow transactional queries, architected a decoupled de-normalised star-schema OLAP analytics layer, mentored a junior developer to ship the i18n rollout, and standardised repeatable local setup documentation.",
    impact:
      "Accelerated statistical IoT reporting, hit European stakeholder i18n milestones, and reduced developer onboarding from days to hours.",
    metrics: [
      { value: "Days → Hours", label: "Engineer onboarding" },
      { value: "OLTP → OLAP", label: "Star-schema decoupling" },
      { value: "EU Launch", label: "Multilingual i18n shipped" },
    ],
    domains: ["data-legacy", "leadership"],
    stack: ["PostgreSQL", "OLTP", "OLAP Star Schema", "SQL", "Mentoring"],
  },
  {
    id: "sero",
    client: "Sero",
    sector: "Net-Zero PropTech",
    period: "Feb 2021 – Apr 2023",
    role: "Lead Engineer & Interim Team Manager",
    headline: "Federated GraphQL Supergraph & In-House Transition",
    summary:
      "Led an 18-month transition from external consultancy MVP to an in-house enterprise platform powered by a federated GCP supergraph.",
    challenge:
      "Transitioning a growing clean-tech platform out of external agency dependency while unifying disparate housing specification and user session data streams.",
    solution:
      "Stepped up as Tech Lead and Interim Manager for 18 months, engineered a federated GraphQL supergraph on GCP, mentored developers across seniority levels, and built a unified Tailwind component library.",
    impact:
      "Established autonomous in-house engineering delivery and cohesive cross-app branding.",
    metrics: [
      { value: "18 Months", label: "Interim Tech Lead" },
      { value: "Supergraph", label: "Federated GCP GraphQL" },
      { value: "MVP → In-House", label: "Autonomous delivery" },
    ],
    domains: ["cloud", "leadership", "fullstack"],
    stack: ["React", "GraphQL Supergraph", "GCP", "Tailwind CSS"],
  },
  {
    id: "superdry",
    client: "Superdry",
    sector: "Global E-Commerce",
    period: "May 2020 – Jan 2021",
    role: "Fullstack Engineer",
    headline: "PHP Monolith Dismantling & Serverless Edge Architecture",
    summary:
      "Co-led the migration from a customer-facing PHP monolith to modular AWS Lambda microservices, DynamoDB catalogues, and edge CDN caching.",
    challenge:
      "A monolithic PHP storefront constrained release cadence and page latency across global customer product catalogues.",
    solution:
      "Dismantled core monolith boundaries into modular TypeScript/AWS Lambda microservices, ingested and cached catalogues in DynamoDB and ElastiCache, and layered S3 + CDN edge acceleration.",
    impact:
      "Significantly reduced operational overhead, automated legacy data warehousing, and lowered storefront latency.",
    metrics: [
      { value: "PHP → Lambda", label: "Monolith dismantled" },
      { value: "Edge + CDN", label: "DynamoDB & ElastiCache" },
      { value: "Automated", label: "Cloud warehousing" },
    ],
    domains: ["cloud", "data-legacy", "fullstack"],
    stack: ["TypeScript", "React", "AWS Lambda", "DynamoDB", "ElastiCache"],
  },
];

export const TRACK_RECORD: readonly TrackRecordEntry[] = [
  {
    company: "Agora (Ethereal Technologies)",
    role: "Founder & Engineering Architect",
    duration: "Sep 2024 – Present",
    summary:
      "Conceived, architected, and shipped a live two-sided cleaning marketplace (Flutter, NestJS, GraphQL, Neo4j, Stripe Connect, GCP/Terraform) with cleaners onboarded.",
    skills: ["Flutter", "NestJS", "GraphQL", "Neo4j", "Stripe Connect", "GCP", "Terraform"],
  },
  {
    company: "Costain Group PLC",
    role: "Full Stack Engineer",
    duration: "Apr 2024 – Sep 2024",
    summary:
      "Reverse-engineered undocumented roadside C/Java 6 VMS hardware protocols; migrated to Java 21 Spring Boot + greenfield Angular operator app.",
    skills: ["Java 21", "Spring Boot", "Angular", "Legacy Migration"],
  },
  {
    company: "Homelink",
    role: "Fullstack Cloud Engineer",
    duration: "Jan 2024 – Apr 2024",
    summary:
      "Senior lead migrating IoT telemetry from OLTP bottlenecks to star-schema OLAP analytics, launching European i18n and streamlining onboarding.",
    skills: ["PostgreSQL", "OLTP", "OLAP", "SQL"],
  },
  {
    company: "Octopus Energy Hydrogen",
    role: "Fullstack Cloud & DevOps Engineer",
    duration: "Dec 2023 – Jun 2024",
    summary:
      "Sole engineer shipping an SSR Next.js national grid monitoring dashboard backed by message queues, AWS, Terraform, and Vercel.",
    skills: ["TypeScript", "React", "Next.js", "AWS", "Terraform", "Vercel"],
  },
  {
    company: "Pynea",
    role: "Cloud Platform Consultant",
    duration: "Jul 2023 – Oct 2023",
    summary:
      "Foundational engineer establishing Dockerised GraphQL architecture, Pulumi + GitLab CI/CD pipelines, and event-driven AWS FIFO media pipelines.",
    skills: ["GraphQL", "Pulumi", "Docker", "AWS", "GitLab CI"],
  },
  {
    company: "Sero",
    role: "Lead Engineer / Cloud Platform Consultant",
    duration: "Feb 2021 – Apr 2023",
    summary:
      "Tech Lead & Interim Team Manager transitioning an MVP into an in-house enterprise platform with a federated GCP supergraph and Tailwind library.",
    skills: ["React", "GraphQL Supergraph", "GCP", "Tailwind CSS"],
  },
  {
    company: "Superdry",
    role: "Fullstack Engineer",
    duration: "May 2020 – Jan 2021",
    summary:
      "Co-led dismantling of a PHP monolith into AWS Lambda microservices, DynamoDB catalogue ingestion, ElastiCache, and edge CDN layers.",
    skills: ["TypeScript", "React", "AWS Lambda", "DynamoDB", "PHP Migration"],
  },
  {
    company: "BJSS (Public Sector Consolidation)",
    role: "Fullstack Engineer",
    duration: "Nov 2019 – Apr 2020",
    summary:
      "Delivered a greenfield GDS-compliant public sector platform consolidating a dozen UK local council funding systems with Graph APIs.",
    skills: ["TypeScript", "React", "GraphQL", "GDS Accessibility"],
  },
  {
    company: "BJSS (Child & Adult Protection)",
    role: "Fullstack Engineer",
    duration: "Aug 2018 – Oct 2019",
    summary:
      "High-security microservice migration for regulated public-sector safeguarding data using BDD, pair programming, TypeScript, React, Java, and AWS.",
    skills: ["TypeScript", "React", "Java", "AWS", "BDD"],
  },
  {
    company: "Citadel Computing Services",
    role: "Fullstack Engineer",
    duration: "Apr 2018 – Jul 2018",
    summary:
      "Streamlined commercial APIs and MySQL quote workflows for a rapid health insurance web application, cutting compute load.",
    skills: ["Java", "Spring", "MySQL"],
  },
  {
    company: "GameBench",
    role: "Fullstack Engineer",
    duration: "Apr 2017 – Mar 2018",
    summary:
      "Migrated aging MySQL analytics to an Elasticsearch cluster and engineered high-throughput telemetry microservices with custom JWT RBAC.",
    skills: ["Java", "Spring Boot", "Elasticsearch", "Microservices"],
  },
  {
    company: "Northrop Grumman",
    role: "Software Engineer",
    duration: "Apr 2016 – Apr 2017",
    summary:
      "Built secure defence R&D microservices, evaluated distributed messaging (Kafka, RabbitMQ, SQS, Redis), and scaled distributed Kafka + Neo4j clusters.",
    skills: ["Java", "Spring Boot", "Kafka", "Neo4j", "Kubernetes"],
  },
  {
    company: "Nominet",
    role: "Apprentice Software Engineer",
    duration: "Aug 2013 – Apr 2016",
    summary:
      "Delivered Java & Business Intelligence DNS utilisation dashboards and SQL warehouse queries supporting Nominet's ISO27001 accreditation.",
    skills: ["Java", "SQL", "Business Intelligence", "Data Warehousing"],
  },
];

export const CERTIFICATIONS: readonly CertificationItem[] = [
  {
    name: "AWS Solutions Architect Associate",
    issuer: "Amazon Web Services",
    year: "July 2020",
    badge: "AWS",
  },
  {
    name: "Google Cloud Certified Developer",
    issuer: "Google Cloud",
    year: "2023",
    badge: "GCP",
  },
  {
    name: "Graph Data Modelling Fundamentals",
    issuer: "Neo4j",
    year: "September 2023",
    badge: "Neo4j",
  },
];

export const LANGUAGES: readonly LanguageItem[] = [
  {
    name: "English",
    level: "Native Proficiency",
    code: "EN",
  },
  {
    name: "Japanese",
    level: "Intermediate (JLPT N3/N4 Level)",
    code: "JP",
  },
];
