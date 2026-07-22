import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Maximize2, ExternalLink, Download, Mail, Phone, MapPin, GraduationCap, Briefcase } from "lucide-react";
import { useTyping } from "./useTyping";
import { EDUCATION, EXPERIENCE, PERSONAL_INFO, PROJECTS, SKILLS, TYPING_ROLES } from "./data";
import type { FileName, ProjectItem } from "./data";
import avatarUrl from "@/assets/avatar.jpg";

/* ---------- Syntax-coloured primitives ---------- */
const K = ({ children }: { children: React.ReactNode }) => <span className="text-syntax-keyword">{children}</span>;
const S = ({ children }: { children: React.ReactNode }) => <span className="text-syntax-string">{children}</span>;
const F = ({ children }: { children: React.ReactNode }) => <span className="text-syntax-function">{children}</span>;
const V = ({ children }: { children: React.ReactNode }) => <span className="text-syntax-variable">{children}</span>;
const C = ({ children }: { children: React.ReactNode }) => <span className="text-syntax-comment italic">{children}</span>;
const N = ({ children }: { children: React.ReactNode }) => <span className="text-syntax-number">{children}</span>;
const T = ({ children }: { children: React.ReactNode }) => <span className="text-syntax-type">{children}</span>;
const P = ({ children }: { children: React.ReactNode }) => <span className="text-syntax-property">{children}</span>;
const O = ({ children }: { children: React.ReactNode }) => <span className="text-syntax-operator">{children}</span>;

/* ---------- Line-numbered code shell ---------- */
function CodeBlock({ children }: { children: React.ReactNode[] }) {
  return (
    <div className="flex font-mono text-[13.5px] leading-[1.65]">
      <div className="select-none pr-4 pl-1 text-right text-muted-foreground/60">
        {children.map((_, i) => (
          <div key={i}>{i + 1}</div>
        ))}
      </div>
      <div className="flex-1 min-w-0">
        {children.map((line, i) => (
          <div key={i} className="whitespace-pre-wrap break-words">
            {line}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------- home.tsx ---------- */
export function HomeFile({ onOpen }: { onOpen: (f: FileName) => void }) {
  const typed = useTyping(TYPING_ROLES);
  const lines = [
    <C key="c">// Welcome to Syed Jawad Hussain Mashhadi's Portfolio</C>,
    <></>,
    <><K>const</K> <V>engineer</V> <O>=</O> {"{"}</>,
    <>  <P>name</P>: <S>"{PERSONAL_INFO.name}"</S>,</>,
    <>  <P>role</P>: <S>"{PERSONAL_INFO.role}"</S>,</>,
    <>  <P>education</P>: <S>"BS Computer Science @ COMSATS (CGPA: 3.88/4.00)"</S>,</>,
    <>  <P>specialties</P>: [</>,
    <>    <S>"Kubernetes"</S>, <S>"Docker"</S>, <S>"AWS"</S>, <S>"Jenkins CI/CD"</S>,</>,
    <>    <S>"Prometheus & Grafana"</S>, <S>"Linux SysAdmin"</S>, <S>"Ansible"</S></>,
    <>  ]</>,
    <>{"}"}</>,
    <></>,
    <C key="c2">// Explore files in sidebar or click buttons below</C>,
  ];
  return (
    <div className="mx-auto max-w-5xl px-6 py-8 fade-up">
      <CodeBlock>{lines}</CodeBlock>

      <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
        <div>
          <div className="flex items-center gap-5">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="relative shrink-0"
            >
              <span className="absolute -inset-1 rounded-full bg-gradient-to-tr from-primary to-syntax-function opacity-50 blur" />
              <img
                src={avatarUrl}
                alt="Syed Jawad Hussain Mashhadi"
                width={88}
                height={88}
                className="relative h-[88px] w-[88px] rounded-full border-2 border-primary object-cover shadow-xl"
              />
              <span className="absolute bottom-1 right-1 h-3.5 w-3.5 rounded-full bg-[oklch(0.7_0.18_145)] ring-2 ring-background" />
            </motion.div>
            <div>
              <div className="text-sm text-muted-foreground font-mono">$ whoami</div>
              <h1 className="mt-1 text-2xl font-semibold tracking-tight sm:text-3xl">
                Hi, I'm <span className="text-primary">{PERSONAL_INFO.name}</span>
              </h1>
              <p className="text-xs text-muted-foreground mt-0.5">{PERSONAL_INFO.role} @ Linooptek Innovations</p>
            </div>
          </div>
          <p className="mt-5 text-base sm:text-lg text-muted-foreground">
            I'm a{" "}
            <span className="font-mono text-syntax-function cursor-blink font-semibold">{typed}</span>
          </p>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            {PERSONAL_INFO.summary}
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            <HeroButton onClick={() => onOpen("projects.ts")} variant="primary">
              View Projects ({PROJECTS.length})
            </HeroButton>
            <HeroButton onClick={() => onOpen("resume.pdf")}>
              <Download size={14} className="inline mr-1.5" /> Download Resume
            </HeroButton>
            <HeroButton onClick={() => onOpen("contact.css")}>
              <Mail size={14} className="inline mr-1.5" /> Contact Me
            </HeroButton>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="hidden lg:block rounded-lg border bg-card p-5 font-mono text-xs shadow-2xl w-72"
        >
          <div className="text-syntax-comment">// Core DevOps Tech</div>
          {[
            "kubectl get pods -A",
            "docker run -d netflix:latest",
            "aws ec2 describe-instances",
            "jenkins build --job=Netflix",
            "ansible-playbook site.yml",
            "systemctl status node_exporter",
          ].map((tool, idx) => (
            <div key={idx} className="mt-1.5 truncate">
              <span className="text-syntax-keyword">$</span> <span className="text-syntax-function">{tool}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

function HeroButton({
  children, onClick, variant = "ghost",
}: { children: React.ReactNode; onClick: () => void; variant?: "primary" | "ghost" }) {
  const base = "rounded-md px-4 py-2 text-sm font-medium transition-all duration-150 border flex items-center";
  const styles =
    variant === "primary"
      ? "bg-primary text-primary-foreground border-primary hover:brightness-110 hover:-translate-y-[1px]"
      : "bg-transparent text-foreground border-border hover:bg-accent hover:-translate-y-[1px]";
  return (
    <button onClick={onClick} className={`${base} ${styles}`}>
      {children}
    </button>
  );
}

/* ---------- about.md ---------- */
export function AboutFile() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-10 font-mono text-[14px] leading-7 fade-up">
      <div className="flex flex-col sm:flex-row sm:items-center gap-6 mb-8">
        <img
          src={avatarUrl}
          alt="Syed Jawad Hussain Mashhadi"
          width={130}
          height={130}
          loading="lazy"
          className="h-[130px] w-[130px] shrink-0 rounded-2xl border-2 border-primary object-cover shadow-2xl shadow-primary/20"
        />
        <div>
          <h1 className="text-3xl font-bold text-foreground"># Syed Jawad Hussain Mashhadi</h1>
          <p className="mt-1.5 text-primary font-medium text-base">
            Cloud, Infrastructure & DevOps Intern / Technical Mentor
          </p>
          <div className="mt-3 flex flex-wrap gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5"><Mail size={13} /> {PERSONAL_INFO.email}</span>
            <span className="flex items-center gap-1.5"><Phone size={13} /> {PERSONAL_INFO.phone}</span>
            <span className="flex items-center gap-1.5"><MapPin size={13} /> {PERSONAL_INFO.location}</span>
          </div>
        </div>
      </div>

      <h2 className="mt-8 text-xl font-semibold text-foreground">## Professional Summary</h2>
      <p className="mt-3 text-muted-foreground leading-relaxed">
        {PERSONAL_INFO.summary}
      </p>

      <h2 className="mt-8 text-xl font-semibold text-foreground">## Education</h2>
      <div className="mt-3 rounded-lg border bg-card/60 p-4">
        <div className="flex items-center gap-2 text-primary font-semibold">
          <GraduationCap size={18} /> {EDUCATION.degree}
        </div>
        <div className="text-sm text-foreground mt-1">{EDUCATION.institution}</div>
        <div className="mt-2 flex flex-wrap items-center gap-x-6 gap-y-1 text-xs text-muted-foreground">
          <span>{EDUCATION.period}</span>
          <span className="font-semibold text-syntax-type">{EDUCATION.details}</span>
        </div>
      </div>

      <h2 className="mt-8 text-xl font-semibold text-foreground">## Core Competencies</h2>
      <ul className="mt-3 space-y-2 text-muted-foreground">
        <li>- Container Orchestration & Lifecycle Management with <span className="text-syntax-type">Kubernetes</span> & <span className="text-syntax-type">Docker</span></li>
        <li>- Continuous Integration & Continuous Delivery with <span className="text-syntax-type">Jenkins</span> CI/CD pipelines</li>
        <li>- Cloud Infrastructure on <span className="text-syntax-type">AWS</span> (EC2 instances, networking, security)</li>
        <li>- Real-Time Infrastructure Monitoring with <span className="text-syntax-type">Prometheus</span> & <span className="text-syntax-type">Grafana</span></li>
        <li>- Linux & System Administration (RHEL, Oracle Linux, LVM, RAID, NFS, SELinux)</li>
        <li>- Bare-metal server management via <span className="text-syntax-type">iDRAC</span> & virtualization with <span className="text-syntax-type">VMware ESXi/vCenter</span></li>
        <li>- Infrastructure Automation with <span className="text-syntax-type">Ansible</span></li>
      </ul>
    </div>
  );
}

/* ---------- skills.json ---------- */
export function SkillsFile() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-8 fade-up">
      <CodeBlock>
        {[
          <>{"{"}</>,
          ...Object.entries(SKILLS).flatMap(([cat, list], ci, arr) => [
            <>  <S>"{cat}"</S>: [</>,
            ...list.map((s, i) => (
              <>    <S>"{s}"</S>{i < list.length - 1 ? "," : ""}</>
            )),
            <>  ]{ci < arr.length - 1 ? "," : ""}</>,
          ]),
          <>{"}"}</>,
        ]}
      </CodeBlock>

      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        {Object.entries(SKILLS).map(([cat, list]) => (
          <motion.div
            key={cat}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-lg border bg-card p-4 hover:border-primary/50 transition-colors"
          >
            <div className="text-sm font-semibold text-primary">{cat}</div>
            <div className="mt-3 flex flex-wrap gap-2">
              {list.map((s) => (
                <span
                  key={s}
                  className="rounded border border-border bg-background/40 px-2.5 py-1 font-mono text-xs text-syntax-variable hover:border-primary transition-colors"
                >
                  {s}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ---------- projects.ts ---------- */
export function ProjectsFile() {
  const [activeProject, setActiveProject] = useState<ProjectItem | null>(null);
  const [selectedImageIdx, setSelectedImageIdx] = useState<number>(0);

  function openGallery(project: ProjectItem, index = 0) {
    setActiveProject(project);
    setSelectedImageIdx(index);
  }

  return (
    <div className="mx-auto max-w-5xl px-6 py-8 fade-up">
      <CodeBlock>
        {[
          <><K>const</K> <V>projects</V> <O>=</O> [</>,
          ...PROJECTS.flatMap((p, i) => [
            <>  {"{"}</>,
            <>    <P>title</P>: <S>"{p.title}"</S>,</>,
            <>    <P>category</P>: <S>"{p.category}"</S>,</>,
            <>    <P>stack</P>: [{p.stack.map((s, j) => (<><S key={j}>"{s}"</S>{j < p.stack.length - 1 ? ", " : ""}</>))}],</>,
            <>    <P>screenshotsCount</P>: <N>{p.screenshots.length}</N></>,
            <>  {"}"}{i < PROJECTS.length - 1 ? "," : ""}</>,
          ]),
          <>]</>,
        ]}
      </CodeBlock>

      <div className="mt-10 grid gap-8 md:grid-cols-2">
        {PROJECTS.map((p, i) => (
          <motion.article
            key={p.id}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="group flex flex-col overflow-hidden rounded-xl border bg-card transition-all duration-200 hover:border-primary hover:shadow-2xl hover:shadow-primary/10"
          >
            {/* Screenshot Header / Preview */}
            {p.featuredImage ? (
              <div
                className="relative h-48 sm:h-56 overflow-hidden bg-black/40 cursor-pointer group/img"
                onClick={() => openGallery(p, 0)}
              >
                <img
                  src={p.featuredImage}
                  alt={p.title}
                  className="h-full w-full object-cover object-top transition-transform duration-300 group-hover/img:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-black/20 to-transparent" />
                <div className="absolute bottom-3 right-3 rounded-md bg-black/80 px-2.5 py-1 font-mono text-xs text-white backdrop-blur flex items-center gap-1.5 shadow-md">
                  <Maximize2 size={12} /> {p.screenshots.length} Screenshots
                </div>
                <div className="absolute top-3 left-3 rounded-full bg-primary/90 px-3 py-0.5 text-[11px] font-medium text-primary-foreground shadow">
                  {p.category}
                </div>
              </div>
            ) : (
              <div className="relative h-32 overflow-hidden border-b bg-gradient-to-br from-card via-accent/30 to-card p-4 flex flex-col justify-between">
                <div className="flex gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-destructive" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[oklch(0.78_0.16_85)]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[oklch(0.7_0.16_145)]" />
                </div>
                <div className="font-mono text-xs text-syntax-function font-medium">
                  $ python attendance_yolov8.py --detect
                </div>
                <div className="text-[11px] font-mono text-muted-foreground">{p.category}</div>
              </div>
            )}

            <div className="flex flex-1 flex-col p-5">
              <h3 className="text-lg font-bold text-foreground">{p.title}</h3>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{p.description}</p>

              {/* Bullet points from resume */}
              <ul className="mt-4 space-y-1.5 text-xs text-muted-foreground/90">
                {p.bullets.map((b, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-primary font-bold">›</span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>

              {/* Tech Stack Pills */}
              <div className="mt-5 flex flex-wrap gap-1.5">
                {p.stack.map((s) => (
                  <span key={s} className="rounded border border-border bg-accent/30 px-2 py-0.5 font-mono text-[11px] text-syntax-type">
                    {s}
                  </span>
                ))}
              </div>

              {/* Action Buttons */}
              {p.screenshots.length > 0 && (
                <div className="mt-5 pt-3 border-t flex items-center justify-between">
                  <button
                    onClick={() => openGallery(p, 0)}
                    className="w-full rounded-md bg-primary/10 border border-primary/30 px-3 py-2 text-center font-mono text-xs font-semibold text-primary hover:bg-primary hover:text-primary-foreground transition-all flex items-center justify-center gap-2"
                  >
                    <Maximize2 size={14} /> View Interactive Screenshots Gallery ({p.screenshots.length})
                  </button>
                </div>
              )}
            </div>
          </motion.article>
        ))}
      </div>

      {/* Screenshot Lightbox Modal */}
      <AnimatePresence>
        {activeProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-5xl rounded-xl border border-border bg-card shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between border-b px-5 py-3 bg-muted/30">
                <div>
                  <h3 className="font-semibold text-sm sm:text-base text-foreground">{activeProject.title}</h3>
                  <p className="text-xs text-muted-foreground">
                    Screenshot {selectedImageIdx + 1} of {activeProject.screenshots.length}:{" "}
                    <span className="text-primary">{activeProject.screenshots[selectedImageIdx]?.caption}</span>
                  </p>
                </div>
                <button
                  onClick={() => setActiveProject(null)}
                  className="rounded-lg p-1.5 text-muted-foreground hover:bg-accent hover:text-foreground transition-colors"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Main Image Display */}
              <div className="relative flex-1 bg-black/90 flex items-center justify-center p-4 min-h-[350px] overflow-hidden">
                <img
                  src={activeProject.screenshots[selectedImageIdx]?.url}
                  alt={activeProject.screenshots[selectedImageIdx]?.caption}
                  className="max-h-[60vh] max-w-full object-contain rounded shadow-lg"
                />

                {/* Nav Arrows */}
                {activeProject.screenshots.length > 1 && (
                  <>
                    <button
                      onClick={() =>
                        setSelectedImageIdx((prev) =>
                          prev === 0 ? activeProject.screenshots.length - 1 : prev - 1
                        )
                      }
                      className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-black/60 p-2.5 text-white hover:bg-primary transition-colors shadow-lg"
                    >
                      <ChevronLeft size={20} />
                    </button>
                    <button
                      onClick={() =>
                        setSelectedImageIdx((prev) =>
                          prev === activeProject.screenshots.length - 1 ? 0 : prev + 1
                        )
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-black/60 p-2.5 text-white hover:bg-primary transition-colors shadow-lg"
                    >
                      <ChevronRight size={20} />
                    </button>
                  </>
                )}
              </div>

              {/* Thumbnails Bar */}
              <div className="border-t bg-muted/20 p-3 overflow-x-auto scrollbar-vscode flex gap-2">
                {activeProject.screenshots.map((s, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImageIdx(idx)}
                    className={`relative h-16 w-28 shrink-0 overflow-hidden rounded border transition-all ${
                      selectedImageIdx === idx
                        ? "border-primary ring-2 ring-primary/40 scale-105"
                        : "border-border opacity-60 hover:opacity-100"
                    }`}
                  >
                    <img src={s.url} alt={s.caption} className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ---------- experience.js ---------- */
export function ExperienceFile() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-8 fade-up">
      <CodeBlock>
        {[
          <C>// Professional Career & Internship Experience</C>,
          <><K>const</K> <V>experience</V> <O>=</O> [</>,
          ...EXPERIENCE.flatMap((e, i) => [
            <>  {"{"} <P>role</P>: <S>"{e.role}"</S>, <P>company</P>: <S>"{e.company}"</S>, <P>period</P>: <S>"{e.period}"</S> {"}"}{i < EXPERIENCE.length - 1 ? "," : ""}</>,
          ]),
          <>]</>,
        ]}
      </CodeBlock>

      <div className="mt-10 space-y-8">
        {EXPERIENCE.map((e, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rounded-xl border bg-card p-6 shadow-md hover:border-primary/50 transition-colors"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h3 className="text-xl font-bold text-foreground">{e.role}</h3>
                <div className="text-base font-medium text-primary flex items-center gap-2 mt-0.5">
                  <Briefcase size={16} /> {e.company}
                </div>
              </div>
              <div className="font-mono text-xs rounded bg-accent px-3 py-1 text-muted-foreground w-fit">
                {e.period}
              </div>
            </div>

            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              {e.bullets.map((b, j) => (
                <li key={j} className="flex items-start gap-2.5">
                  <span className="text-primary font-bold text-base leading-none">›</span>
                  <span className="leading-relaxed">{b}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ---------- education.json ---------- */
export function EducationFile() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-8 fade-up">
      <CodeBlock>
        {[
          <>{"{"}</>,
          <>  <S>"degree"</S>: <S>"{EDUCATION.degree}"</S>,</>,
          <>  <S>"institution"</S>: <S>"{EDUCATION.institution}"</S>,</>,
          <>  <S>"status"</S>: <S>"{EDUCATION.status}"</S>,</>,
          <>  <S>"period"</S>: <S>"{EDUCATION.period}"</S>,</>,
          <>  <S>"completedSemesters"</S>: <N>{EDUCATION.semestersCompleted}</N>,</>,
          <>  <S>"cgpa"</S>: <S>"{EDUCATION.cgpa}"</S></>,
          <>{"}"}</>,
        ]}
      </CodeBlock>

      <div className="mt-10 rounded-xl border bg-card p-6 shadow-md max-w-2xl">
        <div className="flex items-center gap-3 text-primary">
          <GraduationCap size={28} />
          <div>
            <h3 className="text-lg font-bold text-foreground">{EDUCATION.degree}</h3>
            <p className="text-sm text-muted-foreground">{EDUCATION.institution}</p>
          </div>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div className="rounded-lg border bg-background/50 p-4 font-mono text-xs">
            <div className="text-muted-foreground">Status</div>
            <div className="mt-1 text-sm font-semibold text-foreground">{EDUCATION.status}</div>
            <div className="mt-0.5 text-syntax-comment">{EDUCATION.period}</div>
          </div>
          <div className="rounded-lg border bg-background/50 p-4 font-mono text-xs">
            <div className="text-muted-foreground">Academic Standing</div>
            <div className="mt-1 text-base font-bold text-syntax-type">CGPA: {EDUCATION.cgpa}</div>
            <div className="mt-0.5 text-syntax-comment">Completed 4 Semesters</div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- contact.css ---------- */
export function ContactFile() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-8 fade-up">
      <CodeBlock>
        {[
          <C>/* Contact & Professional Connections */</C>,
          <><F>.contact-card</F> {"{"}</>,
          <>  <P>name</P>: <S>"{PERSONAL_INFO.name}"</S>;</>,
          <>  <P>email</P>: <S>"{PERSONAL_INFO.email}"</S>;</>,
          <>  <P>phone</P>: <S>"{PERSONAL_INFO.phone}"</S>;</>,
          <>  <P>location</P>: <S>"{PERSONAL_INFO.location}"</S>;</>,
          <>  <P>status</P>: <S>"Open to DevOps & Infrastructure Roles"</S>;</>,
          <>{"}"}</>,
        ]}
      </CodeBlock>

      <div className="mt-10 grid gap-6 md:grid-cols-3">
        <a
          href={`mailto:${PERSONAL_INFO.email}`}
          className="flex flex-col items-center rounded-xl border bg-card p-6 text-center hover:border-primary transition-all group"
        >
          <div className="grid h-12 w-12 place-items-center rounded-full bg-primary/10 text-primary group-hover:scale-110 transition-transform">
            <Mail size={22} />
          </div>
          <div className="mt-3 font-semibold text-sm text-foreground">Email</div>
          <div className="mt-1 font-mono text-xs text-muted-foreground">{PERSONAL_INFO.email}</div>
        </a>

        <a
          href={`tel:${PERSONAL_INFO.phone.replace(/\s+/g, "")}`}
          className="flex flex-col items-center rounded-xl border bg-card p-6 text-center hover:border-primary transition-all group"
        >
          <div className="grid h-12 w-12 place-items-center rounded-full bg-primary/10 text-primary group-hover:scale-110 transition-transform">
            <Phone size={22} />
          </div>
          <div className="mt-3 font-semibold text-sm text-foreground">Phone</div>
          <div className="mt-1 font-mono text-xs text-muted-foreground">{PERSONAL_INFO.phone}</div>
        </a>

        <div className="flex flex-col items-center rounded-xl border bg-card p-6 text-center">
          <div className="grid h-12 w-12 place-items-center rounded-full bg-primary/10 text-primary">
            <MapPin size={22} />
          </div>
          <div className="mt-3 font-semibold text-sm text-foreground">Location</div>
          <div className="mt-1 font-mono text-xs text-muted-foreground">{PERSONAL_INFO.location}</div>
        </div>
      </div>

      <form
        onSubmit={(e) => { e.preventDefault(); alert("Thank you! Your message has been sent to Syed Jawad Hussain Mashhadi."); }}
        className="mt-8 grid gap-4 rounded-xl border bg-card p-6"
      >
        <h3 className="font-mono text-sm font-semibold text-foreground">// Send a message</h3>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="name" type="text" placeholder="Your Name" />
          <Field label="email" type="email" placeholder="your.email@example.com" />
        </div>
        <Field label="subject" type="text" placeholder="DevOps Opportunity / Collaboration" />
        <label className="block">
          <span className="font-mono text-xs text-syntax-property">message:</span>
          <textarea
            required
            rows={4}
            placeholder="Hi Jawad, I'd like to talk about..."
            className="mt-1.5 w-full resize-none rounded-md border border-border bg-background px-3 py-2 font-mono text-sm focus:border-primary focus:outline-none"
          />
        </label>
        <button
          type="submit"
          className="justify-self-start rounded-md bg-primary px-5 py-2 text-sm font-medium text-primary-foreground hover:brightness-110 transition-all flex items-center gap-2"
        >
          <Mail size={14} /> Send Message
        </button>
      </form>
    </div>
  );
}

function Field({ label, type, placeholder }: { label: string; type: string; placeholder?: string }) {
  return (
    <label className="block">
      <span className="font-mono text-xs text-syntax-property">{label}:</span>
      <input
        required
        type={type}
        placeholder={placeholder}
        className="mt-1.5 w-full rounded-md border border-border bg-background px-3 py-2 font-mono text-sm focus:border-primary focus:outline-none"
      />
    </label>
  );
}

/* ---------- README.md ---------- */
export function ReadmeFile() {
  return (
    <div className="mx-auto max-w-3xl px-8 py-10 font-mono text-[14px] leading-7 fade-up">
      <h1 className="text-3xl font-bold"># Syed Jawad Hussain Mashhadi — Portfolio</h1>
      <p className="mt-4 text-muted-foreground">
        Interactive VS Code-style portfolio showcasing Cloud & DevOps engineering projects, Kubernetes orchestrations, AWS deployments, Jenkins CI/CD pipelines, and Linux system administration.
      </p>

      <h2 className="mt-8 text-xl font-semibold">## Featured Projects</h2>
      <ul className="mt-3 space-y-2 text-muted-foreground">
        <li>- <span className="text-primary font-semibold">Cloud-Native Streaming Platform Deployment</span> (AWS, K8s, Jenkins, Prometheus, Grafana, Docker)</li>
        <li>- <span className="text-primary font-semibold">Kubernetes-Based Chat Application Deployment</span> (Docker, K8s, Redis, Node.js)</li>
        <li>- <span className="text-primary font-semibold">AI Attendance System</span> (YOLOv8, Computer Vision)</li>
      </ul>

      <h2 className="mt-8 text-xl font-semibold">## Interactive Terminal</h2>
      <p className="mt-2 text-muted-foreground">
        Open the bottom terminal bar and run commands like <span className="text-syntax-function">whoami</span>, <span className="text-syntax-function">skills</span>, <span className="text-syntax-function">projects</span>, or <span className="text-syntax-function">resume</span>.
      </p>
    </div>
  );
}

/* ---------- resume.pdf ---------- */
export function ResumeFile() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-8 fade-up">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 rounded-xl border bg-card p-6 shadow-md mb-6">
        <div className="flex items-center gap-4">
          <div className="grid h-12 w-12 place-items-center rounded-lg bg-destructive/15 text-destructive font-mono font-bold text-lg">
            PDF
          </div>
          <div>
            <h2 className="text-lg font-bold text-foreground">resume.pdf</h2>
            <p className="text-xs text-muted-foreground">
              Syed Jawad Hussain Mashhadi — Resume / CV (DevOps, Cloud & System Administration)
            </p>
          </div>
        </div>
        <a
          href="/resume.pdf"
          download="Syed_Jawad_Hussain_Mashhadi_Resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:brightness-110 transition-all flex items-center gap-2 shrink-0"
        >
          <Download size={16} /> Download PDF Resume
        </a>
      </div>

      <div className="w-full h-[650px] rounded-xl border bg-card overflow-hidden shadow-xl">
        <iframe
          src="/resume.pdf"
          title="Syed Jawad Hussain Mashhadi Resume"
          className="w-full h-full border-0"
        />
      </div>
    </div>
  );
}
