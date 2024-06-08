import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
// https://github.com/metonym/vite-plugin-gh-pages
import { ghPages } from "vite-plugin-gh-pages";
import Config from "./config.json";

// https://vitejs.dev/config/
export default defineConfig({
  base: `/${Config.repoName}/`,
  plugins: [react(), ghPages()],
});
