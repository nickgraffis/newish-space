<template>
  <div v-if="openFunConsole" class="w-screen sticky bottom-12 relative z-50">
    <div class="right-12 bottom-0 bg-dark-700 rounded-lg w-1/3 absolute">
      <div class="relative">
        <div class="absolute top-2 left-2"><code class="text-white"> ></code></div>
        <input 
        @focus="commandFocus = true"
        @blur="commandFocus = false" 
        ref="input" 
        v-model="cmd" 
        style="font-family: Dank Mono" 
        class="text-white w-full appearance-none bg-dark-700 border-b-2 rounded-tl-lg rounded-tr-lg border-secondary py-2 pl-6 pr-4 focus:outline-none" 
        />
      </div>
      <div class="my-2 space-y-2 p-2 max-h-96 overflow-scroll text-left pb-8">
        <code class="text-white"> > </code>
        <code class="text-dark-50"> //You found the command palette :)</code>
        <div ref="ngConsole" :key="index" v-for="(cmd, index) in cmds">
          <code class="text-white"> > </code>
          <code v-if="isNaN(cmd) && cmd.includes('error')" class="text-red-500">{{cmd}}</code>
          <code 
          @mouseenter="hyperlink(cmd, index)" 
          @mouseleave="unhyperlink" 
          @click="(e) => possibleLink(e, cmd, index)"
          v-else 
          :class="[!isNaN(cmd) ? 'text-purple-500' : 'text-corn', hyperlinkIt === index ? 'text-blue-500 underline cursor-pointer' : '']"
          > 
          <span v-html="twemoji.parse(cmd, { className: 'twemoji' })"></span>
          </code>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { evaluate } from 'mathjs'
  import { onKeyUp, onKeyDown } from '@vueuse/core';
  import { useCssVar } from '@vueuse/core'
  import { matchedRouteKey, useRouter } from 'vue-router';
  import { isDark, toggleDark, commandFocus, postUserReactions, openFunConsole } from '../logics';
  import { Client, Call } from 'faunadb';
  import { currentPost } from '../logics';
  import twemoji from 'twemoji';
  const hyperlinkIt = ref<number | null>(null)
  const unhyperlink = () => hyperlinkIt.value = null
  const router = useRouter()
  const cmd = ref('')
  const cmds = ref<any[]>([])
  const ngConsole = ref<HTMLElement | null>(null)
  const input = ref<HTMLInputElement | null>(null)
  let meta = false

  const faunaClient = new Client({
    secret: 'fnAERFohIWACQ_C7h1qYeIejqMpHS5EMwVPMKUv5'
  })

  let ctrl = false
  onKeyDown((e) => true, (e) => {
    if (e.key === 'Control') {
      ctrl = true
    }
  })
  
  const possibleLink = (e: any, cmd: string, index: number) => {
    if (hyperlinkIt.value === index) {
      router.push(cmd)
    }
  }

  onKeyUp((e) => true, (e) => {
    console.log(e.key)
    if (e.key === 'Control') ctrl = false
  })

  onKeyDown('c', (e) => {
    if (ctrl) {
      openFunConsole.value = false
    }
  })

  const hyperlink = (str: string, index: number) => {
    if(str.includes('https://') && ctrl) hyperlinkIt.value = index;
  }

  onKeyDown((e) => true, (e) => {
    if (e.key === 'Meta') meta = true
  })

  onKeyUp((e) => true, (e) => {
    if (e.key === 'Meta') meta = false
  })

  onKeyUp('Enter', (e) => {
    e.preventDefault();
    if (cmd.value === 'skew()') {
      skew()
      cmds.value.push('skewed the page')
    }
    else if (cmd.value === 'unskew()') {
      unskew()
      cmds.value.push('unskewed the page')
    }
    else if (cmd.value === 'meaningOfLife()') {
      cmds.value.push(42)
    }
    else if (cmd.value === 'help()') cmds.value.push('No fun! It\'s a secret!')
    else if (cmd.value === 'clear()') cmds.value = []
    else if (cmd.value === 'dracula()') {
      document.documentElement.classList.replace(localStorage.getItem('theme') || '🧛🏻‍♂️', '🧛🏻‍♂️')
      localStorage.setItem('theme', '🧛🏻‍♂️')
      cmds.value.push('Switched to dracula theme')
    }
    else if (cmd.value === 'penguin()') {
      document.documentElement.classList.replace(localStorage.getItem('theme') || '🧛🏻‍♂️', '🐧')
      localStorage.setItem('theme', '🐧')
      cmds.value.push('Switched to penguin theme')
    }
    else if (cmd.value === 'help') {
      cmds.value.push('No fun! It\'s a secret!')
      cmds.value.push('But I will say, everything is a function call, like `help()`')
    }
    else if (cmd.value === 'uci()') cmds.value.push('Zot Zot! 💙💛')
    else if (cmd.value === 'GitHub()') cmds.value.push('https://github.com/nickgraffis')
    else if (cmd.value === 'Twitter()') cmds.value.push('https://twitter.com/nickgraffistwit')
    else if (cmd.value.match(/navigateTo\('(.*?)'\)/gm)) {
      const reg = /navigateTo\('(.*?)'\)/gm.exec(cmd.value)
      const route = reg ? reg[1] : '/'
      router.push(route)
      cmds.value.push(`Navigated to ${route}`)
    }
    else if (cmd.value.match(/math\('(.*?)'\)/gm)) {
      const reg = /math\('(.*?)'\)/gm.exec(cmd.value)
      const expression = reg ? reg[1] : '/'
      cmds.value.push(evaluate(expression).toString())
    }
    else if (cmd.value === 'toggleDark()') {
      cmds.value.push(`Switched to ${isDark.value ? 'light mode' : 'dark mode'}`)
      toggleDark()
    }
    else if (cmd.value.match(/cssVar\((.*?)\)/gm)) {
      const reg = /cssVar\((.*?)\)/gm.exec(cmd.value)
      const string: any = reg && reg[1].trim()
      const v = string?.split(',')[0]
      let col = string?.split(',')[1]
      console.log(document.documentElement)
      const color = useCssVar(v, document.documentElement)
      color.value = col
      cmds.value.push(`Set ${v} to ${col}`)
    }
    else if (cmd.value === 'wesley()') cmds.value.push('Woof Woof 🐶')
    else if (cmd.value.match(/reactWith\('(.*?)'\)/gm)) {
      const reg = /reactWith\('(.*?)'\)/gm.exec(cmd.value)
      const emoji: string = reg ? reg[1] : '🤷‍♂️'
      console.log(emoji)
      if (!currentPost.value) {
        cmds.value.push('error: No post to react with!')
      }
      console.log(postUserReactions.value.reactions)
      if (currentPost.value) {
        if (Object.keys(postUserReactions.value.reactions).includes(emoji)) postUserReactions.value.reactions[emoji]++
        else postUserReactions.value.reactions[emoji] = 1
        faunaClient.query(
          Call("ReactToPost", [
            currentPost.value, postUserReactions.value.reactions
          ])
        ).then().catch(err => console.log(err))
        cmds.value.push(`Reacted to ${currentPost.value} with ${emoji}`)
        cmds.value.push('You\'ll need to refresh though...')
      }
    }
    else cmds.value.push('error: command not found')
    ngConsole.value && ngConsole.value.scrollIntoView()
    cmd.value = ''
  })

  const skew = () => document.documentElement.classList.add('-skew-x-4');
  const unskew = () => document.documentElement.classList.remove('-skew-x-4');

  onMounted(() => {
    setTimeout(() => input.value && input.value.focus(), 1)
  })
</script>