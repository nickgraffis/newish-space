<script setup lang="ts">
import { useRouter } from 'vue-router'
type StarLocation = { top: string; left: string; width: string; height: string }

const router = useRouter()
const stars = new Array(25).fill(0)
const starStyle: StarLocation[] = []

stars.forEach(() => {
  const size = Math.floor(Math.random() * 6) + 3
  starStyle.push(
    {
      top: `${Math.floor(Math.random() * 100)}%`,
      left: `${Math.floor(Math.random() * 100)}%`,
      width: `${size}px`,
      height: `${size}px`,
    },
  )
})

// 🥚 Big Dipper Constelation
const constelationStyle: StarLocation[] = []
const constelation = new Array(7).fill(0)
constelationStyle.push({
  top: '150px',
  left: '150px',
  width: '6px',
  height: '6px',
})
constelationStyle.push({
  top: '150px',
  left: '300px',
  width: '6px',
  height: '6px',
})
constelationStyle.push({
  top: '175px',
  left: '400px',
  width: '6px',
  height: '6px',
})
constelationStyle.push({
  top: '225px',
  left: '500px',
  width: '6px',
  height: '6px',
})
constelationStyle.push({
  top: '225px',
  left: '700px',
  width: '6px',
  height: '6px',
})
constelationStyle.push({
  top: '350px',
  left: '700px',
  width: '6px',
  height: '6px',
})
constelationStyle.push({
  top: '350px',
  left: '500px',
  width: '6px',
  height: '6px',
})
</script>

<template>
  <div class="h-screen w-screen bg-back -top-[40rem] -left-[30rem] absolute">
  </div>
  <div class="w-screen h-screen bg-back fixed font-bold text-corn text-10xl flex items-center justify-center">
    <a class="top-36 z-40 absolute text-2xl font-semibold" @click="router.back()">
      The page you are looking for cannot be found.
    </a>
    <div class="z-50 relative">
      <div class="moon">
        <div class="shade dark:inline-flex hidden"></div>
      </div>
    </div>
    <p class="absolute z-40 text-center">
      4&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;4
    </p>
    <a
      class="cursor-pointer z-40 bottom-36 absolute bg-corn text-back px-6 py-2  rounded-md text-2xl font-semibold"
      @click="router.back()"
    >
      Back
    </a>
    <div
      v-for="(star, index) in stars"
      :key="index"
      class="z-30 absolute hidden dark:inline-flex rounded-full bg-corn"
      :style="starStyle[index]"
    />

    <div class="absolute top-0 left-0 w-full h-full">
      <div
        v-for="(star, index) in constelation"
        :key="index"
        class="w-full z-40 h-full flex items-center justify-center group"
      >
        <div
          class="z-40 absolute hidden dark:inline-flex rounded-full bg-corn constelation"
          :style="constelationStyle[index]"
        />
      </div>
    </div>
  </div>
</template>

<style lang="css">
  /** Lighmode shows a sun - so corn color */
  html:not(.dark) {
    --bg: var(--corn);
  }

  /** Darkmode shows a moon - so white (primary) color */
  html.dark {
    --bg: var(--primary);
  }

  .moon {
    background: var(--bg);
    height: 100px;
    width: 100px;
    border-radius: 100%;
  }

  .moon::before {
    content: '';
    position: absolute;
    opacity: 0.1;
    background: var(--bg);
    height: 140px;
    width: 140px;
    border-radius: 100%;
    left: -20px;
    top: -20px;
  }

  .moon::after {
    content: '';
    position: absolute;
    background: var(--bg);
    opacity: 0.2;
    height: 120px;
    width: 120px;
    border-radius: 100%;
    left: -10px;
    top: -10px;
  }

  .shade {
    position: absolute;
    left: 30px;
    top: 10px;
    opacity: 0.3;
    background: grey;
    height: 20px;
    width: 20px;
    border-radius: 100%;
  }

  .shade::before {
    content: '';
    position: absolute;
    background: grey;
    height: 10px;
    width: 10px;
    border-radius: 100%;
    top: 30px;
  }

  .shade::after {
    content: '';
    position: absolute;
    background: grey;
    height: 8px;
    width: 8px;
    border-radius: 100%;
    left: -15px;
    top: 15px;
  }
</style>
