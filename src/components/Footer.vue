<script setup lang="ts">

  </script>
  
  <template>
    <footer class="py-12 dark:text-primary dark:bg-back w-full flex flex-col items-center justify-center">
      <nav
        class="text-gray-500 dark:text-gray-300 flex flex-wrap items-baseline justify-center text-sm lg:text-base space-x-8 space-y-2 lg:space-y-0"
        aria-label="Footer"
      >
      </nav>
      <nav class="flex justify-center items-center mt-8 space-x-6 text-gray-500 dark:text-gray-300">
        <a href="https://dribbble.com/nickgraffis" class="hover:text-gray-900 dark:hover:text-gray-200" target="_blank" rel="noopener noreferrer">
          <span class="sr-only">Dribbble</span>
          <akar-icons:dribbble-fill class="h-5 w-5 lg:h-6 lg:w-6" />
        </a>
        <a href="https://www.instagram.com/nicholasgraffis/" class="hover:text-gray-900 dark:hover:text-gray-200" target="_blank" rel="noopener noreferrer">
          <span class="sr-only">Instagram</span>
          <akar-icons:instagram-fill class="h-5 w-5 lg:h-6 lg:w-6" />
        </a>
        <a href="https://codepen.io/nickgraffis" class="hover:text-gray-900 dark:hover:text-gray-200" target="_blank" rel="noopener noreferrer">
          <span class="sr-only">CodePen</span>
          <akar-icons:codepen-fill class="h-5 w-5 lg:h-6 lg:w-6" />
        </a>
        <a href="https://linkedin.com/in/nickgraffis" class="hover:text-gray-900 dark:hover:text-gray-200" target="_blank" rel="noopener noreferrer">
          <span class="sr-only">Linkedin</span>
          <akar-icons:linkedin-fill class="h-6 w-6 lg:h-7 lg:w-7" />
        </a>
        <a href="https://github.com/nickgraffis" class="hover:text-gray-900 dark:hover:text-gray-200" target="_blank" rel="noopener noreferrer">
          <span class="sr-only">GitHub</span>
          <akar-icons:github-outline-fill class="h-6 w-6 lg:h-7 lg:w-7" />
        </a>
        <a href="https://twitter.com/nickgraffistwit" class="hover:text-gray-900 dark:hover:text-gray-200" target="_blank" rel="noopener noreferrer">
          <span class="sr-only">Twitter</span>
          <eva-twitter-outline class="h-6 w-6 lg:h-7 lg:w-7" />
        </a>
      </nav>
      <p class="w-full justify-center text-center mt-8 flex-shrink-0 flex items-center space-x-2 text-xs lg:text-base text-center text-gray-500 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-200">
        <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/" target="_blank" rel="noopener noreferrer">CC BY-NC-SA 4.0 2021 &copy; Nick Graffis.</a>
      </p>
      <div class="flex items-center justify-center py-8 space-x-4">
        <router-link
          aria-label="Love"
          class="flex items-center justify-center rounded-full text-gray-500 dark:text-gray-300 hover:text-buffyDark dark:hover:text-rose"
          to="/love"
        >
          <ant-design:heart-filled class="h-5 w-5 lg:h-6 lg:w-6" />
        </router-link>
        <div class="flex space-x-4 items-center">
          <!-- primary -->
          <div class="bg-primary h-4 w-4 rounded-full"></div>
          <!-- secondary -->
          <div class="bg-secondary h-4 w-4 rounded-full"></div>
          <!-- tertiary -->
          <div class="bg-tertiary h-4 w-4 rounded-full"></div>
          <!-- rose -->
          <div class="bg-rose h-4 w-4 rounded-full"></div>
          <!-- corn -->
          <div class="bg-corn h-4 w-4 rounded-full"></div>
          <!-- front -->
          <div class="bg-front h-4 w-4 rounded-full"></div>
          <!-- back -->
          <div class="bg-back ring ring-2 ring-rose h-4 w-4 rounded-full"></div>
          <!-- middle -->
          <div class="bg-middle h-4 w-4 rounded-full"></div>
          <!-- grass -->
          <div class="bg-grass h-4 w-4 rounded-full"></div>
        </div>
      </div>
    </footer>
  </template>
  