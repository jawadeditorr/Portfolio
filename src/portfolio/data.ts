// Shared data for the portfolio.
export const FILES = [
  { name: "home.tsx", icon: "react", lang: "tsx" },
  { name: "about.md", icon: "md", lang: "md" },
  { name: "skills.json", icon: "json", lang: "json" },
  { name: "projects.ts", icon: "ts", lang: "ts" },
  { name: "experience.js", icon: "js", lang: "js" },
  { name: "certifications.yaml", icon: "yaml", lang: "yaml" },
  { name: "contact.css", icon: "css", lang: "css" },
  { name: "achievements.md", icon: "md", lang: "md" },
  { name: "README.md", icon: "md", lang: "md" },
  { name: "resume.pdf", icon: "pdf", lang: "pdf" },
] as const;

export type FileName = (typeof FILES)[number]["name"];

export const SKILLS = {
  DevOps: ["Docker", "Kubernetes", "Jenkins", "GitHub Actions", "Terraform", "Ansible"],
  Cloud: ["AWS", "Azure", "GCP"],
  Programming: ["Python", "JavaScript", "Bash"],
  "Operating Systems": ["Linux", "Ubuntu", "CentOS"],
};

export const PROJECTS = [
  {
    title: "Microservices E-Commerce Platform",
    description: "Containerized e-commerce platform orchestrated on Kubernetes with Ingress routing and a full CI/CD pipeline.",
    stack: ["Docker", "Kubernetes", "Ingress", "CI/CD"],
    github: "#",
    live: "#",
  },
  {
    title: "CI/CD Automation Pipeline",
    description: "Automated build, test, and deploy pipelines using Jenkins and GitHub Actions with Docker image promotion.",
    stack: ["Jenkins", "GitHub Actions", "Docker"],
    github: "#",
    live: "#",
  },
  {
    title: "Kubernetes Deployment Project",
    description: "Production-grade K8s deployments with Helm charts, Ingress, autoscaling, and observability.",
    stack: ["K8s", "Ingress", "Helm"],
    github: "#",
    live: "#",
  },
];

export const EXPERIENCE = [
  {
    role: "DevOps Intern",
    company: "Open Source Contributor",
    period: "2024 — Present",
    points: [
      "Built reusable Terraform modules for AWS VPC + EKS clusters.",
      "Authored GitHub Actions workflows for multi-arch Docker builds.",
    ],
  },
  {
    role: "Lab Engineer",
    company: "University DevOps Lab",
    period: "2023 — 2024",
    points: [
      "Maintained Linux servers and Kubernetes lab clusters.",
      "Automated provisioning with Ansible playbooks.",
    ],
  },
  {
    role: "Computer Science Student",
    company: "University",
    period: "2022 — Present",
    points: [
      "Focused on distributed systems, networking, and operating systems.",
      "Active in cloud + Linux communities.",
    ],
  },
];

export const CERTIFICATIONS = [
  { name: "AWS Certified Cloud Practitioner", issuer: "Amazon Web Services", year: 2024 },
  { name: "Certified Kubernetes Application Developer (CKAD)", issuer: "CNCF", year: 2024 },
  { name: "Docker Foundations", issuer: "Docker Inc.", year: 2023 },
  { name: "Linux Foundation LFS101", issuer: "Linux Foundation", year: 2023 },
];

export const ACHIEVEMENTS = [
  "Top contributor in University DevOps Lab — 2024.",
  "Speaker at local Cloud Native meetup on Kubernetes Ingress patterns.",
  "Built and open-sourced 10+ DevOps automation utilities.",
];

export const TYPING_ROLES = [
  "DevOps Engineer",
  "Cloud Enthusiast",
  "Kubernetes Learner",
  "Linux Power User",
];
