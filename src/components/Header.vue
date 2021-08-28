<script setup lang="ts">
import { decode, isBlurhashValid } from 'blurhash'
import { useRouter } from 'vue-router'
import { nickPng } from '../assets/images/blurhash-map.json'
import { isDark, toggleDark } from '../logics'

const image = ref<HTMLImageElement | null>(null)
const isLoaded = ref<boolean>(false)
const isVisible = ref<boolean>(true)
const src = import.meta.env.MODE === 'development' ? '/src' + '/assets/images/nick.png' : '/assets/images/nick.png'
const canvas = ref<HTMLCanvasElement | null>(null)
const dropAbout = ref(false)
const router = useRouter()
const to = (route: string) => {
  dropAbout.value = !dropAbout.value
  router.push(route)
}
onMounted(() => {
  if (isBlurhashValid(JSON.parse(nickPng))) {
    const pixels = decode(JSON.parse(nickPng), 32, 32)
    const imageData = new ImageData(pixels, 32, 32)
    const context = canvas.value && canvas.value.getContext('2d')
    context && context.putImageData(imageData, 0, 0)
  }
})
</script>
<template>
  <nav
    class="max-w-4xl px-4 m-auto py-6 text-sm z-50 flex items-center justify-between w-full font-semibold text-nosferatu dark:text-cullen"
  >
    <router-link to="/" class="flex items-center justify-center h-full flex-shrink-0">
      <div class="relative">
        <img
          class="absolute z-20 !transition-opacity !duration-500 !rounded-full w-12 h-12 object-cover object-top ring ring-4 ring-offset-back ring-offset-4 ring-secondary"
          :src="src"
        />
        <div
          class="relative h-12 w-12 "
        >
          <canvas
            ref="canvas"
            class="absolute top-0 left-0 right-0 bottom-0 w-full h-full rounded-full"
            width="32"
            height="32"
          />
        </div>
      </div>
    </router-link>
    <div class="flex space-x-6 items-center lg:text-lg text-sm">
      <router-link to="/about" class="hover:text-secondary transition-colors duration-150">
        <p class="hidden lg:inline-flex">
          About
        </p>
        <noto:octopus class="lg:hidden inline-flex" />
      </router-link>
      <router-link to="/posts" class="hover:text-secondary transition-colors duration-150">
        <p class="hidden lg:inline-flex">
          Posts
        </p>
        <noto:rolled-up-newspaper class="lg:hidden inline-flex" />
      </router-link>
      <router-link to="/projects" class="hover:text-secondary transition-colors duration-150">
        <p class="hidden lg:inline-flex">
          Projects
        </p>
        <noto:laptop class="lg:hidden inline-flex" />
      </router-link>
      <a href="https://resume.nickgraffis.me" target="_blank" class="hover:text-secondary transition-colors duration-150">
        <p class="hidden lg:inline-flex">Resume</p>
        <p class="lg:hidden inline-flex">CV</p>
      </a>
      <a class="cursor-pointer lg:text-xl !text-base hover:text-secondary transition-colors duration-150" @click="toggleDark">
        <il:moon v-if="isDark" />
        <icon-park-outline:sun-one v-else />
      </a>
    </div>
  </nav>
</template>
