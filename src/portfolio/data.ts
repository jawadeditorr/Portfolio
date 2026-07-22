// Shared data for the portfolio extracted from resume.pdf and project directories.

export const PERSONAL_INFO = {
  name: "Syed Jawad Hussain Mashhadi",
  shortName: "Jawad",
  role: "Cloud, Infrastructure & DevOps Intern",
  tagline: "DevOps, Cloud & System Administration Specialist",
  email: "jawad.mashhadi@gmail.com",
  phone: "+92 326 0696009",
  github: "https://github.com",
  linkedin: "https://linkedin.com",
  location: "Vehari, Pakistan",
  education: {
    degree: "Bachelor of Science in Computer Science (BSCS)",
    institution: "COMSATS University Islamabad, Vehari Campus",
    status: "Currently Enrolled (Completed 4 semesters)",
    expectedGraduation: "2028",
    cgpa: "3.88 / 4.00",
  },
  summary:
    "Computer Science undergraduate with hands-on experience in DevOps, Cloud, and Linux system administration, including Kubernetes, Docker, CI/CD pipelines, and infrastructure monitoring. Practical exposure gained through academic projects involving containerization, orchestration, and observability, along with internship experience in server infrastructure management.",
};

export const FILES = [
  { name: "home.tsx", icon: "react", lang: "tsx" },
  { name: "about.md", icon: "md", lang: "md" },
  { name: "skills.json", icon: "json", lang: "json" },
  { name: "projects.ts", icon: "ts", lang: "ts" },
  { name: "experience.js", icon: "js", lang: "js" },
  { name: "education.json", icon: "json", lang: "json" },
  { name: "contact.css", icon: "css", lang: "css" },
  { name: "README.md", icon: "md", lang: "md" },
  { name: "resume.pdf", icon: "pdf", lang: "pdf" },
] as const;

export type FileName = (typeof FILES)[number]["name"];

export const SKILLS = {
  "DevOps & CI/CD": ["Docker", "Kubernetes", "Jenkins", "CI/CD"],
  Cloud: ["AWS"],
  "Monitoring & Observability": ["Prometheus", "Grafana"],
  "Linux & System Administration": [
    "Linux",
    "Oracle Linux / RHEL",
    "User and Group Management",
    "Package Management (YUM, DNF, RPM)",
    "LVM",
    "RAID",
    "NFS",
    "SSH/SCP",
    "SELinux",
    "Service and Process Management",
    "Apache HTTP Server",
    "Chrony",
  ],
  "Infrastructure & Virtualization": [
    "iDRAC",
    "RAID Configuration",
    "VMware ESXi",
    "VMware vCenter",
    "VirtualBox",
    "Bare-Metal Infrastructure",
  ],
  "Automation & Config Management": ["Ansible"],
  "Programming Languages": ["Python", "Java", "C++"],
  "Version Control": ["Git", "GitHub"],
};

export interface ProjectItem {
  id: string;
  title: string;
  category: string;
  description: string;
  bullets: string[];
  stack: string[];
  github?: string;
  live?: string;
  featuredImage: string;
  screenshots: { url: string; caption: string }[];
}

export const PROJECTS: ProjectItem[] = [
  {
    id: "streaming-platform",
    title: "Cloud-Native Streaming Platform Deployment",
    category: "DevOps & Cloud Infrastructure",
    description:
      "Containerized a Netflix-inspired web application deployed on AWS infrastructure with Kubernetes container orchestration, automated Jenkins CI/CD pipelines, and Prometheus + Grafana real-time monitoring.",
    bullets: [
      "Containerized a Netflix-inspired web application using Docker for portability and consistency across environments.",
      "Deployed the application on AWS infrastructure using Kubernetes for container orchestration.",
      "Automated the build and deployment pipeline using Jenkins to enable continuous integration and delivery.",
      "Implemented monitoring using Prometheus to track application and infrastructure metrics.",
      "Configured Grafana dashboards for real-time visualization of system performance and metrics.",
    ],
    stack: ["Docker", "Kubernetes", "AWS", "Jenkins", "Prometheus", "Grafana"],
    screenshots: [
      {
        url: "/projects/streaming/Screenshot 2026-05-25 062024.png",
        caption: "Netflix Web Application Streaming Interface",
      },
      {
        url: "/projects/streaming/Screenshot 2026-05-25 061807.png",
        caption: "Jenkins Automated Build & Deployment CI/CD Pipeline",
      },
      {
        url: "/projects/streaming/Screenshot 2026-05-25 063214.png",
        caption: "AWS EC2 Instances (Jenkins, K8s Master/Worker, Grafana-Prometheus)",
      },
      {
        url: "/projects/streaming/Screenshot 2026-05-25 063013.png",
        caption: "Grafana Real-Time Dashboard (Prometheus Node Exporter)",
      },
      {
        url: "/projects/streaming/Screenshot 2026-05-25 062848.png",
        caption: "Docker Hub Registry (jawad911/netflix)",
      },
      {
        url: "/projects/streaming/Screenshot 2026-05-25 063717.png",
        caption: "Node Exporter Systemd Monitoring Service Terminal Output",
      },
      {
        url: "/projects/streaming/Screenshot 2026-05-25 062234.png",
        caption: "Streaming App Media Player Screen",
      },
    ],
    featuredImage: "/projects/streaming/Screenshot 2026-05-25 062024.png",
  },
  {
    id: "k8s-chat-app",
    title: "Kubernetes-Based Chat Application Deployment",
    category: "Container Orchestration",
    description:
      "Containerized real-time chat application deployed on a Kubernetes cluster, utilizing Docker, NodePort services, Redis caching/session store, and K8s manifests.",
    bullets: [
      "Containerized a chat application using Docker for consistent and portable deployment.",
      "Deployed the application on Kubernetes, configuring pods and services for container orchestration.",
      "Managed the application deployment lifecycle using Kubernetes manifests and Redis backend service.",
    ],
    stack: ["Docker", "Kubernetes", "Redis", "NodePort", "Node.js"],
    screenshots: [
      {
        url: "/projects/chat/Screenshot 2026-04-25 194714.png",
        caption: "K8s Chat Application Display Name & Join Screen",
      },
      {
        url: "/projects/chat/Screenshot 2026-04-25 194810.png",
        caption: "Real-Time General Chat Room UI",
      },
      {
        url: "/projects/chat/Screenshot 2026-04-25 200404.png",
        caption: "Kubernetes Cluster Terminal (kubectl get pods -o wide, deployments, svc)",
      },
    ],
    featuredImage: "/projects/chat/Screenshot 2026-04-25 194810.png",
  },
  {
    id: "ai-attendance",
    title: "AI Attendance System",
    category: "AI & Computer Vision",
    description:
      "Automated AI attendance system leveraging YOLOv8 object detection model and computer vision to identify individuals and mark attendance from image and video streams.",
    bullets: [
      "Developed an AI-based attendance system utilizing YOLOv8 for real-time object detection.",
      "Implemented computer vision techniques to detect and identify individuals for attendance marking.",
      "Processed image and video input for object detection and recognition tasks.",
    ],
    stack: ["YOLOv8", "Computer Vision", "Python", "OpenCV"],
    screenshots: [],
    featuredImage: "",
  },
];

export const EXPERIENCE = [
  {
    role: "Cloud, Infrastructure & DevOps Intern / Technical Mentor",
    company: "Linooptek Innovations",
    period: "July 2026 — Present",
    bullets: [
      "Mentor students on Linux, system administration, infrastructure, and DevOps concepts through technical guidance and hands-on learning sessions.",
      "Configure and manage server environments using iDRAC, RAID, and bare-metal infrastructure for hands-on technical training.",
      "Provide hands-on guidance on AWS cloud services and mentor students in containerization and orchestration technologies, including Docker and Kubernetes.",
      "Guide students in automation and configuration management using Ansible, while assisting with infrastructure and DevOps-related troubleshooting.",
      "Support VMware virtualization environments, including VMware ESXi and vCenter, and help students understand virtualized infrastructure.",
    ],
  },
];

export const EDUCATION = {
  degree: "Bachelor of Science in Computer Science (BSCS)",
  institution: "COMSATS University Islamabad, Vehari Campus",
  status: "Currently Enrolled",
  period: "Expected Graduation: 2028",
  semestersCompleted: 4,
  cgpa: "3.88 / 4.00",
  details: "Completed 4 semesters | CGPA: 3.88 / 4.00",
};

export const TYPING_ROLES = [
  "Cloud & DevOps Intern",
  "Linux System Administrator",
  "Kubernetes & Docker Practitioner",
  "BS CS Student @ COMSATS (3.88 CGPA)",
];
