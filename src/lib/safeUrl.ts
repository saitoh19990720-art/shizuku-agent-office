// 入力されたURLを、リンクとして安全に開ける形にそろえる。
// - http / https はそのまま
// - 「figma.com/...」のように先頭が省略されたものは https:// を補う
// - それ以外の形式（javascript: など）はリンクにしない
export function safeUrl(raw?: string): string | undefined {
  const value = raw?.trim();
  if (!value) return undefined;
  if (/^https?:\/\//i.test(value)) return value;
  if (/^[a-z][a-z0-9+.-]*:/i.test(value)) return undefined;
  return `https://${value}`;
}
