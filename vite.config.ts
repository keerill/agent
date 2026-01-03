import react from "@vitejs/plugin-react-swc"
import path from "path"
import { defineConfig } from "vite"
import checker from "vite-plugin-checker"
import svgr from "vite-plugin-svgr"

export default defineConfig({
  plugins: [
    react(),
    svgr(),
    checker({
      typescript: true,
    }),
  ],
  resolve: {
    alias: [{ find: "@", replacement: path.resolve(__dirname, "src") }],
  },
  assetsInclude: ["**/*.xlsx"],
})
