import type { ReactNode } from "react";

type Props = {
  todaySummary: string;
  children: ReactNode;
};

// 画面の枠（ヘッダー・本体・フッター）。
export function AppShell({ todaySummary, children }: Props) {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-8 py-6 pb-20">
      <header className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <div className="flex items-center gap-3">
          <span
            aria-hidden="true"
            className="grid place-items-center w-12 h-12 text-2xl text-primary-deep bg-surface border border-line rounded-2xl shadow-card"
          >
            ◍
          </span>
          <div>
            <h1 className="text-xl font-bold">Shizuku Agent Office</h1>
            <p className="text-xs text-muted">
              人間が監督、AIは社員。最後はあなたが決める。
            </p>
          </div>
        </div>
        <p className="chip">{todaySummary}</p>
      </header>

      {children}

      <footer className="mt-10 pt-4 border-t border-line text-xs text-muted">
        データはこの端末のなかだけに保存されます（ログイン・送信・クラウド同期なし）。
        危険な操作は手動のまま・最終判断は監督（あなた）。
      </footer>
    </div>
  );
}
