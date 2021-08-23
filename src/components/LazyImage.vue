<template>
  <div ref="target" class="relative" :class="`h-[${height}px]`">
     <!-- Show the real image on the top and fade in after loading -->
    <img
      ref="image"
      class="absolute z-20 top-0 left-0 transition-opacity duration-500 rounded-md object-cover"
      :class="isLoaded ? `opacity-100 ${className} h-[${height}px]` : `opacity-0 ${className} h-[${height}px]`"
      :width="width"
    >
    <!-- Show the placeholder as background -->
    <BlurhashImg
      :hash="blurhash"
      :aspect-ratio="height / width"
      class="absolute z-10 top-0 left-0 transition-opacity duration-500"
      :class="isLoaded ? 'opacity-100' : 'opacity-100'"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue-demi'
import { useIntersectionObserver } from '@vueuse/core'
const isLoaded = ref<boolean>(false)
const isVisible = ref<boolean>(false)
const { src, width, height, className } = defineProps({
  src: {
    type: String,
    required: true
  },
  className: {
    type: String,
    required: false
  },
  blurhash: {
    type: String,
    required: false,
    default: null,
  },
  width: {
    type: Number,
    default: 1,
  },
  height: {
    type: Number,
    default: 1,
  },
})

const target = ref<HTMLElement | null>(null)
const image = ref<HTMLImageElement | null>(null)

  useIntersectionObserver(
  target,
  ([{ isIntersecting }]) => {
    if(isIntersecting && !isVisible.value) {
      isVisible.value = true
      if (image.value) {
        image.value.src = import.meta.env.MODE === 'development' ? '/src' + src : src
        image.value.onload = () => {
          console.log('loaded')
          isLoaded.value = true
        }
      }
    }
  }
)
</script>