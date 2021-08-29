<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useUrlSearchParams } from '@vueuse/core'
import { formatDate } from '../logics'

// Querystring and input element
const search = ref<string>('')
const input = ref<HTMLElement | null>(null)
const updateSearchValue = (e: any) => search.value = e.target.value

// Show the highlighted text from the serach input
const highlight = (words: string) => {
  return words.toString().replace(
    new RegExp(search.value, 'ig'),
    (match: string) => `<span class='highlight-primary'>${match}</span>`,
  )
}

// Get the search tags if they exist in the query params
const params = useUrlSearchParams('history')
const searchTags = typeof params?.tags === 'string' ? params?.tags.split(',').map(tag => tag.trim()) : []
const lang = ref('en')
const router = useRouter()
const routes = router.getRoutes().filter((route: any) => route.meta.frontmatter?.lastUpdated)
  .sort((a: any, b: any) => +new Date(b.meta.frontmatter.lastUpdated) - +new Date(a.meta.frontmatter.lastUpdated))

// Find all of the posts based on the routes
const posts = computed(() =>
  routes.filter((i: any) =>
    !i.path.includes('/notes/')
    && !i.path.endsWith('.html')
    && i.meta.frontmatter?.lang === lang.value
    && i.meta.frontmatter?.tags
    && (
      searchTags.length
        ? i.meta.frontmatter.tags.split(',').some((tag: string) => searchTags.includes(tag.trim()))
        : true
    ),
  ),
)
// Get the posts that have been searched for
const contentFound = ref<string[]>([])
const searchedPosts = computed(() => {
  const titleFilter = posts.value.filter((post: any) =>
    post.meta.frontmatter.title && post.meta.frontmatter.title.includes(search.value),
  )
  const descriptionFilter = posts.value.filter((post: any) =>
    post.meta.frontmatter.description && post.meta.frontmatter.description.includes(search.value),
  )
  const contentFilter = posts.value.filter((post: any) =>
    post.meta.frontmatter.content && post.meta.frontmatter.content.includes(search.value),
  )
  let allReleventPosts: any = new Set([...titleFilter, ...descriptionFilter, ...contentFilter])
  allReleventPosts = Array.from(allReleventPosts).map((post, index) => {
    return { item: post, refIndex: index, score: 0 }
  })
  if (contentFilter.length) {
    contentFound.value = contentFilter.map((post: any) =>
      post.meta.frontmatter.title,
    )
  }
  return search.value
    ? allReleventPosts
    : posts.value.map((val: any, key: number) => {
      return { item: val, refIndex: key, score: 0 }
    })
})

// Get all the tags based on the routes and the meta data attached to each route
const tags: any = computed(
  () => routes.filter((i: any) =>
    !i.path.endsWith('.html')
    && i.meta.frontmatter?.lang === lang.value
    && i.meta.frontmatter?.tags
    && (
      searchTags.length
        ? i.meta.frontmatter.tags.split(',').some((tag: string) => searchTags.includes(tag.trim()))
        : true
    ),
  )
    .map((post: any) =>
      post.meta.frontmatter?.tags && post.meta.frontmatter.tags.split(',')
        .map((tag: string) => tag.trim())).flat(2),
)
</script>
<template>
  <div class="mb-8">
    <h1
      class="!text-3xl lg:!text-6xl !mb-2"
      :class="searchTags.length ? '!font-light !text-middle' : '!font-black'"
    >
      Blog
      <span
        v-if="searchTags.length"
      >/ <span class="font-black text-primary">{{ searchTags.join(', ') }}</span></span>
    </h1>
    <p class="!text-base !my-4 !text-muted">
      A list of all of the blog posts I've written since becoming a software developer in 2020. I am mostly writing about the projects
      I'm working on and the things I've learned along the way. As-well-as my experience in software development industry.
    </p>
    <div class="relative w-full !my-4">
      <input
        ref="input"
        v-model="search"
        aria-label="Search articles"
        type="text"
        placeholder="Search articles by title, description, tags, and content"
        :class="`focus:outline-none bg-back
        border-middle placeholder:middle text-base
        px-4 py-2 border-2 focus:ring-secondary
        focus:border-secondary block w-full
        rounded-md text-primary`"
      >
      <svg
        class="absolute right-3 top-3 h-5 w-5 text-gray-400 dark:text-gray-300"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
      </svg>
    </div>
  </div>
  <div class="space-y-8">
    <router-link
      v-for="route in searchedPosts"
      :key="route.item.path"
      class="item block no-underline"
      :to="route.item.path"
    >
      <div class="group">
        <h2 v-if="route.item.meta.frontmatter.title" class="!text-xl lg:!text-3xl !my-1 !font-extrabold">
          <span v-html="highlight(route.item.meta.frontmatter.title)"></span>
        </h2>
        <p v-if="route.item.meta.frontmatter.description" class="!text-base !mb-2 !text-muted !group-hover:text-secondary">
          <span v-html="highlight(route.item.meta.frontmatter.description)"></span>
        </p>
        <div
          class="text-muted text-sm transition-colors duration-300 group-hover:text-secondary"
        >
          {{ formatDate(route.item.meta.frontmatter.date) }}
          <span v-if="route.item.meta.frontmatter.duration">·
            {{ route.item.meta.frontmatter.duration }}
          </span>
        </div>
      </div>
    </router-link>
  </div>
</template>
