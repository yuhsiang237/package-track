// https://nuxt.com/docs/api/configuration/nuxt-config
console.log("SSR flag:", import.meta.env.SSR ?? false);

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  // Disable server-side rendering (SSR), generate only static pages
  ssr: import.meta.env.SSR ?? false,
  app: {
    // Base URL for the application.
    // On GitHub Pages, this should match the repository name
    baseURL: "/package-track",
  },
  devtools: { enabled: true },
  modules: ["@nuxt/eslint", "@nuxt/image", "@nuxt/test-utils"],
});
