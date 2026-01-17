/*
  =====================================================
  RESUME UTILITY FUNCTIONS
  =====================================================
  Handles text normalization, skill extraction, and
  resume text analysis utilities.
  =====================================================
*/

/* =====================================================
   COMPREHENSIVE SKILLS DATABASE (ALL DOMAINS)
   ===================================================== */
const SKILL_CATEGORIES = {
  // ==================== TECHNOLOGY ====================
  
  // Programming Languages
  programming: [
    "JavaScript", "TypeScript", "Python", "Java", "C", "C++", "C#", "Go", "Golang", "Rust",
    "Ruby", "PHP", "Swift", "Kotlin", "Scala", "R", "MATLAB", "SQL", "Perl", "Haskell",
    "Lua", "Dart", "Elixir", "Erlang", "Clojure", "F#", "Objective-C", "Assembly",
    "Groovy", "Julia", "COBOL", "Fortran", "Ada", "Lisp", "Scheme", "Prolog", "VHDL",
    "Verilog", "Solidity", "Move", "Zig", "Nim", "Crystal", "OCaml", "Racket", "Bash",
    "PowerShell", "Shell Scripting", "VBA", "VB.NET", "Visual Basic", "ActionScript",
    "CoffeeScript", "Elm", "PureScript", "ReasonML", "WebAssembly", "WASM"
  ],
  
  // Frontend Development
  frontend: [
    "React", "React.js", "ReactJS", "Vue", "Vue.js", "VueJS", "Angular", "AngularJS",
    "Svelte", "SvelteKit", "Next.js", "NextJS", "Nuxt", "Nuxt.js", "Gatsby", "Remix",
    "HTML", "HTML5", "CSS", "CSS3", "Sass", "SCSS", "Less", "Stylus", "PostCSS",
    "Tailwind", "Tailwind CSS", "Bootstrap", "Foundation", "Bulma", "Material UI", "MUI",
    "Chakra UI", "Ant Design", "Semantic UI", "PrimeReact", "Headless UI",
    "Redux", "Redux Toolkit", "MobX", "Zustand", "Recoil", "Jotai", "Valtio", "XState",
    "React Query", "TanStack Query", "SWR", "Apollo Client", "Relay",
    "jQuery", "Backbone.js", "Ember.js", "Knockout.js", "Alpine.js", "HTMX", "Stimulus",
    "Webpack", "Vite", "Rollup", "Parcel", "esbuild", "Turbopack", "Babel", "SWC",
    "Jest", "Vitest", "Cypress", "Playwright", "Puppeteer", "Testing Library",
    "Storybook", "Chromatic", "Bit", "Lerna", "Nx", "Turborepo",
    "Three.js", "D3.js", "Chart.js", "Highcharts", "ECharts", "Plotly",
    "GSAP", "Framer Motion", "React Spring", "Anime.js", "Lottie",
    "PWA", "Service Workers", "Web Components", "Shadow DOM", "Custom Elements",
    "WebGL", "Canvas API", "SVG", "Web Audio API", "WebRTC", "WebSocket",
    "Responsive Design", "Mobile First", "Cross-Browser Compatibility", "Web Accessibility",
    "ARIA", "WCAG", "SEO Optimization", "Core Web Vitals", "Performance Optimization"
  ],
  
  // Backend Development
  backend: [
    "Node.js", "NodeJS", "Express", "Express.js", "Fastify", "Koa", "Hapi", "NestJS",
    "Python", "Django", "Flask", "FastAPI", "Pyramid", "Tornado", "aiohttp", "Sanic",
    "Java", "Spring", "Spring Boot", "Spring MVC", "Spring Cloud", "Hibernate", "JPA",
    "Micronaut", "Quarkus", "Vert.x", "Play Framework", "Dropwizard",
    "C#", "ASP.NET", "ASP.NET Core", ".NET Core", ".NET Framework", "Entity Framework",
    "Ruby", "Ruby on Rails", "Rails", "Sinatra", "Hanami",
    "PHP", "Laravel", "Symfony", "CodeIgniter", "CakePHP", "Yii", "Zend", "Slim",
    "Go", "Gin", "Echo", "Fiber", "Chi", "Buffalo", "Beego",
    "Rust", "Actix", "Rocket", "Axum", "Warp", "Tide",
    "Elixir", "Phoenix", "Erlang", "OTP",
    "GraphQL", "Apollo Server", "Hasura", "Prisma", "TypeGraphQL",
    "REST", "RESTful", "REST API", "API Design", "API Gateway", "OpenAPI", "Swagger",
    "gRPC", "Protocol Buffers", "Protobuf", "Thrift", "Avro",
    "WebSocket", "Socket.io", "SignalR", "Pusher", "Ably",
    "Message Queues", "RabbitMQ", "Apache Kafka", "Redis Pub/Sub", "Amazon SQS", "NATS",
    "Microservices", "Service Mesh", "Istio", "Linkerd", "Consul",
    "Serverless", "Lambda", "Azure Functions", "Cloud Functions", "Vercel Functions",
    "Authentication", "OAuth", "OAuth2", "JWT", "SAML", "OpenID Connect", "Passport.js",
    "Rate Limiting", "Caching", "Load Balancing", "Reverse Proxy"
  ],
  
  // Database & Data Storage
  database: [
    "SQL", "NoSQL", "Database Design", "Data Modeling", "Schema Design", "Normalization",
    "MongoDB", "Mongoose", "PostgreSQL", "Postgres", "MySQL", "MariaDB", "SQLite",
    "Microsoft SQL Server", "MSSQL", "Oracle Database", "Oracle DB", "IBM DB2",
    "Redis", "Memcached", "Couchbase", "CouchDB", "RethinkDB",
    "Elasticsearch", "OpenSearch", "Solr", "Algolia", "MeiliSearch", "Typesense",
    "Neo4j", "ArangoDB", "OrientDB", "JanusGraph", "Amazon Neptune", "Graph Database",
    "DynamoDB", "Amazon DynamoDB", "Cassandra", "Apache Cassandra", "ScyllaDB", "HBase",
    "Firebase", "Firestore", "Supabase", "PlanetScale", "Neon", "CockroachDB", "TiDB",
    "InfluxDB", "TimescaleDB", "QuestDB", "Time Series Database",
    "Snowflake", "BigQuery", "Redshift", "Azure Synapse", "Databricks",
    "Data Warehousing", "ETL", "ELT", "Data Pipeline", "Data Lake",
    "Prisma", "Sequelize", "TypeORM", "Knex.js", "Drizzle ORM", "SQLAlchemy",
    "Database Administration", "DBA", "Query Optimization", "Indexing", "Replication",
    "Sharding", "Partitioning", "Backup & Recovery", "High Availability"
  ],
  
  // Cloud & Infrastructure
  cloud: [
    "AWS", "Amazon Web Services", "Azure", "Microsoft Azure", "GCP", "Google Cloud Platform",
    "IBM Cloud", "Oracle Cloud", "DigitalOcean", "Linode", "Vultr", "Heroku", "Railway",
    "Vercel", "Netlify", "Cloudflare", "Cloudflare Workers", "Fastly", "Akamai",
    "EC2", "S3", "Lambda", "ECS", "EKS", "Fargate", "Elastic Beanstalk", "Lightsail",
    "RDS", "Aurora", "DynamoDB", "ElastiCache", "CloudFront", "Route 53", "API Gateway",
    "SQS", "SNS", "EventBridge", "Step Functions", "CloudWatch", "CloudTrail",
    "IAM", "Cognito", "Secrets Manager", "KMS", "VPC", "Security Groups",
    "Azure VMs", "Azure App Service", "Azure Functions", "Azure Kubernetes Service", "AKS",
    "Azure DevOps", "Azure SQL", "Cosmos DB", "Azure Storage", "Azure CDN",
    "Google Compute Engine", "App Engine", "Cloud Run", "GKE", "Cloud Functions",
    "BigQuery", "Cloud Storage", "Pub/Sub", "Cloud SQL", "Firestore",
    "Docker", "Containerization", "Docker Compose", "Docker Swarm", "Podman",
    "Kubernetes", "K8s", "Helm", "Kustomize", "ArgoCD", "Flux",
    "Terraform", "Infrastructure as Code", "IaC", "Pulumi", "CloudFormation", "CDK",
    "Ansible", "Chef", "Puppet", "SaltStack", "Configuration Management",
    "Jenkins", "GitHub Actions", "GitLab CI/CD", "CircleCI", "Travis CI", "Drone CI",
    "ArgoCD", "Spinnaker", "Tekton", "Harness", "Octopus Deploy",
    "Nginx", "Apache", "HAProxy", "Traefik", "Envoy", "Caddy",
    "Linux", "Ubuntu", "CentOS", "RHEL", "Debian", "Alpine", "Amazon Linux",
    "Windows Server", "Active Directory", "Group Policy",
    "Networking", "TCP/IP", "DNS", "HTTPS", "SSL/TLS", "Firewall", "VPN",
    "Monitoring", "Prometheus", "Grafana", "Datadog", "New Relic", "Splunk", "ELK Stack",
    "Logging", "Logstash", "Fluentd", "Loki", "CloudWatch Logs",
    "APM", "Tracing", "Jaeger", "Zipkin", "OpenTelemetry"
  ],
  
  // AI/ML & Data Science
  aiml: [
    "Artificial Intelligence", "AI", "Machine Learning", "ML", "Deep Learning", "DL",
    "Neural Networks", "CNN", "RNN", "LSTM", "GRU", "Transformer", "Attention Mechanism",
    "TensorFlow", "TF", "Keras", "PyTorch", "JAX", "Flax", "MXNet", "Caffe", "Theano",
    "Scikit-learn", "sklearn", "XGBoost", "LightGBM", "CatBoost", "Random Forest",
    "Gradient Boosting", "Decision Trees", "SVM", "Support Vector Machines",
    "Linear Regression", "Logistic Regression", "Clustering", "K-Means", "DBSCAN",
    "Dimensionality Reduction", "PCA", "t-SNE", "UMAP",
    "NLP", "Natural Language Processing", "Text Mining", "Sentiment Analysis",
    "Named Entity Recognition", "NER", "Text Classification", "Topic Modeling",
    "Word Embeddings", "Word2Vec", "GloVe", "FastText", "BERT", "GPT", "T5", "RoBERTa",
    "Transformers", "Hugging Face", "LangChain", "LlamaIndex", "OpenAI API",
    "LLM", "Large Language Models", "Prompt Engineering", "Fine-tuning", "RAG",
    "Computer Vision", "Image Classification", "Object Detection", "Segmentation",
    "YOLO", "ResNet", "VGG", "EfficientNet", "Vision Transformer", "ViT",
    "OpenCV", "PIL", "Pillow", "ImageNet", "COCO",
    "Generative AI", "GANs", "Diffusion Models", "Stable Diffusion", "DALL-E", "Midjourney",
    "Reinforcement Learning", "RL", "Q-Learning", "Policy Gradient", "Actor-Critic",
    "Time Series Analysis", "Forecasting", "ARIMA", "Prophet", "LSTM Forecasting",
    "Recommendation Systems", "Collaborative Filtering", "Content-Based Filtering",
    "MLOps", "MLflow", "Kubeflow", "Weights & Biases", "Neptune.ai", "DVC",
    "Model Deployment", "Model Serving", "TensorFlow Serving", "TorchServe", "Triton",
    "Feature Engineering", "Feature Store", "Feast", "Tecton",
    "AutoML", "Hyperparameter Tuning", "Optuna", "Ray Tune", "Bayesian Optimization",
    "Pandas", "NumPy", "SciPy", "Matplotlib", "Seaborn", "Plotly",
    "Jupyter", "Jupyter Notebook", "JupyterLab", "Google Colab", "Kaggle",
    "Data Science", "Data Analysis", "Statistical Analysis", "Hypothesis Testing",
    "A/B Testing", "Experimentation", "Causal Inference",
    "Big Data", "Spark", "PySpark", "Hadoop", "Hive", "Pig", "Flink", "Beam",
    "Data Engineering", "Data Pipeline", "Airflow", "Dagster", "Prefect", "Luigi"
  ],
  
  // Mobile Development
  mobile: [
    "iOS Development", "iOS", "iPhone", "iPad", "Swift", "Objective-C", "SwiftUI", "UIKit",
    "Xcode", "CocoaPods", "Swift Package Manager", "Carthage", "TestFlight", "App Store",
    "Android Development", "Android", "Kotlin", "Java Android", "Android Studio",
    "Jetpack Compose", "Android SDK", "Gradle", "Play Store", "Google Play",
    "React Native", "Expo", "React Navigation", "Redux Native",
    "Flutter", "Dart", "Flutter SDK", "FlutterFlow",
    "Xamarin", "MAUI", ".NET MAUI", "Ionic", "Capacitor", "Cordova", "PhoneGap",
    "NativeScript", "Kotlin Multiplatform", "KMM",
    "Mobile UI/UX", "Mobile Design", "Material Design", "Human Interface Guidelines",
    "Push Notifications", "Firebase Cloud Messaging", "APNs", "OneSignal",
    "Mobile Analytics", "Firebase Analytics", "Mixpanel", "Amplitude",
    "App Performance", "Mobile Testing", "Appium", "Detox", "XCTest", "Espresso",
    "Mobile Security", "App Security", "Code Signing", "ProGuard", "App Hardening",
    "Offline First", "Local Storage", "SQLite Mobile", "Realm", "Core Data",
    "AR/VR", "ARKit", "ARCore", "Unity", "Unreal Engine"
  ],
  
  // Cybersecurity
  security: [
    "Cybersecurity", "Information Security", "InfoSec", "Network Security", "Cloud Security",
    "Application Security", "AppSec", "Web Security", "API Security",
    "Penetration Testing", "Pen Testing", "Ethical Hacking", "Bug Bounty",
    "Vulnerability Assessment", "Security Audit", "Risk Assessment",
    "OWASP", "OWASP Top 10", "SQL Injection", "XSS", "CSRF", "Security Headers",
    "Encryption", "Cryptography", "SSL/TLS", "PKI", "Certificates", "HSM",
    "Identity Management", "IAM", "SSO", "MFA", "2FA", "RBAC", "ABAC",
    "OAuth", "OpenID Connect", "SAML", "LDAP", "Active Directory",
    "SIEM", "Splunk", "QRadar", "Sentinel", "Log Analysis",
    "SOC", "Security Operations", "Incident Response", "Threat Hunting",
    "Malware Analysis", "Reverse Engineering", "Forensics", "Digital Forensics",
    "Firewall", "IDS/IPS", "WAF", "DLP", "Endpoint Security", "EDR", "XDR",
    "Zero Trust", "Network Segmentation", "Micro-segmentation",
    "Compliance", "GDPR", "HIPAA", "PCI DSS", "SOC 2", "ISO 27001", "NIST",
    "Security Frameworks", "CIS Controls", "MITRE ATT&CK",
    "DevSecOps", "Secure SDLC", "SAST", "DAST", "SCA", "Container Security",
    "Cloud Security", "AWS Security", "Azure Security", "GCP Security",
    "Kali Linux", "Burp Suite", "Metasploit", "Nmap", "Wireshark", "Nessus",
    "HashiCorp Vault", "Secrets Management", "Key Management"
  ],
  
  // Blockchain & Web3
  blockchain: [
    "Blockchain", "Distributed Ledger", "Decentralized Applications", "DApps",
    "Smart Contracts", "Solidity", "Vyper", "Move", "Rust Smart Contracts",
    "Ethereum", "ETH", "EVM", "Hardhat", "Truffle", "Foundry", "Brownie",
    "Web3.js", "Ethers.js", "Viem", "Wagmi", "RainbowKit", "WalletConnect",
    "Bitcoin", "Lightning Network", "Bitcoin Script",
    "Polygon", "Arbitrum", "Optimism", "Layer 2", "L2", "Rollups",
    "Solana", "Anchor", "Rust Solana", "SPL Tokens",
    "Cardano", "Plutus", "Haskell Smart Contracts",
    "Polkadot", "Substrate", "Cosmos", "Tendermint", "IBC",
    "Hyperledger", "Fabric", "Enterprise Blockchain",
    "NFT", "ERC-721", "ERC-1155", "OpenSea", "IPFS", "Arweave",
    "DeFi", "DEX", "AMM", "Liquidity Pools", "Yield Farming", "Lending Protocols",
    "DAO", "Governance", "Token Economics", "Tokenomics",
    "Crypto Wallets", "MetaMask", "Ledger", "Trezor", "Custodial Solutions",
    "Oracles", "Chainlink", "Band Protocol",
    "Cross-chain", "Bridges", "Interoperability",
    "Zero Knowledge Proofs", "ZK-SNARKs", "ZK-Rollups", "zkSync", "StarkNet"
  ],
  
  // Game Development
  gamedev: [
    "Game Development", "Game Design", "Game Programming", "Game Engine",
    "Unity", "Unity3D", "C# Unity", "Unity Editor", "Unity Asset Store",
    "Unreal Engine", "UE4", "UE5", "Blueprints", "C++ Unreal",
    "Godot", "GDScript", "GameMaker", "GML", "RPG Maker",
    "2D Game Development", "3D Game Development", "Game Physics", "Game AI",
    "OpenGL", "DirectX", "Vulkan", "Metal", "WebGL",
    "Shaders", "HLSL", "GLSL", "Shader Graph", "Material Editor",
    "3D Modeling", "Blender", "Maya", "3ds Max", "Cinema 4D", "ZBrush",
    "Animation", "Rigging", "Motion Capture", "Skeletal Animation",
    "Level Design", "World Building", "Environment Art", "Prop Design",
    "Game Audio", "Sound Design", "FMOD", "Wwise",
    "Multiplayer", "Netcode", "Photon", "Mirror", "Game Servers",
    "VR Development", "AR Development", "XR", "Oculus", "SteamVR", "OpenXR",
    "Mobile Games", "Console Development", "PC Gaming", "Cross-Platform",
    "Game Monetization", "F2P", "In-App Purchases", "Game Analytics",
    "QA Testing", "Game Testing", "Bug Tracking", "PlayTest"
  ],
  
  // Embedded & IoT
  embedded: [
    "Embedded Systems", "Embedded C", "Embedded C++", "Firmware Development",
    "Microcontrollers", "MCU", "Arduino", "ESP32", "ESP8266", "STM32", "PIC",
    "Raspberry Pi", "BeagleBone", "Jetson", "Edge Computing",
    "RTOS", "FreeRTOS", "Zephyr", "VxWorks", "QNX", "Real-Time Systems",
    "IoT", "Internet of Things", "Smart Devices", "Connected Devices",
    "Sensors", "Actuators", "GPIO", "I2C", "SPI", "UART", "CAN Bus",
    "MQTT", "CoAP", "LoRaWAN", "Zigbee", "Z-Wave", "BLE", "Bluetooth",
    "AWS IoT", "Azure IoT", "Google Cloud IoT", "ThingsBoard",
    "PLC", "SCADA", "Industrial IoT", "IIoT", "Industry 4.0",
    "Robotics", "ROS", "Robot Operating System", "Motion Control",
    "PCB Design", "Altium", "KiCad", "Eagle", "Circuit Design",
    "Signal Processing", "DSP", "FPGA", "Verilog", "VHDL"
  ],
  
  // Testing & QA
  testing: [
    "Software Testing", "QA", "Quality Assurance", "Test Automation",
    "Manual Testing", "Exploratory Testing", "Regression Testing",
    "Unit Testing", "Integration Testing", "E2E Testing", "End-to-End Testing",
    "Jest", "Mocha", "Chai", "Jasmine", "Vitest", "AVA",
    "Pytest", "unittest", "nose", "Robot Framework",
    "JUnit", "TestNG", "Mockito", "PowerMock",
    "Selenium", "WebDriver", "Cypress", "Playwright", "Puppeteer", "TestCafe",
    "Appium", "Detox", "XCTest", "Espresso", "Mobile Testing",
    "Postman", "REST Assured", "Karate", "API Testing",
    "Performance Testing", "Load Testing", "JMeter", "Gatling", "k6", "Locust",
    "Security Testing", "OWASP ZAP", "Burp Suite", "SonarQube",
    "BDD", "Cucumber", "Gherkin", "SpecFlow", "Behave",
    "TDD", "Test-Driven Development", "Code Coverage", "Istanbul", "Jacoco",
    "CI/CD Testing", "Test Pipelines", "Test Reporting", "Allure",
    "Accessibility Testing", "axe", "WAVE", "Screen Reader Testing",
    "Visual Testing", "Percy", "Chromatic", "Applitools",
    "Contract Testing", "Pact", "Spring Cloud Contract",
    "Chaos Engineering", "Fault Injection", "Resilience Testing"
  ],
  
  // ==================== DESIGN ====================
  
  // UI/UX Design
  design: [
    "UI Design", "UX Design", "UI/UX", "User Interface", "User Experience",
    "Product Design", "Digital Design", "Web Design", "Mobile Design", "App Design",
    "Figma", "Sketch", "Adobe XD", "InVision", "Axure", "Balsamiq", "Principle",
    "Framer", "ProtoPie", "Marvel", "Zeplin", "Abstract",
    "Design Systems", "Component Libraries", "Style Guides", "Brand Guidelines",
    "Wireframing", "Prototyping", "Mockups", "High-Fidelity Design", "Low-Fidelity",
    "User Research", "User Testing", "Usability Testing", "A/B Testing",
    "User Interviews", "Surveys", "Personas", "User Journeys", "Customer Journey Mapping",
    "Information Architecture", "IA", "Sitemaps", "User Flows", "Task Analysis",
    "Interaction Design", "IxD", "Microinteractions", "Animation Design",
    "Visual Design", "Typography", "Color Theory", "Layout", "Grid Systems",
    "Responsive Design", "Adaptive Design", "Mobile First Design",
    "Accessibility Design", "Inclusive Design", "WCAG", "A11y",
    "Design Thinking", "Human-Centered Design", "HCD", "Empathy Mapping",
    "Rapid Prototyping", "Design Sprints", "Lean UX", "Agile UX"
  ],
  
  // Graphic Design
  graphicDesign: [
    "Graphic Design", "Visual Design", "Brand Design", "Logo Design", "Identity Design",
    "Adobe Photoshop", "Photoshop", "Adobe Illustrator", "Illustrator",
    "Adobe InDesign", "InDesign", "Adobe Creative Suite", "Creative Cloud",
    "CorelDRAW", "Affinity Designer", "Affinity Photo", "GIMP", "Inkscape",
    "Canva", "Figma Graphics", "Procreate", "Clip Studio Paint",
    "Print Design", "Publication Design", "Editorial Design", "Magazine Design",
    "Packaging Design", "Label Design", "Product Packaging",
    "Poster Design", "Flyer Design", "Brochure Design", "Banner Design",
    "Infographics", "Data Visualization", "Icon Design", "Iconography",
    "Typography", "Font Design", "Type Design", "Lettering", "Calligraphy",
    "Color Theory", "Color Palette", "Color Management", "Pantone",
    "Image Editing", "Photo Retouching", "Photo Manipulation", "Compositing",
    "Vector Graphics", "Raster Graphics", "SVG", "EPS", "AI Files",
    "Prepress", "CMYK", "RGB", "Bleed", "Crop Marks", "Print Production"
  ],
  
  // Motion & Video
  motion: [
    "Motion Graphics", "Motion Design", "Animation", "2D Animation", "3D Animation",
    "Adobe After Effects", "After Effects", "Adobe Premiere Pro", "Premiere Pro",
    "Final Cut Pro", "DaVinci Resolve", "Avid Media Composer",
    "Cinema 4D", "Blender Animation", "Maya Animation", "Houdini",
    "Lottie", "Rive", "SVG Animation", "CSS Animation", "Web Animation",
    "Video Editing", "Video Production", "Post-Production", "Color Grading",
    "Visual Effects", "VFX", "Compositing", "Green Screen", "Chroma Key",
    "Character Animation", "Explainer Videos", "Whiteboard Animation",
    "Title Design", "Lower Thirds", "Broadcast Graphics",
    "Sound Design", "Audio Editing", "Adobe Audition", "Logic Pro",
    "Storyboarding", "Animatics", "Pre-visualization"
  ],
  
  // 3D & CAD
  threeD: [
    "3D Modeling", "3D Design", "3D Visualization", "3D Rendering",
    "Blender", "Autodesk Maya", "Maya", "3ds Max", "Cinema 4D", "C4D",
    "ZBrush", "Mudbox", "Substance Painter", "Substance Designer",
    "SketchUp", "Rhino", "Rhinoceros 3D", "Grasshopper",
    "AutoCAD", "CAD", "SolidWorks", "CATIA", "Inventor", "Fusion 360",
    "Revit", "ArchiCAD", "BIM", "Building Information Modeling",
    "Keyshot", "V-Ray", "Arnold", "Octane Render", "Redshift", "Corona",
    "Unreal Engine Rendering", "Unity Rendering", "Real-Time Rendering",
    "Texturing", "UV Mapping", "PBR Materials", "Physically Based Rendering",
    "Rigging", "Skinning", "Weight Painting", "Skeletal Mesh",
    "Sculpting", "Digital Sculpting", "High Poly", "Low Poly", "Retopology",
    "Architectural Visualization", "Product Visualization", "Interior Design 3D"
  ],
  
  // ==================== MARKETING & CONTENT ====================
  
  // Digital Marketing
  marketing: [
    "Digital Marketing", "Online Marketing", "Internet Marketing",
    "SEO", "Search Engine Optimization", "On-Page SEO", "Off-Page SEO", "Technical SEO",
    "SEM", "Search Engine Marketing", "PPC", "Pay Per Click", "CPC",
    "Google Ads", "Google AdWords", "Search Ads", "Display Ads", "Shopping Ads",
    "Facebook Ads", "Meta Ads", "Instagram Ads", "TikTok Ads", "LinkedIn Ads",
    "Twitter Ads", "Pinterest Ads", "Snapchat Ads", "YouTube Ads",
    "Programmatic Advertising", "DSP", "RTB", "Ad Tech",
    "Google Analytics", "GA4", "Google Tag Manager", "GTM",
    "Adobe Analytics", "Mixpanel", "Amplitude", "Heap", "Hotjar", "Crazy Egg",
    "Content Marketing", "Content Strategy", "Content Creation", "Blogging",
    "Email Marketing", "Email Automation", "Mailchimp", "Klaviyo", "SendGrid",
    "Constant Contact", "Campaign Monitor", "HubSpot Email", "Drip Campaigns",
    "Social Media Marketing", "SMM", "Social Media Management", "Community Management",
    "Hootsuite", "Buffer", "Sprout Social", "Later", "Planoly",
    "Influencer Marketing", "Creator Marketing", "Brand Partnerships",
    "Affiliate Marketing", "Performance Marketing", "Growth Marketing", "Growth Hacking",
    "Marketing Automation", "HubSpot", "Marketo", "Pardot", "ActiveCampaign",
    "CRM", "Salesforce", "Zoho CRM", "Pipedrive", "HubSpot CRM",
    "Lead Generation", "Demand Generation", "Funnel Marketing", "Conversion Optimization",
    "CRO", "Landing Pages", "A/B Testing Marketing", "Unbounce", "Instapage",
    "Brand Strategy", "Brand Management", "Brand Positioning", "Brand Identity",
    "Market Research", "Competitive Analysis", "SWOT Analysis", "Customer Segmentation",
    "Marketing Analytics", "Attribution", "ROI Analysis", "KPIs", "OKRs"
  ],
  
  // Content & Writing
  content: [
    "Content Writing", "Copywriting", "Creative Writing", "Technical Writing",
    "Blog Writing", "Article Writing", "Feature Writing", "News Writing",
    "SEO Writing", "SEO Copywriting", "Keyword Research", "Content Optimization",
    "UX Writing", "Microcopy", "UI Copy", "Product Copy",
    "Social Media Content", "Social Media Copy", "Caption Writing",
    "Email Copy", "Newsletter Writing", "Direct Response Copy",
    "Sales Copy", "Ad Copy", "Landing Page Copy", "Conversion Copy",
    "Brand Voice", "Tone of Voice", "Style Guide", "Editorial Guidelines",
    "Storytelling", "Narrative Writing", "Brand Storytelling",
    "Script Writing", "Video Scripts", "Podcast Scripts", "Voice Over Scripts",
    "Press Releases", "PR Writing", "Media Pitches", "Communications",
    "Grant Writing", "Proposal Writing", "RFP Responses",
    "White Papers", "Case Studies", "eBooks", "Long-Form Content",
    "Documentation", "Technical Documentation", "API Documentation",
    "User Manuals", "Help Content", "Knowledge Base", "FAQ Writing",
    "Editing", "Proofreading", "Copy Editing", "Content Editing",
    "Content Strategy", "Editorial Calendar", "Content Planning",
    "CMS", "WordPress", "Drupal", "Contentful", "Strapi", "Ghost",
    "Grammarly", "Hemingway", "ProWritingAid", "Writing Tools"
  ],
  
  // ==================== BUSINESS & MANAGEMENT ====================
  
  // Project Management
  projectManagement: [
    "Project Management", "Program Management", "Portfolio Management",
    "Agile", "Agile Methodology", "Scrum", "Scrum Master", "Sprint Planning",
    "Kanban", "Lean", "Lean Six Sigma", "Six Sigma", "Kaizen",
    "Waterfall", "Hybrid Methodology", "SAFe", "Scaled Agile",
    "PMP", "PRINCE2", "PMI", "Project Management Professional",
    "Jira", "Confluence", "Atlassian", "Asana", "Trello", "Monday.com",
    "Notion", "ClickUp", "Wrike", "Basecamp", "Microsoft Project", "MS Project",
    "Smartsheet", "Airtable", "Linear", "Shortcut", "Height",
    "Project Planning", "Project Scheduling", "Gantt Charts", "Roadmapping",
    "Resource Management", "Resource Allocation", "Capacity Planning",
    "Risk Management", "Risk Assessment", "Risk Mitigation", "Issue Management",
    "Stakeholder Management", "Communication Management", "Change Management",
    "Budget Management", "Cost Management", "Financial Tracking",
    "Quality Management", "QA Process", "Continuous Improvement",
    "Sprint Retrospective", "Daily Standup", "Sprint Review", "Backlog Grooming",
    "User Stories", "Epics", "Story Points", "Velocity", "Burndown Charts",
    "Cross-functional Teams", "Team Leadership", "Team Building"
  ],
  
  // Product Management
  productManagement: [
    "Product Management", "Product Strategy", "Product Vision", "Product Roadmap",
    "Product Owner", "PO", "Product Manager", "PM", "Associate Product Manager", "APM",
    "Product Discovery", "Product Development", "Product Launch", "Go-to-Market",
    "User Research", "Customer Research", "Customer Interviews", "Voice of Customer",
    "Market Research", "Competitive Intelligence", "Market Analysis",
    "Product Requirements", "PRD", "Product Specs", "Feature Specifications",
    "User Stories", "Jobs to Be Done", "JTBD", "Outcome-Driven Innovation",
    "MVP", "Minimum Viable Product", "MLP", "Minimum Lovable Product",
    "Product Analytics", "Product Metrics", "North Star Metric", "KPIs",
    "Mixpanel", "Amplitude", "Pendo", "FullStory", "LogRocket",
    "A/B Testing", "Feature Flags", "LaunchDarkly", "Split.io", "Optimizely",
    "Product-Led Growth", "PLG", "Freemium", "Trial Conversion",
    "Pricing Strategy", "Monetization", "Subscription Models", "SaaS Metrics",
    "Product Backlog", "Prioritization", "RICE Framework", "MoSCoW",
    "Stakeholder Alignment", "Executive Communication", "Product Presentations",
    "Aha!", "ProductBoard", "Productplan", "Roadmunk"
  ],
  
  // Finance & Accounting
  finance: [
    "Finance", "Financial Analysis", "Financial Planning", "FP&A",
    "Financial Modeling", "Financial Forecasting", "Budgeting", "Budget Management",
    "Accounting", "Bookkeeping", "General Ledger", "Accounts Payable", "Accounts Receivable",
    "GAAP", "IFRS", "Financial Reporting", "Financial Statements",
    "Income Statement", "Balance Sheet", "Cash Flow Statement", "P&L",
    "Tax Accounting", "Tax Planning", "Tax Compliance", "Corporate Tax",
    "Audit", "Internal Audit", "External Audit", "SOX Compliance", "Sarbanes-Oxley",
    "Cost Accounting", "Management Accounting", "Variance Analysis",
    "Excel", "Advanced Excel", "Financial Excel", "VBA", "Macros",
    "SAP", "SAP FICO", "Oracle Financials", "NetSuite", "Workday Financials",
    "QuickBooks", "Xero", "FreshBooks", "Wave", "Sage",
    "Bloomberg Terminal", "Capital IQ", "FactSet", "Reuters Eikon",
    "Valuation", "DCF", "Discounted Cash Flow", "Comparable Analysis", "Comps",
    "M&A", "Mergers and Acquisitions", "Due Diligence", "Deal Structuring",
    "Investment Analysis", "Portfolio Management", "Asset Management",
    "Risk Management Financial", "Credit Risk", "Market Risk", "Operational Risk",
    "Compliance", "Regulatory Compliance", "AML", "KYC", "Basel",
    "Treasury", "Cash Management", "Liquidity Management", "Working Capital",
    "Corporate Finance", "Capital Markets", "Equity Research", "Fixed Income"
  ],
  
  // Human Resources
  hr: [
    "Human Resources", "HR", "People Operations", "People Management",
    "Recruiting", "Recruitment", "Talent Acquisition", "TA", "Sourcing",
    "Technical Recruiting", "Executive Search", "Headhunting",
    "LinkedIn Recruiter", "Indeed", "Glassdoor", "ATS", "Applicant Tracking System",
    "Greenhouse", "Lever", "Workday Recruiting", "iCIMS", "Taleo", "BambooHR",
    "Interviewing", "Behavioral Interviewing", "Competency-Based Interviewing",
    "Employer Branding", "Employee Value Proposition", "EVP",
    "Onboarding", "Employee Onboarding", "New Hire Experience",
    "HRIS", "HR Systems", "Workday", "SAP SuccessFactors", "Oracle HCM",
    "ADP", "Paylocity", "Gusto", "Rippling", "Deel", "Remote.com",
    "Compensation", "Compensation Planning", "Salary Benchmarking", "Pay Equity",
    "Benefits Administration", "Employee Benefits", "Health Insurance", "401k",
    "Performance Management", "Performance Reviews", "Goal Setting", "OKRs HR",
    "Learning and Development", "L&D", "Training", "Employee Training",
    "Employee Engagement", "Employee Experience", "Culture Building",
    "Diversity and Inclusion", "D&I", "DEI", "Belonging",
    "Employee Relations", "Conflict Resolution", "Mediation",
    "HR Compliance", "Employment Law", "Labor Law", "EEOC", "FMLA", "ADA",
    "Organizational Development", "OD", "Change Management HR",
    "Workforce Planning", "Succession Planning", "Talent Management",
    "HRBP", "HR Business Partner", "Strategic HR"
  ],
  
  // Operations & Supply Chain
  operations: [
    "Operations Management", "Operations", "Business Operations",
    "Supply Chain Management", "SCM", "Logistics", "Logistics Management",
    "Procurement", "Purchasing", "Vendor Management", "Supplier Management",
    "Inventory Management", "Inventory Control", "Stock Management",
    "Warehouse Management", "WMS", "Distribution", "Fulfillment",
    "Manufacturing", "Production Management", "Production Planning",
    "Lean Manufacturing", "Six Sigma Manufacturing", "Continuous Improvement",
    "Quality Control", "QC", "Quality Assurance Operations", "TQM",
    "Process Improvement", "Process Optimization", "BPR", "Business Process Reengineering",
    "ERP", "SAP ERP", "Oracle ERP", "Microsoft Dynamics", "NetSuite ERP",
    "Demand Planning", "Demand Forecasting", "S&OP", "Sales and Operations Planning",
    "Capacity Planning", "Resource Planning", "MRP", "Material Requirements Planning",
    "Shipping", "Freight", "Transportation Management", "TMS", "3PL",
    "Import/Export", "Customs", "Trade Compliance", "International Logistics",
    "Fleet Management", "Route Optimization", "Last Mile Delivery",
    "Facilities Management", "Facility Operations", "Maintenance Management"
  ],
  
  // Sales
  sales: [
    "Sales", "Business Development", "BD", "Account Management",
    "B2B Sales", "B2C Sales", "Enterprise Sales", "SMB Sales", "Mid-Market Sales",
    "Inside Sales", "Outside Sales", "Field Sales", "Remote Sales",
    "SaaS Sales", "Software Sales", "Technology Sales", "Solution Selling",
    "Consultative Selling", "Value Selling", "Challenger Sale", "SPIN Selling",
    "Sales Strategy", "Sales Planning", "Territory Planning", "Account Planning",
    "Lead Generation Sales", "Prospecting", "Cold Calling", "Cold Emailing",
    "Sales Pipeline", "Pipeline Management", "Opportunity Management",
    "Sales Forecasting", "Revenue Forecasting", "Quota Management",
    "Salesforce", "Salesforce CRM", "HubSpot Sales", "Pipedrive", "Close CRM",
    "Outreach", "SalesLoft", "Apollo", "ZoomInfo", "LinkedIn Sales Navigator",
    "Gong", "Chorus", "Conversation Intelligence", "Sales Enablement",
    "Contract Negotiation", "Deal Closing", "Objection Handling",
    "Customer Success", "Account Retention", "Upselling", "Cross-Selling",
    "Channel Sales", "Partner Sales", "Reseller Management", "Alliance Management",
    "Sales Operations", "Sales Ops", "RevOps", "Revenue Operations",
    "SDR", "BDR", "Account Executive", "AE", "Sales Manager", "VP Sales"
  ],
  
  // Customer Service
  customerService: [
    "Customer Service", "Customer Support", "Client Services",
    "Technical Support", "Tech Support", "IT Support", "Helpdesk",
    "Customer Experience", "CX", "Customer Satisfaction", "CSAT", "NPS",
    "Call Center", "Contact Center", "Inbound Support", "Outbound Support",
    "Live Chat", "Chat Support", "Email Support", "Phone Support",
    "Zendesk", "Freshdesk", "Intercom", "Salesforce Service Cloud",
    "ServiceNow", "Jira Service Management", "Help Scout", "Front",
    "Ticketing System", "Case Management", "Issue Resolution",
    "Customer Retention", "Churn Prevention", "Customer Loyalty",
    "Knowledge Management", "Self-Service", "FAQ Management",
    "Escalation Management", "SLA Management", "Service Level Agreements",
    "Voice of Customer", "VoC", "Customer Feedback", "Survey Management",
    "Omnichannel Support", "Multichannel Support",
    "Customer Onboarding", "Client Onboarding", "Implementation",
    "Account Management Customer", "Client Relationship Management"
  ],
  
  // ==================== SPECIALIZED DOMAINS ====================
  
  // Healthcare & Medical
  healthcare: [
    "Healthcare", "Health IT", "Healthcare IT", "HIT",
    "Electronic Health Records", "EHR", "EMR", "Epic", "Cerner", "Meditech",
    "Medical Coding", "ICD-10", "CPT Coding", "Medical Billing",
    "HIPAA", "HIPAA Compliance", "Healthcare Compliance", "PHI",
    "Clinical Research", "Clinical Trials", "GCP", "Good Clinical Practice",
    "FDA Regulations", "Regulatory Affairs", "Medical Device Regulations",
    "Telemedicine", "Telehealth", "Remote Patient Monitoring", "RPM",
    "Health Informatics", "Medical Informatics", "Biomedical Informatics",
    "Public Health", "Epidemiology", "Healthcare Analytics",
    "Nursing", "RN", "Nurse Practitioner", "Clinical Nursing",
    "Medical Imaging", "Radiology", "PACS", "DICOM",
    "Laboratory", "Lab Technology", "LIMS", "Pathology",
    "Pharmacy", "Pharmaceutical", "Drug Development", "Pharmacology",
    "Biotechnology", "Biotech", "Life Sciences", "Genomics"
  ],
  
  // Legal
  legal: [
    "Legal", "Law", "Attorney", "Lawyer", "Paralegal", "Legal Assistant",
    "Corporate Law", "Business Law", "Commercial Law", "Contract Law",
    "Intellectual Property", "IP", "Patent", "Trademark", "Copyright",
    "Litigation", "Civil Litigation", "Criminal Law", "Trial Preparation",
    "Legal Research", "Westlaw", "LexisNexis", "Legal Writing",
    "Contract Drafting", "Contract Review", "Contract Management",
    "Compliance Legal", "Regulatory Compliance Legal", "Ethics",
    "Employment Law", "Labor Law", "HR Legal", "Discrimination Law",
    "Real Estate Law", "Property Law", "Title Search", "Closing",
    "Immigration Law", "Visa Processing", "Work Permits",
    "Privacy Law", "Data Privacy", "GDPR Legal", "CCPA",
    "E-Discovery", "Document Review", "Legal Technology", "LegalTech",
    "Case Management Legal", "Clio", "MyCase", "PracticePanther"
  ],
  
  // Education
  education: [
    "Education", "Teaching", "Instruction", "Curriculum Development",
    "K-12 Education", "Elementary Education", "Secondary Education",
    "Higher Education", "University Teaching", "College Instruction",
    "Online Education", "E-Learning", "Distance Learning", "Remote Teaching",
    "Instructional Design", "Learning Design", "Course Development",
    "LMS", "Learning Management System", "Canvas", "Blackboard", "Moodle",
    "EdTech", "Educational Technology", "Digital Learning",
    "Training and Development", "Corporate Training", "L&D",
    "Assessment", "Testing", "Evaluation", "Grading",
    "Special Education", "SPED", "Inclusive Education", "IEP",
    "ESL", "ELL", "TESOL", "English Language Teaching",
    "STEM Education", "Science Education", "Math Education",
    "Early Childhood Education", "ECE", "Preschool", "Montessori",
    "Student Success", "Academic Advising", "Counseling",
    "Administration Education", "Principal", "Dean", "Superintendent"
  ],
  
  // Real Estate
  realEstate: [
    "Real Estate", "Property Management", "Real Estate Investment",
    "Commercial Real Estate", "CRE", "Residential Real Estate",
    "Real Estate Sales", "Real Estate Agent", "Broker", "Realtor",
    "Property Valuation", "Appraisal", "CMA", "Market Analysis",
    "Real Estate Development", "Land Development", "Construction Management",
    "Leasing", "Tenant Relations", "Lease Administration",
    "Asset Management Real Estate", "Portfolio Management Real Estate",
    "MLS", "Multiple Listing Service", "Real Estate Listings",
    "Real Estate Marketing", "Property Marketing", "Open Houses",
    "Real Estate Investment Trust", "REIT", "Real Estate Finance",
    "Mortgage", "Loan Origination", "Underwriting", "Closing",
    "Title Insurance", "Escrow", "Real Estate Contracts",
    "Yardi", "AppFolio", "Buildium", "RealPage", "CoStar"
  ],
  
  // Manufacturing & Engineering
  manufacturing: [
    "Manufacturing", "Production", "Industrial Engineering",
    "Mechanical Engineering", "Electrical Engineering", "Chemical Engineering",
    "Process Engineering", "Manufacturing Engineering", "Quality Engineering",
    "Lean Manufacturing", "Six Sigma", "Kaizen", "5S", "Continuous Improvement",
    "CAD", "Computer-Aided Design", "AutoCAD", "SolidWorks", "CATIA", "Inventor",
    "CAM", "Computer-Aided Manufacturing", "CNC", "CNC Programming",
    "PLM", "Product Lifecycle Management", "Teamcenter", "Windchill",
    "Quality Control", "QC", "Quality Assurance", "ISO 9001", "IATF 16949",
    "Root Cause Analysis", "FMEA", "8D", "CAPA", "Statistical Process Control",
    "ERP Manufacturing", "SAP Manufacturing", "Oracle Manufacturing",
    "Supply Chain Manufacturing", "MRP", "Production Planning",
    "Automation", "Industrial Automation", "PLC Programming", "SCADA",
    "Robotics Industrial", "Cobots", "Assembly Line", "Production Line",
    "Materials Science", "Metallurgy", "Composites", "Plastics",
    "Additive Manufacturing", "3D Printing Industrial", "Rapid Prototyping"
  ],
  
  // Media & Entertainment
  media: [
    "Media", "Entertainment", "Broadcasting", "Journalism",
    "Video Production", "Film Production", "Television", "TV Production",
    "Content Production", "Media Production", "Post-Production",
    "Editing", "Video Editing", "Film Editing", "Audio Editing",
    "Directing", "Producing", "Executive Producer", "Line Producer",
    "Cinematography", "Camera Operation", "Lighting", "Grip",
    "Sound Engineering", "Audio Engineering", "Mixing", "Mastering",
    "Music Production", "Music Industry", "Record Label", "Artist Management",
    "Podcasting", "Podcast Production", "Audio Content",
    "Streaming", "OTT", "Netflix", "YouTube", "Twitch", "Live Streaming",
    "News Production", "News Writing", "Reporting", "Anchoring",
    "Sports Broadcasting", "Sports Media", "Commentary",
    "Public Relations", "PR", "Media Relations", "Press",
    "Event Production", "Live Events", "Concerts", "Festivals"
  ],
  
  // Hospitality & Tourism
  hospitality: [
    "Hospitality", "Hotel Management", "Resort Management",
    "Front Desk", "Guest Services", "Concierge", "Guest Relations",
    "Food and Beverage", "F&B", "Restaurant Management", "Bar Management",
    "Culinary", "Chef", "Kitchen Management", "Food Service",
    "Event Planning", "Event Management", "Catering", "Banquet",
    "Tourism", "Travel Industry", "Tour Operations", "Travel Agency",
    "Revenue Management", "Yield Management", "Pricing Hospitality",
    "Reservations", "Booking Systems", "Opera PMS", "Amadeus", "Sabre",
    "Customer Service Hospitality", "Guest Experience", "Service Excellence",
    "Housekeeping", "Facilities Hospitality", "Maintenance",
    "Spa Management", "Wellness", "Recreation Management",
    "Cruise Industry", "Airlines", "Aviation", "Airport Operations"
  ],
  
  // Nonprofit & Social Impact
  nonprofit: [
    "Nonprofit", "Non-Profit", "NGO", "Social Impact", "Social Enterprise",
    "Fundraising", "Development", "Donor Relations", "Major Gifts",
    "Grant Writing", "Grant Management", "Foundation Relations",
    "Philanthropy", "Charitable Giving", "Planned Giving",
    "Volunteer Management", "Volunteer Coordination", "Community Engagement",
    "Program Management Nonprofit", "Program Development", "Impact Measurement",
    "Advocacy", "Public Policy", "Government Relations", "Lobbying",
    "Community Development", "Economic Development", "Social Services",
    "Environmental", "Sustainability", "Conservation", "Climate",
    "International Development", "Humanitarian", "Relief Work",
    "Board Relations", "Governance", "Nonprofit Leadership",
    "CRM Nonprofit", "Salesforce Nonprofit", "Raiser's Edge", "Bloomerang"
  ],
  
  // ==================== SOFT SKILLS & GENERAL ====================
  
  // Soft Skills
  soft: [
    "Leadership", "Team Leadership", "People Leadership", "Executive Leadership",
    "Communication", "Written Communication", "Verbal Communication", "Public Speaking",
    "Presentation Skills", "Storytelling", "Executive Presence",
    "Teamwork", "Collaboration", "Cross-Functional Collaboration",
    "Problem Solving", "Analytical Thinking", "Critical Thinking", "Strategic Thinking",
    "Decision Making", "Sound Judgment", "Risk Assessment",
    "Time Management", "Prioritization", "Organization", "Planning",
    "Adaptability", "Flexibility", "Resilience", "Growth Mindset",
    "Creativity", "Innovation", "Design Thinking", "Ideation",
    "Emotional Intelligence", "EQ", "Empathy", "Self-Awareness",
    "Negotiation", "Persuasion", "Influence", "Stakeholder Management",
    "Conflict Resolution", "Mediation", "Diplomacy",
    "Mentoring", "Coaching", "Training Others", "Knowledge Transfer",
    "Customer Focus", "Client Orientation", "Service Mindset",
    "Attention to Detail", "Accuracy", "Quality Focus",
    "Initiative", "Proactive", "Self-Starter", "Drive",
    "Accountability", "Ownership", "Responsibility",
    "Cultural Awareness", "Global Mindset", "Diversity Awareness",
    "Work Ethic", "Professionalism", "Integrity", "Ethics"
  ],
  
  // Languages
  languages: [
    "English", "Spanish", "French", "German", "Mandarin", "Chinese",
    "Japanese", "Korean", "Portuguese", "Italian", "Russian", "Arabic",
    "Hindi", "Dutch", "Swedish", "Norwegian", "Danish", "Finnish",
    "Polish", "Turkish", "Vietnamese", "Thai", "Indonesian", "Malay",
    "Hebrew", "Greek", "Czech", "Hungarian", "Romanian", "Ukrainian",
    "Bilingual", "Multilingual", "Native Speaker", "Fluent", "Proficient",
    "Translation", "Interpretation", "Localization", "Transcription"
  ],
  
  // Certifications & Standards
  certifications: [
    "AWS Certified", "AWS Solutions Architect", "AWS Developer", "AWS SysOps",
    "Azure Certified", "Azure Administrator", "Azure Developer", "Azure Architect",
    "GCP Certified", "Google Cloud Certified", "Google Cloud Architect",
    "Kubernetes Certified", "CKA", "CKAD", "CKS",
    "Terraform Certified", "HashiCorp Certified",
    "Cisco Certified", "CCNA", "CCNP", "CCIE",
    "CompTIA", "A+", "Network+", "Security+", "Cloud+",
    "CISSP", "CISM", "CEH", "OSCP", "Security Certifications",
    "PMP", "CAPM", "PMI-ACP", "PRINCE2", "Project Management Certifications",
    "Scrum Master", "CSM", "PSM", "SAFe Certified", "Agile Certifications",
    "Six Sigma Green Belt", "Six Sigma Black Belt", "Lean Certified",
    "ITIL", "ITIL Foundation", "ITIL Practitioner",
    "Salesforce Certified", "Salesforce Administrator", "Salesforce Developer",
    "HubSpot Certified", "Google Ads Certified", "Google Analytics Certified",
    "CPA", "CFA", "CMA", "CIA", "Financial Certifications",
    "PHR", "SPHR", "SHRM-CP", "SHRM-SCP", "HR Certifications",
    "Real Estate License", "Insurance License", "Series 7", "Series 63"
  ]
};

// Flatten all skills for quick lookup
const ALL_SKILLS = Object.values(SKILL_CATEGORIES).flat();

/* =====================================================
   SKILL EXTRACTION (CASE-INSENSITIVE)
   ===================================================== */

function extractSkills(text) {
  if (!text) return [];
  
  const foundSkills = new Set();
  const lowerText = text.toLowerCase();
  
  for (const skill of ALL_SKILLS) {
    // Create word boundary pattern for accurate matching
    const pattern = new RegExp(
      `\\b${skill.toLowerCase().replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`,
      'i'
    );
    
    if (pattern.test(lowerText)) {
      foundSkills.add(skill);
    }
  }
  
  return Array.from(foundSkills);
}

function extractSkillsFromText(text) {
  return extractSkills(text);
}

function extractSkillsByCategory(text) {
  if (!text) return {};
  
  const result = {};
  const lowerText = text.toLowerCase();
  
  for (const [category, skills] of Object.entries(SKILL_CATEGORIES)) {
    const found = skills.filter(skill => {
      const pattern = new RegExp(
        `\\b${skill.toLowerCase().replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`,
        'i'
      );
      return pattern.test(lowerText);
    });
    
    if (found.length > 0) {
      result[category] = found;
    }
  }
  
  return result;
}

/* =====================================================
   KEYWORD EXTRACTION
   ===================================================== */

function extractKeywords(text) {
  if (!text) return [];
  
  // Common resume keywords
  const keywords = [
    "developed", "built", "designed", "implemented", "managed",
    "led", "created", "optimized", "improved", "reduced",
    "increased", "achieved", "delivered", "launched", "automated",
    "collaborated", "coordinated", "analyzed", "researched"
  ];
  
  const found = [];
  const lowerText = text.toLowerCase();
  
  for (const keyword of keywords) {
    if (lowerText.includes(keyword)) {
      found.push(keyword);
    }
  }
  
  return found;
}

/* =====================================================
   ACTION VERB EXTRACTION
   ===================================================== */

const ACTION_VERBS = {
  leadership: [
    "led", "managed", "directed", "supervised", "oversaw",
    "coordinated", "orchestrated", "spearheaded", "headed"
  ],
  achievement: [
    "achieved", "exceeded", "surpassed", "accomplished",
    "attained", "earned", "delivered", "completed"
  ],
  creation: [
    "built", "created", "designed", "developed", "established",
    "implemented", "launched", "initiated", "founded", "introduced"
  ],
  improvement: [
    "improved", "enhanced", "optimized", "streamlined", "upgraded",
    "modernized", "refined", "transformed", "revamped", "accelerated"
  ],
  analysis: [
    "analyzed", "assessed", "evaluated", "researched", "investigated",
    "examined", "identified", "discovered", "measured", "calculated"
  ],
  communication: [
    "presented", "communicated", "negotiated", "influenced",
    "persuaded", "collaborated", "partnered", "liaised"
  ]
};

function extractActionVerbs(text) {
  if (!text) return [];
  
  const found = new Set();
  const lowerText = text.toLowerCase();
  
  for (const verbs of Object.values(ACTION_VERBS)) {
    for (const verb of verbs) {
      if (lowerText.includes(verb)) {
        found.add(verb);
      }
    }
  }
  
  return Array.from(found);
}

/* =====================================================
   TEXT NORMALIZATION (CRITICAL FOR CLEAN AI INPUT)
   ===================================================== */

function normalizeResumeText(text) {
  if (!text) return "";
  
  return text
    // Normalize line endings
    .replace(/\r\n/g, "\n")
    .replace(/\r/g, "\n")
    
    // Remove non-printable characters (except newlines)
    .replace(/[^\x20-\x7E\n]/g, " ")
    
    // Normalize whitespace
    .replace(/\t/g, " ")
    .replace(/ +/g, " ")
    
    // Clean up excessive newlines
    .replace(/\n{3,}/g, "\n\n")
    
    // Trim lines
    .split("\n")
    .map(line => line.trim())
    .join("\n")
    
    // Final trim
    .trim();
}

/* =====================================================
   EXPERIENCE LEVEL DETECTION
   ===================================================== */

function detectExperienceLevel(text) {
  if (!text) return "Unknown";
  
  const lowerText = text.toLowerCase();
  
  // Look for year mentions
  const yearPatterns = [
    /(\d+)\+?\s*years?\s*(of\s*)?(experience|exp)/i,
    /(experience|exp)\s*:?\s*(\d+)\+?\s*years?/i
  ];
  
  for (const pattern of yearPatterns) {
    const match = lowerText.match(pattern);
    if (match) {
      const years = parseInt(match[1] || match[2]);
      if (years === 0) return "Fresher";
      if (years <= 2) return "1-3";
      if (years <= 5) return "3+";
      return "5+";
    }
  }
  
  // Check for keywords
  if (lowerText.includes("fresher") || lowerText.includes("entry level")) {
    return "Fresher";
  }
  if (lowerText.includes("senior") || lowerText.includes("lead")) {
    return "3+";
  }
  if (lowerText.includes("junior") || lowerText.includes("associate")) {
    return "1-3";
  }
  
  return "Unknown";
}

/* =====================================================
   EXPORTS
   ===================================================== */

module.exports = {
  extractSkills,
  extractSkillsFromText,
  extractSkillsByCategory,
  extractKeywords,
  extractActionVerbs,
  normalizeResumeText,
  detectExperienceLevel,
  SKILL_CATEGORIES,
  ALL_SKILLS,
  ACTION_VERBS
};
