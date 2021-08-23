<script setup lang="ts">
  import { nickPng } from "../assets/images/blurhash-map.json";
  import { decode, isBlurhashValid } from 'blurhash'
  import { isDark, toggleDark } from '../logics'
  import { useRouter } from 'vue-router'

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
      <div class="flex space-x-6 items-center text-lg">
        <div class="relative hidden lg:inline-flex">
          <div class="group flex items-center space-x-2 cursor-pointer" @click="dropAbout = !dropAbout">
            <span class="transition-all duration-300 group-hover:text-secondary">About</span>
            <akar-icons:chevron-right class="transition-all duration-300 h-4 w-4 transform group-hover:text-secondary" :class="{ 'rotate-90': dropAbout }" />
          </div>
          <div
            class="rounded-md absolute top-8 right-0 transition-all duration-300 z-50 px-2 overflow-hidden transform origin-top-right"
            :class="[dropAbout ? 'scale-100 opacity-100' : 'scale-0 opacity-0']"
          >
            <ul class="space-y-2 text-left bg-middle w-36 rounded-md p-1">
              <li class="flex space-x-2 items-center transition-colors duration-300 hover:text-back rounded-md p-1 hover:bg-secondary cursor-pointer" @click="to('/about')">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Just Me</span>
              </li>
              <li class="flex space-x-2 items-center transition-colors duration-300 hover:text-back rounded-md p-1 hover:bg-secondary cursor-pointer" @click="to('/about')">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
                <span>Tech Stack</span>
              </li>
              <li class="flex space-x-2 items-center transition-colors duration-300 hover:text-back rounded-md p-1 hover:bg-secondary cursor-pointer" @click="to('/about')">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>Uses</span>
              </li>
              <li class="flex space-x-2 items-center transition-colors duration-300 hover:text-back rounded-md p-1 hover:bg-secondary cursor-pointer" @click="to('/waterpolo')">
                <la-volleyball-ball />
                <span>Water Polo</span>
              </li>
            </ul>
          </div>
        </div>
        <router-link to="/posts" class="">
          <p>Blog</p>
        </router-link>
        <a href="https://resume.nickgraffis.me" class="">
          <p>Resume</p>
        </a>
        <a class="cursor-pointer text-xl" @click="toggleDark">
          <il:moon v-if="isDark" />
          <icon-park-outline:sun-one v-else />
        </a>
      </div>
    </nav>
  </template>