import type { Task, TaskStatus } from "../types";
import { PRIORITY_LABEL, ROLE_LABEL, TASK_STATUS_LABEL } from "../types";

type Props = {
  task: Task;
  onStatus: (id: string, status: TaskStatus) => void;
  onRemove: (id: string) => void;
};

const NEXT_STATUS: TaskStatus[] = ["today", "tomorrow", "hold", "done"];

// 優先度を色だけに頼らず、形（!）＋ラベルでも示す
const PRIORITY_GLYPH = { low: "·", medium: "‣", high: "!" } as const;
const PRIORITY_BAR = {
  low: "border-l-line",
  medium: "border-l-primary",
  high: "border-l-primary-deep",
} as const;

export function TaskCard({ task, onStatus, onRemove }: Props) {
  const done = task.status === "done";
  return (
    <li className={`card p-4 border-l-4 ${PRIORITY_BAR[task.priority]} ${done ? "opacity-60" : ""}`}>
      <div className="flex items-start justify-between gap-3">
        <p className={`font-medium ${done ? "line-through" : ""}`}>{task.title}</p>
        <span className="chip whitespace-nowrap">{ROLE_LABEL[task.assignedTo]}</span>
      </div>

      <div className="flex flex-wrap gap-2 mt-2 text-[11px] text-muted">
        <span>状態：{TASK_STATUS_LABEL[task.status]}</span>
        <span aria-label={`優先度 ${PRIORITY_LABEL[task.priority]}`}>
          優先度：{PRIORITY_GLYPH[task.priority]} {PRIORITY_LABEL[task.priority]}
        </span>
      </div>

      {task.memo && <p className="text-xs text-ink/70 mt-2">{task.memo}</p>}

      <div className="flex flex-wrap gap-1.5 mt-3">
        {NEXT_STATUS.map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => onStatus(task.id, s)}
            aria-pressed={task.status === s}
            className={`text-xs px-2.5 py-1 rounded-pill border transition ${
              task.status === s
                ? "bg-primary-deep text-white border-primary-deep"
                : "border-line text-muted hover:bg-surface-soft"
            }`}
          >
            {TASK_STATUS_LABEL[s]}
          </button>
        ))}
        <button
          type="button"
          onClick={() => onRemove(task.id)}
          className="link-btn ml-auto self-center"
          aria-label={`${task.title} を消す`}
        >
          消す
        </button>
      </div>
    </li>
  );
}
