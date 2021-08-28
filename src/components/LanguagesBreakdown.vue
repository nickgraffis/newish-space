<template>
  <div class="flex flex-wrap -ml-2">
    <div
      v-for="lang of Object.keys(languages)"
      :key="lang"
      class="flex space-x-2 mx-2 items-center"
    >
      <div
        class="h-3 w-3 rounded-full"
        :style="{backgroundColor: langColors[lang]}"
      ></div>
      <div class="text-primary whitespace-nowrap">
        {{ lang }} - {{ Math.ceil(languages[lang] / totalBytes * 100) }}%
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { langColors } from '../statics'
const { languages } = defineProps<{ languages: {[key: string]: any}}>()

const totalBytes = Object.keys(languages).reduce((sum, key) => sum + parseFloat(languages[key] || 0), 0)
</script>
