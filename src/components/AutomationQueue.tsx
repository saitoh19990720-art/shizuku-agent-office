import { useState } from "react";
import type { AutomationItem, RiskLevel } from "../types";
import { AUTOMATION_STATUS_LABEL, RISK_LABEL } from "../types";
import type { NewAutomationInput } from "../hooks/useAutomationQueue";

type Props = {
  items: AutomationItem[];
  onAdd: (input: NewAutomationInput) => void;
  onRemove: (id: string) => void;
};

const STATUSES: AutomationItem["status"][] = ["idea", "ready", "connected", "paused"];
const RISKS: RiskLevel[] = ["low", "medium", "high"];

const STATUS_STYLE: Record<AutomationItem["status"], string> = {
  idea: "bg-surface-soft text-primary-deep",
  ready: "bg-mint text-[#20402c]",
  connected: "bg-primary text-[#0f3346]",
  paused: "bg-lavender text-[#322a5e]",
};

export function AutomationQueue({ items, onAdd, onRemove }: Props) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [trigger, setTrigger] = useState("");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [destination, setDest] = useState("");
  const [status, setStatus] = useState<AutomationItem["status"]>("idea");
  const [riskLevel, setRisk] = useState<RiskLevel>("low");
  const [requiresHumanApproval, setApproval] = useState(true);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) return;
    onAdd({
      title, trigger: trigger.trim() || "—", input: input.trim() || "—",
      output: output.trim() || "—", destination: destination.trim() || "—",
      status, riskLevel, requiresHumanApproval,
    });
    setTitle(""); setTrigger(""); setInput(""); setOutput(""); setDest("");
    setStatus("idea"); setRisk("low"); setApproval(true);
    setOpen(false);
  }

  return (
    <section className="card">
      <div className="flex items-center justify-between">
        <h2 className="section-title mb-0">⚙ 自動化キュー（準備リスト）</h2>
        <button type="button" className="link-btn" onClick={() => setOpen((v) => !v)}>
          {open ? "閉じる" : "＋ 追加"}
        </button>
      </div>
      <p className="section-sub">
        いまは“準備”だけ。実行はしません（n8n接続・外部送信は承認後）。
      </p>

      {open && (
        <form onSubmit={submit} className="grid gap-2 mb-4">
          <input className="input" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="やりたい自動化 *" />
          <div className="grid sm:grid-cols-2 gap-2">
            <input className="input" value={trigger} onChange={(e) => setTrigger(e.target.value)} placeholder="きっかけ（例：毎日22:50）" />
            <input className="input" value={destination} onChange={(e) => setDest(e.target.value)} placeholder="出力先（例：Obsidian）" />
            <input className="input" value={input} onChange={(e) => setInput(e.target.value)} placeholder="入力" />
            <input className="input" value={output} onChange={(e) => setOutput(e.target.value)} placeholder="出力" />
            <select className="input" value={status} onChange={(e) => setStatus(e.target.value as AutomationItem["status"])}>
              {STATUSES.map((s) => <option key={s} value={s}>{AUTOMATION_STATUS_LABEL[s]}</option>)}
            </select>
            <select className="input" value={riskLevel} onChange={(e) => setRisk(e.target.value as RiskLevel)}>
              {RISKS.map((r) => <option key={r} value={r}>危険度 {RISK_LABEL[r]}</option>)}
            </select>
          </div>
          <label className="flex items-center gap-2 text-sm text-muted">
            <input type="checkbox" checked={requiresHumanApproval} onChange={(e) => setApproval(e.target.checked)} />
            人間の承認が必要（外部送信・接続・公開など）
          </label>
          <div className="flex justify-end"><button type="submit" className="btn-primary">保存</button></div>
        </form>
      )}

      {items.length === 0 ? (
        <p className="text-sm text-muted py-4 text-center">まだ自動化アイデアはありません。</p>
      ) : (
        <ul className="grid gap-2">
          {items.map((a) => (
            <li key={a.id} className="card p-4">
              <div className="flex items-center justify-between gap-2">
                <span className="font-medium">{a.title}</span>
                <span className={`text-[11px] px-2 py-0.5 rounded-pill ${STATUS_STYLE[a.status]}`}>
                  {AUTOMATION_STATUS_LABEL[a.status]}
                </span>
              </div>
              <div className="grid sm:grid-cols-2 gap-x-4 gap-y-1 mt-2 text-xs text-muted">
                <span>きっかけ：{a.trigger}</span>
                <span>出力先：{a.destination}</span>
                <span>入力：{a.input}</span>
                <span>出力：{a.output}</span>
              </div>
              <div className="flex items-center gap-3 mt-2 text-[11px]">
                <span className="text-muted">危険度 {RISK_LABEL[a.riskLevel]}</span>
                <span className={a.requiresHumanApproval ? "text-primary-deep" : "text-muted"}>
                  {a.requiresHumanApproval ? "🔒 承認が必要" : "承認なしでOK"}
                </span>
                <button type="button" className="link-btn ml-auto" onClick={() => onRemove(a.id)}>消す</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
