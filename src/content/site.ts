export interface Founder {
  name: string;
  role: string;
  title: string;
  headline: string;
  bio: string;
  isDraftBio?: boolean;
  education?: string;
  certifications?: string[];
  technicalFocus?: string[];
  technicalExpertise?: Record<string, string>;
  expertiseTags: string[];
  image: string;
  linkedin?: string;
  github?: string;
  portfolioUrl?: string;
}

export interface SubService {
  title: string;
  description: string;
}

export interface ServiceDetail {
  slug: string;
  aliases?: string[];
  divisionNumber: string;
  title: string;
  shortTitle: string;
  heroHeadline: string;
  heroOutcome: string;
  iconName: string;
  subServices: SubService[];
  businessChallenges: string[];
  problemSolved?: string[];
  engineeringApproach: { title: string; description: string }[];
  processSteps?: { title: string; description: string }[];
  technicalCapabilities: string[];
  technologies: string[];
  relevantProjects: { title: string; slug: string; outcome: string }[];
  expectedDeliverables: string[];
  deliverables?: string[];
  faqs: { question: string; answer: string }[];
  ctaLabel: string;
}

export interface ProjectItem {
  id: string;
  slug: string;
  aliases?: string[];
  title: string;
  client: string;
  classification: "Client Engagement" | "Internal Project" | "Academic Research" | "Demonstration";
  isConfidential: boolean;
  summary: string;
  serviceSlug: string;
  serviceName: string;
  industry: string;
  challenge: string;
  solution: string;
  architectureDetails: string[];
  technologies: string[];
  outcome: string;
  images: string[];
  githubUrl?: string;
  liveDemoUrl?: string;
}

export interface IndustryItem {
  name: string;
  slug: string;
  iconName: string;
  tagline: string;
  description: string;
  challengeSolved: string;
  engineeredSolutions: string[];
}

export interface TechnologyItem {
  id: string;
  name: string;
  category: "Cloud & DevOps" | "Data Engineering & Lakehouses" | "Artificial Intelligence & Vision" | "Generative AI & Agentic Systems" | "Software & API Engineering" | "Enterprise Automation & Hardware Protocols";
  role: string;
  verifiedStatus: "Demonstrated Implementation" | "Reference Architecture" | "Academic Benchmark" | "Internal Engineering System" | "Core Competency";
  relevantServiceSlug: string;
  relevantProjectSlug?: string;
}

export interface InsightArticle {
  slug: string;
  title: string;
  excerpt: string;
  category: "Data Engineering" | "Software Engineering" | "AI & Vision";
  readingTime: string;
  author: {
    name: string;
    role: string;
  };
  publishedAt: string;
  updatedAt: string;
  tags: string[];
  serviceSlug: string;
  projectSlug?: string;
  content: string;
}

export const siteConfig = {
  name: "NEXVORA Technologies",
  legalName: "NEXVORA Technologies",
  tagline: "Build Beyond Limits.",
  heroHeadline: "Build Beyond Limits.",
  positioning:
    "We engineer scalable software, modern data platforms, cloud infrastructure, and intelligent AI solutions that empower growing enterprises and startups to automate and lead.",
  url: "https://nexvora-technologies.vercel.app",
  description:
    "We engineer scalable software, modern data platforms, cloud infrastructure, and intelligent AI solutions that empower growing enterprises and startups to automate and lead.",
  
  contact: {
    email: "nexvora.code@gmail.com",
    displayEmail: "nexvora.code@gmail.com",
    hasRealEmail: true,
    phone: "+92 335 5277018",
    displayPhone: "+92 335 5277018",
    hasRealPhone: true,
    whatsappNumber: "923355277018",
    hasRealWhatsapp: true,
    whatsappGreeting: "Hello NEXVORA Technologies, I would like to discuss an engineering project.",
    address: "Islamabad / Rawalpindi & Global Delivery",
    hasRealAddress: true,
    businessHours: "Monday – Saturday: 9:00 AM – 6:00 PM PKT (UTC+5)",
    responseTime: "Our team aims to respond within one business day.",
  },

  socials: {
    linkedin: "https://www.linkedin.com/in/owais-ahmad-79a431292/",
    github: "https://github.com/Owais4077",
    twitter: "https://twitter.com",
  },

  metadata: {
    foundingYear: "2024",
    locationRegion: "PK / GCC / Global",
  },
};

export const founders: Founder[] = [
  {
    name: "Muhammad Azhar",
    role: "Co-Founder & Technical Lead",
    title: "Co-Founder & Technical Lead",
    headline: "Software Engineer | Cloud Architect | Serverless Specialist | Systems Engineer",
    bio: "Muhammad Azhar is a Software Engineer, Cloud Architect, and technical lead specializing in full-stack software development, cloud-native architectures, and enterprise IT infrastructure. With deep expertise in Next.js, TypeScript, AWS serverless systems (Lambda, DynamoDB, API Gateway, S3, IoT Core), and distributed telemetry networks, Azhar leads core software engineering, systems design, and cloud modernization at NEXVORA Technologies.",
    education: "Bachelor of Science in Computer Science (Software) — Abdul Wali Khan University Mardan (AWKUM)",
    certifications: [
      "AWS Certified Solutions Architect – Associate (Amazon Web Services)",
      "AWS Cloud Technical Essentials (Coursera / AWS)",
      "Certificate of Management & Leadership (AWKUM Student Council)",
    ],
    technicalFocus: [
      "Software Engineering",
      "Cloud Architecture",
      "Amazon Web Services (AWS)",
      "Serverless Applications",
      "Next.js & TypeScript",
      "Enterprise IT Infrastructure",
      "IoT Engineering & Telemetry",
      "FastAPI & REST APIs",
    ],
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
    role: "Co-Founder & Data Lead",
    title: "Co-Founder & Data Lead",
    headline: "Data Engineer | Data Science | AI/ML Specialist | Intelligent Systems Engineer",
    bio: "Owais Ahmad specializes in designing data-intensive systems, scalable ETL/ELT pipelines, modern lakehouse architectures and AI-powered applications. His technical work spans data engineering, distributed data processing, machine learning, computer vision, intelligent automation and enterprise application integration.",
    education: "Bachelor of Science in Computer Science (Specialization: Data Science) — University of Engineering and Technology (UET) Mardan",
    certifications: [
      "Introduction to Data Engineering (IBM / Coursera)",
      "Artificial Intelligence & Machine Learning Specialization (KPITB & UET Mardan)",
      "Get Started with Databricks for Data Engineering (Databricks Academy / Simplilearn)",
      "BI Dashboards with IBM Cognos Analytics and Google Looker (IBM / Coursera)",
      "Data Analytics and Business Intelligence (DigiSkills Training Program)",
    ],
    technicalExpertise: {
      "Programming": "Python, SQL",
      "Data Engineering": "Apache Spark, PySpark, Databricks, Delta Lake, ETL/ELT",
      "Data Architecture": "Medallion Architecture, Data Warehousing, Data Quality, Unity Catalog",
      "Databases": "PostgreSQL, MySQL",
      "Backend": "FastAPI, REST APIs",
      "AI and Machine Learning": "Machine Learning, Deep Learning, Computer Vision, CNN, Vision Transformers",
      "Generative AI": "LLMs, RAG, AI Agents, Chatbots and Intelligent Automation",
      "Cloud and DevOps": "AWS, Azure, Docker, CI/CD",
      "Analytics": "Power BI, Data Analytics and Business Intelligence",
    },
    expertiseTags: [
      "Databricks & PySpark",
      "Medallion Architecture (Bronze/Silver/Gold)",
      "Delta Lake & Unity Catalog",
      "ETL/ELT Data Pipelines",
      "Computer Vision & Deep Learning (CNN, ViT)",
      "Generative AI & Multi-Agent RAG",
      "FastAPI & PostgreSQL Backend",
      "Power BI Dashboards & Decision Intelligence",
    ],
    image: "/images/founders/owais-ahmad.webp",
    linkedin: "https://www.linkedin.com/in/owais-ahmad-79a431292/",
    github: "https://github.com/Owais4077",
    portfolioUrl: "https://owaisahmad.me/",
  },
];

export const services: ServiceDetail[] = [
  {
    slug: "data-engineering",
    aliases: ["data-engineering-and-analytics"],
    divisionNumber: "Division 01",
    title: "Data Engineering & Lakehouses",
    shortTitle: "Data Engineering",
    heroHeadline: "Scalable Data Platforms, Lakehouse Systems & Analytical Pipelines",
    heroOutcome: "We design robust ETL/ELT pipelines, distributed processing engines, and unified lakehouse architectures that turn complex data into reliable analytical assets.",
    iconName: "Database",
    subServices: [
      { title: "Data Engineering Consulting", description: "Architecture assessments, schema modeling, migration planning, and data strategy." },
      { title: "ETL and ELT Pipelines", description: "Batch and streaming pipeline construction with automated error handling and idempotency." },
      { title: "Apache Spark & PySpark", description: "Distributed data compute jobs for high-throughput transformations and big data workloads." },
      { title: "Databricks Engineering", description: "Managed workspaces, compute clusters, jobs orchestration, and Auto Loader ingestion." },
      { title: "Delta Lake & Medallion Architecture", description: "ACID transactional tables across Bronze (raw), Silver (cleansed), and Gold (business aggregates)." },
      { title: "Lakehouse Architecture", description: "Unified storage and compute eliminating data silos between data lakes and warehouses." },
      { title: "Data Warehousing", description: "Dimensional star/snowflake schema modeling on PostgreSQL, BigQuery, and Snowflake." },
      { title: "Real-Time Data Processing", description: "Event-driven stream ingestion with Apache Kafka, Spark Streaming, and cloud webhooks." },
      { title: "Data Quality & Governance", description: "Unity Catalog governance, schema enforcement, automated validation checks, and lineage." },
      { title: "Business Intelligence & Power BI", description: "Executive decision dashboards, automated refresh schedules, and semantic data models." },
    ],
    businessChallenges: [
      "Fragmented data silos across operational databases, third-party APIs, and legacy spreadsheets create conflicting reporting.",
      "Fragile manual ingestion scripts fail silently without notifications, causing delayed or inaccurate leadership metrics.",
      "Analytical queries take minutes to execute, crashing transactional application databases during business hours.",
      "Lack of data governance and audit trails exposes organizations to compliance risks and invalid decision models.",
    ],
    engineeringApproach: [
      { title: "Source Auditing & Data Contracts", description: "We catalog every data producer, define strict schema contracts, and map business domain requirements." },
      { title: "Medallion Pipeline Modeling", description: "We implement Bronze (append-only raw), Silver (cleaned & deduplicated), and Gold (curated aggregates) architecture." },
      { title: "Distributed Transformation & Spark", description: "We author modular PySpark and SQL transformations optimized for vectorization and partition pruning." },
      { title: "Automated Data Quality & Lineage", description: "We embed Great Expectations, anomaly detection, schema drift alerts, and Unity Catalog access control." },
      { title: "Consumption Layer & BI Delivery", description: "We connect performant SQL endpoints, materialized views, and interactive Power BI executive reporting." },
    ],
    technicalCapabilities: [
      "Distributed Spark / PySpark cluster optimization",
      "Medallion architecture on Databricks Delta Lake",
      "Auto Loader cloud storage ingestion with schema inference",
      "Unity Catalog fine-grained access governance and lineage",
      "Zero-downtime database replication via CDC",
      "Automated unit testing for SQL models and Python pipeline functions",
    ],
    technologies: [
      "Python",
      "PySpark",
      "Apache Spark",
      "Databricks",
      "Delta Lake",
      "SQL",
      "Unity Catalog",
      "PostgreSQL",
      "Power BI",
      "Docker",
    ],
    relevantProjects: [
      {
        title: "Enterprise Databricks Lakehouse & Medallion Pipeline",
        slug: "enterprise-databricks-lakehouse",
        outcome: "Sub-second analytical queries and automated Bronze/Silver/Gold Delta Lake pipelines.",
      },
    ],
    expectedDeliverables: [
      "Full lakehouse architectural blueprint and data flow topology",
      "Production-ready, documented PySpark / Delta Lake pipelines",
      "Automated data quality test suites and alerting webhooks",
      "Interactive Power BI executive dashboards and semantic models",
      "Source-code delivery and access are defined in project-specific signed agreements",
    ],
    faqs: [
      {
        question: "Why should we migrate to a Databricks Delta Lake lakehouse?",
        answer: "A Medallion Lakehouse unites the low cost and scalability of cloud object storage with the ACID transactions, schema enforcement, and sub-second query performance of an enterprise data warehouse.",
      },
      {
        question: "How do you ensure data accuracy across source systems?",
        answer: "We enforce automated validation rules, row-count reconciliation, null-rate bounds, and schema drift detection at each pipeline boundary.",
      },
      {
        question: "Can you optimize our existing high cloud compute bills on Databricks?",
        answer: "Yes. We audit cluster configurations, enforce auto-termination, optimize cluster sizing, leverage photon acceleration, and eliminate costly shuffle operations.",
      },
    ],
    ctaLabel: "Request a Data Engineering Assessment",
  },
  {
    slug: "artificial-intelligence",
    aliases: ["ai-machine-learning"],
    divisionNumber: "Division 02",
    title: "Artificial Intelligence & Vision",
    shortTitle: "AI & Vision",
    heroHeadline: "Predictive Models, Computer Vision & Statistical Machine Learning",
    heroOutcome: "We engineer production-grade machine learning models, computer vision classifiers, and predictive analytics that deliver measurable business value.",
    iconName: "Cpu",
    subServices: [
      { title: "Machine Learning Solutions", description: "Supervised and unsupervised learning models engineered for classification, regression, and clustering." },
      { title: "Deep Learning Architectures", description: "Custom neural network design utilizing PyTorch, TensorFlow, CNNs, and Vision Transformers." },
      { title: "Predictive Analytics", description: "Time-series forecasting, customer churn prediction, demand forecasting, and risk modeling." },
      { title: "Computer Vision Systems", description: "Object detection, spatial segmentation, feature extraction, and edge inference." },
      { title: "Natural Language Processing", description: "Sentiment analysis, entity extraction, classification, and sequence modeling." },
      { title: "Medical Image Analysis", description: "Radiographic image classification, Kellgren-Lawrence grading, and pathological feature extraction." },
      { title: "Image Classification & Detection", description: "Automated visual defect detection, quality control inspection, and biometric recognition." },
      { title: "Recommendation Systems", description: "Collaborative and content-based recommendation algorithms for user personalization." },
      { title: "Intelligent Data Analysis", description: "Exploratory modeling, hypothesis testing, and automated pattern discovery." },
    ],
    businessChallenges: [
      "Unstructured visual and textual data remains untapped, resulting in labor-intensive manual inspections and audits.",
      "Off-the-shelf AI models suffer from high error rates when applied to specialized domain data.",
      "Proof-of-concept ML models fail to translate into scalable, low-latency production APIs.",
      "Lack of explainable AI leads to regulatory skepticism and low user trust in critical medical or financial domains.",
    ],
    engineeringApproach: [
      { title: "Data Preparation & Augmentation", description: "Cleaning, annotating, normalizing, and augmenting specialized training datasets with strict validation splits." },
      { title: "Model Architecture Exploration", description: "Benchmarking state-of-the-art CNNs, ResNet backbones, Vision Transformers, and ensemble methods." },
      { title: "Explainability & Interpretability", description: "Integrating Grad-CAM heatmaps and SHAP values so predictions are visually and mathematically justifiable." },
      { title: "Production Containerization", description: "Packaging models into lightweight Docker containers served via high-performance FastAPI endpoints." },
      { title: "Continuous Monitoring & Drift Detection", description: "Tracking inference latency, input data drift, and classification confidence distributions in production." },
    ],
    technicalCapabilities: [
      "Medical X-ray classification and KL grade prediction",
      "Vision Transformer (ViT) and ResNet50 transfer learning",
      "Grad-CAM visual attention mapping for clinical explainability",
      "Sub-second REST inference via FastAPI and TensorRT/ONNX",
      "Native mobile deployment for on-device or client-server computer vision",
    ],
    technologies: [
      "Python",
      "PyTorch",
      "TensorFlow",
      "FastAPI",
      "OpenCV",
      "Scikit-Learn",
      "Pandas & NumPy",
      "Docker",
      "Android Kotlin",
    ],
    relevantProjects: [
      {
        title: "AI-Based Knee Osteoarthritis Detection & KL Grading",
        slug: "ai-knee-osteoarthritis-detection",
        outcome: "ResNet-50 and Vision Transformer medical X-ray classification with Grad-CAM explainability.",
      },
    ],
    expectedDeliverables: [
      "Trained and evaluated model weights with verified benchmark validation metrics",
      "Containerized FastAPI inference service with sub-second response times",
      "Grad-CAM visual explanation overlays and diagnostic probability outputs",
      "Complete Python training pipelines, data preprocessors, and evaluation notebooks",
      "Technical model validation report and API integration documentation",
    ],
    faqs: [
      {
        question: "How do you handle small or imbalanced datasets in machine learning?",
        answer: "We utilize proven transfer learning architectures, stratified sampling, synthetic augmentation (rotation, contrast, affine transforms), and focal loss functions designed for heavy class imbalance.",
      },
      {
        question: "What makes your AI solutions explainable?",
        answer: "For vision models we generate Grad-CAM heatmaps showing the exact pixel regions driving the prediction; for tabular models we compute SHAP/LIME feature importance scores.",
      },
      {
        question: "Can your models be deployed on mobile devices or edge hardware?",
        answer: "Yes. We export models to ONNX or TFLite for edge devices and build native mobile integration layers in Kotlin/Android or React Native.",
      },
    ],
    ctaLabel: "Discuss an AI Solution",
  },
  {
    slug: "generative-ai",
    aliases: ["ai-automation"],
    divisionNumber: "Division 03",
    title: "Generative AI & Agentic Systems",
    shortTitle: "Generative AI",
    heroHeadline: "Enterprise Large Language Models, Multi-Agent RAG & Intelligent Automation",
    heroOutcome: "We build private, context-grounded AI assistants, multi-agent orchestrations, and document intelligence systems with enterprise data privacy and strict VPC boundaries.",
    iconName: "Cpu",
    subServices: [
      { title: "Large Language Model Engineering", description: "Prompt architecture, model fine-tuning, context management, and enterprise API integration." },
      { title: "Retrieval-Augmented Generation (RAG)", description: "Hybrid vector search, semantic chunking, reranking, and citation verification over company assets." },
      { title: "Autonomous AI Agents", description: "Goal-directed agents capable of dynamic reasoning, tool invocation, and multi-step plan execution." },
      { title: "Multi-Agent Systems", description: "Collaborative agent teams with specialized roles for research, code review, drafting, and QA." },
      { title: "AI Chatbots & Virtual Assistants", description: "Customer-facing conversational bots and internal employee knowledge companions." },
      { title: "Document Intelligence", description: "Automated schema-validated extraction from PDFs, invoices, contracts, and regulatory filings." },
      { title: "AI Workflow Automation", description: "Connecting LLM reasoning directly into CRM, ERP, email, and internal webhook pipelines." },
      { title: "Enterprise AI Security & Privacy", description: "Strict private VPC deployments, zero data retention agreements, and prompt injection defenses." },
    ],
    businessChallenges: [
      "Public LLMs hallucinate inaccurate information and lack access to proprietary company knowledge.",
      "Enterprises cannot risk leaking sensitive customer or proprietary data to public AI training corpuses.",
      "Staff waste thousands of hours manually reading, classifying, and transferring data from unstructured documents.",
      "Traditional deterministic automation scripts break whenever inputs slightly change in format or phrasing.",
    ],
    engineeringApproach: [
      { title: "Knowledge Ingestion & Vector Modeling", description: "We ingest documentation, clean markdown, generate embeddings, and index into pgvector or Pinecone." },
      { title: "Hybrid Search & Re-Ranking", description: "We blend BM25 lexical keyword matching with dense vector similarity, followed by cross-encoder reranking." },
      { title: "Strict Guardrails & Verification", description: "We require verifiable citation indices, enforce system safety prompts, and validate schemas with Zod/Pydantic." },
      { title: "Action Execution Handlers", description: "We connect agent tool-calling capabilities to transactional backend endpoints with confirmation gates." },
      { title: "Latency & Cost Optimization", description: "We implement semantic caching, dynamic model routing (flash vs. pro), and compact prompt optimization." },
    ],
    technicalCapabilities: [
      "Production RAG architectures with zero hallucination citation policies",
      "Autonomous tool-calling agents integrated with REST APIs and databases",
      "Intelligent PDF and contract parser with structured JSON output",
      "Private API integration with OpenAI, Anthropic Claude, and Google Gemini",
      "Semantic caching with Redis to reduce recurring API tokens and latency",
    ],
    technologies: [
      "Python",
      "FastAPI",
      "OpenAI API",
      "Google Gemini API",
      "LangChain",
      "LlamaIndex",
      "pgvector",
      "PostgreSQL",
      "Redis",
      "Docker",
    ],
    relevantProjects: [
      {
        title: "Enterprise AI Intelligent Assistant & Multi-Agent RAG",
        slug: "ai-powered-intelligent-assistant",
        outcome: "Intelligent document QA, context retrieval, and automated multi-step operations.",
      },
    ],
    expectedDeliverables: [
      "End-to-end multi-agent or RAG orchestration backend repository",
      "Vector database setup with automated chunking and ingestion pipelines",
      "Responsive web chat interface or Slack/Teams bot connector",
      "Evaluation benchmarks testing retrieval precision, latency, and hallucination rates",
      "Comprehensive data privacy, security guardrail, and API key management documentation",
    ],
    faqs: [
      {
        question: "Is our proprietary company data used to train public AI models?",
        answer: "Never. We strictly architect enterprise-grade API endpoints with contractual zero data retention policies or deploy open-source models inside your private VPC.",
      },
      {
        question: "How do you eliminate AI hallucinations in enterprise applications?",
        answer: "We use Retrieval-Augmented Generation (RAG) with strict semantic guardrails, mandatory document citations, and refusal rules when relevant context is absent.",
      },
      {
        question: "Can AI agents safely perform actions in our ERP or database?",
        answer: "Yes. We configure strict deterministic validation schemas, role-based access tokens, and human-in-the-loop confirmation gates for critical data mutations.",
      },
    ],
    ctaLabel: "Discuss an AI Solution",
  },
  {
    slug: "cloud-devops",
    aliases: ["cloud-infrastructure"],
    divisionNumber: "Division 04",
    title: "Cloud & DevOps Engineering",
    shortTitle: "Cloud & DevOps",
    heroHeadline: "Resilient Cloud Systems, Automated CI/CD & Infrastructure as Code",
    heroOutcome: "We architect zero-downtime AWS and Azure infrastructures, containerize workloads, and automate continuous delivery pipelines with founder-led precision.",
    iconName: "Cloud",
    subServices: [
      { title: "AWS Cloud Engineering", description: "VPC architecture, ECS container services, RDS databases, S3 storage, and serverless Lambda systems." },
      { title: "Microsoft Azure Engineering", description: "Virtual networks, Azure App Services, Azure SQL, Blob Storage, and enterprise cloud operations." },
      { title: "Cloud Architecture Design", description: "High-availability, multi-AZ fault-tolerant topologies with automated disaster recovery." },
      { title: "Docker & Containerization", description: "Reproducible container environments, multi-stage builds, and microservices orchestration." },
      { title: "CI/CD Pipelines", description: "Automated testing, image vulnerability scanning, and zero-downtime deployment workflows on GitHub Actions." },
      { title: "Infrastructure Automation (IaC)", description: "Declarative infrastructure as code using Terraform and CloudFormation." },
      { title: "Cloud Deployment & Cutover", description: "Zero-downtime DNS migrations, blue-green releases, and automated canary deployments." },
      { title: "Monitoring & Observability", description: "Distributed tracing, CloudWatch alarms, centralized log aggregation, and uptime monitoring." },
      { title: "Cloud Cost Optimization", description: "Audit idle infrastructure, right-size instances, optimize storage classes, and reduce monthly bills." },
    ],
    businessChallenges: [
      "Unmonitored cloud resources generate ballooning monthly bills with idle or over-provisioned instances.",
      "Manual server deployments result in unexpected downtime, human configuration errors, and slow release cycles.",
      "Fragile server architectures without automated backups or failover risk catastrophic data loss during outages.",
      "Permissive security configurations and exposed credentials leave infrastructure vulnerable to breaches.",
    ],
    engineeringApproach: [
      { title: "Infrastructure Audit & Cost Review", description: "We analyze active instances, network routing, security groups, and monthly billing to find inefficiencies." },
      { title: "Declarative Topology Design", description: "We write clean Terraform manifests for VPCs, subnets, NAT gateways, security groups, and IAM roles." },
      { title: "Containerization & CI/CD", description: "We containerize services with optimized Dockerfiles and build automated GitHub Actions delivery pipelines." },
      { title: "Zero-Downtime Deployment", description: "We orchestrate rolling updates or blue-green deployments ensuring zero interruption to live end-users." },
      { title: "24/7 Monitoring & Alerting", description: "We configure real-time CloudWatch metrics, uptime checks, and immediate Slack/WhatsApp alerting hooks." },
    ],
    technicalCapabilities: [
      "Multi-AZ AWS VPC topology design with public/private subnet isolation",
      "Automated GitHub Actions pipelines with build caching and Docker image push",
      "Serverless event-driven systems using AWS Lambda, API Gateway, and DynamoDB",
      "Infrastructure as Code provisioning with modular Terraform scripts",
      "Enterprise IT network administration, VPN tunnels, and Active Directory security",
    ],
    technologies: [
      "AWS",
      "Microsoft Azure",
      "Docker",
      "Terraform",
      "GitHub Actions",
      "Linux / Ubuntu",
      "Nginx",
      "Cloudflare",
      "Amazon DynamoDB",
      "AWS Lambda",
    ],
    relevantProjects: [
      {
        title: "Multi-Region Cloud Architecture & Zero-Downtime Deployment",
        slug: "enterprise-cloud-migration-audit",
        outcome: "Automated VPC topology, containerized ECS services, and multi-AZ database clustering.",
      },
      {
        title: "Smart Precision Agriculture IoT & AWS Cloud Telemetry",
        slug: "smart-farming-iot-cloud",
        outcome: "Serverless AWS Lambda, IoT Core, and DynamoDB streaming telemetry pipeline.",
      },
    ],
    expectedDeliverables: [
      "Fully documented Infrastructure as Code (Terraform) repository",
      "Automated CI/CD pipelines for staging and production environments",
      "Hardened VPC network configuration with strict IAM security policies",
      "Uptime monitoring dashboards with automated alerting webhooks",
      "Comprehensive disaster recovery runbook and rollback plan",
    ],
    faqs: [
      {
        question: "Can you help lower our monthly AWS or Azure bill?",
        answer: "Yes. Our cloud cost optimization audit identifies unattached volumes, idle instances, sub-optimal reservations, and over-provisioned databases, frequently cutting monthly spend by 25% to 50%.",
      },
      {
        question: "How do you architect zero-downtime during system deployments?",
        answer: "We use health-checked container deployments with blue-green or rolling update strategies, ensuring new containers pass health checks before traffic cuts over.",
      },
      {
        question: "Do you offer post-launch cloud management and DevOps retainers?",
        answer: "Yes. We offer ongoing infrastructure maintenance, security patching, backup verification, and emergency response retainers.",
      },
    ],
    ctaLabel: "Book a Technical Consultation",
  },
  {
    slug: "software-engineering",
    aliases: ["custom-software", "web-design"],
    divisionNumber: "Division 05",
    title: "Software & API Engineering",
    shortTitle: "Software & APIs",
    heroHeadline: "Bespoke Web Applications, Backend Architectures & Scalable APIs",
    heroOutcome: "We build typed, scalable full-stack applications, robust backend microservices, and maintainable SaaS platforms tailored to your business operations.",
    iconName: "Code2",
    subServices: [
      { title: "Custom Software Development", description: "Ground-up architecture and engineering designed specifically around your operational bottlenecks." },
      { title: "Modern Web Applications", description: "Performant, accessible web platforms using Next.js App Router, TypeScript, and modern UI primitives." },
      { title: "Backend Engineering", description: "Modular server architectures built with Python FastAPI, Node.js, and high-concurrency async runtimes." },
      { title: "REST & GraphQL API Development", description: "Contract-first API design, schema validation, rate-limiting, and comprehensive Swagger documentation." },
      { title: "Database Architecture & Optimization", description: "Relational modeling, indexing strategies, connection pooling, and ACID data integrity on PostgreSQL." },
      { title: "SaaS Application Development", description: "Multi-tenant architectures, subscription billing, organization management, and tenant isolation." },
      { title: "Enterprise Applications", description: "Internal employee command centers, admin dashboards, and audited operational software." },
      { title: "System Integrations", description: "Bi-directional data bridges linking external APIs, legacy platforms, and modern web interfaces." },
      { title: "UI/UX & Design Systems", description: "Accessible, disciplined interface design tokens engineered for mobile, tablet, and 4K desktop screens." },
    ],
    businessChallenges: [
      "Generic SaaS platforms lack custom workflows, forcing staff into awkward manual workarounds across multiple tabs.",
      "Legacy web systems suffer from slow page loads, poor mobile usability, and recurring technical debt.",
      "Poorly designed database schemas bottleneck as user traffic and transactional records grow.",
      "Lack of strict type-safety and automated test coverage results in constant production bugs upon new releases.",
    ],
    engineeringApproach: [
      { title: "Requirements & Domain Modeling", description: "We map user journeys, transactional boundaries, data schemas, and non-functional scalability targets." },
      { title: "Contract-First API Design", description: "We define OpenAPI/Swagger schemas and Zod/Pydantic validation contracts before writing client or server logic." },
      { title: "Type-Safe Full-Stack Implementation", description: "We author clean TypeScript and Python code with modular components, automated tests, and strict linting." },
      { title: "Rigorous QA & Performance Audits", description: "We test across real mobile devices, execute automated integration tests, and optimize Core Web Vitals." },
      { title: "Production Rollout & Knowledge Handover", description: "We ship to production with automated CI/CD pipelines, agreed repository access, and technical documentation." },
    ],
    technicalCapabilities: [
      "Next.js App Router with server-side rendering, streaming, and caching",
      "Python FastAPI backend microservices with automatic OpenAPI schemas",
      "PostgreSQL relational schema modeling with Row-Level Security (RLS)",
      "High-converting, responsive UI/UX design systems with Tailwind CSS",
      "End-to-end automated testing suites and strict TypeScript verification",
    ],
    technologies: [
      "TypeScript",
      "Next.js",
      "React",
      "Python",
      "FastAPI",
      "PostgreSQL",
      "Docker",
      "Tailwind CSS",
      "Radix UI",
      "Redis",
    ],
    relevantProjects: [
      {
        title: "Enterprise LMS & Employee Command Center",
        slug: "enterprise-lms-employee-portal",
        outcome: "Unified learning management, shift roistering, and biometric attendance for distributed operations.",
      },
      {
        title: "Enterprise Workforce Monitoring & Business Automation Engine",
        slug: "enterprise-workforce-monitoring",
        outcome: "Real-time desktop activity monitoring, encrypted screen captures, and idle alert engine.",
      },
    ],
    expectedDeliverables: [
      "Source-code delivery and access are defined in project-specific signed agreements",
      "Scalable database migration scripts and normalized entity-relationship schemas",
      "Interactive Swagger/OpenAPI documentation and Postman collections",
      "Automated unit and integration test coverage",
      "Staging preview environment and production deployment runbook",
    ],
    faqs: [
      {
        question: "How are code ownership and intellectual property handled?",
        answer: "Project-specific IP ownership and transfer terms are documented in signed agreements. Upon milestone completion, repositories, documentation, and agreed assets are transferred according to the agreed terms.",
      },
      {
        question: "Can we start with a focused MVP and expand later?",
        answer: "Absolutely. We routinely architect and ship production-grade MVPs within 6 to 10 weeks, then iterate systematically based on user metrics and operational feedback.",
      },
      {
        question: "How do you ensure the software will scale as our company grows?",
        answer: "We engineer modular microservices or structured modular monoliths with connection pooling, database indexing, asynchronous queues, and stateless container design.",
      },
    ],
    ctaLabel: "Start a Project",
  },
  {
    slug: "business-automation",
    aliases: ["crm-solutions"],
    divisionNumber: "Division 06",
    title: "Business Automation & Enterprise ERP",
    shortTitle: "Automation & ERP",
    heroHeadline: "Custom CRM Pipelines, ERP Integrations & Operational Automation",
    heroOutcome: "We automate manual business processes, synchronize contact center telephony with CRMs, and integrate biometric hardware with enterprise ERP platforms.",
    iconName: "Users",
    subServices: [
      { title: "CRM Architecture & Development", description: "Bespoke CRM systems and enterprise integrations tailored for high-volume sales pipelines." },
      { title: "ERP & Odoo Development", description: "Custom Odoo modules, automated inventory reconciliation, and accounting workflow synchronization." },
      { title: "VICIdial & Telephony Integration", description: "Automated call log ingestion, agent scorecard evaluations, audio recording access, and QA dashboards." },
      { title: "Biometric Attendance Management", description: "Hardware device synchronization (Anviz, Hikvision), punch reconciliation, and payroll sync." },
      { title: "Workflow & Business Process Automation", description: "Eliminate repetitive spreadsheet copy-pasting with robust asynchronous Python workers." },
      { title: "API Integrations & Webhooks", description: "Bi-directional sync between payment gateways, lead capture forms, WhatsApp, and internal systems." },
      { title: "Operational & Executive Dashboards", description: "Real-time visibility into agent productivity, sales conversion velocity, and operational bottlenecks." },
      { title: "Data Hygiene & Deduplication", description: "Fuzzy matching algorithms (Levenshtein) and automated deduplication pipelines for CRM contacts." },
    ],
    businessChallenges: [
      "Sales and support teams waste hours daily copying customer notes and call recordings across disconnected systems.",
      "Duplicate records and invalid phone numbers pollute CRM pipelines, corrupting pipeline forecasting and conversion tracking.",
      "Physical biometric devices frequently desynchronize from HR software, causing payroll delays and manual punch disputes.",
      "Managers lack real-time visibility into contact center quality, agent adherence, and customer inquiry bottlenecks.",
    ],
    engineeringApproach: [
      { title: "Workflow Decomposition & Bottleneck Mapping", description: "We trace how data moves through sales, operations, hardware, and billing to pinpoint exact points of failure." },
      { title: "Middleware Architecture", description: "We engineer fault-tolerant Python FastAPI middleware with durable message queues and retry handling." },
      { title: "Hardware Protocol & Telephony Sync", description: "We connect directly to hardware SDKs and telephony sockets for continuous event streaming." },
      { title: "Automated Data Hygiene & Validation", description: "We run automated deduplication, normalization, and verification checks prior to database insertion." },
      { title: "Operational Dashboards & Alerting", description: "We surface live KPI dashboards with role-based permissions and instant incident notifications." },
    ],
    technicalCapabilities: [
      "VICIdial telephony integration with automated call recording access and scorecards",
      "Anviz and Hikvision biometric attendance synchronization with Odoo ERP",
      "Fuzzy contact deduplication engines powered by Python and PostgreSQL",
      "Custom Odoo ERP module development and automated inventory sync",
      "High-throughput webhook processors handling thousands of events per minute",
    ],
    technologies: [
      "Python",
      "FastAPI",
      "PostgreSQL",
      "Docker",
      "Odoo API",
      "VICIdial API",
      "REST APIs & Webhooks",
      "Hardware SDKs",
      "Redis",
    ],
    relevantProjects: [
      {
        title: "Enterprise QA CRM & VICIdial Telephony Integration",
        slug: "enterprise-qa-crm-vicidial",
        outcome: "Automated contact center call ingestion, agent evaluation scorecards, and live KPI dashboards.",
      },
      {
        title: "Biometric Attendance Pipeline & Odoo ERP Integration",
        slug: "biometric-attendance-odoo-erp",
        outcome: "Hands-free biometric punch sync, duplicate elimination, and automated Odoo HR integration.",
      },
    ],
    expectedDeliverables: [
      "Containerized middleware service connecting CRM, ERP, or telephony hardware",
      "Automated scheduled synchronization cron jobs with failure retry policies",
      "Custom operational dashboard for administration, scorecard audits, and reports",
      "Database audit log capturing every sync event and reconciliation discrepancy",
      "System administration guide and integration API reference documentation",
    ],
    faqs: [
      {
        question: "Can you connect our VICIdial call center directly to our CRM or QA scorecards?",
        answer: "Yes. We engineer secure backend services that stream completed call dispositions, recording links, and agent identifiers into custom scorecards with zero manual effort.",
      },
      {
        question: "How do you handle attendance hardware network drops without losing punches?",
        answer: "Our middleware maintains local transaction logs with idempotency keys. When network connections recover, all pending punches are reconciled without duplicate records.",
      },
      {
        question: "Do you build custom CRMs or customize existing tools like HubSpot and Zoho?",
        answer: "We do both. For businesses with standard workflows we integrate HubSpot or Zoho; for organizations requiring custom telephony or complex billing workflows we engineer tailored CRMs from scratch.",
      },
    ],
    ctaLabel: "Start a Project",
  },
];

export const projectsData: ProjectItem[] = [
  {
    id: "proj-lakehouse",
    slug: "enterprise-databricks-lakehouse",
    aliases: ["end-to-end-lakehouse-pipeline"],
    title: "Enterprise Databricks Lakehouse & Medallion Architecture",
    client: "Databricks Lakehouse Engineering",
    classification: "Demonstration",
    isConfidential: false,
    summary: "Production-grade automated Lakehouse pipeline utilizing Databricks, PySpark, Delta Lake, and Medallion Architecture (Bronze, Silver, Gold) with Unity Catalog data governance.",
    serviceSlug: "data-engineering",
    serviceName: "Data Engineering",
    industry: "Big Data & Enterprise Analytics",
    challenge: "Ingesting and transforming high-velocity multi-source relational and streaming datasets while maintaining schema enforcement, data quality, and ACID transactional integrity.",
    solution: "Implemented automated ingestion using Databricks Auto Loader and JDBC connectors, structured Bronze/Silver/Gold Delta Lake layers, automated schema validation, and deduplication logic powering Databricks SQL and AI-BI.",
    architectureDetails: [
      "Bronze Layer: Raw, append-only historical data ingestion with metadata preservation and Auto Loader schema evolution.",
      "Silver Layer: Cleaned, deduplicated, and validated records with schema enforcement and automated anomaly detection.",
      "Gold Layer: Business-level aggregated dimensional models and feature stores optimized for sub-second analytical queries.",
      "Governance & Security: Fine-grained access control, column-level masking, and complete data lineage via Unity Catalog.",
    ],
    technologies: [
      "Python",
      "PySpark",
      "Databricks",
      "Delta Lake",
      "SQL",
      "Unity Catalog",
      "Auto Loader",
      "Spark SQL",
    ],
    outcome: "Scalable lakehouse platform providing sub-second analytical query performance, schema drift tolerance, and unified governance.",
    images: ["/images/projects/lakehouse-architecture-diagram.svg"],
    githubUrl: "https://github.com/Owais4077",
  },
  {
    id: "proj-qa-crm",
    slug: "enterprise-qa-crm-vicidial",
    aliases: ["qa-crm-vicidial-pipeline"],
    title: "Enterprise QA CRM & VICIdial Telephony Integration",
    client: "Enterprise Telephony Reference Design",
    classification: "Demonstration",
    isConfidential: false,
    summary: "Quality assurance CRM and backend integration service pulling completed call logs and audio from VICIdial telephony servers for agent scorecard evaluations and operations intelligence.",
    serviceSlug: "business-automation",
    serviceName: "Business Automation",
    industry: "Contact Centers & BPO",
    challenge: "Manual call sampling and offline spreadsheet audits resulted in slow agent feedback loops and zero real-time visibility into contact center quality.",
    solution: "Engineered FastAPI REST services and PostgreSQL database models to ingest VICIdial call data, coupled with browser-based audio evaluation scorecards, disposition tracking, and KPI dashboards.",
    architectureDetails: [
      "Telephony Ingestion: Secure scheduled API worker querying VICIdial call tables and verifying audio file availability.",
      "Data Normalization: Mapping raw telephony dispositions and agent IDs into structured PostgreSQL relational schemas.",
      "Evaluation Workspace: Responsive web scorecard interface allowing QA auditors to listen to calls and score parameters with instant calculation.",
      "Operational Dashboards: Role-based supervisor views highlighting team adherence, call quality trends, and compliance outliers.",
    ],
    technologies: [
      "Python",
      "FastAPI",
      "PostgreSQL",
      "Docker",
      "REST APIs",
      "VICIdial API",
      "HTML5 Audio",
    ],
    outcome: "Architectural demonstration and reference integration providing structured automated scoring, call audit pipelines, and supervisor performance analytics.",
    images: ["/images/projects/qa-crm-telephony-diagram.svg"],
  },
  {
    id: "proj-knee-oa",
    slug: "ai-knee-osteoarthritis-detection",
    title: "AI-Based Knee Osteoarthritis Detection & KL Grading",
    client: "Medical Computer Vision Engineering",
    classification: "Academic Research",
    isConfidential: false,
    summary: "Deep learning computer vision pipeline classifying knee X-ray radiographs into Kellgren-Lawrence (KL0 to KL4) severity grades with Grad-CAM explainability and Android Kotlin integration.",
    serviceSlug: "artificial-intelligence",
    serviceName: "Artificial Intelligence",
    industry: "Healthcare & Medical Technology",
    challenge: "Subjectivity and inter-observer variability in radiologist grading of knee joint space narrowing and osteophytes on standard plain radiographs.",
    solution: "Trained and benchmarked deep convolutional neural networks (ResNet50) and Vision Transformers (ViT) on medical radiographs, combined with Grad-CAM heatmaps for clinical explainability and a mobile client app.",
    architectureDetails: [
      "Medical Image Preprocessing: Contrast limited adaptive histogram equalization (CLAHE), joint space cropping, and normalization.",
      "Model Architecture: Transfer learning benchmarking comparing ResNet50 backbones and Vision Transformers (ViT) for multi-class severity classification.",
      "Explainable AI: Grad-CAM gradient-weighted activation mapping highlighting joint space narrowing regions driving diagnostic output.",
      "Inference Service & App: High-throughput FastAPI REST endpoint serving inferences paired with an Android Kotlin application for bedside image capture.",
    ],
    technologies: [
      "Python",
      "CNN (ResNet50)",
      "Vision Transformer (ViT)",
      "Grad-CAM",
      "FastAPI",
      "PyTorch",
      "Android Kotlin",
      "OpenCV",
    ],
    outcome: "High-accuracy diagnostic classification across KL0-KL4 grades with visual attention heatmaps enabling transparent physician review.",
    images: ["/images/projects/knee-osteoarthritis-diagram.svg"],
    githubUrl: "https://github.com/Owais4077",
  },
  {
    id: "proj-anviz-odoo",
    slug: "biometric-attendance-odoo-erp",
    aliases: ["anviz-odoo-attendance-sync"],
    title: "Biometric Attendance Pipeline & Odoo ERP Integration",
    client: "Enterprise ERP Sync",
    classification: "Demonstration",
    isConfidential: false,
    summary: "Automated biometric punch-record ingestion pipeline linking hardware terminals to PostgreSQL audit tables and Odoo ERP via scheduled synchronization.",
    serviceSlug: "business-automation",
    serviceName: "Business Automation",
    industry: "HR Tech & Enterprise ERP",
    challenge: "Bridging isolated physical attendance hardware with enterprise ERP software without losing punch records during network disruptions.",
    solution: "Built containerized Python FastAPI middleware communicating directly with Anviz device protocols, validating duplicate punches, mapping employee IDs, and syncing with Odoo HR modules.",
    architectureDetails: [
      "Hardware Socket Polling: Low-level TCP socket listeners interfacing with biometric clocking devices to pull raw punch records.",
      "Deduplication Engine: Time-window buffering preventing duplicate employee punches within configurable intervals.",
      "Odoo XML-RPC / JSON-RPC Bridge: Automated synchronization into Odoo HR attendance models with transaction rollbacks.",
      "Discrepancy Reporting: Automated supervisor notifications for missing check-outs, abnormal shift durations, and sync latency.",
    ],
    technologies: [
      "Python",
      "FastAPI",
      "PostgreSQL",
      "Docker",
      "Odoo API",
      "Hardware Protocol",
      "Linux",
    ],
    outcome: "Reliable, hands-free biometric attendance sync eliminating manual attendance exports and payroll entry lag.",
    images: ["/images/projects/biometric-odoo-sync-diagram.svg"],
    githubUrl: "https://github.com/Owais4077",
  },
  {
    id: "proj-ai-assistant",
    slug: "ai-powered-intelligent-assistant",
    title: "Enterprise AI Intelligent Assistant & Multi-Agent RAG",
    client: "Solution Demonstration",
    classification: "Internal Project",
    isConfidential: false,
    summary: "Context-aware enterprise AI assistant combining hybrid vector retrieval (RAG), autonomous tool-calling agents, and structured document intelligence.",
    serviceSlug: "generative-ai",
    serviceName: "Generative AI",
    industry: "Enterprise AI & Productivity",
    challenge: "Scattered enterprise knowledge in PDFs, wiki pages, and SQL databases makes finding authoritative answers slow and prone to human error.",
    solution: "Engineered a multi-agent RAG system combining semantic embeddings, hybrid keyword reranking, strict citation requirements, and backend action executors.",
    architectureDetails: [
      "Document Ingestion: Automated chunking and embedding generation across PDFs, markdown docs, and SQL databases.",
      "Hybrid Vector Retrieval: Combining dense vector similarity in pgvector with BM25 keyword matching and cross-encoder reranking.",
      "Autonomous Tool Execution: Agent capabilities to query live databases, generate structured summaries, and invoke external webhooks.",
      "Enterprise Privacy Guardrails: Zero-data-retention API configurations, prompt injection screening, and citation verification.",
    ],
    technologies: [
      "Python",
      "LLMs (OpenAI / Gemini)",
      "RAG Architecture",
      "FastAPI",
      "pgvector",
      "PostgreSQL",
      "LangChain",
      "Docker",
    ],
    outcome: "Instant question answering grounded in verified company documents with zero hallucinations and verified source citations.",
    images: ["/images/projects/ai-assistant-rag-diagram.svg"],
    githubUrl: "https://github.com/Owais4077",
  },
  {
    id: "proj-workforce-monitoring",
    slug: "enterprise-workforce-monitoring",
    aliases: ["workforce-monitoring-idle-alert"],
    title: "Enterprise Workforce Monitoring & Business Automation Engine",
    client: "Enterprise Operations Benchmark",
    classification: "Demonstration",
    isConfidential: false,
    summary: "Desktop activity monitoring agent and central management dashboard providing periodic screen captures, break tracking, and 2-minute automated idle alerts.",
    serviceSlug: "software-engineering",
    serviceName: "Software Engineering",
    industry: "Workforce Operations & Security",
    challenge: "Providing objective, verifiable employee work-hour verification while immediately flagging unauthorized workstation abandonment in distributed BPO operations.",
    solution: "Developed a lightweight Python Windows service capturing periodic encrypted screen captures and monitoring keyboard/mouse input states, paired with an admin dashboard alerting on 2-minute idle timeouts.",
    architectureDetails: [
      "Lightweight Desktop Agent: Background Windows process with negligible CPU overhead tracking input states and taking periodic captures.",
      "Encrypted Telemetry Pipeline: AES-encrypted image uploads over HTTPS to centralized storage with signed URLs.",
      "Real-Time Idle Detector: 2-minute inactivity threshold trigger updating central PostgreSQL status tables immediately.",
      "Super Admin Command Center: Live status views, pause/break calculations, and exportable worked-hours audit logs.",
    ],
    technologies: [
      "Python",
      "Windows Desktop Agent",
      "REST API",
      "PostgreSQL",
      "Web Dashboard",
      "Docker",
    ],
    outcome: "High-performance desktop telemetry and administrative dashboard prototype showcasing real-time activity metrics and session audit logging.",
    images: ["/images/projects/workforce-monitoring-diagram.svg"],
  },
  {
    id: "proj-enterprise-lms",
    slug: "enterprise-lms-employee-portal",
    title: "Enterprise LMS & Employee Command Center",
    client: "Enterprise Operations Reference Architecture",
    classification: "Demonstration",
    isConfidential: false,
    summary: "Comprehensive internal enterprise web platform uniting a multi-tier learning management system, shift-based attendance management, and role-based access control.",
    serviceSlug: "software-engineering",
    serviceName: "Software Engineering",
    industry: "Enterprise BPO & Operations",
    challenge: "Managing employee shift rosters, course certifications, leave approvals, and biometric attendance across distributed teams without unified server-side access controls.",
    solution: "Built with Next.js App Router, TypeScript, Tailwind CSS, Supabase (PostgreSQL) with Row-Level Security, and an audited Hikvision device punch integration layer.",
    architectureDetails: [
      "Full-Stack Web Architecture: Next.js App Router with server-rendered layouts and role-scoped authorization.",
      "Fine-Grained Database Security: PostgreSQL Row-Level Security (RLS) policies isolating department records.",
      "Attendance Hardware Bridge: Validated Hikvision biometric punch sync layer with manual exception audit trails.",
      "Certification LMS: Modular training modules with timed quizzes, pass/fail grading, and PDF certificate generation.",
    ],
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Supabase (PostgreSQL + RLS)", "Hikvision Integration", "Vercel"],
    outcome: "Modular reference platform demonstrating server-rendered role-based operations management, attendance hardware bridging, and enterprise training workflows.",
    images: ["/images/projects/lms-portal-diagram.svg"],
  },
  {
    id: "proj-smart-farming",
    slug: "smart-farming-iot-cloud",
    title: "Smart Precision Agriculture IoT & AWS Cloud Telemetry",
    client: "IoT Cloud Engineering Capstone",
    classification: "Demonstration",
    isConfidential: false,
    summary: "End-to-end IoT precision agriculture system streaming capacitive soil moisture, temperature, and ambient light telemetry to AWS for automated irrigation triggers.",
    serviceSlug: "cloud-devops",
    serviceName: "Cloud & DevOps",
    industry: "AgriTech & Smart Systems",
    challenge: "Capturing continuous edge telemetry from microcontrollers in the field and automating irrigation actuators in real time without on-premise servers.",
    solution: "Implemented ESP32 edge telemetry over MQTT to AWS IoT Core, triggering serverless Python AWS Lambda handlers to evaluate soil moisture thresholds, actuate irrigation relays, and log to DynamoDB and QuickSight.",
    architectureDetails: [
      "Edge Hardware: ESP32 microcontrollers reading capacitive soil sensors, temperature, and solar irradiance.",
      "Secure MQTT Telemetry: TLS-authenticated messages streamed to AWS IoT Core broker.",
      "Serverless Compute: Python AWS Lambda handlers evaluating soil thresholds and publishing reverse actuator commands.",
      "Data Analytics: Amazon DynamoDB time-series storage connected to Amazon QuickSight dashboards.",
    ],
    technologies: ["AWS IoT Core", "AWS Lambda", "Amazon DynamoDB", "Amazon QuickSight", "ESP32", "Python", "MQTT"],
    outcome: "Autonomous precision irrigation triggered by live soil sensor telemetry with interactive Amazon QuickSight executive dashboards.",
    images: ["/images/projects/smart-farming-iot-diagram.svg"],
  },
  {
    id: "proj-cloud-arch",
    slug: "enterprise-cloud-migration-audit",
    title: "Multi-Region Cloud Architecture & Zero-Downtime Deployment",
    client: "Cloud Architecture Reference",
    classification: "Demonstration",
    isConfidential: false,
    summary: "Architected high-availability AWS infrastructure with containerized microservices, multi-AZ database clustering, and declarative CI/CD pipelines.",
    serviceSlug: "cloud-devops",
    serviceName: "Cloud & DevOps",
    industry: "Financial & SaaS",
    challenge: "Designing resilient cloud infrastructure capable of handling sudden traffic spikes while eliminating manual deployment risks.",
    solution: "Designed an automated VPC topology on AWS with ECS containerized workloads, RDS multi-AZ failover, automated Terraform provisioning, and GitHub Actions CI/CD.",
    architectureDetails: [
      "Network Isolation: Custom AWS VPC with public web subnets, private container subnets, and isolated database subnets.",
      "Container Orchestration: Dockerized services deployed to Amazon ECS with automated target tracking auto-scaling.",
      "Relational Redundancy: Multi-AZ Amazon RDS PostgreSQL with automated point-in-time snapshot recovery.",
      "Continuous Delivery: GitHub Actions workflows executing automated security scans, unit tests, and rolling updates.",
    ],
    technologies: ["AWS", "Docker", "Terraform", "GitHub Actions", "PostgreSQL", "Nginx"],
    outcome: "Reference architecture demonstrating automated zero-downtime rolling deployments, multi-AZ failover recovery, and declarative infrastructure management.",
    images: ["/images/projects/cloud-architecture-diagram.svg"],
  },
];

export const industries: IndustryItem[] = [
  {
    name: "Healthcare & Medical Technology",
    slug: "healthcare-medtech",
    iconName: "Activity",
    tagline: "Intelligent Diagnostic Support & Secure Health Systems",
    description: "We help healthcare providers and medical technology startups develop computer vision models for radiograph analysis, secure patient data pipelines, and HIPAA/GDPR-compliant software.",
    challengeSolved: "Overloaded diagnostic departments and fragmented clinical records slow patient treatment and increase administrative overhead.",
    engineeredSolutions: [
      "Computer vision X-ray classification with Grad-CAM explainability",
      "HIPAA/GDPR-compliant medical data pipelines and audit logs",
      "Telemedicine platforms with secure video and electronic health records",
      "Automated clinical report transcription and diagnostic extraction",
    ],
  },
  {
    name: "Financial Services",
    slug: "financial-services",
    iconName: "TrendingUp",
    tagline: "High-Throughput Analytics & Resilient Transaction Systems",
    description: "We engineer reliable financial platforms, automated reconciliation pipelines, predictive risk algorithms, and high-concurrency database architectures.",
    challengeSolved: "Legacy core financial platforms lack real-time visibility and suffer from high operational risk during transaction reconciliation.",
    engineeredSolutions: [
      "ACID-compliant transactional database and ledger architectures",
      "Automated financial reconciliation pipelines with anomaly detection",
      "Predictive customer churn and credit scoring models",
      "Executive decision intelligence dashboards and portfolio analytics",
    ],
  },
  {
    name: "Insurance & BPO",
    slug: "insurance-bpo",
    iconName: "Headphones",
    tagline: "Telephony CRM Integration & Automated Quality Assurance",
    description: "We build tailored QA evaluation CRMs, automated call recording ingestion pipelines, and workforce productivity tools for contact centers and business process outsourcing firms.",
    challengeSolved: "Offline spreadsheet audits provide zero real-time visibility into contact center quality and agent adherence.",
    engineeredSolutions: [
      "VICIdial telephony integration with automated audio evaluation scorecards",
      "Real-time desktop activity monitoring and idle alert triggers",
      "Automated claims document parsing and verification workflows",
      "Live operational KPI dashboards and agent coaching analytics",
    ],
  },
  {
    name: "Retail & E-commerce",
    slug: "retail-ecommerce",
    iconName: "ShoppingBag",
    tagline: "Omnichannel Data Sync & Scalable Web Platforms",
    description: "We develop ultra-fast web stores, automated inventory synchronization with ERP systems, and AI-powered product recommendation algorithms.",
    challengeSolved: "Slow website load times cause cart abandonment, while desynchronized inventory leads to stockouts and customer friction.",
    engineeredSolutions: [
      "Sub-second Next.js web storefronts with Core Web Vitals optimization",
      "Multi-channel inventory synchronization linking ERP and marketplaces",
      "Personalized recommendation engines and dynamic search re-ranking",
      "Automated order fulfillment and shipping webhook pipelines",
    ],
  },
  {
    name: "Logistics & Supply Chain",
    slug: "logistics-supply-chain",
    iconName: "Truck",
    tagline: "Real-Time Telemetry & Route Optimization",
    description: "We engineer IoT tracking pipelines, predictive delivery scheduling, warehouse inventory automation, and multi-party logistics data bridges.",
    challengeSolved: "Opaque shipment status, unmonitored fleet assets, and delayed inventory sync across warehouses drain operational margins.",
    engineeredSolutions: [
      "IoT edge telemetry ingestion pipelines over MQTT and AWS IoT Core",
      "Real-time shipment tracking dashboards with geofencing alerts",
      "Automated warehouse barcode/RFID reconciliation middleware",
      "Predictive freight demand and transit time forecasting models",
    ],
  },
  {
    name: "Manufacturing",
    slug: "manufacturing",
    iconName: "Factory",
    tagline: "Computer Vision Inspection & Odoo ERP Integration",
    description: "We deploy visual quality inspection models, machine telemetry loggers, and automated Odoo ERP manufacturing modules.",
    challengeSolved: "Manual quality inspection allows defective units to pass through, while disparate machinery data prevents predictive maintenance.",
    engineeredSolutions: [
      "Automated visual defect detection models with high-speed inference",
      "Odoo ERP manufacturing, work-order, and bill-of-materials integration",
      "Industrial sensor telemetry logging and temperature threshold alerts",
      "Biometric shift scheduling and production floor access control",
    ],
  },
  {
    name: "Education & EdTech",
    slug: "education-edtech",
    iconName: "GraduationCap",
    tagline: "Scalable Learning Management & Student Portals",
    description: "We design custom LMS platforms, interactive student evaluation engines, and secure institutional portals.",
    challengeSolved: "Off-the-shelf LMS platforms charge high per-student license fees while lacking custom grading workflows and offline sync.",
    engineeredSolutions: [
      "Multi-tenant Learning Management Systems with interactive quizzes",
      "Role-based portals for students, instructors, and administrators",
      "Automated PDF certificate generation and digital credential verification",
      "AI-powered interactive tutoring and course search assistants",
    ],
  },
  {
    name: "Technology Startups",
    slug: "technology-startups",
    iconName: "Rocket",
    tagline: "Rapid MVP Engineering & Scalable Cloud Foundations",
    description: "We partner with early-stage and venture-backed startups to architect production-ready MVPs, scalable data backends, and AI features from day one.",
    challengeSolved: "Non-technical founders or resource-constrained teams struggle to build robust codebases that survive investor due diligence.",
    engineeredSolutions: [
      "6-to-10 week production MVP design and full-stack engineering",
      "Type-safe TypeScript and Python architectures ready for enterprise scaling",
      "Cloud infrastructure setup with automated CI/CD and cost guardrails",
      "Project-specific IP ownership and transfer terms documented in signed agreements",
    ],
  },
  {
    name: "Enterprise Organizations",
    slug: "enterprise-organizations",
    iconName: "Building2",
    tagline: "Modern Lakehouse Migration & Legacy System Modernization",
    description: "We modernize legacy software architectures, migrate fragmented data warehouses to Databricks Lakehouses, and engineer private enterprise AI solutions.",
    challengeSolved: "Aging legacy stacks and brittle integration code stall digital transformation and create security vulnerabilities.",
    engineeredSolutions: [
      "Migration of legacy databases to Databricks Delta Lake Medallion pipelines",
      "Microservices decomposition and containerized cloud migration",
      "Private Generative AI and RAG assistants with enterprise access controls",
      "Zero-downtime database replication and automated CI/CD guardrails",
    ],
  },
];

export const techStackCategories = [
  {
    name: "Data & Lakehouse",
    technologies: [
      { name: "Databricks", description: "Managed Spark clusters, Lakehouse jobs, and Auto Loader" },
      { name: "Delta Lake", description: "ACID transactions, time travel, and schema enforcement" },
      { name: "Apache Spark & PySpark", description: "Distributed processing for high-volume ETL/ELT pipelines" },
      { name: "Unity Catalog", description: "Unified governance, fine-grained access control, and lineage" },
      { name: "PostgreSQL & SQL", description: "Relational modeling, star schemas, and analytical data marts" },
      { name: "Power BI", description: "Executive BI dashboards, data modeling, and reporting" },
    ],
  },
  {
    name: "Artificial Intelligence & Vision",
    technologies: [
      { name: "PyTorch & TensorFlow", description: "Deep learning models, CNNs, and neural network training" },
      { name: "Vision Transformers (ViT)", description: "Self-attention visual feature extraction and classification" },
      { name: "ResNet-50", description: "Deep residual learning for transfer learning and image analysis" },
      { name: "Grad-CAM", description: "Explainable visual gradient attention heatmaps for clinicians" },
      { name: "OpenCV", description: "Computer vision image preprocessing, cropping, and filtering" },
      { name: "Scikit-Learn", description: "Predictive statistical models, clustering, and regression" },
    ],
  },
  {
    name: "Generative AI & Agentic Systems",
    technologies: [
      { name: "OpenAI & Gemini APIs", description: "Enterprise LLM inference with zero data retention" },
      { name: "LangChain & LlamaIndex", description: "RAG framework, semantic chunking, and agent tools" },
      { name: "pgvector", description: "High-performance vector similarity search in PostgreSQL" },
      { name: "Pinecone", description: "Managed low-latency serverless vector indexing" },
      { name: "Cross-Encoder Rerankers", description: "Contextual precision scoring for RAG queries" },
    ],
  },
  {
    name: "Cloud & DevOps",
    technologies: [
      { name: "Amazon Web Services (AWS)", description: "EC2, ECS, Lambda, RDS, S3, IoT Core, CloudWatch, VPC" },
      { name: "Microsoft Azure", description: "App Services, Azure SQL, Blob Storage, Virtual Networks" },
      { name: "Docker", description: "Containerized, reproducible microservice runtime environments" },
      { name: "Terraform", description: "Declarative Infrastructure as Code (IaC) configuration" },
      { name: "GitHub Actions", description: "Automated linting, testing, and continuous deployment" },
      { name: "Cloudflare", description: "Global edge CDN, DNS management, and DDoS protection" },
    ],
  },
  {
    name: "Software & APIs",
    technologies: [
      { name: "Next.js (App Router)", description: "Server-side rendering, static generation, and high SEO" },
      { name: "TypeScript", description: "Strict static typing and runtime predictability" },
      { name: "Python & FastAPI", description: "High-speed asynchronous REST APIs and microservices" },
      { name: "Tailwind CSS & Radix UI", description: "Disciplined accessible design system tokens" },
      { name: "Redis", description: "Sub-millisecond in-memory caching and rate limiting" },
    ],
  },
  {
    name: "Enterprise Automation",
    technologies: [
      { name: "Odoo ERP API", description: "Custom modules, attendance synchronization, and inventory" },
      { name: "VICIdial API", description: "Contact center telephony sync, call records, and QA audits" },
      { name: "Biometric SDKs", description: "Anviz and Hikvision hardware attendance synchronization" },
      { name: "HubSpot API", description: "CRM objects, webhooks, deal pipelines, and automation" },
      { name: "Windows Desktop Agents", description: "Background telemetry workers and idle detection engines" },
    ],
  },
];

export const developmentProcess = [
  {
    step: "01",
    name: "Discover & Scope",
    tagline: "Architecture First",
    description: "We analyze the root operational challenge, map data flows, inspect integration endpoints, and define verifiable technical milestones before writing code.",
  },
  {
    step: "02",
    name: "System Blueprint",
    tagline: "Schemas & Contracts",
    description: "We produce clean interface wireframes, normalized database schemas, OpenAPI contracts, and security architectures with zero generic templates.",
  },
  {
    step: "03",
    name: "Sprint-Based Build",
    tagline: "Typed, Tested Code",
    description: "Founder-led engineering with strict TypeScript, modular Python services, automated unit tests, and bi-weekly milestone demonstrations.",
  },
  {
    step: "04",
    name: "Security & QA Hardening",
    tagline: "Zero Vulnerabilities",
    description: "Automated regression testing, load testing, input sanitization, rate-limiting checks, and Core Web Vitals optimization.",
  },
  {
    step: "05",
    name: "Zero-Downtime Launch",
    tagline: "Hardened Rollout",
    description: "Automated rolling cutover, DNS configuration, SSL/TLS validation, CDN caching, and end-to-end operational verification.",
  },
  {
    step: "06",
    name: "Continuous Reliability",
    tagline: "Proactive Partnership",
    description: "Infrastructure observability, automated backups, prompt technical support, and ongoing performance tuning retainers.",
  },
];

export const differentiators = [
  {
    title: "Founder-Led Delivery",
    description: "You collaborate directly with founders Muhammad Azhar and Owais Ahmad. No junior handoffs, no middle-management overhead, and zero translation loss between your vision and the code.",
    iconName: "ShieldCheck",
  },
  {
    title: "Full-Stack Data + AI + Cloud Synergy",
    description: "Most agencies specialize in only frontend or back-office. We integrate cloud infrastructure, data lakehouses, AI models, CRM systems, and web software into one cohesive architecture.",
    iconName: "Layers",
  },
  {
    title: "Transparent, Documented Engineering",
    description: "Verifiable milestones, weekly live demos, fixed-scope certainty, and documented IP transfer terms. You always know what is being built, why, and how it is deployed.",
    iconName: "GitBranch",
  },
  {
    title: "Direct Engineering Communication",
    description: "Fast responses via WhatsApp, email, or scheduled video calls. Direct access to the engineers solving your problems without ticketing hurdles or bureaucratic delays.",
    iconName: "MessageSquare",
  },
];

export const faqsList = [
  {
    question: "What makes NEXVORA Technologies different from a typical development agency?",
    answer: "NEXVORA is an engineering consultancy led directly by founding engineers Muhammad Azhar (Software & Cloud Lead) and Owais Ahmad (Data Lead). Clients collaborate directly with technical leads on systems architecture, data engineering pipelines, and software delivery.",
  },
  {
    question: "Who owns the code, intellectual property, and infrastructure?",
    answer: "Project-specific IP ownership and transfer terms are documented in signed agreements. Clean repositories, schemas, and cloud deployment scripts are transferred according to agreed milestones.",
  },
  {
    question: "Do you sign non-disclosure agreements (NDAs)?",
    answer: "Yes. Mutual NDAs are available upon request and subject to agreement before reviewing sensitive architectures, proprietary codebases, or confidential business requirements.",
  },
  {
    question: "Can we start with a small pilot or assessment before committing to a larger project?",
    answer: "Yes. We frequently conduct focused architectural assessments, 2-week technical feasibility spikes, or 6-to-10 week production MVPs to prove value before scaling.",
  },
  {
    question: "How do you ensure data security and compliance for sensitive systems?",
    answer: "We follow industry-standard security best practices: least-privilege IAM access, end-to-end TLS 1.3 encryption, database encryption at rest, automated input sanitization, rate limiting, and zero retention policies for enterprise AI APIs.",
  },
  {
    question: "What is your response time and communication cadence during a project?",
    answer: "Our team aims to respond to initial inquiries within one business day. During active sprints, we maintain direct communication via private Slack/WhatsApp channels, provide weekly demo links, and share repository progress.",
  },
];

export const technologiesData: TechnologyItem[] = [
  // 1. Cloud & DevOps
  {
    id: "tech-aws-lambda",
    name: "AWS Lambda & Serverless",
    category: "Cloud & DevOps",
    role: "Event-driven compute executing stateless microservices and asynchronous backend handlers with automated scaling.",
    verifiedStatus: "Demonstrated Implementation",
    relevantServiceSlug: "cloud-devops",
    relevantProjectSlug: "smart-farming-iot-cloud",
  },
  {
    id: "tech-aws-dynamodb",
    name: "Amazon DynamoDB",
    category: "Cloud & DevOps",
    role: "Single-digit millisecond NoSQL key-value database for IoT telemetry time-series and high-concurrency state storage.",
    verifiedStatus: "Demonstrated Implementation",
    relevantServiceSlug: "cloud-devops",
    relevantProjectSlug: "smart-farming-iot-cloud",
  },
  {
    id: "tech-aws-iot-core",
    name: "AWS IoT Core",
    category: "Cloud & DevOps",
    role: "Secure managed cloud broker managing edge microcontroller MQTT message broker connections with TLS authentication.",
    verifiedStatus: "Demonstrated Implementation",
    relevantServiceSlug: "cloud-devops",
    relevantProjectSlug: "smart-farming-iot-cloud",
  },
  {
    id: "tech-aws-ecs-vpc",
    name: "AWS VPC, ECS & Cloud Infrastructure",
    category: "Cloud & DevOps",
    role: "Isolated network topologies with public/private subnets, containerized ECS microservices, and RDS relational multi-AZ clusters.",
    verifiedStatus: "Reference Architecture",
    relevantServiceSlug: "cloud-devops",
    relevantProjectSlug: "enterprise-cloud-migration-audit",
  },
  {
    id: "tech-docker",
    name: "Docker & Containerization",
    category: "Cloud & DevOps",
    role: "Reproducible multi-stage container builds isolating runtime dependencies across microservices, APIs, and AI models.",
    verifiedStatus: "Core Competency",
    relevantServiceSlug: "cloud-devops",
  },
  {
    id: "tech-github-actions",
    name: "GitHub Actions CI/CD",
    category: "Cloud & DevOps",
    role: "Automated continuous integration pipelines executing type-checks, unit tests, image builds, and zero-downtime rollouts.",
    verifiedStatus: "Core Competency",
    relevantServiceSlug: "cloud-devops",
  },

  // 2. Data Engineering & Lakehouses
  {
    id: "tech-databricks",
    name: "Databricks Workspace & Jobs",
    category: "Data Engineering & Lakehouses",
    role: "Unified data intelligence platform orchestrating distributed PySpark compute, cluster autoscaling, and automated workflow jobs.",
    verifiedStatus: "Demonstrated Implementation",
    relevantServiceSlug: "data-engineering",
    relevantProjectSlug: "enterprise-databricks-lakehouse",
  },
  {
    id: "tech-pyspark",
    name: "Apache Spark & PySpark",
    category: "Data Engineering & Lakehouses",
    role: "Distributed data compute engine for high-throughput batch transformations, partition-pruned joins, and big data transformations.",
    verifiedStatus: "Demonstrated Implementation",
    relevantServiceSlug: "data-engineering",
    relevantProjectSlug: "enterprise-databricks-lakehouse",
  },
  {
    id: "tech-delta-lake",
    name: "Delta Lake & Medallion Architecture",
    category: "Data Engineering & Lakehouses",
    role: "ACID transactional storage layer structuring ingestion into Bronze (raw), Silver (cleansed), and Gold (business analytics) layers.",
    verifiedStatus: "Demonstrated Implementation",
    relevantServiceSlug: "data-engineering",
    relevantProjectSlug: "enterprise-databricks-lakehouse",
  },
  {
    id: "tech-unity-catalog",
    name: "Unity Catalog",
    category: "Data Engineering & Lakehouses",
    role: "Centralized data governance layer enforcing column-level access controls, automated data lineage, and audit tracking.",
    verifiedStatus: "Demonstrated Implementation",
    relevantServiceSlug: "data-engineering",
    relevantProjectSlug: "enterprise-databricks-lakehouse",
  },
  {
    id: "tech-powerbi",
    name: "Power BI & Semantic Modeling",
    category: "Data Engineering & Lakehouses",
    role: "Interactive business intelligence dashboards, DAX metric modeling, and automated executive decision reporting.",
    verifiedStatus: "Core Competency",
    relevantServiceSlug: "data-engineering",
  },

  // 3. Artificial Intelligence & Vision
  {
    id: "tech-pytorch",
    name: "PyTorch Deep Learning",
    category: "Artificial Intelligence & Vision",
    role: "Primary deep learning framework for training, transfer learning, and validating convolutional neural networks and transformer backbones.",
    verifiedStatus: "Academic Benchmark",
    relevantServiceSlug: "artificial-intelligence",
    relevantProjectSlug: "ai-knee-osteoarthritis-detection",
  },
  {
    id: "tech-vit-resnet",
    name: "Vision Transformers (ViT) & ResNet50",
    category: "Artificial Intelligence & Vision",
    role: "Benchmark vision backbones for multi-class classification and radiographic Kellgren-Lawrence disease severity grading.",
    verifiedStatus: "Academic Benchmark",
    relevantServiceSlug: "artificial-intelligence",
    relevantProjectSlug: "ai-knee-osteoarthritis-detection",
  },
  {
    id: "tech-grad-cam",
    name: "Grad-CAM Explainability",
    category: "Artificial Intelligence & Vision",
    role: "Gradient-weighted class activation mapping highlighting visual attention regions on radiographs to support clinical interpretability.",
    verifiedStatus: "Academic Benchmark",
    relevantServiceSlug: "artificial-intelligence",
    relevantProjectSlug: "ai-knee-osteoarthritis-detection",
  },
  {
    id: "tech-opencv",
    name: "OpenCV Computer Vision",
    category: "Artificial Intelligence & Vision",
    role: "Image preprocessing, contrast limited adaptive histogram equalization (CLAHE), joint space cropping, and spatial transformations.",
    verifiedStatus: "Core Competency",
    relevantServiceSlug: "artificial-intelligence",
  },

  // 4. Generative AI & Agentic Systems
  {
    id: "tech-rag-pgvector",
    name: "RAG & pgvector",
    category: "Generative AI & Agentic Systems",
    role: "PostgreSQL vector extension providing dense cosine similarity retrieval combined with BM25 lexical keyword hybrid search.",
    verifiedStatus: "Internal Engineering System",
    relevantServiceSlug: "generative-ai",
    relevantProjectSlug: "ai-powered-intelligent-assistant",
  },
  {
    id: "tech-llm-orchestration",
    name: "LLM APIs & LangChain",
    category: "Generative AI & Agentic Systems",
    role: "Enterprise prompt construction, context window management, structured JSON schema output validation, and tool-calling execution.",
    verifiedStatus: "Internal Engineering System",
    relevantServiceSlug: "generative-ai",
    relevantProjectSlug: "ai-powered-intelligent-assistant",
  },
  {
    id: "tech-ai-agents",
    name: "Multi-Agent Systems",
    category: "Generative AI & Agentic Systems",
    role: "Coordinated agent loops with specialized sub-roles executing multi-step research, SQL querying, and document summarization.",
    verifiedStatus: "Internal Engineering System",
    relevantServiceSlug: "generative-ai",
    relevantProjectSlug: "ai-powered-intelligent-assistant",
  },

  // 5. Software & API Engineering
  {
    id: "tech-fastapi",
    name: "Python FastAPI",
    category: "Software & API Engineering",
    role: "High-concurrency asynchronous REST backend framework providing automatic OpenAPI documentation and strict Pydantic validation.",
    verifiedStatus: "Demonstrated Implementation",
    relevantServiceSlug: "software-engineering",
    relevantProjectSlug: "enterprise-qa-crm-vicidial",
  },
  {
    id: "tech-nextjs",
    name: "Next.js 14 App Router",
    category: "Software & API Engineering",
    role: "React framework delivering server-rendered components, streaming layouts, zero-layout-shift asset optimization, and edge routing.",
    verifiedStatus: "Core Competency",
    relevantServiceSlug: "software-engineering",
  },
  {
    id: "tech-typescript",
    name: "TypeScript (Strict Mode)",
    category: "Software & API Engineering",
    role: "End-to-end static typing eliminating runtime undefined errors across client user interfaces and server handlers.",
    verifiedStatus: "Core Competency",
    relevantServiceSlug: "software-engineering",
  },
  {
    id: "tech-postgresql",
    name: "PostgreSQL Relational Architecture",
    category: "Software & API Engineering",
    role: "ACID-compliant relational database modeling with foreign-key constraints, optimized B-tree indexing, and connection pooling.",
    verifiedStatus: "Core Competency",
    relevantServiceSlug: "software-engineering",
  },

  // 6. Enterprise Automation & Hardware Protocols
  {
    id: "tech-odoo-erp",
    name: "Odoo ERP Integration",
    category: "Enterprise Automation & Hardware Protocols",
    role: "Custom Odoo module development, XML-RPC and JSON-RPC API synchronization, and automated employee attendance entry.",
    verifiedStatus: "Demonstrated Implementation",
    relevantServiceSlug: "business-automation",
    relevantProjectSlug: "biometric-attendance-odoo-erp",
  },
  {
    id: "tech-vicidial",
    name: "VICIdial Telephony Servers",
    category: "Enterprise Automation & Hardware Protocols",
    role: "Contact center telephony database integration extracting agent call recordings, dispositions, and queue statistics for automated QA scoring.",
    verifiedStatus: "Demonstrated Implementation",
    relevantServiceSlug: "business-automation",
    relevantProjectSlug: "enterprise-qa-crm-vicidial",
  },
  {
    id: "tech-hardware-protocols",
    name: "TCP/IP Sockets & Biometric Protocols",
    category: "Enterprise Automation & Hardware Protocols",
    role: "Low-level socket listeners polling physical time-clock devices (Anviz, Hikvision) with punch deduplication windows.",
    verifiedStatus: "Demonstrated Implementation",
    relevantServiceSlug: "business-automation",
    relevantProjectSlug: "biometric-attendance-odoo-erp",
  },
  {
    id: "tech-mqtt-esp32",
    name: "MQTT & ESP32 Microcontrollers",
    category: "Enterprise Automation & Hardware Protocols",
    role: "Edge microcontroller firmware reading hardware analog/digital sensors and publishing TLS-authenticated MQTT telemetry to AWS.",
    verifiedStatus: "Demonstrated Implementation",
    relevantServiceSlug: "business-automation",
    relevantProjectSlug: "smart-farming-iot-cloud",
  },
];

export const insightsArticles: InsightArticle[] = [
  {
    slug: "implementing-medallion-lakehouse-databricks-pyspark",
    title: "Implementing Medallion Lakehouses with Databricks and PySpark: A Practical Guide",
    excerpt: "An architectural guide to designing ACID-compliant Bronze, Silver, and Gold Delta Lake layers with schema evolution, Auto Loader, and Unity Catalog governance.",
    category: "Data Engineering",
    readingTime: "8 min read",
    author: {
      name: "Owais Ahmad",
      role: "Co-Founder & Data Lead",
    },
    publishedAt: "2026-03-15",
    updatedAt: "2026-03-20",
    tags: ["Databricks", "PySpark", "Delta Lake", "Medallion Architecture", "Data Engineering"],
    serviceSlug: "data-engineering",
    projectSlug: "enterprise-databricks-lakehouse",
    content: `
## Architectural Foundations of the Modern Lakehouse

Traditional enterprise data stacks suffered from a painful dichotomy: data lakes offered cheap, scalable storage for raw unstructured files but lacked ACID transactional guarantees; data warehouses offered sub-second SQL queries but were rigid, expensive, and struggled with unstructured data streams.

The **Lakehouse Architecture** unifies both paradigms by applying a transactional storage layer—**Delta Lake**—directly over object storage (S3, ADLS, or GCS), orchestrated via distributed compute engines like **Apache Spark** on Databricks.

### The Medallion Pattern: Bronze, Silver, and Gold

A robust lakehouse architecture organizes data into three distinct quality refinement layers:

\`\`\`
[ Raw Operational Sources ]
            │  (Databricks Auto Loader / Cloud Files)
            ▼
┌───────────────────────────────────────────────┐
│  BRONZE LAYER (Raw / Ingestion)               │
│  - Append-only raw data stream                │
│  - Full historical audit trail preserved       │
│  - Schema evolution tolerated                 │
└───────────────────────┬───────────────────────┘
                        │  (Cleaning, Deduplication & Validation)
                        ▼
┌───────────────────────────────────────────────┐
│  SILVER LAYER (Cleansed / Conformed)          │
│  - Schema enforced (strict typing)            │
│  - Deduplicated by business primary keys      │
│  - Anomaly detection & quality rules applied  │
└───────────────────────┬───────────────────────┘
                        │  (Aggregation, Dimensional Modeling)
                        ▼
┌───────────────────────────────────────────────┐
│  GOLD LAYER (Business / Curated)              │
│  - Star / Snowflake dimensional schemas       │
│  - Pre-aggregated KPI cubes and feature stores │
│  - Sub-second analytical query performance    │
└───────────────────────────────────────────────┘
\`\`\`

#### 1. Bronze Layer: Append-Only Ingestion with Auto Loader
The Bronze layer acts as the immutable landing zone. The primary goal is capturing incoming records as close to source format as possible without risking data loss. Using Databricks **Auto Loader** (\`cloudFiles\`), incoming files are discovered incrementally and ingested with schema inference:

\`\`\`python
# PySpark Bronze Auto Loader ingestion pattern
bronze_df = (
    spark.readStream.format("cloudFiles")
    .option("cloudFiles.format", "json")
    .option("cloudFiles.schemaLocation", "/mnt/lakehouse/bronze/_schemas/telemetry")
    .option("cloudFiles.inferColumnTypes", "true")
    .load("/mnt/raw-ingestion/telemetry/")
)

(
    bronze_df.writeStream.format("delta")
    .option("checkpointLocation", "/mnt/lakehouse/bronze/_checkpoints/telemetry")
    .outputMode("append")
    .table("bronze_telemetry_raw")
)
\`\`\`

#### 2. Silver Layer: Deduplication & Quality Contracts
In the Silver tier, raw records are normalized, validated, and deduplicated. We apply schema enforcement to reject malformed records, calculate derived attributes, and perform idempotent merge upserts:

\`\`\`python
from delta.tables import DeltaTable

silver_table = DeltaTable.forName(spark, "silver_telemetry_cleaned")

(
    silver_table.alias("target")
    .merge(
        source_df.alias("source"),
        "target.device_id = source.device_id AND target.timestamp = source.timestamp",
    )
    .whenMatchedUpdateAll()
    .whenNotMatchedInsertAll()
    .execute()
)
\`\`\`

#### 3. Gold Layer: Analytical Optimization & Unity Catalog Governance
Gold tables are organized into dimensional models (star schemas or fact tables) optimized for executive BI dashboards (Power BI) and machine learning feature stores. All tables are registered in **Unity Catalog**, enforcing column-level masking and granular access control.

### Operational Recommendations
1. **Partition Pruning:** Avoid over-partitioning Delta tables with small file counts; use partition keys with moderate cardinality (e.g., date or region).
2. **Auto-Compaction & Optimize:** Schedule nightly \`OPTIMIZE table_name ZORDER BY (primary_lookup_key)\` to consolidate micro-batches into optimal 1GB Parquet files.
3. **Audit Trails:** Leverage Delta Lake time-travel (\`VERSION AS OF\`) for point-in-time recovery and compliance auditing.
    `,
  },
  {
    slug: "integrating-vicidial-telephony-fastapi-microservices",
    title: "Integrating VICIdial Telephony with Modern FastAPI Microservices",
    excerpt: "How to engineer an automated contact center intelligence pipeline connecting Asterisk / VICIdial telephony servers to asynchronous FastAPI microservices and web QA scorecards.",
    category: "Software Engineering",
    readingTime: "7 min read",
    author: {
      name: "Muhammad Azhar",
      role: "Co-Founder & Technical Lead",
    },
    publishedAt: "2026-03-10",
    updatedAt: "2026-03-18",
    tags: ["FastAPI", "VICIdial", "Python", "Telephony", "PostgreSQL", "Docker"],
    serviceSlug: "software-engineering",
    projectSlug: "enterprise-qa-crm-vicidial",
    content: `
## The Problem of Fragmented Contact Center Quality Assurance

High-volume BPO operations and contact centers frequently rely on **VICIdial** (an open-source Asterisk-based predictive dialer) to coordinate hundreds of thousands of customer phone calls daily. While VICIdial handles call routing and telephony switching with high reliability, its legacy interface makes quality assurance audits cumbersome.

Traditional QA supervisors were forced to manually download MP3/WAV recordings, cross-reference agent shift rosters in spreadsheets, and manually calculate scores. This manual bottleneck meant less than 1% of customer calls were audited, creating major compliance blind spots.

### The Integration Architecture

To eliminate manual sampling, we engineered an asynchronous microservices pipeline connecting VICIdial's underlying MySQL databases directly to a modern web-based QA scorecard application:

\`\`\`
┌─────────────────────────────────┐
│ VICIdial Telephony Cluster      │
│ (Asterisk + MySQL + Audio Repos)│
└────────────────┬────────────────┘
                 │ Scheduled Telephony Extraction
                 ▼
┌─────────────────────────────────┐
│ Python Extraction Worker        │
│ - Call log query & status map   │
│ - Audio file existence check    │
└────────────────┬────────────────┘
                 │ Secure Internal Network
                 ▼
┌─────────────────────────────────┐
│ FastAPI Asynchronous Service    │
│ - Pydantic schema validation    │
│ - Audio stream proxy (HTML5)    │
│ - Automated scorecard compute   │
└────────────────┬────────────────┘
                 │ ACID Persistence
                 ▼
┌─────────────────────────────────┐
│ PostgreSQL Relational Models    │
│ - Agent performance scorecards  │
│ - Compliance violation tags     │
│ - KPI aggregation views         │
└─────────────────────────────────┘
\`\`\`

### Technical Implementation Pillars

#### 1. Asynchronous Telephony Extraction
A background worker queries completed call records from VICIdial's \`vicidial_log\` and \`recording_log\` tables, matching call dispositions (\`SALE\`, \`DNC\`, \`CALLBK\`) and mapping agent extension IDs to verified employee records:

\`\`\`python
# FastAPI asynchronous endpoint extracting and serving sanitized call audio
from fastapi import FastAPI, Depends, HTTPException
from fastapi.responses import StreamingResponse
import httpx

app = FastAPI(title="Telephony QA Ingestion API")

@app.get("/api/v1/calls/{call_id}/stream")
async def stream_call_audio(call_id: str, current_user = Depends(get_qa_auditor)):
    call_record = await fetch_call_metadata(call_id)
    if not call_record:
        raise HTTPException(status_code=404, detail="Call record not found")
        
    async def audio_generator():
        async with httpx.AsyncClient() as client:
            async with client.stream("GET", call_record.internal_audio_url) as response:
                async for chunk in response.aiter_bytes():
                    yield chunk

    return StreamingResponse(audio_generator(), media_type="audio/mpeg")
\`\`\`

#### 2. Normalized Scorecard Data Model
We structured PostgreSQL schemas to record granular parameter scores (e.g., greeting compliance, verification script adherence, rebuttals handled, closing tone) with automatic weighting calculations.

#### 3. Enterprise Operational Security
- **Least-Privilege Database Access:** Read-only replica access to the live dialer to prevent performance impact on call center telephony.
- **Audio Proxying:** Telephony storage IPs are never exposed to the client browser; all audio streams are validated and proxied securely over TLS.
- **Role-Based Access Control:** QA auditors can only access assigned agent queues, while operational directors access real-time team adherence dashboards.
    `,
  },
  {
    slug: "grad-cam-explainability-medical-computer-vision",
    title: "Grad-CAM Explainability in Medical Computer Vision: Kellgren-Lawrence Radiograph Grading",
    excerpt: "Engineering transparent clinical deep learning: How gradient-weighted class activation mapping (Grad-CAM) illuminates convolutional neural network decisions on plain knee radiographs.",
    category: "AI & Vision",
    readingTime: "9 min read",
    author: {
      name: "Owais Ahmad",
      role: "Co-Founder & Data Lead",
    },
    publishedAt: "2026-03-05",
    updatedAt: "2026-03-12",
    tags: ["Computer Vision", "PyTorch", "Grad-CAM", "Deep Learning", "Healthcare AI", "ResNet50"],
    serviceSlug: "artificial-intelligence",
    projectSlug: "ai-knee-osteoarthritis-detection",
    content: `
## The "Black Box" Barrier in Clinical Medical AI

Knee osteoarthritis (OA) is among the leading causes of chronic pain and mobility impairment globally. In clinical practice, radiologists assess severity using the **Kellgren-Lawrence (KL) grading system**—classifying plain anterior-posterior radiographs across 5 grades:
- **KL0:** Normal radiograph with zero OA features.
- **KL1:** Doubtful joint space narrowing and possible osteophytic lipping.
- **KL2:** Definite osteophytes and possible joint space narrowing (mild OA).
- **KL3:** Multiple moderate osteophytes, definite joint space narrowing, and some sclerosis (moderate OA).
- **KL4:** Severe joint space narrowing, large osteophytes, and marked subchondral sclerosis (severe OA).

While deep convolutional neural networks (CNNs) can achieve diagnostic accuracy comparable to senior radiologists, their deployment in clinical practice is frequently blocked by a fundamental question: **"How can a physician trust a prediction without understanding which anatomical features drove the classification?"**

### Explainable AI with Grad-CAM

To bridge this trust deficit, we integrated **Gradient-Weighted Class Activation Mapping (Grad-CAM)** into our medical computer vision architecture:

\`\`\`
[ Plain Knee Radiograph (DICOM / JPEG) ]
                  │
                  ▼
[ Preprocessing: CLAHE + Joint Space Crop ]
                  │
                  ▼
[ Deep CNN Backbone (ResNet50 / ViT) ]
                  │
         ┌────────┴────────┐
         ▼                 ▼
[ Class Logits ]     [ Final Conv Layer Gradients ]
(KL0 to KL4)               │
         │                 ▼
         │          [ Grad-CAM Activation Heatmap ]
         │                 │
         └────────┬────────┘
                  ▼
[ Clinical Explainability Canvas: Heatmap Overlay on Radiograph ]
(Highlights joint space narrowing & osteophytes for physician review)
\`\`\`

### PyTorch Implementation Blueprint

Grad-CAM utilizes the gradients of any target concept flowing into the final convolutional layer of the network to produce a coarse 2D localization map highlighting the regions critical for predicting the class:

\`\`\`python
import torch
import torch.nn.functional as F

class GradCAMExplainer:
    def __init__(self, model, target_layer):
        self.model = model
        self.target_layer = target_layer
        self.gradients = None
        self.activations = None
        
        # Register forward and backward hooks
        self.target_layer.register_forward_hook(self._save_activations)
        self.target_layer.register_full_backward_hook(self._save_gradients)

    def _save_activations(self, module, input, output):
        self.activations = output

    def _save_gradients(self, module, grad_input, grad_output):
        self.gradients = grad_output[0]

    def generate_heatmap(self, input_tensor, target_class_idx):
        self.model.eval()
        output = self.model(input_tensor)
        
        # Zero gradients and backpropagate target class logit
        self.model.zero_grad()
        loss = output[0, target_class_idx]
        loss.backward()

        # Global average pool the gradients across spatial dimensions
        pooled_gradients = torch.mean(self.gradients, dim=[0, 2, 3])
        
        # Weight the activations by computed gradients
        for i in range(pooled_gradients.size(0)):
            self.activations[:, i, :, :] *= pooled_gradients[i]

        heatmap = torch.mean(self.activations, dim=1).squeeze()
        heatmap = F.relu(heatmap) # Apply ReLU to keep only positive contributions
        heatmap /= torch.max(heatmap) + 1e-8 # Normalize between 0 and 1
        return heatmap.cpu().numpy()
\`\`\`

### Clinical Significance & Engineering Takeaways
1. **Validation Against Anatomical Landmarks:** By overlaying Grad-CAM heatmaps on test radiographs, physicians verified that the model focused on medial and lateral joint compartments rather than background artifacts.
2. **Detection of Confounding Features:** Explainability revealed early training runs where the network mistakenly learned to attend to radiographic markers or patient positioners, allowing us to retrain with strict spatial cropping.
3. **Bedside Inferences:** Serving the model via a lightweight, typed FastAPI endpoint allowed rapid integration with mobile client applications while keeping inference latency under 250 milliseconds.
    `,
  },
];
