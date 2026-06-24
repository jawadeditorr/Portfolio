import { useEffect, useRef, useState } from "react";
import { CERTIFICATIONS, EXPERIENCE, PROJECTS, SKILLS } from "./data";
import type { FileName } from "./data";

type Line = { kind: "in" | "out" | "err" | "ascii"; text: string };

const HELP = [
  "Available commands:",
  "  help        Show this help message",
  "  whoami      About Jawad",
  "  skills      List technical skills",
  "  projects    Show featured projects",
  "  experience  Career timeline",
  "  resume      Open resume.pdf",
  "  certs       List certifications",
  "  contact     How to reach me",
  "  neofetch    System info",
  "  clear       Clear the terminal",
];

const NEOFETCH = String.raw`
       .---.        jawad@portfolio
      /     \       --------------
      \.@-@./       OS: Lovable Linux x86_64
      /\`\\_/\`\\     Host: VS Code Clone v1.0
     //_^_^_\\\\    Shell: zsh 5.9
    ( \\_   _/ )    Editor: VS Code
                    Stack: Docker · K8s · Terraform
`;

export function Terminal({ onOpen }: { onOpen: (f: FileName) => void }) {
  const [history, setHistory] = useState<Line[]>([
    { kind: "out", text: "Welcome to jawad@portfolio — type `help` to get started." },
  ]);
  const [input, setInput] = useState("");
  const [past, setPast] = useState<string[]>([]);
  const [cursor, setCursor] = useState(-1);
  const endRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [history]);

  function run(cmd: string) {
    const c = cmd.trim().toLowerCase();
    const out: Line[] = [{ kind: "in", text: cmd }];
    switch (c) {
      case "":
        break;
      case "help":
        HELP.forEach((t) => out.push({ kind: "out", text: t }));
        break;
      case "whoami":
        out.push({ kind: "out", text: "jawad — Computer Science student & DevOps engineer." });
        out.push({ kind: "out", text: "Passions: Kubernetes, Docker, Linux, Cloud, CI/CD, IaC." });
        break;
      case "skills":
        Object.entries(SKILLS).forEach(([k, v]) => out.push({ kind: "out", text: `  ${k.padEnd(18)} ${v.join(", ")}` }));
        break;
      case "projects":
        PROJECTS.forEach((p, i) => out.push({ kind: "out", text: `  [${i + 1}] ${p.title}  —  ${p.stack.join(", ")}` }));
        out.push({ kind: "out", text: "→ Opening projects.ts ..." });
        onOpen("projects.ts");
        break;
      case "experience":
        EXPERIENCE.forEach((e) => out.push({ kind: "out", text: `  ${e.period.padEnd(18)} ${e.role} @ ${e.company}` }));
        onOpen("experience.js");
        break;
      case "resume":
        out.push({ kind: "out", text: "→ Opening resume.pdf ..." });
        onOpen("resume.pdf");
        break;
      case "certs":
      case "certifications":
        CERTIFICATIONS.forEach((c2) => out.push({ kind: "out", text: `  ${String(c2.year)}  ${c2.name} — ${c2.issuer}` }));
        break;
      case "contact":
        out.push({ kind: "out", text: "  email    jawad@example.com" });
        out.push({ kind: "out", text: "  github   github.com/jawad" });
        out.push({ kind: "out", text: "  linkedin linkedin.com/in/jawad" });
        onOpen("contact.css");
        break;
      case "neofetch":
        out.push({ kind: "ascii", text: NEOFETCH });
        break;
      case "clear":
        setHistory([]);
        setInput("");
        return;
      default:
        out.push({ kind: "err", text: `command not found: ${cmd}. Try \`help\`.` });
    }
    setHistory((h) => [...h, ...out]);
    setPast((p) => [...p, cmd]);
    setCursor(-1);
    setInput("");
  }

  function onKey(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") { run(input); }
    else if (e.key === "ArrowUp") {
      e.preventDefault();
      const next = Math.min(past.length - 1, cursor + 1);
      if (next >= 0 && past.length) { setCursor(next); setInput(past[past.length - 1 - next]); }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const next = cursor - 1;
      if (next < 0) { setCursor(-1); setInput(""); }
      else { setCursor(next); setInput(past[past.length - 1 - next]); }
    } else if (e.key === "l" && e.ctrlKey) { e.preventDefault(); setHistory([]); }
  }

  return (
    <div
      className="flex h-full flex-col bg-terminal font-mono text-[12.5px]"
      onClick={() => inputRef.current?.focus()}
    >
      <div className="flex-1 overflow-auto scrollbar-vscode px-3 py-2">
        {history.map((l, i) => (
          <div key={i} className="whitespace-pre-wrap leading-[1.55]">
            {l.kind === "in" && (
              <span><Prompt /> <span className="text-foreground">{l.text}</span></span>
            )}
            {l.kind === "out" && <span className="text-muted-foreground">{l.text}</span>}
            {l.kind === "err" && <span className="text-destructive">{l.text}</span>}
            {l.kind === "ascii" && <pre className="text-syntax-function">{l.text}</pre>}
          </div>
        ))}
        <div className="flex items-center gap-2">
          <Prompt />
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={onKey}
            spellCheck={false}
            autoComplete="off"
            aria-label="Terminal input"
            className="flex-1 bg-transparent text-foreground outline-none caret-primary"
          />
        </div>
        <div ref={endRef} />
      </div>
    </div>
  );
}

function Prompt() {
  return (
    <span className="select-none">
      <span className="text-syntax-function">jawad@portfolio</span>
      <span className="text-muted-foreground">:</span>
      <span className="text-syntax-variable">~</span>
      <span className="text-muted-foreground">$</span>
    </span>
  );
}
