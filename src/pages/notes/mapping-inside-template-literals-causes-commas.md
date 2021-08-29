---
title: Map Inside Template Literals Causes Commas
date: 2021-08-29T19:46:57.077Z
lang: en
---

Template literals use the `toString()` method which by default joins the returned array by `map` with a  `,`.
To avoid this _"problem"_ you can use `join('')`[^1]

```js
const arr = [1, 2, 3]
const str = `Numbers: ${arr.map(x => x + 1).join('')}`
```

[^1]: [Stackoverflow](https://stackoverflow.com/questions/45812160/unexpected-comma-using-map)