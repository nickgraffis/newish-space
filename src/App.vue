<script setup lang="ts">
import { useHead } from '@vueuse/head'

// https://github.com/vueuse/head
useHead({
  title: 'Nick Graffis',
  meta: [
    { name: 'title', content: 'Nick Graffis' },
    { name: 'description', content: 'Nick Graffis\'s Personal Website' },
    { name: 'twitter:card', content: 'summary' },
    { name: 'twitter:site', content: '@nickgraffistwit' },
    { name: 'twitter:creator', content: '@nickgraffistwit' },
    { name: 'twitter:title', content: 'Nick Graffis' },
    { name: 'twitter:description', content: 'Nick Graffis\'s Personal Website' },
    { name: 'og:title', content: 'Nick Graffis' },
    { name: 'og:description', content: 'Nick Graffis\'s Personal Website' },
    { name: 'og:url', content: 'https://nickgraffis.me' },
    { name: 'og:image', content: 'https://nickgraffis.me/assets/images/nick-graffis-og.jpg' },
    { name: 'og:type', content: 'website' },
    { name: 'og:locale', content: 'en_US' },
    { name: 'og:site_name', content: 'Nick Graffis' },
    { name: 'og:image:width', content: '1200' },
    { name: 'og:image:height', content: '630' },
    { name: 'og:image:alt', content: 'Nick Graffis' },
    { name: 'og:image:type', content: 'image/jpeg' },
    { name: 'og:image:secure_url', content: 'https://nickgraffis.me/assets/images/nick-graffis-og.jpg' },
    { name: 'og:image:url', content: 'https://nickgraffis.me/assets/images/nick-graffis-og.jpg' },
  ],
})
</script>

<template>
  <Alert>
    <ThemeToggle>
      <!-- TODO: Rename to Keyboard Events && Add Another Componennt for ThemeToggle -->
      <router-view />
      <!-- TODO: FunConsole -->
    </ThemeToggle>
  </Alert>
</template>
