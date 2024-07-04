import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import ghPages from "./scripts/gh-pages";
import Config from "./config.json";

// https://vitejs.dev/config/
export default defineConfig({
  base: `/${Config.repoName}/`,
  plugins: [react(), ghPages()],
});
