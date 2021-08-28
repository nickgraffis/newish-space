---
title: Using pnpm and Netlify
date: 2021-08-28T21:38:37.835Z
lang: en
---
If you are using pnpm you're netlify build command will need to look like this:

```toml
[build]
  publish = "dist"
  command = "npx pnpm i --store=node_modules/.pnpm-store && npx pnpm run build"
```
