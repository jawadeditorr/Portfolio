import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Files, User, FolderGit2, Cpu, Briefcase, GraduationCap, Mail, FileText,
  GitBranch, Bell, Check, X, ChevronRight, ChevronDown, Search, Settings, Terminal as TermIcon, Palette,
} from "lucide-react";
import { FILES, type FileName } from "./data";
import { FileIcon } from "./FileIcon";
import { Terminal } from "./Terminal";
import { THEMES, type ThemeId } from "./themes";
import {
  HomeFile, AboutFile, SkillsFile, ProjectsFile, ExperienceFile, EducationFile,
  ContactFile, ReadmeFile, ResumeFile,
} from "./files";

const FILE_TO_COMPONENT: Record<FileName, (props: { onOpen: (f: FileName) => void }) => React.ReactElement> = {
  "home.tsx": ({ onOpen }) => <HomeFile onOpen={onOpen} />,
  "about.md": () => <AboutFile />,
  "skills.json": () => <SkillsFile />,
  "projects.ts": () => <ProjectsFile />,
  "experience.js": () => <ExperienceFile />,
  "education.json": () => <EducationFile />,
  "contact.css": () => <ContactFile />,
  "README.md": () => <ReadmeFile />,
  "resume.pdf": () => <ResumeFile />,
};

const ACTIVITY: { id: string; label: string; icon: React.ComponentType<{ size?: number; className?: string }>; file?: FileName }[] = [
  { id: "explorer", label: "Explorer", icon: Files },
  { id: "about", label: "About", icon: User, file: "about.md" },
  { id: "projects", label: "Projects", icon: FolderGit2, file: "projects.ts" },
  { id: "skills", label: "Skills", icon: Cpu, file: "skills.json" },
  { id: "experience", label: "Experience", icon: Briefcase, file: "experience.js" },
  { id: "education", label: "Education", icon: GraduationCap, file: "education.json" },
  { id: "contact", label: "Contact", icon: Mail, file: "contact.css" },
  { id: "resume", label: "Resume", icon: FileText, file: "resume.pdf" },
];

export function VSCodeShell() {
  const [openTabs, setOpenTabs] = useState<FileName[]>(["home.tsx"]);
  const [active, setActive] = useState<FileName>("home.tsx");
  const [activity, setActivity] = useState("explorer");
  const [showSidebar, setShowSidebar] = useState(true);
  const [showTerminal, setShowTerminal] = useState(true);
  const [showSettings, setShowSettings] = useState(false);
  const [theme, setTheme] = useState<ThemeId>("dark-plus");
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000 * 30);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("vscode-theme") as ThemeId | null;
      if (saved) setTheme(saved);
    } catch { /* noop */ }
  }, []);

  useEffect(() => {
    try { localStorage.setItem("vscode-theme", theme); } catch { /* noop */ }
  }, [theme]);

  function openFile(f: FileName) {
    setOpenTabs((tabs) => (tabs.includes(f) ? tabs : [...tabs, f]));
    setActive(f);
  }
  function closeTab(f: FileName, e?: React.MouseEvent) {
    e?.stopPropagation();
    setOpenTabs((tabs) => {
      const next = tabs.filter((t) => t !== f);
      if (active === f && next.length) setActive(next[next.length - 1]);
      return next.length ? next : ["home.tsx"];
    });
    if (active === f && openTabs.length === 1) setActive("home.tsx");
  }

  async function toggleFullscreen() {
    try {
      if (!document.fullscreenElement) await document.documentElement.requestFullscreen();
      else await document.exitFullscreen();
    } catch { /* noop */ }
  }

  const clock = useMemo(
    () => time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    [time],
  );

  const ActiveComponent = FILE_TO_COMPONENT[active] ?? (() => null);

  return (
    <div
      data-theme={theme}
      className="flex h-screen w-screen flex-col overflow-hidden bg-background text-foreground"
    >
      <TitleBar fileName={active} onFullscreen={toggleFullscreen} />

      <div className="flex flex-1 min-h-0">
        <ActivityBar
          active={activity}
          onSelect={(id) => {
            setActivity(id);
            setShowSidebar(true);
            const found = ACTIVITY.find((a) => a.id === id);
            if (found?.file) openFile(found.file);
          }}
          onToggleTerminal={() => setShowTerminal((v) => !v)}
          onToggleSettings={() => setShowSettings((v) => !v)}
        />

        <AnimatePresence initial={false}>
          {showSidebar && (
            <motion.aside
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 256, opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ duration: 0.18 }}
              className="hidden md:block shrink-0 overflow-hidden border-r bg-sidebar"
            >
              <ExplorerPanel active={active} onOpen={openFile} />
            </motion.aside>
          )}
        </AnimatePresence>

        <main className="flex flex-1 min-w-0 flex-col">
          <Tabs tabs={openTabs} active={active} onSelect={setActive} onClose={closeTab} />
          <div className="flex flex-1 min-h-0 flex-col">
            <section className="flex-1 min-h-0 overflow-auto scrollbar-vscode bg-editor">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.18 }}
                  className="min-h-full"
                >
                  <ActiveComponent onOpen={openFile} />
                </motion.div>
              </AnimatePresence>
            </section>

            <AnimatePresence>
              {showTerminal && (
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: 220 }}
                  exit={{ height: 0 }}
                  transition={{ duration: 0.2 }}
                  className="shrink-0 border-t bg-terminal overflow-hidden"
                >
                  <div className="flex items-center gap-4 border-b border-border/60 px-3 py-1 text-[11px] uppercase tracking-wide text-muted-foreground">
                    <span className="text-foreground border-b-2 border-primary pb-1">Terminal</span>
                    <span>Problems</span>
                    <span>Output</span>
                    <span>Debug Console</span>
                    <button
                      onClick={() => setShowTerminal(false)}
                      className="ml-auto rounded p-0.5 hover:bg-accent"
                      aria-label="Close terminal"
                    >
                      <X size={12} />
                    </button>
                  </div>
                  <div className="h-[calc(100%-26px)]">
                    <Terminal onOpen={openFile} />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </main>
      </div>

      <StatusBar
        time={clock}
        onToggleTerminal={() => setShowTerminal((v) => !v)}
        fileName={active}
        themeName={THEMES.find((t) => t.id === theme)?.name ?? ""}
      />

      <AnimatePresence>
        {showSettings && (
          <SettingsPalette
            currentTheme={theme}
            onPick={(id) => { setTheme(id); setShowSettings(false); }}
            onClose={() => setShowSettings(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

/* ---------- Title bar (mac traffic lights) ---------- */
function TitleBar({ fileName, onFullscreen }: { fileName: string; onFullscreen: () => void }) {
  return (
    <div className="relative flex h-8 shrink-0 items-center justify-between border-b bg-titlebar px-3 text-xs select-none">
      <div className="flex items-center gap-4">
        <TrafficLights onGreen={onFullscreen} />
        <div className="hidden md:flex items-center gap-4 text-muted-foreground">
          {["File", "Edit", "Selection", "View", "Go", "Run", "Help"].map((m) => (
            <button key={m} className="rounded px-1 py-0.5 hover:bg-accent hover:text-foreground transition-colors">
              {m}
            </button>
          ))}
        </div>
      </div>

      <div className="pointer-events-none absolute left-1/2 -translate-x-1/2 truncate text-muted-foreground">
        <span className="text-foreground/80">{fileName}</span>
        <span className="mx-2">—</span>
        <span className="hidden sm:inline">Jawad Portfolio - Visual Studio Code</span>
      </div>

      <div className="w-16" />
    </div>
  );
}

function TrafficLights({ onGreen }: { onGreen: () => void }) {
  async function close() {
    // Best-effort: try to close the window, otherwise navigate away.
    window.close();
  }
  function minimize() {
    // Browsers can't minimize; collapse to a soft "blur" effect.
    document.body.style.transition = "transform 200ms ease, opacity 200ms ease";
    document.body.style.transform = "scale(0.97)";
    document.body.style.opacity = "0.6";
    setTimeout(() => {
      document.body.style.transform = "";
      document.body.style.opacity = "";
    }, 600);
  }
  return (
    <div className="group flex items-center gap-2 pl-0.5">
      <button
        onClick={close}
        aria-label="Close"
        className="grid h-3 w-3 place-items-center rounded-full bg-[#FF5F57] ring-1 ring-black/10 hover:brightness-110"
      >
        <svg width="6" height="6" viewBox="0 0 6 6" className="opacity-0 group-hover:opacity-100 text-black/70">
          <path d="M1 1l4 4M5 1L1 5" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" />
        </svg>
      </button>
      <button
        onClick={minimize}
        aria-label="Minimize"
        className="grid h-3 w-3 place-items-center rounded-full bg-[#FEBC2E] ring-1 ring-black/10 hover:brightness-110"
      >
        <svg width="6" height="6" viewBox="0 0 6 6" className="opacity-0 group-hover:opacity-100 text-black/70">
          <path d="M1 3h4" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round" />
        </svg>
      </button>
      <button
        onClick={onGreen}
        aria-label="Toggle fullscreen"
        className="grid h-3 w-3 place-items-center rounded-full bg-[#28C840] ring-1 ring-black/10 hover:brightness-110"
      >
        <svg width="6" height="6" viewBox="0 0 6 6" className="opacity-0 group-hover:opacity-100 text-black/70">
          <path d="M1.5 1.5h3v3h-3z" stroke="currentColor" strokeWidth="0.8" fill="none" />
        </svg>
      </button>
    </div>
  );
}

/* ---------- Activity bar ---------- */
function ActivityBar({
  active, onSelect, onToggleTerminal, onToggleSettings,
}: { active: string; onSelect: (id: string) => void; onToggleTerminal: () => void; onToggleSettings: () => void }) {
  return (
    <nav className="flex w-12 shrink-0 flex-col items-center justify-between border-r bg-activitybar py-2">
      <div className="flex flex-col items-center gap-1">
        {ACTIVITY.map((a) => {
          const Icon = a.icon;
          const isActive = active === a.id;
          return (
            <button
              key={a.id}
              onClick={() => onSelect(a.id)}
              title={a.label}
              aria-label={a.label}
              className={`group relative grid h-10 w-10 place-items-center text-muted-foreground transition-all ${
                isActive ? "text-foreground" : "hover:text-foreground"
              }`}
            >
              {isActive && <span className="absolute left-0 top-1 bottom-1 w-0.5 rounded-r bg-primary" />}
              <Icon size={22} className="transition-transform group-hover:scale-110" />
              <span className="pointer-events-none absolute left-12 z-50 whitespace-nowrap rounded border bg-popover px-2 py-0.5 text-[11px] opacity-0 shadow-md transition-opacity group-hover:opacity-100">
                {a.label}
              </span>
            </button>
          );
        })}
      </div>
      <div className="flex flex-col items-center gap-1">
        <button onClick={onToggleTerminal} className="grid h-10 w-10 place-items-center text-muted-foreground hover:text-foreground" title="Toggle Terminal" aria-label="Toggle Terminal">
          <TermIcon size={20} />
        </button>
        <button onClick={onToggleSettings} className="grid h-10 w-10 place-items-center text-muted-foreground hover:text-foreground" title="Settings" aria-label="Settings">
          <Settings size={20} />
        </button>
      </div>
    </nav>
  );
}

/* ---------- Explorer ---------- */
function ExplorerPanel({ active, onOpen }: { active: FileName; onOpen: (f: FileName) => void }) {
  const [folderOpen, setFolderOpen] = useState(true);
  return (
    <div className="flex h-full flex-col text-sidebar-foreground">
      <div className="flex items-center justify-between px-4 pt-3 pb-1 text-[11px] uppercase tracking-wider text-muted-foreground">
        <span>Explorer</span>
        <Search size={13} className="cursor-pointer hover:text-foreground" />
      </div>
      <div className="px-2 py-1">
        <button
          onClick={() => setFolderOpen((v) => !v)}
          className="flex w-full items-center gap-1 rounded px-1.5 py-1 text-xs font-semibold uppercase tracking-wide hover:bg-accent"
        >
          {folderOpen ? <ChevronDown size={12} /> : <ChevronRight size={12} />}
          <span>jawad-portfolio</span>
        </button>
        {folderOpen && (
          <ul className="mt-0.5 pl-3 border-l border-border/40 ml-2.5">
            {FILES.map((f) => {
              const isActive = active === f.name;
              return (
                <li key={f.name}>
                  <button
                    onClick={() => onOpen(f.name)}
                    className={`group flex w-full items-center gap-2 rounded px-2 py-[3px] text-[13px] transition-colors ${
                      isActive ? "bg-accent text-foreground" : "hover:bg-accent/50"
                    }`}
                  >
                    <FileIcon name={f.name} />
                    <span className="truncate">{f.name}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </div>

      <div className="mt-auto border-t px-4 py-2 text-[11px] text-muted-foreground">
        <div className="uppercase tracking-wider">Outline</div>
        <div className="mt-1">⚡ jawad.developer</div>
      </div>
    </div>
  );
}

/* ---------- Tabs ---------- */
function Tabs({
  tabs, active, onSelect, onClose,
}: { tabs: FileName[]; active: FileName; onSelect: (f: FileName) => void; onClose: (f: FileName, e?: React.MouseEvent) => void }) {
  const ref = useRef<HTMLDivElement>(null);
  return (
    <div ref={ref} className="flex h-9 shrink-0 items-end overflow-x-auto scrollbar-vscode border-b bg-titlebar">
      <AnimatePresence initial={false}>
        {tabs.map((t) => {
          const isActive = t === active;
          return (
            <motion.button
              key={t}
              layout
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: "auto" }}
              exit={{ opacity: 0, width: 0 }}
              transition={{ duration: 0.15 }}
              onClick={() => onSelect(t)}
              className={`group relative flex h-full shrink-0 items-center gap-2 border-r px-3 text-[13px] transition-colors ${
                isActive ? "bg-tab-active text-foreground" : "bg-tab-inactive text-muted-foreground hover:text-foreground"
              }`}
            >
              {isActive && <span className="absolute left-0 right-0 top-0 h-[1px] bg-primary" />}
              <FileIcon name={t} />
              <span className="whitespace-nowrap">{t}</span>
              <span
                onClick={(e) => onClose(t, e)}
                className={`grid h-4 w-4 place-items-center rounded transition-opacity hover:bg-accent ${
                  isActive ? "opacity-80" : "opacity-0 group-hover:opacity-100"
                }`}
                aria-label={`Close ${t}`}
              >
                <X size={11} />
              </span>
            </motion.button>
          );
        })}
      </AnimatePresence>
    </div>
  );
}

/* ---------- Status bar ---------- */
function StatusBar({
  time, onToggleTerminal, fileName, themeName,
}: { time: string; onToggleTerminal: () => void; fileName: string; themeName: string }) {
  const lang = fileName.split(".").pop()?.toUpperCase() ?? "TXT";
  return (
    <footer className="flex h-6 shrink-0 items-center justify-between bg-statusbar px-2 text-[11px] text-primary-foreground">
      <div className="flex items-center gap-4">
        <button className="flex items-center gap-1 rounded px-1 hover:bg-white/15">
          <GitBranch size={12} /> main
        </button>
        <span className="flex items-center gap-1"><Check size={12} /> 0  <X size={12} /> 0</span>
        <button onClick={onToggleTerminal} className="hidden sm:flex items-center gap-1 rounded px-1 hover:bg-white/15">
          <TermIcon size={12} /> terminal
        </button>
      </div>
      <div className="flex items-center gap-4">
        <span className="hidden md:flex items-center gap-1"><Palette size={12} /> {themeName}</span>
        <span className="hidden md:inline">Ln 1, Col 1</span>
        <span className="hidden md:inline">Spaces: 2</span>
        <span>UTF-8</span>
        <span>LF</span>
        <span className="font-medium">{lang === "TSX" ? "TypeScript React" : lang === "TS" ? "TypeScript" : lang === "JS" ? "JavaScript" : lang}</span>
        <span className="hidden sm:inline">{time}</span>
        <Bell size={12} />
      </div>
    </footer>
  );
}

/* ---------- Settings / Theme palette ---------- */
function SettingsPalette({
  currentTheme, onPick, onClose,
}: { currentTheme: ThemeId; onPick: (id: ThemeId) => void; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.12 }}
      className="fixed inset-0 z-50 flex items-start justify-center pt-20"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/40" />
      <motion.div
        initial={{ y: -8, scale: 0.98 }}
        animate={{ y: 0, scale: 1 }}
        exit={{ y: -8, scale: 0.98 }}
        transition={{ duration: 0.14 }}
        className="relative w-[92%] max-w-lg overflow-hidden rounded-md border border-border bg-popover shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-2 border-b border-border px-3 py-2 text-xs text-muted-foreground">
          <Palette size={14} /> Color Theme — Select to preview
        </div>
        <ul className="max-h-[60vh] overflow-auto">
          {THEMES.map((t) => {
            const isCurrent = t.id === currentTheme;
            return (
              <li key={t.id}>
                <button
                  onClick={() => onPick(t.id)}
                  className={`flex w-full items-center justify-between gap-3 px-4 py-2.5 text-left text-sm transition-colors ${
                    isCurrent ? "bg-accent text-foreground" : "hover:bg-accent/60"
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <span className="text-base">{t.icon}</span>
                    <span>{t.name}</span>
                  </span>
                  {isCurrent && <Check size={14} className="text-primary" />}
                </button>
              </li>
            );
          })}
        </ul>
        <div className="border-t border-border px-3 py-2 text-[11px] text-muted-foreground">
          Tip: themes persist across reloads.
        </div>
      </motion.div>
    </motion.div>
  );
}
