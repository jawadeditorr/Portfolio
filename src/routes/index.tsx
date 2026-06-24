import { createFileRoute } from "@tanstack/react-router";
import { VSCodeShell } from "@/portfolio/VSCodeShell";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Jawad Portfolio — Visual Studio Code" },
      { name: "description", content: "Interactive VS Code-inspired portfolio for Jawad — DevOps engineer & CS student. Explore files, run terminal commands, browse projects." },
      { property: "og:title", content: "Jawad Portfolio — Visual Studio Code" },
      { property: "og:description", content: "Interactive VS Code-inspired portfolio for Jawad — DevOps engineer & CS student." },
    ],
  }),
  component: Index,
});

function Index() {
  return <VSCodeShell />;
}
