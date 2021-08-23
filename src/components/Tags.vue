<template>
  <div class="w-full flex space-x-2 my-8" v-if="tags" >
    <div v-for="tag in tags" :key="tag">
      <span class="px-3 py-1 bg-secondary rounded-md font-semibold text-back">{{tag}}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
  const { tags } = defineProps<{ tags: string[]}>()
</script>