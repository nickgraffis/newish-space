---
title: Vueuse Head Breaks with Viewport
date: 2021-08-27T22:17:29.531Z
lang: en
---
Strange behavior on `@vueuse/head` with `viewport`:

```ts twoslash {7}
import { useHead } from '@vueuse/head'
useHead({
  title: 'Nick Graffis',
  meta: [
    { name: 'title', content: 'Nick Graffis' },
    { name: 'description', content: 'Nick Graffis\'s Personal Website' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1.0' },
  ],
})
```

Gives the following error:

```bash
ReferenceError: Node is not defined
    at /Users/nickgraffis/Sites/newish-space/node_modules/@vueuse/head/dist/index.js:202:55
```

```ts twoslash
import { useHead } from '@vueuse/head'
useHead({
  title: 'Nick Graffis',
  meta: [
    { name: 'title', content: 'Nick Graffis' },
    { name: 'description', content: 'Nick Graffis\'s Personal Website' },
  ],
})
```

Works fine :shrug:.