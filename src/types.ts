// データモデル（CLAUDE.md の仕様どおり）

export type EmployeeRole =
  | "director"
  | "chief-of-staff"
  | "design"
  | "implementation"
  | "review"
  | "automation"
  | "librarian";

export type TaskStatus = "today" | "tomorrow" | "hold" | "done";
export type Priority = "low" | "medium" | "high";
export type RiskLevel = "low" | "medium" | "high";

export type Task = {
  id: string;
  title: string;
  status: TaskStatus;
  priority: Priority;
  assignedTo: EmployeeRole;
  memo?: string;
  createdAt: string;
  updatedAt: string;
};

export type NightLog = {
  id: string;
  date: string;
  did: string;
  learned: string;
  next: string;
  createdAt: string;
  updatedAt: string;
};

export type ProjectLink = {
  id: string;
  title: string;
  figmaUrl?: string;
  githubUrl?: string;
  claudeMemo?: string;
  obsidianNote?: string;
  referenceUrl?: string;
  status: "active" | "paused" | "done";
  memo?: string;
  createdAt: string;
  updatedAt: string;
};

export type PromptItem = {
  id: string;
  title: string;
  targetTool:
    | "claude-code"
    | "chatgpt"
    | "codex"
    | "n8n"
    | "figma"
    | "perplexity"
    | "obsidian"
    | "other";
  category: string;
  body: string;
  useCase?: string;
  lastUsedAt?: string;
  memo?: string;
  createdAt: string;
  updatedAt: string;
};

export type AutomationItem = {
  id: string;
  title: string;
  trigger: string;
  input: string;
  output: string;
  destination: string;
  status: "idea" | "ready" | "connected" | "paused";
  riskLevel: RiskLevel;
  requiresHumanApproval: boolean;
  memo?: string;
  createdAt: string;
  updatedAt: string;
};

export type NextAction = {
  value: string;
  updatedAt: string;
};

// 社員ボード表示用（モデルの EmployeeRole を人が読める形に）
export type Employee = {
  role: EmployeeRole;
  name: string;
  tool: string;
  duty: string;
  riskLevel: RiskLevel;
  requiresApproval: boolean;
};

/* ---- 日本語ラベル ---- */

export const ROLE_LABEL: Record<EmployeeRole, string> = {
  director: "監督（あなた）",
  "chief-of-staff": "参謀",
  design: "デザイン社員",
  implementation: "実装社員",
  review: "レビュー社員",
  automation: "自動化秘書",
  librarian: "司書",
};

export const TASK_STATUS_LABEL: Record<TaskStatus, string> = {
  today: "今日",
  tomorrow: "明日",
  hold: "保留",
  done: "完了",
};

export const PRIORITY_LABEL: Record<Priority, string> = {
  low: "低",
  medium: "中",
  high: "高",
};

export const RISK_LABEL: Record<RiskLevel, string> = {
  low: "低",
  medium: "中",
  high: "高",
};

export const TOOL_LABEL: Record<PromptItem["targetTool"], string> = {
  "claude-code": "Claude Code",
  chatgpt: "ChatGPT",
  codex: "Codex",
  n8n: "n8n",
  figma: "Figma",
  perplexity: "Perplexity",
  obsidian: "Obsidian",
  other: "その他",
};

export const LINK_STATUS_LABEL: Record<ProjectLink["status"], string> = {
  active: "進行中",
  paused: "休止",
  done: "完了",
};

export const AUTOMATION_STATUS_LABEL: Record<AutomationItem["status"], string> = {
  idea: "アイデア",
  ready: "準備OK",
  connected: "接続済み",
  paused: "休止",
};
