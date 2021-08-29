<template>
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
  <div id="sitemap" class="grid grid-cols-2 gap-4">
    <div v-for="category in categories" :key="category" class="col-span-1" :class="category === '🤐' && 'opacity-0 hover:opacity-100'">
      <h1>{{ category[0].toUpperCase() + category.substring(1) }}</h1>
      <ul>
        <li v-for="item in categorizedRoutes[category]" :key="item.name">
          <router-link :to="item.path">
            {{ item?.meta?.frontmatter?.title || (item.path === '/:all(.*)*' ? '404' : item.path) }}
          </router-link>
        </li>
      </ul>
    </div>
    <div class="col-span-1">
      <h1>XML Sitemap</h1>
      <ul>
        <li>
          <a :href="DEVMODE ? '/sitemap' : '/sitemap.xml'">
            /sitemap.xml <span v-if="DEVMODE">| Only in Production</span>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import twemoji from 'twemoji'

// Querystring and input element
const search = ref<string>('')
const input = ref<HTMLElement | null>(null)
const updateSearchValue = (e: any) => search.value = e.target.value

const DEVMODE = import.meta.env.DEV
onMounted(() => {
  const sitemap = document.getElementById('sitemap')
  twemoji.parse(sitemap || 'sitemap', { className: 'twemoji' })
})
const categories = ['posts', 'notes', 'about', 'resources', '🤐']
const router = useRouter()
const routes = router.getRoutes().filter(r => r.name)
const categorizedRoutes: { [key: string]: any } = computed(() => {
  return {
    'posts': routes.filter((r: any) =>
      r.path && r.path.startsWith('/post')
      && (
        (r.meta?.frontmatter?.title && r.meta?.frontmatter?.title.includes(search.value))
        || (r.meta?.frontmatter?.content && r.meta?.frontmatter?.content.includes(search.value))
        || (r.meta?.frontmatter?.tags && r.meta?.frontmatter?.tags.includes(search.value))
        || (r.meta?.frontmatter?.description && r.meta?.frontmatter?.description.includes(search.value))
        || (r.path.includes(search.value))
      ),
    ),
    'notes': routes.filter((r: any) =>
      r.path && r.path.startsWith('/note')
      && (
        (r.meta?.frontmatter?.title && r.meta?.frontmatter?.title.includes(search.value))
        || (r.meta?.frontmatter?.content && r.meta?.frontmatter?.content.includes(search.value))
        || (r.meta?.frontmatter?.tags && r.meta?.frontmatter?.tags.includes(search.value))
        || (r.meta?.frontmatter?.description && r.meta?.frontmatter?.description.includes(search.value))
        || (r.path.includes(search.value))
      ),
    ),
    'about': routes.filter((r: any) =>
      r.path && ['/about', '/projects', '/uses', '/techstack', '/waterpolo', '/timeline'].includes(r.path)
      && (
        (r.meta?.frontmatter?.title && r.meta?.frontmatter?.title.includes(search.value))
        || (r.meta?.frontmatter?.content && r.meta?.frontmatter?.content.includes(search.value))
        || (r.meta?.frontmatter?.tags && r.meta?.frontmatter?.tags.includes(search.value))
        || (r.meta?.frontmatter?.description && r.meta?.frontmatter?.description.includes(search.value))
        || (r.path.includes(search.value))
      ),
    ),
    'resources': routes.filter((r: any) =>
      r.path && ['/boring', '/palette', '/sitemap'].includes(r.path)
      && (
        (r.meta?.frontmatter?.title && r.meta?.frontmatter?.title.includes(search.value))
        || (r.meta?.frontmatter?.content && r.meta?.frontmatter?.content.includes(search.value))
        || (r.meta?.frontmatter?.tags && r.meta?.frontmatter?.tags.includes(search.value))
        || (r.meta?.frontmatter?.description && r.meta?.frontmatter?.description.includes(search.value))
        || (r.path.includes(search.value))
      ),
    ),
    '🤐': routes.filter(r => r.path && ['/eastereggs', '/:all(.*)*', '/love'].includes(r.path)),
  }
})
</script>
