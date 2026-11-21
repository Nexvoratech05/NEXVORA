export interface Founder {
  name: string;
  role: string;
  title: string;
  bio: string;
  isDraftBio: boolean;
  expertiseTags: string[];
  image: string;
  linkedin?: string;
  github?: string;
  portfolioUrl?: string;
}

export interface ServiceDetail {
  slug: string;
  title: string;
  shortTitle: string;
  heroHeadline: string;
  heroOutcome: string;
  iconName: string;
  problemSolved: string[];
  deliverables: string[];
  processSteps: { title: string; description: string }[];
  technologies: string[];
  faqs: { question: string; answer: string }[];
}

export interface ProjectItem {
  id: string;
  slug: string;
  title: string;
  client: string; // e.g., "Concept build" or "Internal capability demonstration"
  isConfidential: boolean;
  isCapabilityDemonstration: boolean;
  summary: string;
  serviceSlug: string;
  serviceName: string;
  industry: string;
  challenge: string;
  solution: string;
  technologies: string[];
  outcome: string;
  images: string[];
}

export const siteConfig = {
  name: "NEXVORA Technologies",
  legalName: "NEXVORA Technologies",
  tagline: "Build Beyond Limits.",
  positioning:
    "A modern, innovative, reliable technology company delivering digital products, software engineering and intelligent business solutions.",
  url: "https://nexvora.com", // [PLACEHOLDER: confirm production domain]
  description:
    "Software, cloud and data engineering for growing businesses. Founder-led team delivering web apps, CRM, AI and automation.",
  
  // Contact details
  contact: {
    email: "nexvora.code@gmail.com",
    displayEmail: "nexvora.code@gmail.com",
    hasRealEmail: true,
    phone: "+92 335 5277018",
    displayPhone: "+92 335 5277018",
    hasRealPhone: true,
    whatsappNumber: "923355277018",
    hasRealWhatsapp: true,
    whatsappGreeting: "Hello NEXVORA Technologies, I would like to discuss a project.",
    address: "", // [PLACEHOLDER: Office address to be set by founders]
    hasRealAddress: false,
    businessHours: "Mon - Fri: 9:00 AM – 6:00 PM PKT (UTC+5)",
    responseTime: "24 business hours",
  },

  socials: {
    linkedin: "", // [PLACEHOLDER: LinkedIn company URL]
    github: "",   // [PLACEHOLDER: GitHub URL]
    twitter: "",  // [PLACEHOLDER: Twitter/X URL]
    facebook: "", // [PLACEHOLDER: Facebook URL]
    instagram: "",// [PLACEHOLDER: Instagram URL]
  },

  metadata: {
    foundingYear: "2024",
    locationRegion: "PK / GCC / Global",
  },
};

export const founders: Founder[] = [
  {
    name: "Muhammad Azhar",
    role: "Software Engineer & Cloud/IT Expert",
    title: "Co-Founder & Technical Lead",
    bio: "Muhammad Azhar is a Software Engineer, Cloud Architect, and AWS Certified Solutions Architect – Associate. With hands-on engineering depth building cloud-native and serverless architectures on AWS (Lambda, DynamoDB, S3, IoT Core, Rekognition, Lex), Next.js, and Python, coupled with enterprise IT systems administration and network engineering at Unified Marketing Systems (UMS BPO), Azhar leads technical architecture, cloud engineering, and full-stack software delivery at NEXVORA Technologies.",
    isDraftBio: false,
    expertiseTags: [
      "AWS Certified Solutions Architect",
      "Cloud-Native & Serverless (Lambda / DynamoDB)",
      "Full-Stack Web (Next.js / TypeScript)",
      "IoT Telemetry (ESP32 / MQTT)",
      "Python & boto3 Automation",
      "Enterprise IT & Active Directory",
    ],
    image: "/images/founders/muhammad-azhar.webp",
    linkedin: "https://linkedin.com/in/muhammad-azhar-khan",
    github: "https://github.com/muhammad-azhar-khan",
    portfolioUrl: "https://muhammad-azhar-portfolio-xi.vercel.app/",
  },
  {
    name: "Owais Ahmad",
    role: "Data Engineer & AI/ML Specialist",
    title: "Co-Founder & Data Lead",
    bio: "Owais Ahmad is a Data Engineer and AI/ML Specialist experienced in designing metadata-driven Lakehouses with Databricks, Delta Lake, and PySpark under Medallion Architecture (Bronze, Silver, Gold). At Unified Marketing Solutions (UMSBPO), Owais engineers quality-assurance CRM platforms, VICIdial telephony integrations, and automated biometric ERP data pipelines, heading data engineering, lakehouse infrastructure, and analytical workflows at NEXVORA Technologies.",
    isDraftBio: false,
    expertiseTags: [
      "Databricks & PySpark",
      "Medallion Lakehouse Architecture",
      "Delta Lake & ETL/ELT",
      "CRM & Telephony Integrations (VICIdial)",
      "FastAPI & PostgreSQL",
      "Deep Learning & AI Automation",
    ],
    image: "/images/founders/owais-ahmad.webp",
    linkedin: "https://linkedin.com/in/owais-ahmad-79a431292",
    github: "https://github.com/Owais4077",
    portfolioUrl: "https://owaisahmad.me/",
  },
];

export const services: ServiceDetail[] = [
  {
    slug: "custom-software",
    title: "Custom Software and Web Application Development",
    shortTitle: "Custom Software",
    heroHeadline: "Custom Web Applications & Software Built Around Your Workflow",
    heroOutcome: "Scalable, secure, and maintainable software systems designed to solve concrete business bottlenecks.",
    iconName: "Code2",
    problemSolved: [
      "Off-the-shelf software lacks flexibility or charges exorbitant per-seat costs.",
      "Legacy software creates operational bottlenecks, slow workflows, and high maintenance costs.",
      "Fragmented internal processes require multiple disconnected tools without unified APIs.",
    ],
    deliverables: [
      "Modern full-stack web applications (Next.js, React, Node.js, Python)",
      "Internal operations tools, management dashboards, and admin portals",
      "Robust REST & GraphQL API design, microservices, and integrations",
      "Scalable SaaS product architecture and multi-tenant database foundations",
      "Automated testing suites and comprehensive technical documentation",
    ],
    processSteps: [
      { title: "Architecture Discovery", description: "Mapping workflows, user roles, data schemas, and non-functional requirements." },
      { title: "Rapid Prototyping", description: "Interactive wireframes and system interface prototypes validated before code." },
      { title: "Sprint-Based Build", description: "Clean, typed code with continuous integration and bi-weekly milestone demos." },
      { title: "QA & Hardening", description: "Automated regression testing, performance audits, and security vulnerability scanning." },
      { title: "Deployment & Support", description: "Production rollout with zero downtime and post-launch maintenance SLA." },
    ],
    technologies: ["TypeScript", "Next.js", "React", "Node.js", "Python", "PostgreSQL", "Docker", "Redis"],
    faqs: [
      {
        question: "Do you build custom internal portals or customer-facing SaaS apps?",
        answer: "We engineer both. Our team builds high-throughput internal operations tools, employee dashboards, and public-facing multi-tenant SaaS products from architectural foundation to deployment."
      },
      {
        question: "Who owns the source code and intellectual property?",
        answer: "You own 100% of the code, intellectual property, repositories, and architectural documentation upon project milestone completion."
      },
      {
        question: "How do you ensure code maintainability after launch?",
        answer: "We enforce strict TypeScript typing, modular architecture, comprehensive automated test coverage, and clear documentation so any engineering team can easily maintain or scale the codebase."
      },
      {
        question: "Can we start with an MVP and scale iteratively?",
        answer: "Yes. We frequently build focused, production-grade MVPs within 6 to 10 weeks, then iterate based on real user feedback and operational data."
      }
    ]
  },
  {
    slug: "cloud-infrastructure",
    title: "Cloud and IT Infrastructure",
    shortTitle: "Cloud & Infrastructure",
    heroHeadline: "Resilient Cloud Architecture, Secure Systems & DevOps Engineering",
    heroOutcome: "Eliminate downtime, streamline deployments, and secure your systems with founder-led cloud expertise.",
    iconName: "Cloud",
    problemSolved: [
      "Unoptimized cloud instances result in unpredictable and escalating monthly billing.",
      "Fragile manual deployments cause frequent release failures and downtime.",
      "Vulnerable networking configurations and lack of centralized access controls expose sensitive corporate assets.",
    ],
    deliverables: [
      "Cloud architecture design and cost-optimization for AWS and Microsoft Azure",
      "Zero-downtime migration of on-premise servers and databases to the cloud",
      "Automated CI/CD pipelines (GitHub Actions, GitLab CI, Docker)",
      "Secure remote access, VPNs, IAM role definition, and network security policies",
      "Proactive 24/7 infrastructure monitoring, logging, and automated alerting",
    ],
    processSteps: [
      { title: "Infrastructure Audit", description: "Reviewing existing resources, security postures, latency, and cloud spend." },
      { title: "Topology Blueprint", description: "Specifying high-availability VPCs, subnets, auto-scaling groups, and IAM policies." },
      { title: "Staged Migration", description: "Step-by-step workload transfer with rollback contingencies and data verification." },
      { title: "Automation & Guardrails", description: "Infrastructure as Code (IaC) with automated CI/CD pipeline enforcement." },
      { title: "SLA Monitoring", description: "Log aggregation, uptime alerts, and regular backup verification schedules." },
    ],
    technologies: ["AWS", "Microsoft Azure", "Docker", "Kubernetes", "Terraform", "GitHub Actions", "Linux / Nginx", "Cloudflare"],
    faqs: [
      {
        question: "Which cloud providers do you specialize in?",
        answer: "Our primary expertise centers on Amazon Web Services (AWS) and Microsoft Azure, as well as cost-effective VPS and modern serverless platforms like Vercel and Railway."
      },
      {
        question: "Can you help optimize our monthly cloud expenditure?",
        answer: "Yes. Our cloud audits identify idle workloads, over-provisioned instances, unattached storage volumes, and inefficient data transfer routes to significantly lower your cloud spend."
      },
      {
        question: "How do you manage system security and compliance?",
        answer: "We follow the principle of least privilege for IAM, enforce HTTPS/TLS everywhere, implement VPC segmentation, automated security patch cycles, and encrypted backups."
      },
      {
        question: "Do you offer post-migration infrastructure support?",
        answer: "Yes. We offer ongoing infrastructure maintenance, monitoring, patch management, and emergency response retainers."
      }
    ]
  },
  {
    slug: "data-engineering",
    title: "Data Engineering and Analytics",
    shortTitle: "Data Engineering",
    heroHeadline: "Reliable Data Pipelines, Modern Warehousing & Actionable Dashboards",
    heroOutcome: "Transform fragmented raw business data into dependable decision engines and verifiable reporting.",
    iconName: "Database",
    problemSolved: [
      "Business metrics live in siloed databases, spreadsheets, and third-party tools with conflicting numbers.",
      "Fragile data extraction scripts fail silently, creating delayed or erroneous management reporting.",
      "Decision makers lack real-time visibility into operational bottlenecks and customer behavior.",
    ],
    deliverables: [
      "Robust automated ETL / ELT data pipeline construction and orchestrations",
      "Centralized cloud data warehouse architecture (Snowflake, BigQuery, PostgreSQL)",
      "Automated data cleaning, deduplication, and schema validation rules",
      "Executive business intelligence dashboards and operational performance trackers",
      "Data governance frameworks and historical change-tracking models",
    ],
    processSteps: [
      { title: "Data Source Audit", description: "Cataloging all databases, APIs, CSV streams, and business definitions." },
      { title: "Schema Modeling", description: "Designing dimensional star/snowflake schemas tailored for analytical speed." },
      { title: "Pipeline Ingestion", description: "Building fault-tolerant pipelines with error notifications and idempotency." },
      { title: "Transformation & QA", description: "Implementing automated data quality tests, deduplication, and metric validation." },
      { title: "Dashboard Delivery", description: "Connecting self-serve BI tools and training internal teams on report navigation." },
    ],
    technologies: ["Python", "SQL", "PostgreSQL", "Apache Airflow", "BigQuery", "Snowflake", "dbt", "Power BI / Metabase"],
    faqs: [
      {
        question: "What scale of data can your pipelines support?",
        answer: "Our architectures handle everything from millions of transactional records in growing SMEs to high-frequency streaming events requiring distributed processing."
      },
      {
        question: "How do you verify data accuracy across sources?",
        answer: "We embed automated schema validation, reconciliation checks, anomaly detection, and row-count verification at every pipeline transformation stage."
      },
      {
        question: "Can you connect our legacy databases with modern BI tools?",
        answer: "Yes. We build secure connectors and replication pipelines from on-premise SQL Server, MySQL, Oracle, or CRM systems directly into modern analytical platforms."
      },
      {
        question: "Will our internal team be able to write queries and update dashboards?",
        answer: "We build intuitive data marts with clear dimensional models and provide comprehensive documentation and training sessions."
      }
    ]
  },
  {
    slug: "crm-solutions",
    title: "CRM Solutions and Integration",
    shortTitle: "CRM Solutions",
    heroHeadline: "CRM Architecture, Integration & Data Validation Built for Sales Teams",
    heroOutcome: "Streamline customer lifecycles, eliminate duplicate records, and synchronize sales with operations.",
    iconName: "Users",
    problemSolved: [
      "Sales reps waste hours manually copying customer information between CRM, email, and billing systems.",
      "Duplicate contacts, invalid phone numbers, and outdated records pollute pipeline forecasting.",
      "Management lacks accurate pipeline visibility due to improper CRM stage definitions and poor team adoption.",
    ],
    deliverables: [
      "Platform evaluation, custom configuration, and deployment (HubSpot, Salesforce, Zoho, custom CRMs)",
      "Bi-directional API integrations connecting CRM with website forms, ERP, and payment gateways",
      "Automated data hygiene: deduplication, format standardization, and validation algorithms",
      "Custom lead scoring, automated routing rules, and multi-channel follow-up sequences",
      "Comprehensive pipeline reporting, win/loss analytics, and revenue forecasting views",
    ],
    processSteps: [
      { title: "Sales Lifecycle Review", description: "Interviewing sales and ops leads to document lead-to-revenue steps." },
      { title: "Object Modeling", description: "Configuring custom objects, properties, deal pipelines, and permissions." },
      { title: "Data Scrubbing & Migration", description: "Cleaning, deduplicating, and mapping legacy contacts into new schemas." },
      { title: "Integration Setup", description: "Connecting webhooks, form handlers, billing gateways, and email providers." },
      { title: "Team Enablement", description: "Workflow documentation, cheat-sheets, and hands-on staff onboarding." },
    ],
    technologies: ["HubSpot API", "Salesforce", "Zoho CRM", "REST APIs", "Webhooks", "Node.js", "Python", "Zapier / Make"],
    faqs: [
      {
        question: "Can you clean up our existing mess of duplicate CRM contacts?",
        answer: "Yes. We develop automated deduplication and standardization scripts that reconcile duplicate records by phone, email, tax ID, or company name without losing activity history."
      },
      {
        question: "Do you build custom CRMs or implement existing platforms?",
        answer: "We do both. For businesses with standard sales cycles, we customize and integrate platforms like HubSpot or Zoho. For organizations with unique proprietary workflows, we engineer bespoke CRM systems from scratch."
      },
      {
        question: "How do you connect our website inquiries directly to our sales pipeline?",
        answer: "We connect form submissions via secure API endpoints with instant validation, spam filtering, automatic deal creation, and sales notification alerts."
      },
      {
        question: "Can you integrate WhatsApp and call centers with our CRM?",
        answer: "Yes. We configure multi-channel integrations that log WhatsApp customer conversations, SMS alerts, and call records directly against the contact profile."
      }
    ]
  },
  {
    slug: "ai-automation",
    title: "AI-Powered Solutions and Business Automation",
    shortTitle: "AI & Automation",
    heroHeadline: "Automate Repetitive Work & Add Intelligence to Operations",
    heroOutcome: "Deploy practical AI assistants, intelligent document processing, and multi-step workflow automations.",
    iconName: "Cpu",
    problemSolved: [
      "Employees spend hundreds of manual hours extracting data from PDFs, invoices, and physical forms.",
      "Customer inquiry response times lag during off-hours, resulting in lost prospects and low satisfaction.",
      "Repetitive cross-platform copy-pasting introduces costly human calculation and data entry errors.",
    ],
    deliverables: [
      "Intelligent document parsing (invoices, receipts, legal contracts, purchase orders)",
      "Context-aware AI knowledge assistants grounded on internal company databases",
      "Multi-step business process automation across CRM, ERP, email, and messaging platforms",
      "Automated lead enrichment, classification, and sentiment routing engines",
      "Custom LLM API integrations with strict guardrails and private data handling",
    ],
    processSteps: [
      { title: "Feasibility Assessment", description: "Identifying high-friction repetitive tasks with measurable ROI potential." },
      { title: "Guardrails & Architecture", description: "Establishing strict privacy rules, accuracy tolerances, and fallback logic." },
      { title: "Prototype Development", description: "Testing extraction accuracy and prompt chains against actual business edge-cases." },
      { title: "System Integration", description: "Connecting AI workflows seamlessly into your operational tools." },
      { title: "Performance Tuning", description: "Ongoing evaluation of accuracy, latency, and operational token costs." },
    ],
    technologies: ["OpenAI / Gemini APIs", "Python", "LangChain / LlamaIndex", "Vector DBs (Pinecone, pgvector)", "FastAPI", "OCR Engines"],
    faqs: [
      {
        question: "Is our proprietary business data used to train public AI models?",
        answer: "Never. We exclusively implement enterprise-tier API endpoints and isolated private infrastructure where your data is never retained or used for model training."
      },
      {
        question: "How do you prevent AI 'hallucinations' in corporate applications?",
        answer: "We use Retrieval-Augmented Generation (RAG) with verified citation requirements, deterministic validation rules, and human-in-the-loop verification for critical actions."
      },
      {
        question: "What is the typical timeframe to deploy an automation workflow?",
        answer: "Most targeted business automation workflows (e.g., invoice extraction or customer query triage) are prototyped in 2 weeks and in production within 4 weeks."
      },
      {
        question: "Can AI connect directly to our existing SQL database?",
        answer: "Yes. We build read-only natural language query interfaces with strict SQL sanitization and role-based permissions."
      }
    ]
  },
  {
    slug: "web-design",
    title: "Website and UI/UX Design",
    shortTitle: "Web & UI/UX Design",
    heroHeadline: "Fast, Accessible Corporate Websites & Interfaces Designed to Convert",
    heroOutcome: "Disciplined design systems, enterprise credibility, and lightning-fast web experiences.",
    iconName: "Layout",
    problemSolved: [
      "Existing company website looks outdated, feels slow, and fails to convince enterprise or international buyers.",
      "Cluttered navigation and poor mobile responsiveness cause visitors to abandon quote forms.",
      "Inconsistent branding across pages damages organizational credibility and perceived service quality.",
    ],
    deliverables: [
      "Custom corporate website design and production-ready Next.js frontend engineering",
      "Modular design systems and reusable accessible component libraries",
      "High-converting inquiry flows, multi-step quote calculators, and lead capture funnels",
      "Mobile-first responsive architecture tested from 320 px to 4K displays",
      "Performance optimization achieving Core Web Vitals green scores and WCAG 2.2 AA accessibility",
    ],
    processSteps: [
      { title: "Sitemap & User Journeys", description: "Defining conversion paths for business owners, CTOs, and procurement leads." },
      { title: "Figma Design & Tokens", description: "Crafting bespoke layouts, color hierarchy, and typography without generic templates." },
      { title: "Frontend Implementation", description: "Developing semantic Next.js code with clean animations and accessible primitives." },
      { title: "Audit & Cross-Device QA", description: "Running Lighthouse, axe accessibility scans, and real device mobile testing." },
      { title: "SEO & Launch", description: "Structured schema markup, Open Graph tags, canonical links, and CDN caching." },
    ],
    technologies: ["Figma", "Next.js (App Router)", "TypeScript", "Tailwind CSS", "Radix UI", "Framer Motion", "Vercel"],
    faqs: [
      {
        question: "Do you use generic website templates or build custom?",
        answer: "Every NEXVORA website is designed and engineered custom from the ground up to reflect your authentic brand positioning and engineering rigor."
      },
      {
        question: "How fast will our new website load?",
        answer: "We build for sub-second page loads, LCP under 2.0s, and 95+ scores on Google Lighthouse mobile audits."
      },
      {
        question: "Can our team easily edit copy and publish new content?",
        answer: "Yes. We configure clean headless CMS integrations or version-controlled content files so you can update text and images effortlessly."
      },
      {
        question: "Do you design personal portfolio websites for executives?",
        answer: "Yes. We offer an executive portfolio package that creates high-impact personal leadership sites for founders, consultants, and senior executives."
      }
    ]
  }
];

export const projectsData: ProjectItem[] = [
  {
    id: "proj-ums-lms",
    slug: "enterprise-lms-employee-portal",
    title: "Enterprise LMS & Employee Command Center",
    client: "Unified Marketing Systems (UMS BPO)",
    isConfidential: false,
    isCapabilityDemonstration: true,
    summary: "Comprehensive internal enterprise web platform uniting a multi-tier learning management system, shift-based attendance management, and role-based access control.",
    serviceSlug: "custom-software",
    serviceName: "Custom Software",
    industry: "Enterprise BPO & Operations",
    challenge: "Managing employee shift rosters, course certifications, leave approvals, and biometric attendance across distributed teams without unified server-side access controls.",
    solution: "Built with Next.js App Router, TypeScript, Tailwind CSS, shadcn/ui, Supabase (PostgreSQL) with Row-Level Security, and an audited Hikvision device punch integration layer.",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Supabase (PostgreSQL + RLS)", "Hikvision Integration", "Vercel"],
    outcome: "Unified employee self-service with audited correction workflows, shift summaries, and role-scoped data isolation.",
    images: ["/images/projects/lms-portal-diagram.svg"],
  },
  {
    id: "proj-lakehouse",
    slug: "end-to-end-lakehouse-pipeline",
    title: "Enterprise Medallion Lakehouse & AI Analytics Pipeline",
    client: "Databricks Lakehouse Project",
    isConfidential: false,
    isCapabilityDemonstration: true,
    summary: "Metadata-driven automated Lakehouse pipeline using Databricks, PySpark, Delta Lake, and Medallion Architecture (Bronze, Silver, Gold) with Unity Catalog governance.",
    serviceSlug: "data-engineering",
    serviceName: "Data Engineering",
    industry: "Big Data & Enterprise Analytics",
    challenge: "Ingesting and transforming high-velocity multi-source relational and streaming datasets while maintaining schema enforcement and ACID transactional integrity.",
    solution: "Implemented automated ingestion using Auto Loader and JDBC connectors, structured Bronze/Silver/Gold Delta Lake layers, automated schema validation, and deduplication logic powering Databricks SQL and AI-BI.",
    technologies: ["Databricks", "PySpark", "Delta Lake", "Auto Loader", "Unity Catalog", "Spark SQL"],
    outcome: "Scalable lakehouse platform providing sub-second analytical query performance, schema drift tolerance, and unified governance.",
    images: ["/images/projects/lakehouse-architecture-diagram.svg"],
  },
  {
    id: "proj-smart-farming",
    slug: "smart-farming-iot-cloud",
    title: "Smart Precision Agriculture IoT & AWS Cloud Telemetry",
    client: "IoT Cloud Engineering Capstone",
    isConfidential: false,
    isCapabilityDemonstration: true,
    summary: "End-to-end IoT precision agriculture system streaming capacitive soil moisture, temperature, and ambient light telemetry to AWS for automated irrigation triggers.",
    serviceSlug: "cloud-infrastructure",
    serviceName: "Cloud & Infrastructure",
    industry: "AgriTech & Smart Systems",
    challenge: "Capturing continuous edge telemetry from microcontrollers in the field and automating irrigation actuators in real time without on-premise servers.",
    solution: "Implemented ESP32 edge telemetry over MQTT to AWS IoT Core, triggering serverless Python AWS Lambda handlers to evaluate soil moisture thresholds, actuate irrigation relays, and log to DynamoDB and QuickSight.",
    technologies: ["AWS IoT Core", "AWS Lambda", "Amazon DynamoDB", "Amazon QuickSight", "ESP32", "Python", "MQTT"],
    outcome: "Autonomous precision irrigation triggered by live soil sensor telemetry with interactive Amazon QuickSight executive dashboards.",
    images: ["/images/projects/smart-farming-iot-diagram.svg"],
  },
  {
    id: "proj-qa-crm",
    slug: "qa-crm-vicidial-pipeline",
    title: "Enterprise QA CRM & VICIdial Telephony Integration",
    client: "Unified Marketing Solutions (UMSBPO)",
    isConfidential: false,
    isCapabilityDemonstration: true,
    summary: "Quality assurance CRM and backend integration service pulling completed call logs and audio from VICIdial telephony servers for agent scorecard evaluations.",
    serviceSlug: "crm-solutions",
    serviceName: "CRM Solutions",
    industry: "Contact Centers & BPO",
    challenge: "Manual call sampling and offline spreadsheet audits resulted in slow agent feedback loops and zero real-time visibility into contact center quality.",
    solution: "Engineered FastAPI REST services and PostgreSQL database models to ingest VICIdial call data, coupled with browser-based audio evaluation scorecards, disposition tracking, and KPI dashboards.",
    technologies: ["Python", "FastAPI", "PostgreSQL", "VICIdial API", "Docker", "REST APIs"],
    outcome: "Production quality management platform serving active contact center operations with automated scoring and performance metrics.",
    images: ["/images/projects/qa-crm-telephony-diagram.svg"],
  },
  {
    id: "proj-anviz-odoo",
    slug: "anviz-odoo-attendance-sync",
    title: "Biometric Attendance Pipeline & Odoo ERP Integration",
    client: "Enterprise ERP Sync",
    isConfidential: false,
    isCapabilityDemonstration: true,
    summary: "Automated biometric punch-record ingestion pipeline linking hardware terminals to PostgreSQL audit tables and Odoo ERP via scheduled synchronization.",
    serviceSlug: "custom-software",
    serviceName: "Custom Software",
    industry: "HR Tech & Enterprise ERP",
    challenge: "Bridging isolated physical attendance hardware with enterprise ERP software without losing punch records during network disruptions.",
    solution: "Built containerized Python FastAPI middleware communicating directly with Anviz device protocols, validating duplicate punches, mapping employee IDs, and syncing with Odoo HR modules.",
    technologies: ["Python", "FastAPI", "PostgreSQL", "Docker", "Odoo API", "Hardware Protocol"],
    outcome: "Reliable, hands-free biometric attendance sync eliminating manual attendance exports and payroll entry lag.",
    images: ["/images/projects/biometric-odoo-sync-diagram.svg"],
  },
  {
    id: "proj-workforce-monitoring",
    slug: "workforce-monitoring-idle-alert",
    title: "Enterprise Workforce Monitoring & Idle Detection Engine",
    client: "Unified Marketing Systems (UMS BPO)",
    isConfidential: false,
    isCapabilityDemonstration: true,
    summary: "Desktop activity monitoring agent and central management dashboard providing periodic screen captures, break tracking, and 2-minute automated idle alerts.",
    serviceSlug: "ai-automation",
    serviceName: "AI & Automation",
    industry: "Workforce Operations & Security",
    challenge: "Providing objective, verifiable employee work-hour verification while immediately flagging unauthorized workstation abandonment.",
    solution: "Developed a lightweight Python Windows service capturing periodic encrypted screen captures and monitoring keyboard/mouse input states, paired with an admin dashboard alerting on 2-minute idle timeouts.",
    technologies: ["Python", "Windows Desktop Agent", "REST API", "PostgreSQL", "Web Dashboard"],
    outcome: "Active deployment providing Super Admins with live status tracking, pause/break calculations, and exportable worked-hours audit logs.",
    images: ["/images/projects/workforce-monitoring-diagram.svg"],
  },
  {
    id: "proj-cloud-arch",
    slug: "enterprise-cloud-migration-audit",
    title: "Multi-Region Cloud Architecture & Zero-Downtime Deployment",
    client: "Cloud Architecture Reference",
    isConfidential: false,
    isCapabilityDemonstration: true,
    summary: "Architected high-availability AWS infrastructure with containerized microservices, multi-AZ database clustering, and declarative CI/CD pipelines.",
    serviceSlug: "cloud-infrastructure",
    serviceName: "Cloud & Infrastructure",
    industry: "Financial & SaaS",
    challenge: "Designing resilient cloud infrastructure capable of handling sudden traffic spikes while eliminating manual deployment risks.",
    solution: "Designed an automated VPC topology on AWS with ECS containerized workloads, RDS multi-AZ failover, automated Terraform provisioning, and GitHub Actions CI/CD.",
    technologies: ["AWS", "Docker", "Terraform", "GitHub Actions", "PostgreSQL", "Nginx"],
    outcome: "Reference architecture demonstrating automated zero-downtime rolling deployments, multi-AZ failover recovery, and declarative infrastructure management.",
    images: ["/images/projects/cloud-architecture-diagram.svg"],
  },
  {
    id: "proj-crm-dedup",
    slug: "crm-pipeline-deduplication-engine",
    title: "High-Throughput CRM Data Pipeline & Automated Deduplication",
    client: "CRM Architecture Reference",
    isConfidential: false,
    isCapabilityDemonstration: true,
    summary: "Unified multi-platform customer records with real-time bidirectional CRM synchronization and fuzzy deduplication algorithms.",
    serviceSlug: "crm-solutions",
    serviceName: "CRM Solutions",
    industry: "B2B Services & Sales Ops",
    challenge: "Addressing duplicate customer records and fragmented data across sales channels that corrupt pipeline forecasting.",
    solution: "Engineered automated Python deduplication scripts with Levenshtein fuzzy matching, mapped unified CRM properties, and connected live webhooks for incoming leads.",
    technologies: ["HubSpot API", "Python", "PostgreSQL", "FastAPI", "Webhooks"],
    outcome: "Reference build demonstrating schema-validated ETL ingestion, automated fuzzy record reconciliation, and bi-directional CRM webhook synchronization.",
    images: ["/images/projects/crm-data-flow.svg"],
  }
];

export const techStackCategories = [
  {
    name: "Frontend",
    technologies: [
      { name: "Next.js (App Router)", description: "Server-side rendering, static generation, high SEO" },
      { name: "TypeScript", description: "Strict static typing and runtime predictability" },
      { name: "React", description: "Declarative component-driven interfaces" },
      { name: "Tailwind CSS", description: "Utility-first disciplined design tokens" },
      { name: "Radix UI", description: "Accessible headless UI primitives (WAI-ARIA compliant)" },
    ],
  },
  {
    name: "Backend & Systems",
    technologies: [
      { name: "Node.js", description: "High-concurrency asynchronous runtime" },
      { name: "Python", description: "Data science, scripting, and backend microservices" },
      { name: "PostgreSQL", description: "Enterprise relational database with ACID guarantees" },
      { name: "Redis", description: "Sub-millisecond in-memory cache and rate limiting" },
      { name: "REST & GraphQL", description: "Contract-first API design and schema validation" },
    ],
  },
  {
    name: "Cloud & DevOps",
    technologies: [
      { name: "AWS", description: "EC2, S3, RDS, VPC, IAM, CloudWatch, ECS" },
      { name: "AWS Serverless & IoT", description: "Lambda, DynamoDB, IoT Core, S3, CloudFront, Rekognition" },
      { name: "Microsoft Azure", description: "Virtual networks, App Services, Blob Storage" },
      { name: "Docker", description: "Containerized reproducible application environments" },
      { name: "GitHub Actions", description: "Automated linting, testing, and continuous deployment" },
      { name: "Cloudflare", description: "Global edge CDN, DNS, DDoS mitigation, and WAF" },
    ],
  },
  {
    name: "Data & CRM",
    technologies: [
      { name: "Databricks & Delta Lake", description: "Medallion Architecture (Bronze/Silver/Gold), PySpark, and Unity Catalog" },
      { name: "VICIdial & CRM Telephony", description: "Telephony data sync, agent call evaluation scorecards, and QA metrics" },
      { name: "HubSpot API", description: "CRM objects, webhooks, deal pipelines, and automation" },
      { name: "SQL & PostgreSQL", description: "Analytical data transformations, schema design, and RLS" },
      { name: "Power BI / Dashboards", description: "Executive decision intelligence and real-time operational reporting" },
    ],
  },
  {
    name: "AI & Automation",
    technologies: [
      { name: "OpenAI & Gemini APIs", description: "Enterprise LLM integration and prompt architecture" },
      { name: "LangChain / RAG", description: "Grounded retrieval on proprietary knowledge bases" },
      { name: "OCR & Document AI", description: "Structured data extraction from PDFs and invoices" },
    ],
  },
];

export const developmentProcess = [
  {
    step: "01",
    name: "Discover",
    tagline: "Scope & Architecture",
    description: "We interrogate the root business problem, map operational workflows, identify integration constraints, and define concrete success criteria before proposing a solution.",
  },
  {
    step: "02",
    name: "Design",
    tagline: "Systems & Interface",
    description: "We produce clean interface wireframes, database schemas, API contracts, and security architectures. No generic templates; every decision is evidenced.",
  },
  {
    step: "03",
    name: "Build",
    tagline: "Typed, Tested Code",
    description: "Founder-led engineering with strict TypeScript, modular architecture, automated test suites, and weekly milestone demos in preview environments.",
  },
  {
    step: "04",
    name: "Launch",
    tagline: "Hardened Rollout",
    description: "Zero-downtime deployment, DNS cutover, security header configuration, performance audits, and thorough end-to-end verification.",
  },
  {
    step: "05",
    name: "Support",
    tagline: "Proactive Reliability",
    description: "Continuous infrastructure monitoring, response-time promises, automated backups, and scheduled optimization reviews to keep your systems humming.",
  },
];

export const differentiators = [
  {
    title: "Founder-Led Delivery",
    description: "You work directly with founders Muhammad Azhar and Owais Ahmad. No junior handoffs, no middle-management noise, and no translation layers between your vision and the code.",
    iconName: "ShieldCheck",
  },
  {
    title: "Cloud + Data + Software Under One Roof",
    description: "Most agencies specialize in only frontend or back-office. We combine cloud infrastructure, data pipelines, CRM systems, and software engineering into one cohesive architecture.",
    iconName: "Layers",
  },
  {
    title: "Transparent, Documented Process",
    description: "Clear deliverables, weekly milestone demos, fixed-scope certainty, and full IP ownership from day one. You always know what is being built, why, and when it ships.",
    iconName: "GitBranch",
  },
  {
    title: "Direct Engineering Communication",
    description: "Fast responses via WhatsApp, email, or scheduled video calls. Direct access to the engineers solving your problems without ticketing hurdles or bureaucratic delays.",
    iconName: "MessageSquare",
  },
];

