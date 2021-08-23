<template>
  <div class="h-1 rounded-full w-full bg-blue-500 relative my-4 flex-grow">
    <div 
    class="absolute h-1" 
    :class="[index === 0 && 'rounded-tl-full rounded-bl-full', index === Object.keys(languages).length - 1 && 'rounded-tr-full rounded-br-full']"
    v-for="(lang, index) of Object.keys(languages).sort((a, b) => languages[b] - languages[a])" 
    :key="lang"
    :style="{
      width: `${(languages[lang] / totalBytes) * 100}%`,
      backgroundColor: `${langColors[lang]}`,
      left: howFarLeft(index)
    }"
    ></div>
  </div>
</template>

<script setup lang="ts">
  import { langColors } from '../statics'
  const { languages } = defineProps<{ languages: { [key: string]: any }}>()

  const howFarLeft = (index: number) => {
    if (index === 0) return '0%'
    const prevBytes = Object.keys(languages).splice(0, index).reduce((sum,key)=>sum+parseFloat(languages[key]||0),0)
    return ((prevBytes / totalBytes) * 100) + '%'
  }
  const totalBytes = Object.keys(languages).reduce((sum,key)=>sum+parseFloat(languages[key]||0),0)
</script>