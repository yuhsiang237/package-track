// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  // Disable server-side rendering (SSR), generate only static pages
  ssr: false,
  app: {
    // Base URL for the application.
    // On GitHub Pages, this should match the repository name
    baseURL: "/package-track",
    // Directory where Nuxt will build assets (JS/CSS)
    // Default is '_nuxt', we rename to 'nuxt' for cleaner URLs
    buildAssetsDir: "nuxt",
  },
  devtools: { enabled: true },
  modules: ["@nuxt/eslint", "@nuxt/image", "@nuxt/test-utils"],
});
