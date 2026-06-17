import { useMemo, useState } from "react";
import type { Task, TaskStatus } from "../types";
import { TASK_STATUS_LABEL } from "../types";
import { TaskForm } from "./TaskForm";
import { TaskCard } from "./TaskCard";
import type { NewTaskInput } from "../hooks/useTasks";

type Filter = "all" | TaskStatus;

type Props = {
  tasks: Task[];
  onAdd: (input: NewTaskInput) => void;
  onStatus: (id: string, status: TaskStatus) => void;
  onRemove: (id: string) => void;
};

const FILTERS: { key: Filter; label: string }[] = [
  { key: "all", label: "すべて" },
  { key: "today", label: TASK_STATUS_LABEL.today },
  { key: "tomorrow", label: TASK_STATUS_LABEL.tomorrow },
  { key: "hold", label: TASK_STATUS_LABEL.hold },
  { key: "done", label: TASK_STATUS_LABEL.done },
];

export function TodayTasks({ tasks, onAdd, onStatus, onRemove }: Props) {
  const [filter, setFilter] = useState<Filter>("all");
  const filtered = useMemo(
    () => (filter === "all" ? tasks : tasks.filter((t) => t.status === filter)),
    [tasks, filter],
  );

  return (
    <section className="card">
      <h2 className="section-title">🗒 今日のタスク</h2>
      <p className="section-sub">AI社員に渡す仕事を書く。状態はいつでも変えられます。</p>

      <TaskForm onAdd={onAdd} />

      <div className="flex flex-wrap gap-1.5 mb-3">
        {FILTERS.map((f) => (
          <button
            key={f.key}
            type="button"
            onClick={() => setFilter(f.key)}
            aria-pressed={filter === f.key}
            className={`text-xs px-3 py-1 rounded-pill border transition ${
              filter === f.key
                ? "bg-primary-deep text-white border-primary-deep"
                : "border-line text-muted hover:bg-surface-soft"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="text-sm text-muted py-6 text-center">
          {tasks.length === 0 ? "まだタスクはありません。ひとつだけ書いてみましょう。" : "この状態のタスクはありません。"}
        </p>
      ) : (
        <ul className="grid gap-2">
          {filtered.map((t) => (
            <TaskCard key={t.id} task={t} onStatus={onStatus} onRemove={onRemove} />
          ))}
        </ul>
      )}
    </section>
  );
}
