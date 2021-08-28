<template>
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
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import twemoji from 'twemoji'
onMounted(() => {
  const sitemap = document.getElementById('sitemap')
  twemoji.parse(sitemap || 'sitemap', { className: 'twemoji' })
})
const categories = ['posts', 'notes', 'about', 'resources', '🤐']
const router = useRouter()
const routes = router.getRoutes().filter(r => r.name)
const categorizedRoutes: { [key: string]: any } = {
  'posts': routes.filter(r => r.path && r.path.startsWith('/post')),
  'notes': routes.filter(r => r.path && r.path.startsWith('/note')),
  'about': routes.filter(r => r.path && ['/about', '/projects', '/uses', '/techstack', '/waterpolo', '/timeline'].includes(r.path)),
  'resources': routes.filter(r => r.path && ['/boring', '/palette', '/sitemap'].includes(r.path)),
  '🤐': routes.filter(r => r.path && ['/eastereggs', '/:all(.*)*', '/love'].includes(r.path)),
}
</script>
