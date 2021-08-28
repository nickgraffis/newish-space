<template>
  <div class="space-y-12 w-full">
    <div v-for="(projectCategory, index) of Object.keys(projects)" :key="index" class="w-full space-y-6">
      <h1 class="relative z-20 !text-4xl !text-secondary !mb-1">
        {{ projectCategory }}
      </h1>
      <div v-for="project of projects[projectCategory]" :key="project.github" class="w-full my-6">
        <ProjectCard :project="project" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import gitHubDataStore from '../logics/store'
const { projects } = defineProps<{ projects: { [key: string]: any} }>()
provide('gitHubDataStore', gitHubDataStore)
</script>
