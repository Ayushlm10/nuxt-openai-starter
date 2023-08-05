// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ["@unocss/reset/tailwind.css"],
  modules: ["@unocss/nuxt"],
  runtimeConfig: {
    openaiApiKey: "",
  },
  experimental: {
    viewTransition: true,
  },
});
