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
        <div class="py-1 px-3 bg-back ring-2 ring-muted text-muted rounded-md font-semibold">
          GitHub
        </div>
        <div class="py-1 px-3 bg-back ring-2 ring-muted text-muted rounded-md font-semibold">
          Live Site
        </div>
        <div class="py-1 px-3 bg-back ring-2 ring-muted text-muted rounded-md font-semibold">
          Blog Post
        </div>
      </div>
      <LanguagesBreakdown v-if="gitHubData[github] && gitHubData[github].languages" :languages="gitHubData[github].languages" />
    </div>
  </div>
</template>

<script setup lang="ts">
import twemoji from 'twemoji'
const { project: { github, name, icon, description } } = defineProps<{ project: { github: string; name: string; icon: string; description: string} }>()
const { gitHubData, methods }: any = inject('gitHubDataStore')
if (github && import.meta.env.DEV) methods.fetchGitHubData(github)

onServerPrefetch(async() => {
  console.log(`prefetching data for ${name}`)
  await methods.fetchGitHubData(github)
  console.log(`data is ${gitHubData.value[github]}`)
})
</script>
