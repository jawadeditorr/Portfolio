import { motion } from "framer-motion";
import { useTyping } from "./useTyping";
import { ACHIEVEMENTS, CERTIFICATIONS, EXPERIENCE, PROJECTS, SKILLS, TYPING_ROLES } from "./data";
import type { FileName } from "./data";
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
    <C key="c">// Hello World! Welcome to my portfolio</C>,
    <></>,
    <><K>const</K> <V>developer</V> <O>=</O> {"{"}</>,
    <>  <P>name</P>: <S>"Jawad"</S>,</>,
    <>  <P>role</P>: <S>"DevOps Engineer"</S>,</>,
    <>  <P>education</P>: <S>"Computer Science Student"</S>,</>,
    <>  <P>passions</P>: [</>,
    <>    <S>"Cloud Computing"</S>, <S>"Kubernetes"</S>, <S>"Docker"</S>,</>,
    <>    <S>"Linux"</S>, <S>"CI/CD"</S>, <S>"Infrastructure as Code"</S></>,
    <>  ]</>,
    <>{"}"}</>,
    <></>,
    <C key="c2">// export default developer;</C>,
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
                alt="Jawad — portrait"
                width={88}
                height={88}
                className="relative h-[88px] w-[88px] rounded-full border-2 border-primary object-cover shadow-xl"
              />
              <span className="absolute bottom-1 right-1 h-3 w-3 rounded-full bg-[oklch(0.7_0.18_145)] ring-2 ring-background" />
            </motion.div>
            <div>
              <div className="text-sm text-muted-foreground font-mono">$ whoami</div>
              <h1 className="mt-1 text-3xl font-semibold tracking-tight sm:text-4xl">
                Hi, I'm <span className="text-primary">Jawad</span>.
              </h1>
            </div>
          </div>
          <p className="mt-5 text-lg text-muted-foreground">
            I'm a{" "}
            <span className="font-mono text-syntax-function cursor-blink">{typed}</span>
          </p>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">
            Computer Science student building reliable, scalable systems with Kubernetes,
            Docker, Linux, and modern CI/CD. This portfolio is a VS Code clone — explore
            files in the sidebar or use the integrated terminal below.
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            <HeroButton onClick={() => onOpen("projects.ts")} variant="primary">View Projects</HeroButton>
            <HeroButton onClick={() => onOpen("resume.pdf")}>Download Resume</HeroButton>
            <HeroButton onClick={() => onOpen("contact.css")}>Contact Me</HeroButton>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="hidden lg:block rounded-lg border bg-card p-5 font-mono text-xs shadow-2xl"
        >
          <div className="text-syntax-comment">// stack at a glance</div>
          {["kubectl", "docker", "terraform", "ansible", "gh", "vim"].map((tool) => (
            <div key={tool} className="mt-1">
              <span className="text-syntax-keyword">$</span> <span className="text-syntax-function">{tool}</span>{" "}
              <span className="text-muted-foreground">--version</span>
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
  const base = "rounded-md px-4 py-2 text-sm font-medium transition-all duration-150 border";
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
    <div className="mx-auto max-w-3xl px-8 py-10 font-mono text-[14px] leading-7 fade-up">
      <div className="flex flex-col sm:flex-row sm:items-center gap-6 mb-8">
        <img
          src={avatarUrl}
          alt="Jawad — portrait"
          width={140}
          height={140}
          loading="lazy"
          className="h-[140px] w-[140px] shrink-0 rounded-2xl border-2 border-primary object-cover shadow-2xl shadow-primary/20"
        />
        <div>
          <h1 className="text-3xl font-bold text-foreground"># About Me</h1>
          <p className="mt-3 text-muted-foreground">
            Hi, I'm <span className="text-primary font-semibold">Jawad</span> — a Computer Science
            student fascinated by what makes software run reliably at scale.
          </p>
        </div>
      </div>
      <h2 className="mt-8 text-xl font-semibold text-foreground">## What I do</h2>
      <ul className="mt-3 space-y-2 text-muted-foreground">
        <li>- Design and operate <span className="text-syntax-type">Kubernetes</span> workloads.</li>
        <li>- Automate everything with <span className="text-syntax-type">Terraform</span>, <span className="text-syntax-type">Ansible</span>, and CI/CD.</li>
        <li>- Live in the <span className="text-syntax-type">Linux</span> terminal.</li>
        <li>- Study distributed systems and cloud architecture.</li>
      </ul>
      <h2 className="mt-8 text-xl font-semibold text-foreground">## Currently learning</h2>
      <p className="mt-2 text-muted-foreground">
        Service meshes, eBPF observability, and platform engineering.
      </p>
      <blockquote className="mt-8 border-l-4 border-primary pl-4 text-muted-foreground italic">
        "Automate the boring parts, then automate the rest."
      </blockquote>
      <p className="mt-6 text-xs text-syntax-comment">
        // Replace src/assets/avatar.jpg with your own photo to personalize this page.
      </p>
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
            className="rounded-lg border bg-card p-4"
          >
            <div className="text-sm font-semibold text-primary">{cat}</div>
            <div className="mt-3 flex flex-wrap gap-2">
              {list.map((s) => (
                <span
                  key={s}
                  className="rounded border border-border bg-background/40 px-2 py-1 font-mono text-xs text-syntax-variable hover:border-primary transition-colors"
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
  return (
    <div className="mx-auto max-w-5xl px-6 py-8 fade-up">
      <CodeBlock>
        {[
          <><K>const</K> <V>projects</V> <O>=</O> [</>,
          ...PROJECTS.flatMap((p, i) => [
            <>  {"{"}</>,
            <>    <P>title</P>: <S>"{p.title}"</S>,</>,
            <>    <P>stack</P>: [{p.stack.map((s, j) => (<><S key={j}>"{s}"</S>{j < p.stack.length - 1 ? ", " : ""}</>))}],</>,
            <>    <P>github</P>: <S>"{p.github}"</S>,</>,
            <>    <P>live</P>: <S>"{p.live}"</S></>,
            <>  {"}"}{i < PROJECTS.length - 1 ? "," : ""}</>,
          ]),
          <>]</>,
        ]}
      </CodeBlock>

      <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {PROJECTS.map((p, i) => (
          <motion.article
            key={p.title}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="group flex flex-col overflow-hidden rounded-lg border bg-card transition-all duration-200 hover:-translate-y-1 hover:border-primary hover:shadow-2xl hover:shadow-primary/10"
          >
            <div className="relative h-36 overflow-hidden border-b bg-gradient-to-br from-[oklch(0.3_0.05_250)] to-[oklch(0.25_0.08_280)]">
              <div className="absolute inset-0 flex items-center justify-center font-mono text-xs text-muted-foreground/60">
                <pre className="text-syntax-comment">{`// ${p.title.split(" ").slice(0, 2).join(" ")}\n$ kubectl apply -f .`}</pre>
              </div>
              <div className="absolute top-2 left-3 flex gap-1.5">
                <span className="h-2 w-2 rounded-full bg-destructive" />
                <span className="h-2 w-2 rounded-full bg-[oklch(0.78_0.16_85)]" />
                <span className="h-2 w-2 rounded-full bg-[oklch(0.7_0.16_145)]" />
              </div>
            </div>
            <div className="flex flex-1 flex-col p-4">
              <h3 className="font-semibold text-foreground">{p.title}</h3>
              <p className="mt-1.5 text-xs text-muted-foreground leading-relaxed">{p.description}</p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {p.stack.map((s) => (
                  <span key={s} className="rounded bg-accent/40 px-1.5 py-0.5 font-mono text-[10px] text-syntax-type">
                    {s}
                  </span>
                ))}
              </div>
              <div className="mt-4 flex gap-2">
                <a href={p.github} className="flex-1 rounded border border-border bg-background/40 px-3 py-1.5 text-center text-xs hover:border-primary transition-colors">GitHub</a>
                <a href={p.live} className="flex-1 rounded bg-primary px-3 py-1.5 text-center text-xs text-primary-foreground hover:brightness-110 transition-all">Live Demo</a>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </div>
  );
}

/* ---------- experience.js ---------- */
export function ExperienceFile() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-8 fade-up">
      <CodeBlock>
        {[
          <C>// career.timeline()</C>,
          <><K>const</K> <V>experience</V> <O>=</O> [</>,
          ...EXPERIENCE.flatMap((e, i) => [
            <>  {"{"} <P>role</P>: <S>"{e.role}"</S>, <P>company</P>: <S>"{e.company}"</S>, <P>period</P>: <S>"{e.period}"</S> {"}"}{i < EXPERIENCE.length - 1 ? "," : ""}</>,
          ]),
          <>]</>,
        ]}
      </CodeBlock>

      <ol className="mt-10 relative border-l-2 border-border ml-3">
        {EXPERIENCE.map((e, i) => (
          <motion.li
            key={i}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="mb-8 ml-6"
          >
            <span className="absolute -left-[9px] mt-1.5 h-4 w-4 rounded-full bg-primary ring-4 ring-background" />
            <div className="font-mono text-xs text-syntax-comment">{e.period}</div>
            <h3 className="mt-1 text-lg font-semibold text-foreground">{e.role}</h3>
            <div className="text-sm text-primary">{e.company}</div>
            <ul className="mt-3 space-y-1 text-sm text-muted-foreground">
              {e.points.map((p, j) => (
                <li key={j}>
                  <span className="text-syntax-keyword">›</span> {p}
                </li>
              ))}
            </ul>
          </motion.li>
        ))}
      </ol>
    </div>
  );
}

/* ---------- certifications.yaml ---------- */
export function CertificationsFile() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-8 fade-up">
      <CodeBlock>
        {[
          <C># Verified Certifications</C>,
          <><T>certifications</T>:</>,
          ...CERTIFICATIONS.flatMap((c) => [
            <>  - <P>name</P>: <S>"{c.name}"</S></>,
            <>    <P>issuer</P>: <S>"{c.issuer}"</S></>,
            <>    <P>year</P>: <N>{c.year}</N></>,
          ]),
        ]}
      </CodeBlock>

      <div className="mt-10 grid gap-3">
        {CERTIFICATIONS.map((c, i) => (
          <motion.div
            key={c.name}
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.06 }}
            className="flex items-center justify-between rounded-lg border bg-card p-4 hover:border-primary transition-colors"
          >
            <div>
              <div className="font-semibold text-foreground">{c.name}</div>
              <div className="text-xs text-muted-foreground">{c.issuer}</div>
            </div>
            <div className="font-mono text-sm text-syntax-number">{c.year}</div>
          </motion.div>
        ))}
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
          <C>/* Get in touch — pull requests welcome */</C>,
          <><F>.contact</F> {"{"}</>,
          <>  <P>email</P>: <S>"jawad@example.com"</S>;</>,
          <>  <P>github</P>: <S>"github.com/jawad"</S>;</>,
          <>  <P>linkedin</P>: <S>"linkedin.com/in/jawad"</S>;</>,
          <>  <P>location</P>: <S>"Remote / Earth"</S>;</>,
          <>  <P>status</P>: <S>"open-to-opportunities"</S>;</>,
          <>{"}"}</>,
        ]}
      </CodeBlock>

      <form
        onSubmit={(e) => { e.preventDefault(); alert("Thanks! I'll be in touch."); }}
        className="mt-10 grid gap-4 rounded-lg border bg-card p-6"
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="name" type="text" />
          <Field label="email" type="email" />
        </div>
        <Field label="subject" type="text" />
        <label className="block">
          <span className="font-mono text-xs text-syntax-property">message:</span>
          <textarea
            required
            rows={5}
            className="mt-1.5 w-full resize-none rounded-md border border-border bg-background px-3 py-2 font-mono text-sm focus:border-primary focus:outline-none"
          />
        </label>
        <button
          type="submit"
          className="justify-self-start rounded-md bg-primary px-5 py-2 text-sm font-medium text-primary-foreground hover:brightness-110 transition-all"
        >
          send --message
        </button>
      </form>
    </div>
  );
}
function Field({ label, type }: { label: string; type: string }) {
  return (
    <label className="block">
      <span className="font-mono text-xs text-syntax-property">{label}:</span>
      <input
        required
        type={type}
        className="mt-1.5 w-full rounded-md border border-border bg-background px-3 py-2 font-mono text-sm focus:border-primary focus:outline-none"
      />
    </label>
  );
}

/* ---------- achievements.md ---------- */
export function AchievementsFile() {
  return (
    <div className="mx-auto max-w-3xl px-8 py-10 font-mono text-[14px] leading-7 fade-up">
      <h1 className="text-3xl font-bold"># Achievements</h1>
      <ul className="mt-6 space-y-3 text-muted-foreground">
        {ACHIEVEMENTS.map((a, i) => (
          <li key={i}>
            <span className="text-syntax-function">★</span> {a}
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ---------- README.md ---------- */
export function ReadmeFile() {
  return (
    <div className="mx-auto max-w-3xl px-8 py-10 font-mono text-[14px] leading-7 fade-up">
      <h1 className="text-3xl font-bold"># jawad-portfolio</h1>
      <p className="mt-4 text-muted-foreground">
        A VS Code-inspired personal portfolio. Built with React, TypeScript, Tailwind CSS,
        Framer Motion, and a fully interactive integrated terminal.
      </p>

      <h2 className="mt-8 text-xl font-semibold">## Getting started</h2>
      <pre className="mt-3 rounded-md border bg-terminal p-4 text-syntax-function text-xs">
{`$ git clone https://github.com/jawad/portfolio
$ cd portfolio && bun install
$ bun dev`}
      </pre>

      <h2 className="mt-8 text-xl font-semibold">## Try the terminal</h2>
      <p className="mt-2 text-muted-foreground">
        Open the terminal below and type <span className="text-syntax-function">help</span>{" "}
        to see all available commands.
      </p>
    </div>
  );
}

/* ---------- resume.pdf ---------- */
export function ResumeFile() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-10 fade-up">
      <div className="rounded-lg border bg-card p-8 text-center">
        <div className="mx-auto mb-4 grid h-16 w-16 place-items-center rounded-lg bg-destructive/15 text-destructive font-mono font-bold">
          PDF
        </div>
        <h2 className="text-xl font-semibold">resume.pdf</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          A condensed one-page snapshot of my experience, skills, and certifications.
        </p>
        <a
          href="#"
          className="mt-6 inline-block rounded-md bg-primary px-5 py-2 text-sm font-medium text-primary-foreground hover:brightness-110 transition-all"
        >
          ↓ Download Resume
        </a>
      </div>
    </div>
  );
}
