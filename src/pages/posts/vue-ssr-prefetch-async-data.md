---
title: Vue 3 SSR Prefetch Async Data
date: 2021-08-28T19:47:57.053Z
lang: en
description: Use Vue 3 and the Composti API to prefetch data asynchronously during SSR builds.
tags: vue, ssr, ssg, vite
---
If you have a static site generator, like this one, that is trying to display some asynchronous data, you probably want that data to be fetched on the server side, during the build process. After that you may refetch data to ensure it is up to date, or not if you know the data doesn't change often. 

In this example we're tyring to show GitHub API stats. The first thing we do is set up our component:

## Template
This will be really basic for our example, just show the github repo's descripton.
```vue
<template>
  <p>{{ repo.description}} </p>
</template>
```

## Script
```ts twoslash
type RepoData = {
  description?: string
  stars?: number
  forks?: number
  created_at?: string
  updated_at?: string
  pushed_at?: string
  homepage?: string
  html_url?: string
  languages?: { [key: string]: string }
}
import { ref } from 'vue'
// ---cut---
import axios from 'axios'
const { get } = axios

const repo = ref<RepoData | null>(null)

const fetch = async() => {
  const data = await get(`https://api.github.com/repos/nickgraffis/petite-vin`)
  repo.value = data.data
}

fetch()
```

This will work well, but the problem is that we will get the data everytime we load the page, and when we build the site we will not be prefetching the data, so it will not exist as html. 

This is where we can use the Composti API to prefetch data asynchronously during SSR builds. Using the `onServerPrefetch()` hook. At the same time here, we will also add a check to see if `repo.value` is null. If it is, we will fetch the data, but if it is not, then we already fetched in serverside and we wont do it again.

```ts twoslash {11-15}
type RepoData = {
  description?: string
  stars?: number
  forks?: number
  created_at?: string
  updated_at?: string
  pushed_at?: string
  homepage?: string
  html_url?: string
  languages?: { [key: string]: string }
}
import { ref, onServerPrefetch } from 'vue'
// ---cut---
import axios from 'axios'
const { get } = axios

const repo = ref<RepoData | null>(null)

const fetch = async() => {
  const data = await get(`https://api.github.com/repos/nickgraffis/petite-vin`)
  repo.value = data.data
}

if (!repo.value) fetch()

onServerPrefetch(async() => {
  await fetch()
})
```