import { useEffect, useRef, useState } from "react";

// 値をlocalStorageに同期する汎用フック。
// 読み込み失敗（壊れたJSON等）でもアプリは落とさない。
export function useLocalStorage<T>(key: string, initial: T) {
  const [value, setValue] = useState<T>(() => {
    try {
      const raw = localStorage.getItem(key);
      return raw ? (JSON.parse(raw) as T) : initial;
    } catch {
      return initial;
    }
  });

  // 初回マウントの書き戻しはスキップ（無駄な保存を避ける）
  const first = useRef(true);
  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      /* プライベートモード等：黙って続行 */
    }
  }, [key, value]);

  return [value, setValue] as const;
}
