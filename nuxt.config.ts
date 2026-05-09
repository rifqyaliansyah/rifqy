// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['motion-v/nuxt'],

  app: {
    head: {
      title: 'Rifqy - Portfolio',
      meta: [
        { name: 'description', content: 'Fullstack Developer based in Bandung' }
      ]
    }
  }
})
