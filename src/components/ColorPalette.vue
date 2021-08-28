<template>
  <code>Dark</code>
  <div class="flex flex-wrap -ml-2 my-4">
    <div v-for="color of Object.keys(themeColors.dark)" :key="color" class="flex flex-col m-2 space-y-2 items-start">
      <span class="h-8 w-8 rounded-md" :class="themeColors.dark[color]"></span>
      <code>{{ color }}</code>
    </div>
  </div>
  <code>Light</code>
  <div class="flex flex-wrap -ml-2 my-4">
    <div v-for="color of Object.keys(themeColors.light)" :key="color" class="flex flex-col m-2 space-y-2 items-start">
      <span class="h-8 w-8 rounded-md" :class="themeColors.light[color]"></span>
      <code>{{ color }}</code>
    </div>
  </div>
</template>

<script setup lang="ts">
const { palette } = defineProps<{ palette: string }>()
const themeColors = ref<{
  dark: { [key: string]: string }
  light: { [key: string]: string }
}>({ dark: {}, light: {} })

if (palette === 'dracula') {
  themeColors.value.dark = {
    'back': 'bg-nosferatu',
    'middle': 'bg-aro',
    'front': 'bg-vonCount',
    'primary': 'bg-cullen',
    'secondary': 'bg-morbius',
    'tertiary': 'bg-dracula',
    'rose': 'bg-buffy',
    'corn': 'bg-lincoln',
    'grass': 'bg-blade',
    'muted': 'bg-vonCount',
    'highlight-primary': 'bg-morbius',
  }

  themeColors.value.light = {
    'back': 'bg-blue-gray-50',
    'middle': 'bg-blue-gray-200',
    'front': 'bg-blue-gray-300',
    'primary': 'bg-cool-gray-700',
    'secondary': 'bg-purple-400',
    'tertiary': 'bg-orange-400',
    'rose': 'bg-red-400',
    'corn': 'bg-amber-400',
    'grass': 'bg-lime-500',
    'muted': 'bg-cool-gray-500',
    'highlight-primary': 'bg-purple-400',
  }
}

if (palette === 'penguin') {
  themeColors.value.dark = {
    'back': 'bg-oxford-600',
    'middle': 'bg-oxford-500',
    'front': 'bg-oxford-400',
    'primary': 'bg-caribbean-50',
    'secondary': 'bg-caribbean-500',
    'tertiary': 'bg-mago-500',
    'rose': 'bg-[#ff80bf]',
    'corn': 'bg-maiz-500',
    'grass': 'bg-[#1c6b48]',
    'muted': 'bg-oxford-100',
    'highlight-primary': 'bg-caribbean-500',
  }

  themeColors.value.light = {
    'back': 'bg-light-300',
    'middle': 'bg-light-700',
    'front': 'bg-light-900',
    'primary': 'bg-oxford-500',
    'secondary': 'bg-caribbean-500',
    'tertiary': 'bg-orange-500',
    'rose': 'bg-[#ff80bf]',
    'corn': 'bg-maiz-500',
    'grass': 'bg-[#1c6b48]',
    'muted': 'bg-oxford-600',
    'highlight-primary': 'bg-caribbean-400',
  }
}

if (palette === 'nord') {
  themeColors.value.dark = {
    'back': 'bg-nord-0',
    'middle': 'bg-nord-1',
    'front': 'bg-nord-2',
    'primary': 'bg-nord-5',
    'secondary': 'bg-nord-8',
    'tertiary': 'bg-nord-5',
    'rose': 'bg-nord-11',
    'corn': 'bg-nord-13',
    'grass': 'bg-nord-14',
    'muted': 'bg-nord-4',
    'highlight-primary': 'bg-nord-8',
  }

  themeColors.value.light = {
    'back': 'bg-nord-6',
    'middle': 'bg-nord-5',
    'front': 'bg-nord-4',
    'primary': 'bg-nord-1',
    'secondary': 'bg-nord-10',
    'tertiary': 'bg-nord-12',
    'rose': 'bg-nord-11',
    'corn': 'bg-nord-13',
    'grass': 'bg-nord-14',
    'muted': 'bg-nord-3',
    'highlight-primary': 'bg-nord-8',
  }
}
</script>
