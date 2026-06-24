import type { FileName } from "./data";

/* Brand-accurate file icons (SVG). Sized to ~14px to match VS Code seti theme. */

const Wrap = ({ children, bg }: { children: React.ReactNode; bg?: string }) => (
  <span
    className="inline-flex h-[14px] w-[14px] shrink-0 items-center justify-center rounded-[2px]"
    style={{ background: bg }}
    aria-hidden
  >
    {children}
  </span>
);

const Label = ({ children, color = "#fff" }: { children: React.ReactNode; color?: string }) => (
  <span
    className="font-mono font-bold leading-none"
    style={{ fontSize: 7, color, letterSpacing: "-0.02em" }}
  >
    {children}
  </span>
);

const ICONS: Record<string, () => React.ReactElement> = {
  // TypeScript
  ts: () => (
    <Wrap bg="#3178C6">
      <Label>TS</Label>
    </Wrap>
  ),
  // TypeScript React
  tsx: () => (
    <Wrap bg="#3178C6">
      <Label>TSX</Label>
    </Wrap>
  ),
  // JavaScript
  js: () => (
    <Wrap bg="#F7DF1E">
      <Label color="#000">JS</Label>
    </Wrap>
  ),
  // React
  react: () => (
    <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden>
      <circle cx="12" cy="12" r="2" fill="#61DAFB" />
      <g stroke="#61DAFB" strokeWidth="1" fill="none">
        <ellipse cx="12" cy="12" rx="10" ry="4" />
        <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)" />
        <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(120 12 12)" />
      </g>
    </svg>
  ),
  // JSON — braces
  json: () => (
    <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden>
      <path
        d="M8 4c-2 0-3 1-3 3v2c0 1-.5 2-2 2v2c1.5 0 2 1 2 2v2c0 2 1 3 3 3"
        stroke="#FBC02D"
        strokeWidth="1.6"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M16 4c2 0 3 1 3 3v2c0 1 .5 2 2 2v2c-1.5 0-2 1-2 2v2c0 2-1 3-3 3"
        stroke="#FBC02D"
        strokeWidth="1.6"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  ),
  // Markdown
  md: () => (
    <svg viewBox="0 0 128 128" width="14" height="14" aria-hidden>
      <rect x="2" y="22" width="124" height="84" rx="8" fill="#519ABA" />
      <path
        d="M22 84V44h10l12 16 12-16h10v40H56V60l-12 16-12-16v24H22zm66 0V44h10v28h12L100 84H88z"
        fill="#fff"
      />
    </svg>
  ),
  // YAML
  yaml: () => (
    <Wrap bg="#CB171E">
      <Label>YML</Label>
    </Wrap>
  ),
  yml: () => (
    <Wrap bg="#CB171E">
      <Label>YML</Label>
    </Wrap>
  ),
  // CSS3
  css: () => (
    <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden>
      <path d="M3 2l1.5 17L12 22l7.5-3L21 2H3z" fill="#1572B6" />
      <path d="M12 4.5v15.7l6-2.4L19.2 4.5H12z" fill="#33A9DC" />
      <path
        d="M12 9.7H8.7l-.2-2.5h3.5V4.8H5.9l.6 7.4H12V9.7zM12 15.3l-2.6-.7-.2-1.9H6.6l.3 3.6 5.1 1.4v-2.4z"
        fill="#fff"
      />
      <path
        d="M11.97 9.7v2.5h3.04l-.3 3.2-2.74.7v2.4l5.05-1.4.04-.5.58-6.5.06-.7.45-5h-6.18v2.4h3.5l-.23 2.5h-3.27z"
        fill="#EBEBEB"
      />
    </svg>
  ),
  // PDF
  pdf: () => (
    <Wrap bg="#E53935">
      <Label>PDF</Label>
    </Wrap>
  ),
  // HTML
  html: () => (
    <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden>
      <path d="M3 2l1.5 17L12 22l7.5-3L21 2H3z" fill="#E44D26" />
      <path d="M12 4.5v15.7l6-2.4L19.2 4.5H12z" fill="#F16529" />
      <path
        d="M12 9.7H8.7l-.2-2.5h3.5V4.8H5.9l.6 7.4H12V9.7zm0 5.6l-2.6-.7-.2-1.9H6.6l.3 3.6 5.1 1.4v-2.4z"
        fill="#fff"
      />
    </svg>
  ),
};

function ext(name: string) {
  return name.split(".").pop()?.toLowerCase() ?? "";
}

export function FileIcon({ name }: { name: FileName | string; className?: string }) {
  const e = ext(name);
  const I = ICONS[e];
  if (I) return <I />;
  return (
    <Wrap bg="#6B7280">
      <Label>{e.slice(0, 2).toUpperCase() || "F"}</Label>
    </Wrap>
  );
}
