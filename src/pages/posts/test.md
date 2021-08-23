---
title: My new space
date: 2021-08-17T16:00:00Z
lang: en
tags: 'lighthouse, vite, vue, windi, blurhash, markdown'
description: Created this fun static site with Vite, Vue, and some other fun stuff. Hope you enjoy!
icon: carbon-rocket
---

<script setup lang="ts>
  import { lighthousePng } from '../../assets/images/blurhash-map.json'
</script>
Hey! My goal in creating my personal website was to provide a great, real world excersise for me to learn about some awesome technologies, and to provide a canvas for me to showcase a little about me and my thoughts.

[ ] Testing
1. This is a list
* Hello
* World
  * Testing

## First, the results
<LazyImage
  src="/assets/images/lighthouse.png"
  :blurhash="JSON.parse(lighthousePng)"
  :width="800"
  :height="200"
/>

```js
const helloWorld = 'Hello, world!'
function reverseString(str) {
  return str.split('').reverse().join('')
}

reverseString(helloWorld)
```
Here is a footnote reference,[^1] and another.[^longnote]

I really took care to make sure that I was creating something that left no stone unturned. I wanted a fast site, that did what it set out to do, well. _**There is always room for improvement, let me know if there is something off!**_.

I knew that something really important would be making sure I had a personal site that was extreamly easy and enjoyable to update, because if it wasn't; it wouldn't be updated. The biggest helpers in that mission were the following:

## Vue 3 & Vite 2
This is my first real attempt at using [Vue](https://vuejs.org). I'm using Vue 3 and a lot of the Composition API, which makes things extreamly simple. The cooler thing I am using is [Vite](https://vitejs.dev) which is absolutly awesome. It has truly spoiled me. It is really easy to use and super fast rendering, and extreamly customizable. So I'm using [markdown for static pages](https://github.com/antfu/vite-plugin-md), and generating all HTML server-side at build time with [vite-ssg](https://github.com/antfu/vite-ssg).

## Windi CSS
I used [Windi CSS](https://github.com/windicss/windicss) here for the first time. I love utility based CSS and have been pretty enomoured with TailwindCSS, but I was really trying to see if I could speed up my development process ans much as possible and WindiCSS has done this. Faster build (_even compared to TailwindCSS JIT_), faster rerender. 

[^1]: Here is the footnote.

[^longnote]: Here's one with multiple blocks.