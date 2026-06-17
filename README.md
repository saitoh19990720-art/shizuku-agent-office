# Shizuku Agent Office

しずくのための「AI社員オフィス」。AIを魔法でも代替でもなく、**机と仕事と境界線を持った社員チーム**として扱い、**最終判断は人間（監督＝しずく）** が持つための、ローカル完結の1ページ・ダッシュボード。

## 1. 目的

- リモートワーク準備・AI×デザイン制作・個人ブランド構築の「作業デスク」
- 夜の作業を続けやすくする（夜型のリズムに合わせる）
- 圧倒されないために「次にやること1つ」を常に上に置く
- AIは提案・下書き・実装・レビュー・自動化まで。**取り返しのつかない判断は人間が承認**

## 2. Tech Stack

- React + TypeScript + Vite
- Tailwind CSS（デザイントークンは `src/styles/tokens.css`）
- localStorage（バックエンド・ログイン・外部API・クラウド同期なし）

## 3. Install

```bash
npm install
```

## 4. Dev

```bash
npm run dev      # 開発サーバー（http://localhost:5173）
npm run build    # 型チェック＋本番ビルド
npm run preview  # ビルド結果を確認
```

## 5. File Structure

```txt
src/
  components/
    AppShell.tsx          画面の枠（ヘッダー・フッター）
    NextActionCard.tsx    次にやること1つ
    TodayTasks.tsx        今日のタスク（+ TaskForm / TaskCard）
    EmployeeBoard.tsx     AI社員ボード（+ EmployeeCard）
    NightLogForm/List     夜タスクログ（3行）
    ProjectLinks.tsx      プロジェクトのリンク
    PromptVault.tsx       プロンプト保管庫
    AutomationQueue.tsx   自動化キュー（準備リスト）
  data/demoEmployees.ts   AI社員の名簿
  hooks/                  useLocalStorage + 各セクションの状態管理
  lib/                    ids / dates / exportMarkdown
  styles/tokens.css       配色トークン
  types.ts                データモデル
  App.tsx / main.tsx
```

## 6. MVP Features

1. 今日のタスク（状態：今日/明日/保留/完了・優先度・担当AI社員・メモ）
2. 夜タスクログ（やった・学び・次やる／Markdownコピー対応）
3. 次にやること1つ（上部固定のアンカー）
4. プロジェクトのリンク（Figma/GitHub/Obsidian/参考URL・状態）
5. プロンプト保管庫（道具別・コピー・最終使用日）
6. AI社員ボード（役割・道具・いまの担当・危険度・承認要否）
7. 自動化キュー（きっかけ・入力・出力・出力先・状態・危険度・承認要否）

## 7. localStorage データ

すべて `shizuku-office.*.v1` のキーで保存され、**この端末の外には出ません**。

| キー | 内容 |
|---|---|
| `shizuku-office.tasks.v1` | タスク一覧 |
| `shizuku-office.nightlogs.v1` | 夜ログ |
| `shizuku-office.links.v1` | プロジェクトリンク |
| `shizuku-office.prompts.v1` | プロンプト |
| `shizuku-office.automation.v1` | 自動化キュー（初回はサンプル3件） |
| `shizuku-office.nextaction.v1` | 次にやること1つ |

ページを再読み込みしてもデータは消えません。

## 8. 将来の n8n 連携（MVPでは未実装）

データ構造だけ用意してあります。実装・接続は**承認後**・無料枠優先・本番に機微データを載せない。

- **夜タスクフロー（22:50）**：リマインド送信 → 空の夜ログ作成 → 次アクション表示
- **作業開始フロー（23:00）**：開始ログ作成 → 今日のタスク表示 → 次の一手を提案
- **週次振り返り（毎週）**：夜ログ・完了タスク・リンク・プロンプト使用 → 週次サマリ（Markdown）
- **公式アップデート監視（毎日/毎週）**：Figma/Claude Code/n8n等のリリースノート → 差分だけ・なぜ重要か・必要な対応

Markdown書き出しのひな形は `src/lib/exportMarkdown.ts` にあります（夜ログ・週次振り返り）。

## 9. Agent Teams の使い方メモ

並列作業が本当に役立つときだけ Claude Code の Agent Teams を使う（小さく・2〜4人）。

- 使う：複数アプローチの比較／並列レビュー／フロント・データ・テストの分担／デバッグ仮説の競合
- 使わない：小さな修正／単一ファイル／曖昧なブレスト／同一ファイルの同時編集（衝突リスク）
- 前提：`claude --version` が v2.1.32 以上。実験的・既定は無効。必要時だけ `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1` で有効化。使えなければ通常セッション→組み込みサブエージェントに自然にフォールバック。
- 衝突回避：編集前にファイル担当を割り当て／1領域1人／リードが統合してから適用。

## 10. 人間の承認ルール（Human Approval）

**承認が必要**：公開／大量削除／外部サービスへの送信／n8n接続／外部API呼び出し／本番ファイル編集／破壊的コマンド／自動化ルール変更。
**承認不要**：ローカル下書き保存／タスク作成／プロンプト下書き／リンク保存／夜ログ保存。

アプリ内では、自動化やAI社員のカードに「🔒 承認が必要 / 承認なしでOK」を明示しています。

## 11. 思想

> 人間＝監督。AI＝社員・パートナー・道具。
> AIに机・仕事・境界線を与え、最終判断はしずくが持つ。

このプロジェクトはAIがしずくを置き換えるためのものではありません。
