import { defineConfig } from "vite"
import { quasar } from "@quasar/vite-plugin"
import vue from "@vitejs/plugin-vue"
import path from "path"

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    quasar({
      sassVariables: "@/assets/sass/quasar-variables.sass",
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  base: "/demo/",
})
