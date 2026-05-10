// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['motion-v/nuxt', '@nuxt/icon'],

  app: {
    head: {
      htmlAttrs: { lang: 'en' },
      title: 'Rifqy Aliansyah - Fullstack Developer',
      titleTemplate: '%s',
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',

      meta: [
        {
          name: 'description',
          content:
            'Rifqy Aliansyah is a Fullstack Developer based in West Java, Indonesia. Specializing in Vue, Nuxt, and modern web applications building fast, clean, and user-focused digital experiences.',
        },
        {
          name: 'keywords',
          content:
            'Rifqy Aliansyah, fullstack developer, frontend developer, vue developer, nuxt developer, web developer bandung, web developer indonesia, javascript developer',
        },
        { name: 'author', content: 'Rifqy Aliansyah' },
        { name: 'robots', content: 'index, follow' },
        { name: 'theme-color', content: '#0e0c0a' },

        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: 'https://www.rifqyaliansyah.my.id' },
        {
          property: 'og:title',
          content: 'Rifqy Aliansyah - Fullstack Developer',
        },
        {
          property: 'og:description',
          content:
            'Fullstack Developer based in West Java. Building fast, clean, and user-focused web applications with Vue, Nuxt, and modern technologies.',
        },
        {
          property: 'og:image',
          content: 'https://www.rifqyaliansyah.my.id/og-image.png',
        },
        { property: 'og:image:width', content: '1200' },
        { property: 'og:image:height', content: '630' },
        {
          property: 'og:image:alt',
          content: 'Rifqy Aliansyah - Fullstack Developer',
        },
        { property: 'og:locale', content: 'en_US' },
        { property: 'og:site_name', content: 'Rifqy Aliansyah Portfolio' },

        { name: 'twitter:card', content: 'summary_large_image' },
        {
          name: 'twitter:title',
          content: 'Rifqy Aliansyah - Fullstack Developer',
        },
        {
          name: 'twitter:description',
          content:
            'Fullstack Developer based in West Java. Building fast, clean, and user-focused web applications with Vue, Nuxt, and modern technologies.',
        },
        {
          name: 'twitter:image',
          content: 'https://www.rifqyaliansyah.my.id/og-image.png',
        },
      ],

      link: [
        { rel: 'canonical', href: 'https://www.rifqyaliansyah.my.id' },
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
      ],

      script: [
        {
          type: 'application/ld+json',
          innerHTML: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Person',
            name: 'Rifqy Aliansyah',
            url: 'https://www.rifqyaliansyah.my.id',
            jobTitle: 'Fullstack Developer',
            description:
              'Fullstack Developer based in West Java, Indonesia. Specializing in Vue, Nuxt, and modern web applications.',
            image: 'https://www.rifqyaliansyah.my.id/og-image.png',
            address: {
              '@type': 'PostalAddress',
              addressLocality: 'Bandung Barat',
              addressRegion: 'West Java',
              addressCountry: 'ID',
            },
            sameAs: [
              'https://github.com/rifqyaliansyah',
              'https://www.linkedin.com/in/rifqy-aliansyah',
              'https://instagram.com/rifqyaliansyah_',
            ],
            knowsAbout: [
              'Vue.js', 'Nuxt.js', 'TypeScript', 'JavaScript',
              'Node.js', 'Express.js', 'Laravel', 'PostgreSQL', 'Tailwind CSS',
            ],
          }),
        },
      ],
    },
  },
})