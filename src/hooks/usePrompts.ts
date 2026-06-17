import { useCallback } from "react";
import type { PromptItem } from "../types";
import { useLocalStorage } from "./useLocalStorage";
import { makeId } from "../lib/ids";
import { nowISO } from "../lib/dates";

export type NewPromptInput = Omit<
  PromptItem,
  "id" | "createdAt" | "updatedAt" | "lastUsedAt"
>;

const KEY = "shizuku-office.prompts.v1";

export function usePrompts() {
  const [prompts, setPrompts] = useLocalStorage<PromptItem[]>(KEY, []);

  const add = useCallback(
    (input: NewPromptInput) => {
      const ts = nowISO();
      const item: PromptItem = {
        ...input,
        title: input.title.trim(),
        body: input.body.trim(),
        id: makeId(),
        createdAt: ts,
        updatedAt: ts,
      };
      setPrompts((prev) => [item, ...prev]);
    },
    [setPrompts],
  );

  // 「使った」を押すと最終使用日を更新
  const markUsed = useCallback(
    (id: string) => {
      const ts = nowISO();
      setPrompts((prev) =>
        prev.map((p) => (p.id === id ? { ...p, lastUsedAt: ts, updatedAt: ts } : p)),
      );
    },
    [setPrompts],
  );

  const remove = useCallback(
    (id: string) => setPrompts((prev) => prev.filter((p) => p.id !== id)),
    [setPrompts],
  );

  return { prompts, add, markUsed, remove };
}
