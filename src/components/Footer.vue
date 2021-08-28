<template>
  <footer class="max-w-2xl m-auto py-12 w-full flex flex-col items-center justify-center space-y-4">
    <nav class="flex flex-wrap justify-center items-center mt-8 text-muted">
      <router-link to="/" class="hover:text-primary m-4">
        Home
      </router-link>
      <router-link to="/posts" class="hover:text-primary m-4">
        Posts
      </router-link>
      <router-link to="/about" class="hover:text-primary m-4">
        About Me
      </router-link>
      <router-link to="/uses" class="hover:text-primary m-4">
        Uses
      </router-link>
      <router-link to="/techstack" class="hover:text-primary m-4">
        Tech Stack
      </router-link>
      <router-link to="/waterpolo" class="hover:text-primary m-4">
        Water Polo
      </router-link>
      <router-link to="/timeline" class="hover:text-primary m-4">
        Timeline
      </router-link>
      <router-link to="/projects" class="hover:text-primary m-4">
        Projects
      </router-link>
      <a href="https://resume.nickgraffis.me" class="hover:text-primary m-4" target="_blank" rel="noopener noreferrer">
        Resume
      </a>
      <router-link to="/sitemap" class="hover:text-primary">
        Site Map
      </router-link>
    </nav>
    <nav class="flex justify-center items-center text-muted flex-wrap">
      <a href="https://dribbble.com/nickgraffis" class="hover:text-primary m-4 flex-shrink-0" target="_blank" rel="noopener noreferrer">
        <span class="sr-only">Dribbble</span>
        <akar-icons:dribbble-fill class="h-5 w-5 lg:h-6 lg:w-6" />
      </a>
      <a href="https://www.instagram.com/nicholasgraffis/" class="hover:text-primary m-4 flex-shrink-0" target="_blank" rel="noopener noreferrer">
        <span class="sr-only">Instagram</span>
        <akar-icons:instagram-fill class="h-5 w-5 lg:h-6 lg:w-6" />
      </a>
      <a href="https://codepen.io/nickgraffis" class="hover:text-primary m-4 flex-shrink-0" target="_blank" rel="noopener noreferrer">
        <span class="sr-only">CodePen</span>
        <akar-icons:codepen-fill class="h-5 w-5 lg:h-6 lg:w-6" />
      </a>
      <a href="https://linkedin.com/in/nickgraffis" class="hover:text-primary m-4 flex-shrink-0" target="_blank" rel="noopener noreferrer">
        <span class="sr-only">Linkedin</span>
        <eva:linkedin-outline class="h-6 w-6 lg:h-7 lg:w-7" />
      </a>
      <a href="https://github.com/nickgraffis" class="hover:text-primary m-4 flex-shrink-0" target="_blank" rel="noopener noreferrer">
        <span class="sr-only">GitHub</span>
        <eva:github-outline class="h-6 w-6 lg:h-7 lg:w-7" />
      </a>
      <a href="https://twitter.com/nickgraffistwit" class="hover:text-primary m-4 flex-shrink-0" target="_blank" rel="noopener noreferrer">
        <span class="sr-only">Twitter</span>
        <eva-twitter-outline class="h-7 w-7 lg:h-8 lg:w-8" />
      </a>
    </nav>
    <p class="w-full justify-center text-muted hover:text-primary text-center flex-shrink-0 flex items-center space-x-2 text-xs lg:text-base text-center">
      <router-link to="/boring" aria-label="Boring" href="https://creativecommons.org/licenses/by-nc-sa/4.0/">
        CC BY-NC-SA 4.0 2021 &copy; Nick Graffis.
      </router-link>
    </p>
    <div class="flex items-center justify-center pb-8 flex-wrap">
      <router-link
        aria-label="Love"
        class="flex items-center justify-center rounded-full text-muted hover:text-buffyDark dark:hover:text-rose"
        to="/love"
      >
        <ant-design:heart-filled class="h-5 w-5 lg:h-6 lg:w-6 m-2" />
      </router-link>
      <!-- primary -->
      <div class="bg-primary h-4 w-4 rounded-full m-2"></div>
      <!-- secondary -->
      <div class="bg-secondary h-4 w-4 rounded-full m-2"></div>
      <!-- tertiary -->
      <div class="bg-tertiary h-4 w-4 rounded-full m-2"></div>
      <!-- rose -->
      <div class="bg-rose h-4 w-4 rounded-full m-2"></div>
      <!-- corn -->
      <div class="bg-corn h-4 w-4 rounded-full m-2"></div>
      <!-- front -->
      <div class="bg-front h-4 w-4 rounded-full m-2"></div>
      <!-- back -->
      <div class="bg-back ring ring-2 ring-rose h-4 w-4 rounded-full m-2"></div>
      <!-- middle -->
      <div class="bg-middle h-4 w-4 rounded-full m-2"></div>
      <!-- grass -->
      <div class="bg-grass h-4 w-4 rounded-full m-2"></div>
      <!-- muted -->
      <div class="bg-muted h-4 w-4 rounded-full m-2"></div>
      <router-link
        aria-label="Palette"
        class="flex m-2 items-center justify-center rounded-full text-muted hover:text-buffyDark dark:hover:text-rose"
        to="/palette"
      >
        <eva:color-palette-fill class="h-5 w-5 lg:h-6 lg:w-6" />
      </router-link>
    </div>
  </footer>
</template>
