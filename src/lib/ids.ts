// 一意なIDを作る（crypto が無い環境への保険つき）
export function makeId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return "id-" + Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}
