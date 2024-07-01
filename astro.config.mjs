import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import ngrokIntegration from "./astro-ngrok";

import node from "@astrojs/node";

// https://astro.build/config
export default defineConfig({
  integrations: [
    react(),
    tailwind(),
    ngrokIntegration({
      authtoken: "your-ngrok-authtoken",
      port: 4321,
    }),
  ],
  output: "server",
  adapter: node({
    mode: "standalone",
  }),
});
