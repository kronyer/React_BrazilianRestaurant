import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    // @ts-expect-error sei la mime types
    mimeTypes: {
      "application/typescript": ["ts"],
    },
  },
});
