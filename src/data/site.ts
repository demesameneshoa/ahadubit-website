export const company = {
  name: "Ahadubit Technologies PLC",
  short: "Ahadubit",
  tagline: "Solutions for Tomorrow",
  founded: 2019,
  email: "info@ahadubit.com",
  phones: ["+251 911 095 346", "+251 944 120 059"],
  address: {
    line1: "AB Star Building, Office #201",
    line2: "Around Megenagna, in front of Bellevue Hotel",
    city: "Addis Ababa, Ethiopia",
  },
  linkedin: "https://www.linkedin.com/company/ahadubit-technologies/",
  mapQuery: "Megenagna, Addis Ababa, Ethiopia",
};

export const nav = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/contact", label: "Contact" },
];

export type IconName =
  | "erp"
  | "apps"
  | "web"
  | "cloud"
  | "network"
  | "hardware"
  | "finance"
  | "hr"
  | "currency"
  | "expertise"
  | "industry"
  | "custom"
  | "deploy"
  | "support"
  | "target"
  | "compass"
  | "spark";

export type Service = {
  slug: string;
  title: string;
  icon: IconName;
  summary: string;
  detail: string;
  points: string[];
};

export const services: Service[] = [
  {
    slug: "erp",
    title: "ERP Solutions",
    icon: "erp",
    summary: "Comprehensive Odoo-based ERP that integrates every business unit of a company.",
    detail:
      "We customize, deploy and support Odoo-based ERP systems that bring purchase, inventory, sales, manufacturing, quality, maintenance, HR and accounting into one connected platform — configured for Ethiopian business practice and local currency.",
    points: ["Purchase, Inventory & Sales", "Manufacturing & Quality Assurance", "Accounting & HR", "Multi-company setups"],
  },
  {
    slug: "custom-apps",
    title: "Custom Apps Development",
    icon: "apps",
    summary: "Mobile and web applications built around each client's exact needs.",
    detail:
      "From real-estate CRMs to IPTV streaming apps, we design and build bespoke web and mobile applications that fit the way your team and customers actually work.",
    points: ["Android & cross-platform apps", "Web portals & dashboards", "CRM & workflow automation", "API integrations"],
  },
  {
    slug: "web",
    title: "Web Development & Hosting",
    icon: "web",
    summary: "Web services and reliable hosting for the solutions we build.",
    detail:
      "We develop corporate websites, portals and web services, then keep them fast, secure and online with dependable managed hosting.",
    points: ["Corporate websites & portals", "Managed hosting", "Domain & SSL management", "Performance & security"],
  },
  {
    slug: "cloud",
    title: "Cloud Services",
    icon: "cloud",
    summary: "Provisioning and administration of cloud resources for secure, universal access.",
    detail:
      "We plan, provision and administer cloud infrastructure so your systems are reachable from anywhere — securely — with on-premise options where you need them.",
    points: ["Cloud provisioning", "Server administration", "Backup & recovery", "Hybrid & on-premise options"],
  },
  {
    slug: "networking",
    title: "Networking & Communications",
    icon: "network",
    summary: "Surveillance, audio & video communications, access control and networking.",
    detail:
      "We design and install the physical backbone — copper and fibre lines, CCTV surveillance with remote access, video intercoms and access control — and configure it end to end.",
    points: ["CCTV surveillance", "Video intercom systems", "Access control", "Copper & fibre backbone"],
  },
  {
    slug: "hardware",
    title: "Hardware Integrations",
    icon: "hardware",
    summary: "Integrating hardware and legacy apps with custom or existing software.",
    detail:
      "Biometric attendance devices, IPTV sources, streaming boxes and legacy systems — we connect your equipment to the software that runs your business.",
    points: ["Biometric integration", "IPTV & streaming devices", "Legacy system bridging", "IoT & device data"],
  },
  {
    slug: "financial",
    title: "Financial Solutions",
    icon: "finance",
    summary: "Digital saving and lending, mobile wallets and payment gateways.",
    detail:
      "Battle-tested, localized financial technology for MFIs, SACCOs and businesses — from digital saving and lending to mobile wallets and payment gateway integration.",
    points: ["Digital saving & lending", "Mobile wallets", "Payment gateways", "Built for MFIs & SACCOs"],
  },
  {
    slug: "hrm",
    title: "HRM Systems",
    icon: "hr",
    summary: "Human resource management from recruitment to resignation.",
    detail:
      "Web-based HR systems covering the full employee lifecycle, with attendance management through system sign-in and biometric device integration.",
    points: ["Recruitment to resignation", "Attendance & biometrics", "Payroll-ready records", "Employee self-service"],
  },
];

export const features: { title: string; icon: IconName; text: string }[] = [
  { title: "Local Currency", icon: "currency", text: "All transaction fees are made in local currency." },
  { title: "Expertise", icon: "expertise", text: "More than five years of experience in the Odoo development environment." },
  { title: "Industry Specific", icon: "industry", text: "Systems tailored to your industry, making our delivery period shorter." },
  { title: "Customizable", icon: "custom", text: "Both our ERP solutions and mobile apps are customizable to client requirements." },
  { title: "Flexible Deployment", icon: "deploy", text: "Whether you require on-premise or cloud deployment, we've got you covered." },
  { title: "Exceptional Assistance", icon: "support", text: "A support team with the expertise to effectively troubleshoot your concerns." },
];

export type ProjectCategory = "ERP" | "HR & Management" | "Apps & Platforms" | "Surveillance & Networking";

export type Project = {
  client: string;
  logo: string;
  type: string;
  categories: ProjectCategory[];
  status: "Completed" | "In progress";
  sector: string;
  highlights: string[];
};

export const projects: Project[] = [
  {
    client: "Top Water Ethiopia",
    logo: "/clients/top.png",
    type: "ERP",
    categories: ["ERP"],
    status: "Completed",
    sector: "Manufacturing",
    highlights: [
      "Fully customized and deployed Odoo-based ERP system",
      "Purchase, Inventory, Sales, Manufacturing, Quality Assurance, Maintenance, HR and Accounting modules",
    ],
  },
  {
    client: "Maereg Manufacturing",
    logo: "/clients/maereg.png",
    type: "ERP",
    categories: ["ERP"],
    status: "Completed",
    sector: "Manufacturing",
    highlights: [
      "Fully customized and deployed Odoo-based ERP system",
      "Purchase, Inventory, Sales, Manufacturing, Quality Assurance, Maintenance and HR modules",
    ],
  },
  {
    client: "Kebri Dehar University",
    logo: "/clients/kabridahar.png",
    type: "Student Management System",
    categories: ["HR & Management", "Apps & Platforms"],
    status: "Completed",
    sector: "Education",
    highlights: [
      "Launched in collaboration with Yagebanal Ethiopia Charity Association",
      "Holistic student management with online registration and automated university management",
    ],
  },
  {
    client: "Great Ethiopian Run",
    logo: "/clients/great-ethiopian-run.png",
    type: "HR System",
    categories: ["HR & Management"],
    status: "Completed",
    sector: "Sports & Events",
    highlights: [
      "HR operations from recruitment to resignation",
      "Attendance management with system sign-in and biometric integration",
    ],
  },
  {
    client: "Elgel Hotel and Spa",
    logo: "/clients/elgel.png",
    type: "IPTV App",
    categories: ["Apps & Platforms"],
    status: "Completed",
    sector: "Hospitality",
    highlights: [
      "Web-based IPTV management system and Android app for live streaming",
      "Hardware integration of IPTV sources and streaming devices via LAN",
      "Streams DSTV and satellite sources plus on-demand video",
    ],
  },
  {
    client: "Shemu Group PLC",
    logo: "/clients/shemu.png",
    type: "Surveillance System",
    categories: ["Surveillance & Networking"],
    status: "Completed",
    sector: "Manufacturing",
    highlights: [
      "Surveillance for factories in Addis Ababa and Dire Dawa",
      "Backbone copper and fibre lines, camera setup and configuration",
      "Remote access option",
    ],
  },
  {
    client: "Oromia Investment Commission",
    logo: "/clients/oromia-investment.png",
    type: "HR & Surveillance System",
    categories: ["HR & Management", "Surveillance & Networking"],
    status: "Completed",
    sector: "Government",
    highlights: [
      "Web-based HR management module, web portal and customer feedback",
      "CCTV surveillance deployment",
      "Employee biometrics integration and customer ranking on tablets",
    ],
  },
  {
    client: "Oromia Urban Development & Housing Bureau",
    logo: "/clients/oromia-urban.png",
    type: "Video Intercom System",
    categories: ["Surveillance & Networking"],
    status: "Completed",
    sector: "Government",
    highlights: [
      "Hardware and deployment of a video intercom system for audio and video communication",
      "Serves citizens with disabilities by connecting the lobby with bureau experts",
    ],
  },
  {
    client: "Temer Properties",
    logo: "/clients/temer.png",
    type: "Real Estate CRM, Sales & Property Management",
    categories: ["Apps & Platforms"],
    status: "Completed",
    sector: "Real Estate",
    highlights: [
      "Web and mobile apps for real estate property management",
      "Secure CRM with contact and activity tracking",
      "Reservation, sales, contract and commission management by sales hierarchy",
    ],
  },
  {
    client: "ASBM Industrials PLC",
    logo: "/clients/asbm.png",
    type: "ERP",
    categories: ["ERP"],
    status: "In progress",
    sector: "Industrial",
    highlights: [
      "Customizing and deploying an Odoo-based ERP system",
      "Purchase, Inventory, Sales, Manufacturing, QA, Maintenance, HR and Accounting",
    ],
  },
  {
    client: "Meti Trading PLC",
    logo: "/clients/meti.png",
    type: "ERP",
    categories: ["ERP"],
    status: "In progress",
    sector: "Trading",
    highlights: [
      "Multi-company enterprise Odoo-based ERP system",
      "Adds Rental Management and Project Management to core modules",
    ],
  },
  {
    client: "ADA Foods Complex SC",
    logo: "/clients/ada-foods.png",
    type: "ERP",
    categories: ["ERP"],
    status: "In progress",
    sector: "Food Processing",
    highlights: [
      "Customizing and deploying an Odoo-based ERP system",
      "Purchase, Inventory, Sales, Manufacturing, QA, Maintenance, HR and Accounting",
    ],
  },
];

export const clientLogos = projects.map((p) => ({ name: p.client, logo: p.logo }));

export const process = [
  { step: "01", title: "Discover", text: "We study your operations, people and goals to define what the solution must achieve." },
  { step: "02", title: "Design", text: "We map workflows and architecture, choosing what to configure, customize or build." },
  { step: "03", title: "Build & Integrate", text: "We develop, customize and connect software with the hardware you already use." },
  { step: "04", title: "Deploy & Train", text: "We launch on-premise or in the cloud and train your team to own the system." },
  { step: "05", title: "Support & Grow", text: "We stay with you — troubleshooting, improving and scaling as you expand." },
];
