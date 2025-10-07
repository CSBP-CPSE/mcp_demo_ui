import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "~": resolve(__dirname, "./src"),
    },
  },
  server: {
    allowedHosts: ['deil-mcp-demo.canadacentral.cloudapp.azure.com'],	  
    proxy: {
      "/chat": "http://localhost:8000",
    },
  },
  build: {
    outDir: "../api/static/react",
    emptyOutDir: true,
    manifest: true,
    cssCodeSplit: false,
    rollupOptions: {
      input: {
        main: "./src/main.tsx",
      },
      output: {
        entryFileNames: "assets/main-react-app.js",
        chunkFileNames: "assets/[name].js",
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === "style.css") {
            return "assets/main-react-app.css";
          }
          return "assets/[name][extname]";
        },
      },
    },
  },
});
