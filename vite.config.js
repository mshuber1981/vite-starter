import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import ghPages from "./scripts/gh-pages.js";
import { readFileSync } from "fs";

// Get repository name from package.json
function getRepoName() {
  try {
    const packageJson = JSON.parse(readFileSync("./package.json", "utf-8"));
    return packageJson.name;
  } catch {
    return "vite-starter"; // fallback
  }
}

// https://vite.dev/config/
export default defineConfig({
  base: `/${getRepoName()}/`,
  plugins: [react(), ghPages()],
});
