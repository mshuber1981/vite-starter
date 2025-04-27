import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import ghPages from "./scripts/gh-pages";
import config from "./src/app/config.json";

// https://vitejs.dev/config/
export default defineConfig({
  base: `/${config.repoName}/`,
  plugins: [react(), ghPages()],
});
