// 日付まわりの小さなヘルパー

export function nowISO(): string {
  return new Date().toISOString();
}

// YYYY-MM-DD（ローカル時刻）
export function todayStr(): string {
  const d = new Date();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${d.getFullYear()}-${m}-${day}`;
}

// ISO文字列を「2026年6月17日」の形に
export function formatJaDate(iso?: string): string {
  if (!iso) return "—";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日`;
}
