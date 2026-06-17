import { useState } from "react";
import type { PromptItem } from "../types";
import { TOOL_LABEL } from "../types";
import { formatJaDate } from "../lib/dates";
import type { NewPromptInput } from "../hooks/usePrompts";

type Props = {
  prompts: PromptItem[];
  onAdd: (input: NewPromptInput) => void;
  onMarkUsed: (id: string) => void;
  onRemove: (id: string) => void;
};

const TOOLS: PromptItem["targetTool"][] = [
  "claude-code", "chatgpt", "codex", "n8n", "figma", "perplexity", "obsidian", "other",
];

async function copy(text: string) {
  try { await navigator.clipboard.writeText(text); } catch { /* noop */ }
}

export function PromptVault({ prompts, onAdd, onMarkUsed, onRemove }: Props) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [targetTool, setTool] = useState<PromptItem["targetTool"]>("claude-code");
  const [category, setCategory] = useState("");
  const [body, setBody] = useState("");
  const [useCase, setUseCase] = useState("");

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim() || !body.trim()) return;
    onAdd({ title, targetTool, category: category.trim() || "その他", body, useCase: useCase.trim() || undefined });
    setTitle(""); setBody(""); setCategory(""); setUseCase(""); setTool("claude-code");
    setOpen(false);
  }

  return (
    <section className="card">
      <div className="flex items-center justify-between">
        <h2 className="section-title mb-0">📌 プロンプト保管庫</h2>
        <button type="button" className="link-btn" onClick={() => setOpen((v) => !v)}>
          {open ? "閉じる" : "＋ 追加"}
        </button>
      </div>
      <p className="section-sub">よく使う指示文を、道具ごとにためておく。</p>

      {open && (
        <form onSubmit={submit} className="grid gap-2 mb-4">
          <input className="input" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="タイトル *" />
          <div className="grid sm:grid-cols-2 gap-2">
            <select className="input" value={targetTool} onChange={(e) => setTool(e.target.value as PromptItem["targetTool"])}>
              {TOOLS.map((t) => <option key={t} value={t}>{TOOL_LABEL[t]}</option>)}
            </select>
            <input className="input" value={category} onChange={(e) => setCategory(e.target.value)} placeholder="カテゴリ（例：UI設計）" />
          </div>
          <textarea className="input" rows={3} value={body} onChange={(e) => setBody(e.target.value)} placeholder="プロンプト本文 *" />
          <input className="input" value={useCase} onChange={(e) => setUseCase(e.target.value)} placeholder="使いどころ（任意）" />
          <div className="flex justify-end"><button type="submit" className="btn-primary">保存</button></div>
        </form>
      )}

      {prompts.length === 0 ? (
        <p className="text-sm text-muted py-4 text-center">まだプロンプトはありません。</p>
      ) : (
        <ul className="grid gap-2">
          {prompts.map((p) => (
            <li key={p.id} className="card p-4">
              <div className="flex items-center justify-between gap-2">
                <span className="font-medium">{p.title}</span>
                <span className="chip">{TOOL_LABEL[p.targetTool]}</span>
              </div>
              <p className="text-xs text-muted mt-1">{p.category}{p.useCase ? `・${p.useCase}` : ""}</p>
              <p className="text-xs text-ink/70 mt-2 whitespace-pre-wrap line-clamp-3">{p.body}</p>
              <div className="flex flex-wrap gap-3 mt-2 text-xs items-center">
                <button type="button" className="link-btn" onClick={() => { copy(p.body); onMarkUsed(p.id); }}>
                  コピーして使う
                </button>
                <span className="text-muted">最終使用：{formatJaDate(p.lastUsedAt)}</span>
                <button type="button" className="link-btn ml-auto" onClick={() => onRemove(p.id)}>消す</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
