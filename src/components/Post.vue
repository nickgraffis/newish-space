<script setup lang='ts'>
import twemoji from 'twemoji'
import { useEventListener, isClient } from '@vueuse/core'
import { useHead, Head } from '@vueuse/head'
import { formatDate, slugify, currentPost } from '../logics'
import setupTwoslashHovers from '../setupTwoslashHovers'

if (isClient) {
  const navigate = () => {
    if (location.hash) {
      document.querySelector(location.hash)
        ?.scrollIntoView({ behavior: 'smooth' }) // Not currently working in Safari
    }
  }

  useEventListener(window, 'hashchange', navigate, false)

  onMounted(() => {
    setupTwoslashHovers()
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener('click', (e) => {
        e.preventDefault()
        const href = anchor.getAttribute('href') as string
        history.replaceState({}, '', href)
        navigate()
      })
    })

    navigate()
    setTimeout(navigate, 500)
  })
}

const { frontmatter } = defineProps<{ frontmatter: any }>()
// If this is a post globally signal that it is the current post
if (frontmatter.title) currentPost.value = slugify(frontmatter.title)

// https://github.com/vueuse/head
useHead({
  script: [
    {
      type: 'application/ld+json',
      children: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        'headline': frontmatter.title,
        'publisher': {
          '@type': 'Organization',
          'name': 'Nick Graffis',
          'logo': {
            '@type': 'ImageObject',
            'url': 'https://nickgraffis.com/logo.png',
            'width': '300',
            'height': '300',
          },
          'images': 'url',
          'url': 'https://nickgraffis.com',
          'datePublished': frontmatter.date,
          'dateModified': frontmatter.date,
          'dateCreated': frontmatter.date,
          'description': 'Nick Graffis is a software engineer, writer, and speaker living in the San Francisco Bay Area.',
          'author': {
            '@type': 'Person',
            'name': 'Nick Graffis',
            'url': 'https://nickgraffis.com',
          },
          'mainEntityOfPAge': {
            '@type': 'WebPage',
            '@id': 'https://nickgraffis.com/posts/',
          },
        },
      }),
    },
  ],
  title: frontmatter?.title || 'Nick Graffis',
  meta: [
    { name: 'title', content: frontmatter?.title || 'Nick Graffis' },
    { name: 'description', content: frontmatter?.description || 'Nick Graffis\'s Personal Website' },
    { name: 'twitter:card', content: 'summary' },
    { name: 'twitter:site', content: '@nickgraffistwit' },
    { name: 'twitter:creator', content: '@nickgraffistwit' },
    { name: 'twitter:title', content: frontmatter?.title || 'Nick Graffis' },
    { name: 'twitter:description', content: frontmatter?.description || 'Nick Graffis\'s Personal Website' },
    { name: 'og:title', content: frontmatter?.title || 'Nick Graffis' },
    { name: 'og:description', content: frontmatter?.description || 'Nick Graffis\'s Personal Website' },
    { name: 'og:url', content: 'https://nickgraffis.me' },
    { name: 'og:image', content: 'https://nickgraffis.me/assets/previews/hello-world.png' },
    { name: 'og:type', content: 'website' },
    { name: 'og:locale', content: 'en_US' },
    { name: 'og:site_name', content: 'Nick Graffis' },
    { name: 'og:image:width', content: '1200' },
    { name: 'og:image:height', content: '630' },
    { name: 'og:image:alt', content: 'Nick Graffis' },
    { name: 'og:image:type', content: 'image/png' },
    { name: 'og:image:secure_url', content: 'https://nickgraffis.me/assets/previews/hello-world.png' },
    { name: 'og:image:url', content: 'https://nickgraffis.me/assets/previews/hello-world.png' },
  ],
})
</script>

<template>
  <div class="prose prose-sm m-auto text-left mb-8 ">
    <!-- TODO: Why sm? -->
    <!-- Only show if there is a title or display included in the frontmatter -->
    <h1 v-if="frontmatter.display || frontmatter.title" class="!mb-3 !text-3xl lg:!text-6xl !text-primary">
      <span v-html="twemoji.parse(frontmatter.display || frontmatter.title, { className: 'twemoji' })"></span>
    </h1>
    <!-- Only show if there is a date && duration inside the frontmatter -->
    <p v-if="frontmatter.date" class="!my-2 !font-semibold">
      Published: {{ formatDate(frontmatter.date) }}
      <span v-if="frontmatter.lastUpdated && formatDate(frontmatter.lastUpdated) !== formatDate(frontmatter.date)"> · Updated: {{ formatDate(frontmatter.lastUpdated) }}</span>
      <span v-if="frontmatter.duration">· {{ frontmatter.duration }}</span>
    </p>
    <!-- Show reactions on the client only and only if the post is accepting feedback -->
    <ClientOnly v-if="frontmatter.lookingForFeedback != false">
      <Reactions :post="slugify(frontmatter.title)" />
    </ClientOnly>
    <slot />
    <!-- Only show if there are tags included in the frontmatter -->
    <Tags v-if="frontmatter.tags" :tags="frontmatter.tags?.split(', ')" />
  </div>
</template>
