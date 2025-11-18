import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { readFileSync } from "fs";
import { fileURLToPath, URL } from "url";

// Auto-detect repository name from package.json
function getRepoName() {
  try {
    const packageJson = JSON.parse(readFileSync("./package.json", "utf-8"));
    if (packageJson.repository?.url) {
      const match = packageJson.repository.url.match(/\/([^/]+)\.git$/);
      return match ? match[1] : packageJson.name;
    }
    return packageJson.name;
  } catch {
    return "vite-starter"; // fallback
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Auto-detect base path for GitHub Pages deployment
  base: process.env.NODE_ENV === "production" ? `/${getRepoName()}/` : "/",
});
