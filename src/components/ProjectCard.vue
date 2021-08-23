<template>
  <div class="flex space-x-3 items-start w-full">
    <span v-if="icon" class="text-3xl mr-2" v-html="twemoji.parse(icon, { className: 'twemoji' })"></span>
    <div class="items-start w-full space-y-2">
      <div v-if="name" class="font-extrabold text-3xl flex space-x-4">
        <span class="whitespace-nowrap">{{ name }}</span>
        <Languages v-if="languages" :languages="languages" />
      </div>
      <div v-if="repository && repository.description && !description" class="text-muted text-lg">
        {{ repository.description }}
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
      <LanguagesBreakdown v-if="languages" :languages="languages" />
    </div>
  </div>
</template>

<script setup lang="ts">
import axios from 'axios'
import twemoji from 'twemoji'
const { get } = axios
const { project: { github, name, icon, description } } = defineProps<{ project: { github: string; name: string; icon: string; description: string} }>()
const repository = ref<any>(null)
const languages = ref<any>(null)
// if (github) {
//   get(`https://api.github.com/repos/${encodeURI(github)}`, {
//     headers: {
//       Authorization: 'token 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',
//     },
//   })
//     .then(repo => repository.value = repo.data)
// }

// if (github) {
//   get(`https://api.github.com/repos/${encodeURI(github)}/languages`, {
//     headers: {
//       Authorization: 'token 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',
//     },
//   })
//     .then((repo) => {
//       languages.value = repo.data
//     })
// }

</script>
