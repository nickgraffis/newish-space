---
title: 🥚 Easter Eggs
---
<script setup lang="ts">
  import { isDark, toggleDark } from "../logics"
</script>

I guess this defeats the purpose of having easter eggs...but I wanted to collect all of the features of my app into one place. If you want to try out some of the stuff, go ahead 😉.

# 🙈 Reactions
You can add reactions to most articles, by default you have eight options: :smile:, :rocket:, :rofl:, :thumbsup:, :thumbsdown:, :partying_face:, :heart:, :eyes:. You can also get pretty fancy by using your keyboard on any pageto add reactions. Try it out with `A - Z`. 

If you ever add a reaction that you wish you hadn't added, try ⌘ + Z.

Reactions are a pretty simple implementation of [FaunaDB](https://faunadb.com).[^1]

# 🔎 Global Search
⌘ + K at any time will pull up the search bar. You can search for any article, or try asking it a few questions. 

# 📊 Analytics
<div class="my-4">
  <div class="bg-blade h-4 w-4 rounded-full animate-animated animate-pulse"></div>
</div>
First off, everything is this is fully [GDPR, CCPA and PECR](https://usefathom.com/compliance) compliant, as it’s opt-in by you.

I don't use any cookies or anything that actually is tracking who you are. I do, however, use some for of analytics to see how many people are using my app. I want to be really transparent about that so checkout [my stats page](/stats).

### How do I know who is using the app?
I use your IP address, and the device type you are using to get an idea of weather you are a unique user or not. This isn't perfect, because your IP address may change. However, this is a simple way to get a good idea of user statistics.

### What do I watch for while using the app?
* I check how many times people view each article, both unique views and total views.
* I keep track of how many times people use the search bar, both the one of the [blog](/posts) page and the global search bar.
* I keep track of the general location (based on IP address) and device type of people using the app.
* I keep track of how you were refered to the app, google, twitter, github, etc.

### What if I don't want to be tracked?
* You can use localStorage to disable tracking. Just run this function in your console.
```js
casper.blockTrackingForMe();
```
* Again, I don't think I am doing anything too intrusive, and I think I am trying to be extramly forthcoming about what I am using all of this data for. I'd love to keep getting info about who is using the app, and how they are using it. So if you ever want to jump back in:

```js
casper.enableTrackingForMe();
```

# 🎨 Themes
There are three themes, each with dark mode and light mode. You can toggle between themes with ⌘ + ← or →. And to toggle between light and dark mode you can hit:

<div class="flex">
  <div @click="toggleDark" class="text-3xl p-2 rounded-md hover:bg-secondary cursor-pointer" v-if="isDark">
    <il:moon />
  </div>
  <div @click="toggleDark" class="text-3xl p-2 rounded-md hover:bg-secondary cursor-pointer" v-if="!isDark">
    <icon-park-outline:sun-one />
  </div>
</div>

You can also use ⌘ + Shift.

## 🐧 Penguin Theme
`html.🐧.dark`
<p class="flex items-center">
  <div class="w-6 h-6 rounded-md bg-caribbean-50"></div> 
  &nbsp; <code>Primary</code>
</p>
<p class="flex items-center">
  <div class="w-6 h-6 rounded-md bg-caribbean-500"></div> 
  &nbsp; <code>Secondary</code>
</p>
<p class="flex items-center">
  <div class="w-6 h-6 rounded-md bg-mango-500"></div> 
  &nbsp; <code>Tertiary</code>
</p>

## 🧛‍♂️ Dracula Theme
## 🐺 Nord Theme

# 👨‍💻 Command Palette
A kind of fun option is the use the command palette. ⌘ + Shift + P will open the palette for you. This is avliable anywhere on the site, and doesn't relly do anthing useful. 

It is secure however, so it only runs defined functions. You can try out 
```bash
math('2 + 2')
``` 
if you want, but for the most part, I'll keep this undocumented, as I don't even know what functions I wrote any more :rofl:. Ctrl + C will close the palette.

[^1]: FaunaDB is a database that stores your data in a way that makes it easy to query and visualize. Check out [Using FaunaDB JavaScript Driver Client Side, With Custom Roles]().