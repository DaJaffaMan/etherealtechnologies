export interface JobExperience {
  title: string;
  company: string;
  duration: string;
  description: string;
  skills: string[];
  keyPoints?: string[];
}

export const experiences: JobExperience[] = [
  {
    title: 'Full Stack Engineer',
    company: 'Costain Group PLC',
    duration: 'April 2024 - September 2024',
    description: 'Stepped into this new role and reverse-engineered a completely undocumented, mission-critical legacy architecture used for managing motorway variable message signs. Within a five-month tenure, audited the system line-by-line to map out unknown hardware dependencies, discovering an old C server operating inside roadside junction boxes and identifying the bitwise-shifted byte message protocols required for communication. Modernised the ecosystem by migrating a legacy Java 6 WAR monolith into an isolated Java 21+ Spring Boot/Spring Data JAR API, rewriting the data abstraction layer to handle state management, authentication, and targeted sign routing. Built an isolated test environment and a stub message board to de-risk the migration, while simultaneously engineering a greenfield Angular application from the ground up to give operators a dynamic web interface to update and mirror physical sign changes.',
    skills: ['Java', 'Spring Boot', 'Spring Data', 'Angular', 'Legacy System Migration', 'REST']
  },
  {
    title: 'Fullstack Cloud Engineer',
    company: 'Homelink',
    duration: 'January 2024 - April 2024',
    description: 'Stepped in as the senior engineering lead for a junior development team, establishing high-quality engineering standards and delivery processes for a home-monitoring IoT analytical platform. Immediately eliminated critical dashboard performance bottlenecks by isolating and optimising heavy transactional queries on the live OLTP database. Designed and spearheaded the migration of the analytics infrastructure to an OLAP architectural model; by decoupling analytical data from the OLTP layer and implementing de-normalised star-schema principles, removed complex relational join overhead and vastly accelerated statistical query speeds for real-time IoT data. Simultaneously unblocked a critical, stalled internationalisation initiative, guiding a junior engineer to successfully launch a seamless multilingual translation platform ahead of pivotal European stakeholder meetings. On day one, completely overhauled an incomplete development environment setup into a repeatable, clear, step-by-step process, reducing future onboarding from days to hours, while revitalising the self-maintained project board with structured requirements to ensure zero friction for incoming engineers.',
    skills: ['Multilingual Platforms', 'OLTP Databases', 'OLAP Systems', 'Team Guidance', 'BAU Task Management', 'SQL', 'PostgreSQL']
  },
  {
    title: 'Fullstack Cloud & Devops Engineer',
    company: 'Octopus Energy Hydrogen',
    duration: 'December 2023 - June 2024',
    description: 'Served as the sole Full Stack Software Engineer on site, spearheading the rapid development and deployment of a responsive, mobile-friendly energy monitoring dashboard from concept to launch. Met strict two-week deadlines by integrating the Server-Side Rendered (SSR) platform directly with the national grid API to ingest half-hourly British energy demands. Architected a highly scalable data pipeline that routed real-time utilisation statistics into a high-throughput message queue to parse and compute usage impacts instantly. Designed the end-to-end UI/UX, database strategies, and implemented robust Vercel and AWS CI/CD pipelines with seamless rollback capabilities to deliver maximum scalability, reliability, and immediate client value.',
    skills: ['TypeScript', 'React', 'NextJS', 'NodeJS', 'Tailwind CSS', 'Python', 'AWS', 'Terraform', 'Vercel (CI/CD)', 'v0.dev (Prototyping)']
  },
  {
    title: 'Cloud Platform Consultant',
    company: 'Pynea',
    duration: 'July 2023 - October 2023',
    description: 'Joined a rapid, greenfield startup project as the foundational engineer, establishing the initial system architecture, service communication frameworks, and data policies with no existing code in place. Took total ownership of containerising the decentralised API environment using Docker and single-responsibility principles (SRP). Designed and executed a robust automated pipeline infrastructure using Pulumi and GitLab CI/CD, guaranteeing regression-free build, test, and deployment phases for all dockerised applications. Additionally, engineered the core media management system to securely handle customer video data, utilizing an event-driven FIFO queue system deployed across a federated AWS architecture.',
    skills: ['GraphQL', 'Pulumi', 'Docker', 'AWS (Cloud Architecture)', 'GitLab (CI/CD)', 'OpenAI', 'Product Management']
  },
  {
    title: 'Lead Engineer/Cloud Platform Consultant',
    company: 'Sero',
    duration: 'February 2021 - April 2023',
    description: 'Consulted on and drove the transition of a cloud project from an MVP into a stable, productised enterprise application, successfully migrating an external consultancy in-house. Stepped up as Tech Lead and Interim Team Manager for 18 months during corporate restructuring, gathering requirements, defining workflows, and mentoring developers of all levels to ensure smooth business operations. Responsible for building a federated supergraph API to seamlessly manage and query diverse data streams ranging from housing specifications to live user sessions. Designed and introduced an extensible, Tailwind-based component library, successfully unifying the UI across multiple web applications and allowing for rapid brand customisation.',
    skills: ['React', 'GraphQL (Federated Supergraphs)', 'Terraform', 'GCP (Cloud Architecture)', 'GitLab (CI/CD)', 'Tailwind CSS', 'OpenAI', 'Team Leadership']
  },
  {
    title: 'Fullstack Engineer',
    company: 'Superdry',
    duration: 'May 2020 - January 2021',
    description: 'Co-led a strategic engineering initiative to dismantle a customer-facing PHP monolith, migrating the infrastructure into highly flexible, modular microservices. Designed and implemented serverless architectures using AWS Lambdas, which significantly reduced operational overhead and optimised API request routing. Spearheaded the ingestion, parsing, and caching of customer product catalogues within DynamoDB, and dramatically reduced page load times by configuring edge computing, ElastiCache, S3, and CDN layers. Modernised legacy data warehousing workflows by migrating deprecated execution scripts into maintainable, automated AWS cloud functions.',
    skills: ['TypeScript', 'React', 'Fastify', 'Serverless', 'AWS (Lambdas, DynamoDB, ElastiCache, S3)', 'PHP (Legacy Migration)', 'Monolith to Microservices']
  },
  {
    title: 'Fullstack Engineer',
    company: 'BJSS',
    duration: 'November 2019 - April 2020',
    description: 'Delivered a ground-up, greenfield public sector web platform designed to consolidate a dozen disjointed funding systems utilized by UK local councils. Operated in a fast-paced, multi-functional consultancy team to design a fast, highly scalable architecture incorporating Graph-based APIs. Ensured all aspects of application processing were incredibly flexible and fully GDS-compliant to support impaired accessibility requirements under strict public data security compliance.',
    skills: ['TypeScript', 'React', 'Fastify', 'GraphQL', 'GDS-compliant design', 'Cloud Architecture']
  },
  {
    title: 'Fullstack Engineer',
    company: 'BJSS',
    duration: 'August 2018 - October 2019',
    description: 'Executed on a complex, high-security microservice software project focused on migrating a deprecated heritage system to a public sector client for child and adult protection. Managed and processed highly sensitive data structures under strict, regulated deadlines. Fostered a continuous pair-programming environment and championed agile methodologies to help build a cohesive, behavior-driven development team capable of adapting rapidly to changing requirements.',
    skills: ['TypeScript', 'React', 'Java', 'Spring', 'AWS (Cloud Architecture)', 'Agile Methodologies', 'BDD', 'Sensitive Data Handling']
  },
  {
    title: 'Fullstack Engineer',
    company: 'Citadel Computing Services',
    duration: 'April 2018 - July 2018',
    description: 'Launched a consulting career by playing a vital role in the rapid, high-pressure development of an interim health insurance web application. Focused on simplifying commercial APIs and complex application interfaces, significantly reducing technical debt and system bugs. Re-engineered backend relational database workflows within MySQL to drastically reduce the computational resource usage required for calculating insurance premiums and real-time quote management.',
    skills: ['Java', 'Spring', 'JSP', 'MySQL', 'Figma']
  },
  {
    title: 'Fullstack Engineer',
    company: 'GameBench',
    duration: 'April 2017 - March 2018',
    description: 'Led a critical database migration at a fast-paced startup, successfully moving an aging MySQL RDBMS into a modern, cloud-based NoSQL Elasticsearch cluster to support a mobile performance analytics platform. Designed and built multiple lightweight microservices, including a high-throughput engine capable of parsing and storing highly compressed data streams at a massive ingestion rate. Introduced custom role-based JWT authorisation and successfully advocated for agile practices, resulting in accelerated project delivery milestones.',
    skills: ['Java', 'Spring Boot', 'Spring Data', 'JavaScript', 'Angular', 'MySQL (Migration)', 'Elasticsearch', 'JWT', 'Microservices', 'Agile Product Management']
  },
  {
    title: 'Software Engineer',
    company: 'Northrop Grumman',
    duration: 'April 2016 - April 2017',
    description: 'Owned the development of greenfield functional requirements for a highly secure defence research and development project. Engineered lightweight microservices, configured distributed NoSQL database clusters, and enforced strict internal data storage policies. Authored an internal whitepaper evaluating distributed messaging queues (Kafka, RabbitMQ, SQS, Redis) and leveraged virtualization to implement and scale a distributed Kafka cluster. Architected foundational CI/CD automation pipelines, established system documentation, and actively trained incoming graduate engineers to minimise environment setup times.',
    skills: ['Java', 'Spring Boot (Data, Security)', 'Microservices', 'Kafka', 'REST', 'AWS', 'Neo4J', 'Docker', 'Kubernetes', 'Ansible', 'CI/CD (Jenkins, Git)']
  },
  {
    title: 'Apprentice Software Engineer',
    company: 'Nominet',
    duration: 'August 2013 – April 2016',
    description: 'Launched an engineering career working cross-functionally within Java and Business Intelligence teams. Authored highly optimized SQL queries against dense data warehouses to ensure smooth analytical operations. Designed, improved, and delivered business-critical, real-time analytical dashboards for internal and external stakeholders. Collaborated directly with the Technical Director to showcase DNS server utilization statistics, successfully securing the organization\'s ISO27001 accreditation.',
    skills: ['Java', 'Business Intelligence', 'Oracle Database', 'SQL', 'Data Warehousing', 'Analytical Dashboards', 'ISO27001 Accreditation Support']
  }
];
