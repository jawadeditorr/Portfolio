import { useEffect, useRef, useState } from "react";
import { EDUCATION, EXPERIENCE, PERSONAL_INFO, PROJECTS, SKILLS } from "./data";
import type { FileName } from "./data";

type Line = { kind: "in" | "out" | "err" | "ascii"; text: string };

const HELP = [
  "Available commands:",
  "  help        Show this help message",
  "  whoami      About Syed Jawad Hussain Mashhadi",
  "  skills      List technical skills",
  "  projects    Show featured projects & screenshot count",
  "  experience  Career timeline & internship",
  "  education   Academic standing & degree details",
  "  resume      Open resume.pdf viewer",
  "  contact     How to reach me",
  "  neofetch    System info",
  "  clear       Clear the terminal",
];

const NEOFETCH = String.raw`
       .---.        jawad@portfolio
      /     \       ----------------
      \.@-@./       User: Syed Jawad Hussain Mashhadi
      /\`\\_/\`\\     Role: Cloud & DevOps Intern
     //_^_^_\\\\    University: COMSATS (CGPA: 3.88/4.00)
    ( \\_   _/ )    Editor: VS Code Portfolio
                    Stack: K8s · Docker · AWS · Jenkins · Prometheus
`;

export function Terminal({ onOpen }: { onOpen: (f: FileName) => void }) {
  const [history, setHistory] = useState<Line[]>([
    { kind: "out", text: "Welcome to jawad@portfolio — type `help` to list commands." },
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
        out.push({ kind: "out", text: `${PERSONAL_INFO.name} — ${PERSONAL_INFO.role}` });
        out.push({ kind: "out", text: `${PERSONAL_INFO.summary}` });
        break;
      case "skills":
        Object.entries(SKILLS).forEach(([k, v]) => out.push({ kind: "out", text: `  ${k.padEnd(32)} ${v.join(", ")}` }));
        break;
      case "projects":
        PROJECTS.forEach((p, i) =>
          out.push({
            kind: "out",
            text: `  [${i + 1}] ${p.title} (${p.category}) — ${p.stack.join(", ")} [${p.screenshots.length} Screenshots]`,
          })
        );
        out.push({ kind: "out", text: "→ Opening projects.ts ..." });
        onOpen("projects.ts");
        break;
      case "experience":
        EXPERIENCE.forEach((e) => out.push({ kind: "out", text: `  ${e.period.padEnd(20)} ${e.role} @ ${e.company}` }));
        onOpen("experience.js");
        break;
      case "education":
        out.push({ kind: "out", text: `  ${EDUCATION.degree} — ${EDUCATION.institution}` });
        out.push({ kind: "out", text: `  ${EDUCATION.period} | ${EDUCATION.details}` });
        onOpen("education.json");
        break;
      case "resume":
        out.push({ kind: "out", text: "→ Opening resume.pdf ..." });
        onOpen("resume.pdf");
        break;
      case "contact":
        out.push({ kind: "out", text: `  email    ${PERSONAL_INFO.email}` });
        out.push({ kind: "out", text: `  phone    ${PERSONAL_INFO.phone}` });
        out.push({ kind: "out", text: `  location ${PERSONAL_INFO.location}` });
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
