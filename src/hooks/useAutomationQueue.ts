import { useCallback } from "react";
import type { AutomationItem } from "../types";
import { useLocalStorage } from "./useLocalStorage";
import { makeId } from "../lib/ids";
import { nowISO } from "../lib/dates";

export type NewAutomationInput = Omit<
  AutomationItem,
  "id" | "createdAt" | "updatedAt"
>;

const KEY = "shizuku-office.automation.v1";

// 将来の自動化アイデアの置き場（MVPでは“準備リスト”。実行はしない）
const seed: AutomationItem[] = [
  {
    id: "auto-1",
    title: "22:50 夜タスク通知",
    trigger: "毎日 22:50",
    input: "—",
    output: "リマインド＋空の夜ログ",
    destination: "本人（通知）",
    status: "idea",
    riskLevel: "low",
    requiresHumanApproval: false,
    memo: "MVPでは通知は実装しない。データ構造だけ用意。",
    createdAt: "2026-06-01T00:00:00.000Z",
    updatedAt: "2026-06-01T00:00:00.000Z",
  },
  {
    id: "auto-2",
    title: "今日のタスクから次アクション生成",
    trigger: "23:00",
    input: "今日のタスク",
    output: "次にやること1つ",
    destination: "ダッシュボード",
    status: "idea",
    riskLevel: "low",
    requiresHumanApproval: false,
    createdAt: "2026-06-01T00:00:00.000Z",
    updatedAt: "2026-06-01T00:00:00.000Z",
  },
  {
    id: "auto-3",
    title: "週次の振り返りまとめ",
    trigger: "毎週",
    input: "夜ログ・完了タスク・リンク",
    output: "週次サマリ（Markdown）",
    destination: "Obsidian",
    status: "idea",
    riskLevel: "medium",
    requiresHumanApproval: true,
    createdAt: "2026-06-01T00:00:00.000Z",
    updatedAt: "2026-06-01T00:00:00.000Z",
  },
];

export function useAutomationQueue() {
  const [items, setItems] = useLocalStorage<AutomationItem[]>(
    "shizuku-office.automation.v1",
    seed,
  );

  const add = useCallback(
    (input: NewAutomationInput) => {
      const ts = nowISO();
      const item: AutomationItem = {
        ...input,
        title: input.title.trim(),
        id: makeId(),
        createdAt: ts,
        updatedAt: ts,
      };
      setItems((prev) => [item, ...prev]);
    },
    [setItems],
  );

  const remove = useCallback(
    (id: string) => setItems((prev) => prev.filter((a) => a.id !== id)),
    [setItems],
  );

  return { items, add, remove };
}

// 補足：キー定数（他所からの参照用）
export const AUTOMATION_KEY = KEY;
