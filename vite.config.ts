import react from "@vitejs/plugin-react-swc"
import path from "path"
import { defineConfig } from "vite"
import checker from "vite-plugin-checker"
import svgr from "vite-plugin-svgr"

export default defineConfig({
  plugins: [
    react(),
    svgr({ include: /\.svg$/ }),
    checker({
      typescript: true,
    }),
  ],
  resolve: {
    alias: { "@": path.resolve(__dirname, "src") },
  },
  assetsInclude: ["**/*.xlsx"],
})
