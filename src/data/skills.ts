export type Skill = {
  name: string;
  category: string;
  experience: string;
};

export const mySkills: Skill[] = [
  // Programming Languages
  { name: "JavaScript/NodeJS", category: "Programming Languages", experience: "5 - 10+ Years" },
  { name: "Java", category: "Programming Languages", experience: "5 - 10+ Years" },
  { name: "TypeScript", category: "Programming Languages", experience: "5 - 10+ Years" },
  { name: "Python", category: "Programming Languages", experience: "1 - 3 Years" },
  { name: "SQL", category: "Programming Languages", experience: "5 - 10+ Years" },

  // Servers & Core Frameworks
  { name: "Spring", category: "Servers & Core Frameworks", experience: "5 - 10+ Years" },
  { name: "ExpressJS", category: "Servers & Core Frameworks", experience: "5 - 10+ Years" },
  { name: "Fastify", category: "Servers & Core Frameworks", experience: "5 - 10+ Years" },
  { name: "NestJS", category: "Servers & Core Frameworks", experience: "3 - 5 Years" },
  { name: "Java Spark API", category: "Servers & Core Frameworks", experience: "3 - 5 Years" },
  { name: "Apollo Server (GraphQL)", category: "Servers & Core Frameworks", experience: "3 - 5 Years" },

  // Web Development
  { name: "React", category: "Web Development", experience: "5 - 10+ Years" },
  { name: "Angular", category: "Web Development", experience: "3 - 5 Years" },
  { name: "HTML5", category: "Web Development", experience: "5 - 10+ Years" },
  { name: "CSS", category: "Web Development", experience: "5 - 10+ Years" },
  { name: "SASS", category: "Web Development", experience: "5 - 10+ Years" },
  { name: "SCSS", category: "Web Development", experience: "5 - 10+ Years" },
  { name: "jQuery", category: "Web Development", experience: "3 - 5 Years" },
  { name: "Tailwind", category: "Web Development", experience: "3 - 5 Years" },
  { name: "Server-side rendering", category: "Web Development", experience: "3 - 5 Years" },
  { name: "NextJS", category: "Web Development", experience: "1 - 3 Years" },
  { name: "Java JSP", category: "Web Development", experience: "1 - 3 Years" },
  { name: "Single Page Applications (SPA)", category: "Web Development", experience: "5 - 10+ Years" },

  // Mobile App Development
  { name: "React Native", category: "Mobile App Development", experience: "3 - 5 Years" },
  { name: "Ionic", category: "Mobile App Development", experience: "1 - 3 Years" },

  // Build Tools
  { name: "NPM", category: "Build Tools", experience: "5 - 10+ Years" },
  { name: "Yarn", category: "Build Tools", experience: "5 - 10+ Years" },
  { name: "Webpack", category: "Build Tools", experience: "5 - 10+ Years" },
  { name: "Vite", category: "Build Tools", experience: "1 - 3 Years" },
  { name: "Gulp", category: "Build Tools", experience: "1 - 3 Years" },
  { name: "PnPm", category: "Build Tools", experience: "1 - 3 Years" },
  { name: "Maven", category: "Build Tools", experience: "5 - 10+ Years" },
  { name: "Gradle", category: "Build Tools", experience: "3 - 5 Years" },

  //  ORMs
  { name: "Mongoose", category: "ORM", experience: "3 - 5 Years" },
  { name: "Hibernate", category: "ORM", experience: "1 - 3 Years" },
  { name: "TypeORM", category: "ORM", experience: "5 - 10+ Years" },
  { name: "Spring Data JDBC", category: "ORM", experience: "3 - 5 Years" },
  { name: "Prisma", category: "ORM", experience: "3 - 5 Years" },

  // Database
  { name: "PostgreSQL", category: "Database", experience: "5 - 10+ Years" },
  { name: "Elasticsearch", category: "Database", experience: "5 - 10+ Years" },
  { name: "MongoDB", category: "Database", experience: "5 - 10+ Years" },
  { name: "Cloud SQL", category: "Database", experience: "5 - 10+ Years" },
  { name: "MySQL", category: "Database", experience: "5 - 10+ Years" },

  // Cloud & Infrastructure
  { name: "AWS", category: "Cloud & Infrastructure", experience: "5 - 10+ Years" },
  { name: "GCP", category: "Cloud & Infrastructure", experience: "5 - 10+ Years" },
  { name: "Docker", category: "Cloud & Infrastructure", experience: "5 - 10+ Years" },
  { name: "Cloud storage", category: "Cloud & Infrastructure", experience: "5 - 10+ Years" },
  { name: "S3", category: "Cloud & Infrastructure", experience: "5 - 10+ Years" },
  { name: "Route 53", category: "Cloud & Infrastructure", experience: "5 - 10+ Years" },
  { name: "VPC", category: "Cloud & Infrastructure", experience: "5 - 10+ Years" },
  { name: "RabbitMQ", category: "Cloud & Infrastructure", experience: "3 - 5 Years" },
  { name: "SQS", category: "Cloud & Infrastructure", experience: "3 - 5 Years" },
  { name: "SNS", category: "Cloud & Infrastructure", experience: "3 - 5 Years" },
  { name: "DNS", category: "Cloud & Infrastructure", experience: "3 - 5 Years" },
  { name: "Jenkins CI", category: "Cloud & Infrastructure", experience: "3 - 5 Years" },
  { name: "Terraform", category: "Cloud & Infrastructure", experience: "3 - 5 Years" },
  { name: "IAM", category: "Cloud & Infrastructure", experience: "3 - 5 Years" },
  { name: "Cloudformation", category: "Cloud & Infrastructure", experience: "3 - 5 Years" },
  { name: "Cloudwatch", category: "Cloud & Infrastructure", experience: "3 - 5 Years" },
  { name: "Kubernetes", category: "Cloud & Infrastructure", experience: "1 - 3 Years" },
  { name: "Openstack", category: "Cloud & Infrastructure", experience: "1 - 3 Years" },
  { name: "Puppet", category: "Cloud & Infrastructure", experience: "1 - 3 Years" },
  { name: "Docker Swarm", category: "Cloud & Infrastructure", experience: "1 - 3 Years" },
  { name: "Azure", category: "Cloud & Infrastructure", experience: "1 - 3 Years" },
  { name: "Firebase", category: "Cloud & Infrastructure", experience: "1 - 3 Years" },
  { name: "KMS", category: "Cloud & Infrastructure", experience: "3 - 5 Years" },

  // Version Control & Collaboration Tools
  { name: "Git", category: "Version Control & Collaboration Tools", experience: "5 - 10+ Years" },
  { name: "SVN", category: "Version Control & Collaboration Tools", experience: "1 - 3 Years" },
  { name: "Gitlab", category: "Version Control & Collaboration Tools", experience: "5 - 10+ Years" },
  { name: "Sentry", category: "Version Control & Collaboration Tools", experience: "5 - 10+ Years" },
  { name: "Jira", category: "Version Control & Collaboration Tools", experience: "5 - 10+ Years" },
  { name: "Confluence", category: "Version Control & Collaboration Tools", experience: "5 - 10+ Years" },
  { name: "Trello", category: "Version Control & Collaboration Tools", experience: "3 - 5 Years" },
  { name: "GitHub Actions", category: "Version Control & Collaboration Tools", experience: "1 - 3 Years" },

  // IDEs & Editors
  { name: "VSCode", category: "IDEs & Editors", experience: "5 - 10+ Years" },
  { name: "IntelliJ", category: "IDEs & Editors", experience: "5 - 10+ Years" },
  { name: "Android Studio", category: "IDEs & Editors", experience: "5 - 10+ Years" },
  { name: "Eclipse", category: "IDEs & Editors", experience: "1 - 3 Years" },
  { name: "Netbeans", category: "IDEs & Editors", experience: "1 - 3 Years" },

  // Testing & Quality Assurance
  { name: "JUnit", category: "Testing & Quality Assurance", experience: "5 - 10+ Years" },
  { name: "Jest", category: "Testing & Quality Assurance", experience: "5 - 10+ Years" },
  { name: "Mocha", category: "Testing & Quality Assurance", experience: "3 - 5 Years" },
  { name: "Chai", category: "Testing & Quality Assurance", experience: "3 - 5 Years" },
  { name: "Cypress", category: "Testing & Quality Assurance", experience: "3 - 5 Years" },
  { name: "SonarQube", category: "Testing & Quality Assurance", experience: "3 - 5 Years" },
  { name: "Selenium", category: "Testing & Quality Assurance", experience: "1 - 3 Years" },
  { name: "Cucumber", category: "Testing & Quality Assurance", experience: "1 - 3 Years" },

  // Structured Languages
  { name: "JSON", category: "Data Structures", experience: "5 - 10+ Years" },
  { name: "YAML", category: "Data Structures", experience: "3 - 5 Years" },
  { name: "XML", category: "Data Structures", experience: "3 - 5 Years" },
  { name: "Google protobuf", category: "Data Structures", experience: "1 - 3 Years" },

  // Supporting Libraries
  { name: "Lodash", category: "Supporting Libraries", experience: "5 - 10+ Years" },
  { name: "MomentJS", category: "Supporting Libraries", experience: "3 - 5 Years" },

  // Operating Systems
  { name: "MacOS", category: "Operating Systems", experience: "5 - 10+ Years" },
  { name: "Windows", category: "Operating Systems", experience: "5 - 10+ Years" },
  { name: "Linux", category: "Operating Systems", experience: "5 - 10+ Years" },
  { name: "Ubuntu", category: "Operating Systems", experience: "5 - 10+ Years" },
  { name: "Fedora", category: "Operating Systems", experience: "3 - 5 Years" },
  { name: "CentOS", category: "Operating Systems", experience: "3 - 5 Years" },
  { name: "Kali", category: "Operating Systems", experience: "1 - 3 Years" },

  // Scripting & Command Line
  { name: "Bash", category: "Scripting & Command Line", experience: "5 - 10+ Years" },
  { name: "AWS CLI", category: "Scripting & Command Line", experience: "5 - 10+ Years" },
  { name: "GCP CLI", category: "Scripting & Command Line", experience: "5 - 10+ Years" },

  // API & Web Services
  { name: "REST", category: "API & Web Services", experience: "5 - 10+ Years" },
  { name: "SOAP", category: "API & Web Services", experience: "1 - 3 Years" },
  { name: "GraphQL", category: "API & Web Services", experience: "3 - 5 Years" },
  { name: "RPC", category: "API & Web Services", experience: "1 - 3 Years" },

  // Design & Visualization
  { name: "D3", category: "Design & Visualization", experience: "1 - 3 Years" },
  { name: "ChartJS", category: "Design & Visualization", experience: "1 - 3 Years" },
  { name: "Figma", category: "Design & Visualization", experience: "1 - 3 Years" },

  // Security & Encryption
  { name: "NodeJS Crypto", category: "Security & Encryption", experience: "3 - 5 Years" },
  { name: "Spring security", category: "Security & Encryption", experience: "1 - 3 Years" },
  { name: "Sops", category: "Security & Encryption", experience: "1 - 3 Years" },
  { name: "CoPilot", category: "Security & Encryption", experience: "1 - 3 Years" },

  // AI
  { name: "OpenAI", category: "AI", experience: "1 Year" },
  { name: "Dalle-3", category: "AI", experience: "1 Year" },
  { name: "Adobe Firefly", category: "AI", experience: "1 Year" },
];
