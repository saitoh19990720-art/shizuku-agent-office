import type { NightLog } from "../types";
import { nightLogToMarkdown } from "../lib/exportMarkdown";

type Props = {
  logs: NightLog[];
  onRemove: (id: string) => void;
};

async function copyMd(log: NightLog) {
  try {
    await navigator.clipboard.writeText(nightLogToMarkdown(log));
  } catch {
    /* クリップボード不可でも落とさない */
  }
}

export function NightLogList({ logs, onRemove }: Props) {
  if (logs.length === 0) {
    return (
      <p className="text-sm text-muted py-4 text-center">
        まだ夜ログはありません。3行だけで大丈夫です。
      </p>
    );
  }
  return (
    <ul className="grid gap-2">
      {logs.map((log) => (
        <li key={log.id} className="card p-4">
          <div className="flex items-center justify-between">
            <span className="chip">{log.date}</span>
            <div className="flex gap-3">
              <button type="button" className="link-btn" onClick={() => copyMd(log)}>
                Markdownをコピー
              </button>
              <button type="button" className="link-btn" onClick={() => onRemove(log.id)}>
                消す
              </button>
            </div>
          </div>
          <dl className="mt-2 text-sm grid gap-1">
            <div className="flex gap-2"><dt className="text-muted w-12 shrink-0">やった</dt><dd>{log.did || "—"}</dd></div>
            <div className="flex gap-2"><dt className="text-muted w-12 shrink-0">学び</dt><dd>{log.learned || "—"}</dd></div>
            <div className="flex gap-2"><dt className="text-muted w-12 shrink-0">次やる</dt><dd>{log.next || "—"}</dd></div>
          </dl>
        </li>
      ))}
    </ul>
  );
}
