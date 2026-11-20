import { defineConfig } from "vite";
import solid from "@solidjs/vite-plugin";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [
    tailwindcss(),
    solid({
      ssr: true,
      start: {
        renderMode: "async",
      },
    }),
  ],
  build: {
    target: "esnext",
  },
});
