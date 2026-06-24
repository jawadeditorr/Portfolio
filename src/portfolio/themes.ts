export type ThemeId = "dark-plus" | "monokai" | "dracula" | "github-light" | "solarized-light";

export const THEMES: { id: ThemeId; name: string; icon: string }[] = [
  { id: "dark-plus", name: "Dark+ (default)", icon: "🌙" },
  { id: "monokai", name: "Monokai", icon: "🟢" },
  { id: "dracula", name: "Dracula", icon: "🧛" },
  { id: "github-light", name: "GitHub Light", icon: "☀️" },
  { id: "solarized-light", name: "Solarized Light", icon: "🌅" },
];
