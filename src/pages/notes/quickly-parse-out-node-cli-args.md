---
title: Quickly parse out node CLI args
date: 2021-08-27T22:17:29.531Z
lang: en
---
```bash
  $ node src/cli/cli.js new-project=my-project
```

```js
  const args = process.argv.slice(2)
  const newProject = {}

  args.forEach((a) => {
    const nameValue = a.split('=')
    newProject[nameValue[0]] = nameValue[1]
  })
```