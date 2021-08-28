<template>
  <div class="flex space-x-3 items-start w-full">
    <span v-if="icon" class="text-3xl mr-2" v-html="twemoji.parse(icon, { className: 'twemoji' })"></span>
    <div class="items-start w-full space-y-2">
      <div v-if="name" class="font-extrabold text-3xl flex space-x-4">
        <span class="whitespace-nowrap">{{ name }}</span>
        <Languages v-if="gitHubData && gitHubData.languages" :languages="gitHubData.languages" />
      </div>
      <div v-if="gitHubData && gitHubData.description && !description" class="text-muted text-lg">
        {{ gitHubData.description }}
      </div>
      <div v-if="description" class="text-muted text-lg">
        {{ description }}
      </div>
      <div class="flex space-x-4 py-2">
        <a v-if="gitHubData && gitHubData.homepage" target="_blank" :href="gitHubData.homepage" class="!no-underline py-1 px-3 cursor-pointer bg-back ring-2 ring-muted text-muted rounded-md font-semibold">
          Live Site
        </a>
        <a v-if="gitHubData && gitHubData.html_url" target="_blank" :href="gitHubData.html_url" class="!no-underline py-1 px-3 cursor-pointer bg-back ring-2 ring-muted text-muted rounded-md font-semibold">
          Repo
        </a>
        <router-link v-if="project.blog_post" target="_blank" :to="`/posts/${project.blog_post}`" class="!no-underline py-1 px-3 cursor-pointer bg-back ring-2 ring-muted text-muted rounded-md font-semibold">
          Repo
        </router-link>
      </div>
      <LanguagesBreakdown v-if="gitHubData && gitHubData.languages" :languages="gitHubData.languages" />
    </div>
  </div>
</template>

<script setup lang="ts">
import twemoji from 'twemoji'
import { RepoData, fetchGitHubData } from '../logics/store'

const { project: { github, name, icon, description } } = defineProps<{
  project: {
    github: string
    name: string
    icon: string
    description: string
    blog_post: string
  }
}>()
const gitHubData = ref<RepoData | null>(null)

const fetch = () => {
  if (github) {
    fetchGitHubData(github).then((data: RepoData) => {
      gitHubData.value = data
    })
  }
}

if (!gitHubData.value) fetch()
onServerPrefetch(async() => {
  const data: RepoData = await fetchGitHubData(github)
  gitHubData.value = data
})
</script>
