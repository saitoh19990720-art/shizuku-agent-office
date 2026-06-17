import { useCallback } from "react";
import type { Priority, Task, TaskStatus, EmployeeRole } from "../types";
import { useLocalStorage } from "./useLocalStorage";
import { makeId } from "../lib/ids";
import { nowISO } from "../lib/dates";

export type NewTaskInput = {
  title: string;
  status: TaskStatus;
  priority: Priority;
  assignedTo: EmployeeRole;
  memo?: string;
};

const KEY = "shizuku-office.tasks.v1";

export function useTasks() {
  const [tasks, setTasks] = useLocalStorage<Task[]>(KEY, []);

  const add = useCallback(
    (input: NewTaskInput) => {
      const ts = nowISO();
      const task: Task = {
        id: makeId(),
        title: input.title.trim(),
        status: input.status,
        priority: input.priority,
        assignedTo: input.assignedTo,
        memo: input.memo?.trim() || undefined,
        createdAt: ts,
        updatedAt: ts,
      };
      setTasks((prev) => [task, ...prev]);
    },
    [setTasks],
  );

  const setStatus = useCallback(
    (id: string, status: TaskStatus) => {
      setTasks((prev) =>
        prev.map((t) =>
          t.id === id ? { ...t, status, updatedAt: nowISO() } : t,
        ),
      );
    },
    [setTasks],
  );

  const remove = useCallback(
    (id: string) => setTasks((prev) => prev.filter((t) => t.id !== id)),
    [setTasks],
  );

  return { tasks, add, setStatus, remove };
}
