import { useState } from "react";
import type { NewNightLogInput } from "../hooks/useNightLogs";

type Props = {
  onAdd: (input: NewNightLogInput) => void;
};

// 夜の3行ログ：やった・学び・次やる。書きやすさ最優先。
export function NightLogForm({ onAdd }: Props) {
  const [did, setDid] = useState("");
  const [learned, setLearned] = useState("");
  const [next, setNext] = useState("");

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!did.trim() && !learned.trim() && !next.trim()) return;
    onAdd({ did, learned, next });
    setDid("");
    setLearned("");
    setNext("");
  }

  return (
    <form onSubmit={submit} className="grid gap-2 mb-4">
      <label>
        <span className="label">やった</span>
        <input className="input" value={did} onChange={(e) => setDid(e.target.value)} placeholder="今日できたこと" />
      </label>
      <label>
        <span className="label">学び</span>
        <input className="input" value={learned} onChange={(e) => setLearned(e.target.value)} placeholder="気づき・わかったこと" />
      </label>
      <label>
        <span className="label">次やる</span>
        <input className="input" value={next} onChange={(e) => setNext(e.target.value)} placeholder="明日の最初の一手" />
      </label>
      <div className="flex justify-end">
        <button type="submit" className="btn-primary">今夜のログを残す</button>
      </div>
    </form>
  );
}
