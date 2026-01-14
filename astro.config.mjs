import { defineConfig } from "astro/config"
import mdx from "@astrojs/mdx"
import sitemap from "@astrojs/sitemap"
import tailwind from "@astrojs/tailwind"
import react from "@astrojs/react"

// https://astro.build/config
export default defineConfig({
  site: "https://yonner44.github.io",
  base: "/astro-sphere",
  trailingSlash: 'always',
  build: {
    format: 'directory'
  },
  integrations: [mdx(), sitemap(), react(), tailwind({ applyBaseStyles: false })],
  devToolbar: {
    enabled: false
  }
})