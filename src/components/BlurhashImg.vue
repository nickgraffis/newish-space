<!--
  BlurhashImg.vue
  Based on https://github.com/fpapado/blurhash-img
-->
<script setup lang="ts">
import { decode, isBlurhashValid } from 'blurhash'
import { ref } from 'vue-demi'

const { hash, aspectRatio } = defineProps({
  hash: {
    type: String,
    required: true,
  },
  aspectRatio: {
    type: Number,
    default: 1,
  },
})
const canvas = ref<HTMLCanvasElement | null>(null)

onMounted(() => {
  if (isBlurhashValid(hash)) {
    const pixels = decode(hash, 32, 32)
    const imageData = new ImageData(pixels, 32, 32)
    const context = canvas.value && canvas.value.getContext('2d')
    context && context.putImageData(imageData, 0, 0)
  }
})
</script>

<template>
  <div
    class="relative h-0"
    :style="`padding-bottom: ${aspectRatio * 100}%`"
  >
    <canvas
      ref="canvas"
      class="absolute top-0 left-0 right-0 bottom-0 w-full h-full rounded-md"
      width="32"
      height="32"
    />
  </div>
</template>
