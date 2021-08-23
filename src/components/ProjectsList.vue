<template>
  <div class="space-y-12 w-full">
    <div v-for="(projectCategory, index) of Object.keys(projects)" :key="index" class="w-full space-y-6">
      <div class="w-full justify-end relative flex items-center">
        <div class="h-1 w-full absolute bg-secondary top-5 opacity-85"></div>
        <div class="bg-back relative pl-8 !font-bolds flex items-center justify-center">
          <div class="relative">
            <h1 class="relative z-20">{{projectCategory}}</h1>
            <!-- <div class="absolute h-2 bg-secondary w-full top-6.5 opacity-85"></div> -->
          </div>
        </div>
      </div>
      <div v-for="project of projects[projectCategory]" :key="project.github" class="w-full my-6">
        <ProjectCard :project="project" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  const { projects } = defineProps<{ projects: { [key: string]: any} }>()
</script>