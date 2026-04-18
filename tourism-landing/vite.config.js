import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // Points 'components' to src/components
      components: path.resolve(__dirname, "src/components"),
      // Points 'lib' to src/libs for utility imports
      lib: path.resolve(__dirname, "src/libs"),
    },
  },
});
