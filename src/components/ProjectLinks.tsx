import { useState } from "react";
import type { ProjectLink } from "../types";
import { LINK_STATUS_LABEL } from "../types";
import type { NewProjectLinkInput } from "../hooks/useProjectLinks";

type Props = {
  links: ProjectLink[];
  onAdd: (input: NewProjectLinkInput) => void;
  onRemove: (id: string) => void;
};

const STATUSES: ProjectLink["status"][] = ["active", "paused", "done"];

export function ProjectLinks({ links, onAdd, onRemove }: Props) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [figmaUrl, setFigma] = useState("");
  const [githubUrl, setGithub] = useState("");
  const [obsidianNote, setObsidian] = useState("");
  const [referenceUrl, setRef] = useState("");
  const [status, setStatus] = useState<ProjectLink["status"]>("active");
  const [memo, setMemo] = useState("");

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) return;
    onAdd({
      title,
      figmaUrl: figmaUrl.trim() || undefined,
      githubUrl: githubUrl.trim() || undefined,
      obsidianNote: obsidianNote.trim() || undefined,
      referenceUrl: referenceUrl.trim() || undefined,
      status,
      memo: memo.trim() || undefined,
    });
    setTitle(""); setFigma(""); setGithub(""); setObsidian(""); setRef(""); setMemo(""); setStatus("active");
    setOpen(false);
  }

  return (
    <section className="card">
      <div className="flex items-center justify-between">
        <h2 className="section-title mb-0">🔗 プロジェクトのリンク</h2>
        <button type="button" className="link-btn" onClick={() => setOpen((v) => !v)}>
          {open ? "閉じる" : "＋ 追加"}
        </button>
      </div>
      <p className="section-sub">Figma / GitHub / Obsidian など、いま動いているものの入口。</p>

      {open && (
        <form onSubmit={submit} className="grid gap-2 mb-4">
          <input className="input" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="プロジェクト名 *" />
          <div className="grid sm:grid-cols-2 gap-2">
            <input className="input" value={figmaUrl} onChange={(e) => setFigma(e.target.value)} placeholder="Figma URL（任意）" />
            <input className="input" value={githubUrl} onChange={(e) => setGithub(e.target.value)} placeholder="GitHub URL（任意）" />
            <input className="input" value={obsidianNote} onChange={(e) => setObsidian(e.target.value)} placeholder="Obsidianノート名（任意）" />
            <input className="input" value={referenceUrl} onChange={(e) => setRef(e.target.value)} placeholder="参考URL（任意）" />
          </div>
          <div className="grid sm:grid-cols-2 gap-2">
            <select className="input" value={status} onChange={(e) => setStatus(e.target.value as ProjectLink["status"])}>
              {STATUSES.map((s) => <option key={s} value={s}>{LINK_STATUS_LABEL[s]}</option>)}
            </select>
            <input className="input" value={memo} onChange={(e) => setMemo(e.target.value)} placeholder="メモ（任意）" />
          </div>
          <div className="flex justify-end"><button type="submit" className="btn-primary">保存</button></div>
        </form>
      )}

      {links.length === 0 ? (
        <p className="text-sm text-muted py-4 text-center">まだリンクはありません。</p>
      ) : (
        <ul className="grid gap-2">
          {links.map((l) => (
            <li key={l.id} className="card p-4">
              <div className="flex items-center justify-between gap-2">
                <span className="font-medium">{l.title}</span>
                <span className="chip">{LINK_STATUS_LABEL[l.status]}</span>
              </div>
              <div className="flex flex-wrap gap-3 mt-2 text-xs">
                {l.figmaUrl && <a className="link-btn" href={l.figmaUrl} target="_blank" rel="noreferrer">Figma</a>}
                {l.githubUrl && <a className="link-btn" href={l.githubUrl} target="_blank" rel="noreferrer">GitHub</a>}
                {l.referenceUrl && <a className="link-btn" href={l.referenceUrl} target="_blank" rel="noreferrer">参考</a>}
                {l.obsidianNote && <span className="text-muted">📓 {l.obsidianNote}</span>}
                <button type="button" className="link-btn ml-auto" onClick={() => onRemove(l.id)}>消す</button>
              </div>
              {l.memo && <p className="text-xs text-ink/70 mt-2">{l.memo}</p>}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
