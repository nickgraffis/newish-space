<script setup lang='ts'>
  import twemoji from 'twemoji'
  import { formatDate, slugify, currentPost } from '../logics'
  const { frontmatter } = defineProps<{ frontmatter: any }>()
  if (frontmatter.title) currentPost.value = slugify(frontmatter.title) //If this is a post globally signal that it is the current post
</script>

<template>
  <div class="prose prose-sm m-auto text-left mb-8 "> <!-- TODO: Why sm? -->
  <!-- Only show if there is a title or display included in the frontmatter -->
    <h1 v-if="frontmatter.display || frontmatter.title" class="!mb-3 !text-6xl !text-primary">
      <span v-html="twemoji.parse(frontmatter.display || frontmatter.title, { className: 'twemoji' })"></span>
    </h1>
    <!-- Only show if there is a date && duration inside the frontmatter -->
    <p v-if="frontmatter.date" class="!my-2 !font-semibold">
      {{ formatDate(frontmatter.date) }} <span v-if="frontmatter.duration">· {{ frontmatter.duration }}</span>
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
  