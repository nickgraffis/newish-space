<template>
  <div class="grid grid-cols-2 my-16 gap-7">
    <div class="col-span-1">
      <p class="text-4xl font-bold">
        Top Posts
      </p>
      <div class="space-y-4">
        <div class="w-full ring-2 ring-front p-2 rounded-xl font-bold relative">
          <div class="absolute w-8/12 h-full bg-grass left-0 top-0 rounded-xl"></div>
          <span class="relative z-20">Working with Petite Vue.</span>
        </div>
        <div class="w-full ring-2 ring-front p-2 rounded-xl font-bold relative">
          <div class="absolute w-4/12 h-full bg-grass left-0 top-0 rounded-xl"></div>
          <span class="relative z-20">Working with Petite Vue.</span>
        </div>
        <div class="w-full ring-2 ring-front p-2 rounded-xl font-bold relative">
          <div class="absolute w-2/12 h-full bg-grass left-0 top-0 rounded-xl"></div>
          <span class="relative z-20">Working with Petite Vue.</span>
        </div>
      </div>
    </div>
    <div class="col-span-1">
      <p class="text-4xl font-bold">
        Biggest Referers
      </p>
      <div class="flex flex-wrap space-x-4 space-y-3">
        <div class="flex">
          <div class="rounded-full w-12 h-12 flex-grow bg-rose"></div>
        </div>
        <div class="flex">
          <div class="rounded-full w-36 h-36 flex bg-rose items-center justify-center text-back font-bold">
            npm.js
          </div>
        </div>
        <div class="flex">
          <div class="rounded-full w-16 h-16 flex bg-rose items-center justify-center text-back font-bold">
            GitHub
          </div>
        </div>
        <div class="flex">
          <div class="rounded-full w-64 h-64 flex bg-rose items-center justify-center text-back font-bold text-4xl">
            DuckDuckGo
          </div>
        </div>
        <div class="flex">
          <div class="rounded-full w-16 h-16 flex bg-rose items-center justify-center text-back font-bold">
            Google
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>

</script>
