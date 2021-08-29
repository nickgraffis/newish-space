---
title: Handling Twemojis and Reader Mode
date: 2021-08-29T00:31:23.074Z
lang: en
---

**_Need to do way more reserach on reader mode..._**

Parsing a markdown file and replacing emojis with twemojis has an issue. In reader mode, the img is not shown to proper size. 

I don't know of a way in CSS to identify weather or not we are in reader mode, but reader mode, _even on a deskotp or laptop_ will always be a small screen, so we can use native emojis on all small screens to fix this.

This is an example of a rule set up with [Markdown-it](https://markdown-it.github.io), but the concept would apply to any kind of situation.

```js
md.renderer.rules.text = (token, idx) => {
  return `
  <span class="emoji-wrapper">
    <span class="native-emoji">${token[idx].content}</span>
    ${twemoji.parse(token[idx].content, { className: 'twemoji' })}
  </span>
  `
}
```

```css
.twemoji {
  height: 1em;
  width: 1em;
  margin: 0 .05em 0 .1em; 
  /* Use WindiCSS to set up the display attribute 
  based on the screen size */
  @apply hidden lg:inline-block;
}

.native-emoji {
  /* Use WindiCSS to set up the display attribute
  based on the screen size */
  @apply lg:hidden inline-block;
}
```

Demo by checking this page out in reader mode :wink:. 