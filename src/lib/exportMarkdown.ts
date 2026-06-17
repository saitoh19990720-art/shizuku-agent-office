// 将来のObsidian書き出し用フォーマッタ（今はコピー用に使える）
import type { NightLog, Task, ProjectLink, PromptItem } from "../types";

export function nightLogToMarkdown(log: NightLog): string {
  return [
    `# 夜タスクログ｜${log.date}`,
    "",
    `- やった：${log.did}`,
    `- 学び：${log.learned}`,
    `- 次やる：${log.next}`,
    "",
    "#夜タスク #ShizukuOS",
  ].join("\n");
}

type WeeklyInput = {
  date: string;
  doneTasks: Task[];
  logs: NightLog[];
  links: ProjectLink[];
  prompts: PromptItem[];
};

export function weeklyReflectionToMarkdown(input: WeeklyInput): string {
  const done = input.doneTasks.map((t) => `- ${t.title}`).join("\n") || "-";
  const learned = input.logs.map((l) => `- ${l.learned}`).filter((s) => s !== "- ").join("\n") || "-";
  const next = input.logs.map((l) => `- ${l.next}`).filter((s) => s !== "- ").join("\n") || "-";
  const active = input.links.filter((l) => l.status === "active").map((l) => `- ${l.title}`).join("\n") || "-";

  return [
    `# Weekly Reflection｜${input.date}`,
    "",
    "## Done",
    done,
    "",
    "## Learned",
    learned,
    "",
    "## Next",
    next,
    "",
    "## Active Projects",
    active,
    "",
    "## Notes",
    "-",
    "",
    "#週次振り返り #ShizukuOS",
  ].join("\n");
}
