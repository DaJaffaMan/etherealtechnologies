export interface FaqItem {
  readonly question: string;
  readonly answer: string;
}

export const HOME_FAQS: readonly FaqItem[] = [
  {
    question: "How do Ethereal Technologies' consultancy engagement models work?",
    answer:
      "Engagements are structured around three clear formats depending on your stage: a 1–2 week fixed-scope Architecture & Modernisation Audit, sprint or quarterly Embedded Principal Delivery alongside your team, or milestone-based Zero-to-One Product & Platform Builds. Commercial terms are scoped directly on inquiry rather than behind agency account tiers.",
  },
  {
    question: "Where is Ethereal Technologies registered and who do you work with?",
    answer:
      "Ethereal Technologies Ltd is a UK-registered B2B software consultancy (UK Company No. 11274880, VAT Reg No. GB291330321) based in Bristol, UK. Founder Jack Jefferies works remotely with engineering teams across the UK and internationally, and communicates in English and Japanese (JLPT N3/N4).",
  },
  {
    question: "What core technologies and cloud stacks do you specialise in?",
    answer:
      "Core production expertise spans TypeScript, SolidJS, React/Next.js, Flutter, NestJS/Fastify, Java 21 Spring Boot, GraphQL federated supergraphs, PostgreSQL (OLTP & OLAP star schemas), Neo4j graph modelling, Stripe Connect, and codified AWS and Google Cloud estates using Terraform and Pulumi.",
  },
  {
    question: "What is the relationship between Ethereal Technologies and Agora?",
    answer:
      "Agora (agora.cleaning) is Ethereal Technologies' flagship production product — a two-sided UK cleaning services marketplace live on web and Google Play. Designing, shipping, and operating Agora in-house proves our full-stack, fintech, and GCP Terraform engineering in a live commercial environment.",
  },
  {
    question: "Can you rescue an external agency MVP or bridge technical leadership in-house?",
    answer:
      "Yes. At Sero, Jack Jefferies served as Lead Engineer and Interim Team Manager for 18 months to transition an external agency MVP onto an autonomous in-house federated GCP supergraph. Similar audits and handovers have cut developer onboarding from days to hours at Homelink and de-risked undocumented monoliths at Costain and Superdry.",
  },
];

export const AGORA_FAQS: readonly FaqItem[] = [
  {
    question: "What is Agora and who built it?",
    answer:
      "Agora is a two-sided UK cleaning services marketplace platform connecting homeowners, tenants, and hosts with independent local cleaning professionals via web (agora.cleaning) and Google Play. It is designed, built, and operated in-house by Ethereal Technologies Ltd (Company No. 11274880).",
  },
  {
    question: "How do Stripe Escrow Protection and the 48h Spotless Guarantee work?",
    answer:
      "Customer payments are pre-authorised via Stripe Connect and held safely in escrow until after the clean is completed with timestamped before/after photo checklists. Domestic cleans carry a 48-hour Spotless Guarantee (72 hours for end-of-tenancy bookings).",
  },
  {
    question: "How do Agora's cleaner fees compare with traditional UK agencies or lead directories?",
    answer:
      "Cleaners pay £0 per-lead bidding fees and £0 directory subscriptions. Standard bookings carry a transparent flat 10% Agora commission (plus 1.5% + 20p Stripe card processing, with 0% Agora commission promo periods), letting pros keep ~88% net take-home and 100% of tips versus typical 30–45% traditional agency margins.",
  },
  {
    question: "How does Agora protect homeowner property access and lockbox codes?",
    answer:
      "Property key-safe and lockbox PINs are end-to-end encrypted, revealed strictly within the active booking window, and protected with client screenshot shielding and GPS check-in workflows.",
  },
  {
    question: "What technology architecture powers Agora in production?",
    answer:
      "Agora runs on a cross-platform Flutter client (Android & web), Firebase Authentication with role-isolated JWT claims, a Fastify-backed NestJS Apollo GraphQL API, a Neo4j graph matching database, Stripe Connect multi-party escrow and UK bank payouts, and repeatable Google Cloud infrastructure managed with Terraform.",
  },
];
