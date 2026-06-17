import { useEffect, useState } from "react";

type Props = {
  value: string;
  onChange: (value: string) => void;
};

// 「次にやること1つ」。圧倒されないためのアンカー。常に上部に。
export function NextActionCard({ value, onChange }: Props) {
  const [draft, setDraft] = useState(value);

  // 外から値が変わったら同期
  useEffect(() => setDraft(value), [value]);

  return (
    <section className="card bg-surface-soft border-primary/40">
      <p className="label mb-2">次にやること1つ</p>
      <div className="flex flex-wrap gap-2 items-center">
        <input
          className="input flex-1 min-w-[200px] bg-surface text-lg font-medium"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onBlur={() => onChange(draft.trim())}
          placeholder="例：トップ画面のヒーローを1枚だけ整える"
          aria-label="次にやること"
        />
        <button
          type="button"
          className="btn-primary"
          onClick={() => onChange(draft.trim())}
        >
          決める
        </button>
      </div>
      <p className="section-sub mt-2 mb-0">
        ここだけ見ればOK。迷ったら、これを1つだけ進める。
      </p>
    </section>
  );
}
