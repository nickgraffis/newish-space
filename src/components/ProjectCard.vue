<template>
  <div class="flex space-x-3 items-start w-full">
    <span v-if="icon" class="text-3xl mr-2" v-html="twemoji.parse(icon, { className: 'twemoji' })"></span>
    <div class="items-start w-full space-y-2">
      <div v-if="name" class="font-extrabold text-3xl flex space-x-4">
        <span class="whitespace-nowrap">{{ name }}</span>
        <Languages v-if="gitHubData[github] && gitHubData[github].languages" :languages="gitHubData[github].languages" />
      </div>
      <div v-if="gitHubData[github] && gitHubData[github].description && !description" class="text-muted text-lg">
        {{ gitHubData[github].description }}
      </div>
      <div v-if="description" class="text-muted text-lg">
        {{ description }}
      </div>
      <div class="flex space-x-4 py-2">
        <a v-if="gitHubData[github] && gitHubData[github].homepage" target="_blank" :href="gitHubData[github].homepage" class="!no-underline py-1 px-3 cursor-pointer bg-back ring-2 ring-muted text-muted rounded-md font-semibold">
          Live Site
        </a>
        <a v-if="gitHubData[github] && gitHubData[github].html_url" target="_blank" :href="gitHubData[github].html_url" class="!no-underline py-1 px-3 cursor-pointer bg-back ring-2 ring-muted text-muted rounded-md font-semibold">
          Repo
        </a>
        <router-link v-if="project.blog_post" target="_blank" :to="`/posts/${project.blog_post}`" class="!no-underline py-1 px-3 cursor-pointer bg-back ring-2 ring-muted text-muted rounded-md font-semibold">
          Repo
        </router-link>
      </div>
      <LanguagesBreakdown v-if="gitHubData[github] && gitHubData[github].languages" :languages="gitHubData[github].languages" />
    </div>
  </div>
</template>

<script setup lang="ts">
import twemoji from 'twemoji'
const { project: { github, name, icon, description } } = defineProps<{
  project: {
    github: string
    name: string
    icon: string
    description: string
    blog_post: string
  }
}>()
const { gitHubData, methods }: any = inject('gitHubDataStore')
if (github && import.meta.env.DEV) methods.fetchGitHubData(github)

onServerPrefetch(async() => {
  await methods.fetchGitHubData(github)
})
</script>
