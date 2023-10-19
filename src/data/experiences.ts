export interface JobExperience {
  title: string;
  company: string;
  duration: string;
  description: string;
  keyPoints?: string[];
}

export const experiences: JobExperience[] = [
  {
    title: "Cloud Platform Engineer",
    company: "Pynea",
    duration: "August 2023 - September 2023",
    description:
      "When I joined Pynea, there was virtually no code in sight. However, that quickly changed in my short time consulting for this fast-paced startup. Personally, I felt a strong sense of responsibility when I took charge of dockerizing the backend GraphQL server. It was a thrilling challenge to create a pipeline infrastructure that ensured no regressions during the build, test, and deployment phases of our dockerized application. Additionally, I created the media management system for all customer data, which was stored and managed on AWS.",
  },
  {
    title: "Cloud Platform Engineer",
    company: "Sero",
    duration: "February 2021 - April 2023",
    description:
      "Collaborated with an external consultancy during the transition from MVP to a stable, production-ready product. Building a federated supergraph API, managing diverse data, from housing specifications to user sessions, and delivering critical updates. Introduced a versatile Tailwind-based component library, enabling brand customization and unifying the UI across various web apps. Assisted with data processing, housing solutions, and customer management. Stepped up as an interim lead during team restructuring, gathering requirements and implementing a robust DevOps solution, resulting in faster and more reliable product releases.",
  },
  {
    title: "Fullstack Engineer",
    company: "Superdry",
    duration: "May 2020 - January 2021",
    description:
      "My journey at Superdry was a transformative experience. I helped lead the initiative to recreate the customer-facing monolith, moving away from PHP and into more flexible microservices. It was a dynamic project where I optimized and reduced operational costs by implementing lambdas and serverless architecture to handle API requests. I had a direct hand in parsing and storing customer products in the document-based database DynamoDB. This significantly improved customer experience by retaining customer sessions between visits and reducing page loading times through tools like ElastiCache and S3, along with configuring edge computing/CDN. I also dedicated time to simplifying data warehousing by migrating legacy scripts to a more maintainable execution in AWS, with the help of serverless and cloud functions.",
  },
  {
    title: "Fullstack Engineer",
    company: "BJSS",
    duration: "November 2019 - April 2020",
    description:
      "After successfully delivering on the previous project, I was immediately re-engaged to deliver on another new public sector project. This was a ground-up greenfield project that involved taking a dozen different funding systems used by councils across the UK and creating a fast, modern, GDS-compliant, scalable web platform. It was a challenging endeavor that required a high degree of flexibility in the application processing for funding opportunities. I was excited to use the latest technologies, including TypeScript, to make a significant impact and deliver results that exceeded expectations.",
  },
  {
    title: "Fullstack Engineer",
    company: "BJSS",
    duration: "August 2018 - October 2019",
    description:
      "My journey began with a critical mission: to assist in architecting a large and complex microservice software project focused on protecting children and vulnerable adults. It involved migrating an old, deprecated system from one organization to the public sector client. Working with sensitive data, I faced strict deadlines and high expectations. In a behavior-driven environment with extensive customer engagement, I delivered high-quality work that helped create a cohesive team at BJSS. I was not only technically skilled but also passionate about agile methodologies, which I shared with the team to adapt and overcome challenges.",
  },
  {
    title: "Fullstack Engineer",
    company: "Citadel Computing Services",
    duration: "April 2018 - July 2018",
    description:
      "Stepping into my consulting career, I played a pivotal role in the rapid development of an urgently required interim health insurance web app. It was a mission to simplify insurance application interfaces and commercial APIs, reduce computational resource usage in calculating insurance premiums, and enhance the management of quotes with relevant data in a relational database. It was a race against time to bring modern approaches to web design and development to the table. My efforts significantly reduced technical debt, bugs, and operational challenges, freeing up the team to focus on other critical projects.",
  },
  {
    title: "Fullstack Engineer",
    company: "GameBench",
    duration: "April 2017 - March 2018",
    description:
      "Joining a faster-paced and more challenging environment at a startup, I managed to deliver many key milestones in a mobile performance analytics platform. I led the migration of the old RDBMS into a new cloud-based NoSQL database and created multiple scalable microservices. One of these microservices efficiently parsed and stored compressed data at a high ingestion rate. It was a thrilling journey that involved developing a new modern analytical platform and pushing the team to adopt agile development practices. Our collective efforts resulted in increased project delivery and expanded opportunities for the company.",
  },
  {
    title: "Software Engineer",
    company: "Northrop Grumman",
    duration: "April 2016 - April 2017",
    description:
      "Driven by my newfound passion for software, I eagerly experimented with the latest tools, technologies, and libraries. I was responsible for developing new greenfield requirements used for a defense research and development project. It was a journey of continuous learning and growth as I set up CI/CD pipelines for applications and trained recent graduate colleagues who were new to the environment. I took pride in documenting best practices, reducing developer setup time with how-to guides. My role extended to developing lightweight microservices, configuring distributed NoSQL clusters, and enforcing data policies on applications. This journey also honed my skills in virtualization.",
  },
  {
    title: "Apprentice Software Engineer",
    company: "Nominet",
    duration: "August 2013 – April 2016",
    description:
      "My career began with an enriching experience working in both Java and Business Intelligence teams alongside domain-specific experts. I embarked on a journey of absorbing extensive knowledge and technical skills in developing solutions for a fast-paced tech industry. I learned the best practices and applied them in a medium-sized, experienced technology institute. I was motivated to improve existing reports and develop new, rapid, and accurate business-critical analytical dashboards for both internal and external customers. This meant real-time access to data and critical insights. I successfully completed multiple significant projects, enabling internal users to analyze calls logged in our data warehouse and developing a new set of customizable dashboards. I even stepped forward to assist the technical director in achieving the ISO27001 accreditation, showcasing the usage statistics of the DNS servers. On-demand, I was the go-to person for writing complex queries against databases, ensuring smooth operations.",
  },
];
