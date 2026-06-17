import { useState } from "react";
import type { EmployeeRole, Priority, TaskStatus } from "../types";
import { PRIORITY_LABEL, ROLE_LABEL, TASK_STATUS_LABEL } from "../types";
import type { NewTaskInput } from "../hooks/useTasks";

type Props = {
  onAdd: (input: NewTaskInput) => void;
};

const STATUSES: TaskStatus[] = ["today", "tomorrow", "hold", "done"];
const PRIORITIES: Priority[] = ["low", "medium", "high"];
const ROLES: EmployeeRole[] = [
  "director",
  "chief-of-staff",
  "design",
  "implementation",
  "review",
  "automation",
  "librarian",
];

export function TaskForm({ onAdd }: Props) {
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState<TaskStatus>("today");
  const [priority, setPriority] = useState<Priority>("medium");
  const [assignedTo, setAssignedTo] = useState<EmployeeRole>("implementation");
  const [memo, setMemo] = useState("");

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) return;
    onAdd({ title, status, priority, assignedTo, memo });
    setTitle("");
    setMemo("");
    setStatus("today");
    setPriority("medium");
  }

  return (
    <form onSubmit={submit} className="grid gap-3 mb-4">
      <input
        className="input"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="タスクを書く（例：配色トークンを見直す）"
        aria-label="タスク名"
      />
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        <label>
          <span className="label">いつ</span>
          <select className="input" value={status} onChange={(e) => setStatus(e.target.value as TaskStatus)}>
            {STATUSES.map((s) => (
              <option key={s} value={s}>{TASK_STATUS_LABEL[s]}</option>
            ))}
          </select>
        </label>
        <label>
          <span className="label">優先度</span>
          <select className="input" value={priority} onChange={(e) => setPriority(e.target.value as Priority)}>
            {PRIORITIES.map((p) => (
              <option key={p} value={p}>{PRIORITY_LABEL[p]}</option>
            ))}
          </select>
        </label>
        <label className="col-span-2 sm:col-span-1">
          <span className="label">担当のAI社員</span>
          <select className="input" value={assignedTo} onChange={(e) => setAssignedTo(e.target.value as EmployeeRole)}>
            {ROLES.map((r) => (
              <option key={r} value={r}>{ROLE_LABEL[r]}</option>
            ))}
          </select>
        </label>
      </div>
      <input
        className="input"
        value={memo}
        onChange={(e) => setMemo(e.target.value)}
        placeholder="メモ（任意）"
        aria-label="メモ"
      />
      <div className="flex justify-end">
        <button type="submit" className="btn-primary">＋ 追加</button>
      </div>
    </form>
  );
}
