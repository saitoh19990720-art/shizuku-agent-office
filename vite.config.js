import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
// GitHub Pages公開用：相対パス＋docsフォルダ出力（source=main /docs）
export default defineConfig({
    base: "./",
    build: { outDir: "docs" },
    plugins: [react()],
});
