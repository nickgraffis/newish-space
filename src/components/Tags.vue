<template>
  <div v-if="tags" class="w-full flex space-x-2 my-8 cursor-pointer">
    <div v-for="tag in tags" :key="tag" @click="router.push(`/posts?tags=${tag}`)">
      <span class="px-3 py-1 bg-secondary rounded-md font-semibold text-back">{{ tag }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
const router = useRouter()
const { tags } = defineProps<{ tags: string[]}>()
</script>
