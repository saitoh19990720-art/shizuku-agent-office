import { useCallback } from "react";
import type { NightLog } from "../types";
import { useLocalStorage } from "./useLocalStorage";
import { makeId } from "../lib/ids";
import { nowISO, todayStr } from "../lib/dates";

export type NewNightLogInput = {
  did: string;
  learned: string;
  next: string;
  date?: string;
};

const KEY = "shizuku-office.nightlogs.v1";

export function useNightLogs() {
  const [logs, setLogs] = useLocalStorage<NightLog[]>(KEY, []);

  const add = useCallback(
    (input: NewNightLogInput) => {
      const ts = nowISO();
      const log: NightLog = {
        id: makeId(),
        date: input.date || todayStr(),
        did: input.did.trim(),
        learned: input.learned.trim(),
        next: input.next.trim(),
        createdAt: ts,
        updatedAt: ts,
      };
      setLogs((prev) => [log, ...prev]);
    },
    [setLogs],
  );

  const remove = useCallback(
    (id: string) => setLogs((prev) => prev.filter((l) => l.id !== id)),
    [setLogs],
  );

  return { logs, add, remove };
}
