---
title: My new space
date: 2021-08-17T16:00:00Z
lang: en
tags: 'lighthouse, vite, vue, windi, blurhash, markdown'
description: I created this fun static site with Vite, Vue, and some other fun stuff. Here is how I set it all up. Hope you enojoy!
---

Here is a tutorial about how I set up this site, and how it gets updated and utilized. Let me know if you have any questions! Feel free to leave a comment!

[[toc]]

# Setting Up Vite

## Vite Config
Generally this is pretty easy thanks to a lot of cool plugins. First, [vite-plugin-pages](https://github.com/hannoeru/vite-plugin-pages) is used, along with [vite-plugin-vue-layouts](https://github.com/JohnCampionJr/vite-plugin-vue-layouts), [vite-plugin-components](https://github.com/antfu/vite-plugin-components), [vite-ssg](https://github.com/antfu/vite-ssg), and [vite-plugin-vue-markdown](https://github.com/antfu/vite-plugin-md). 

Our file system is set up like this:
```
nickgraffis.me
│   vite.config.ts 
│   markdown.config.ts 
│
└───src
│   │   main.ts
│   │   App.vue
│   └───pages
│   │   │   ...file based routing
│   └───layouts
│   │   │   ...layouts for pages
│   └───components
│       │   ...Vue components
```

### Vite Plugin Pages & Vite Plugin Vue Layouts
This is a file based routing system for Vue and Vite. We set it up pretty simply:

```ts twoslash
import Pages from 'vite-plugin-pages'
import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import Layouts from 'vite-plugin-vue-layouts'
// ---cut---
export default defineConfig({
  plugins: [
    //...plugins
    Vue({
      include: [/\.vue$/, /\.md$/],
    }),
    Layouts(),
    Pages({
      pagesDir: 'src/pages',
      extensions: ['vue', 'md'],
    }),
  ]
})
```

Then inside of our `main.ts` file we get our routes generated for use, and we can use them inside of Vue.

```ts
import generatedRoutes from 'virtual:generated-pages'
import { setupLayouts } from 'virtual:generated-layouts'

const routes = setupLayouts(generatedRoutes)
```

### Vite SSG
Now that we have acess to our file based routes inside of the `src/pages` directory, we can set up our Vite-SSG app inside our `main.ts` file.

```ts
export const createApp = ViteSSG(App, { routes })
```

## Markdown
Because there is a lot to configure in the markdown, I pulled this configuration out into a seperate file, `markdown.config.ts`.

```ts
export const markdownWrapperClasses = 'prose prose-sm m-auto text-left'
export const markdownItShikiTwoslashSetup = async(settings: any) => {
  const { highlighters } = await setupForFile(settings)

  return (markdownit: any, options: any) => {
    markdownit.options.highlight = (code: string, lang: string, attrs: any) => {
      code = code.replace(/\r?\n$/, '') // strip trailing newline fed during code block parsing
      return transformAttributesToHTML(code, [lang, attrs].join(' '), highlighters, options!)
    }
  }
}

export default async() => {
  // Dracula Pro Theme is hidden because it isn't free
  const theme = await import('../shiki-themes/shiki-dracula.json').then(m => m.default)
  const Shiki = await markdownItShikiTwoslashSetup({ theme })

  return Markdown({
    wrapperComponent: 'post',
    wrapperClasses: markdownWrapperClasses,
    headEnabled: true,
    markdownItOptions: {
      quotes: '""\'\'',
    },
    markdownItSetup(md) {
      md.use(CodeCopy, {
        iconClass: 'heroicon heroicon-duplicate',
        iconStyle: '',
      })
      md.use(LinkAttributes, {
        pattern: /^https?:\/\//,
        attrs: {
          target: '_blank',
          rel: 'noopener',
        },
      })
      md.use(Emoji)
      md.renderer.rules.text = (token: any, idx: string) => {
        return `
        <span class="emoji-wrapper">
        <span class="native-emoji">${token[idx].content}</span>
        ${twemoji.parse(token[idx].content, { className: 'twemoji' })}
        </span>
        `
      }
      md.renderer.rules.emoji = (token: any, idx: string) => {
        return `
        <span class="emoji-wrapper">
        <span class="native-emoji">${token[idx].content}</span>
        ${twemoji.parse(token[idx].content, { className: 'twemoji' })}
        </span>
        `
      }
      md.use(Anchor, {
        permalink: Anchor.permalink.ariaHidden({
          symbol: '#',
          placement: 'before',
        }),
      })
      md.use(Footnote)
      md.use(Shiki)
      md.use(TableOfContents)
    },
  })
}

```

