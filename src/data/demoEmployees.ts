import type { Employee } from "../types";

// AI社員の名簿。役割・道具・危険度・承認要否を明示する。
// （思想：AIは提案・下書き・実装・レビュー・自動化まで。最終判断は人間=監督）
export const demoEmployees: Employee[] = [
  {
    role: "chief-of-staff",
    name: "参謀",
    tool: "ChatGPT / Claude",
    duty: "曖昧な思いつきをタスクに翻訳。広がりすぎを止める。",
    riskLevel: "low",
    requiresApproval: false,
  },
  {
    role: "design",
    name: "デザイン社員",
    tool: "Figma",
    duty: "ビジュアルの方向づけ・UIフレーム・コンポーネント管理。",
    riskLevel: "low",
    requiresApproval: false,
  },
  {
    role: "implementation",
    name: "実装社員",
    tool: "Claude Code",
    duty: "Reactの実装・ファイル編集・README作成。",
    riskLevel: "medium",
    requiresApproval: true,
  },
  {
    role: "review",
    name: "レビュー社員",
    tool: "Codex",
    duty: "バグ・抜け・デザイン不一致・アクセシビリティを点検。",
    riskLevel: "low",
    requiresApproval: false,
  },
  {
    role: "automation",
    name: "自動化秘書",
    tool: "n8n",
    duty: "繰り返し作業・リマインド・週次まとめの準備（MVPでは未接続）。",
    riskLevel: "high",
    requiresApproval: true,
  },
  {
    role: "librarian",
    name: "司書",
    tool: "Obsidian / NotebookLM",
    duty: "決定・メモ・参考資料を保管。必要ならMarkdownで書き出し。",
    riskLevel: "low",
    requiresApproval: false,
  },
];
