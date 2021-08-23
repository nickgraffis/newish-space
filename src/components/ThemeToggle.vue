<script setup lang="ts">
  import twemoji from 'twemoji'
  import { onKeyStroke, onKeyDown, onKeyUp } from '@vueuse/core';
  import { isDark, toggleDark, openFunConsole } from '../logics'

  onMounted(() => {
    const themesMap: {[key: string]: string} = {
    '🐺': 'Nord',
    '🧛🏻‍♂️': 'Dracula',
    '🐧': 'Penguin'
  }

  const themes = Object.keys(themesMap)
  const currentTheme = ref<string>(localStorage.getItem('theme') || '🧛🏻‍♂️')
  const flashMessage = inject<(message: string) => void>('updateNoticeMessage')
  const newTheme = (dir: boolean) => {
    const index = themes.indexOf(currentTheme.value)
    const next = dir ? themes[index === 2 ? 0 : index + 1] : themes[index === 0 ? 2 : index - 1]
    return next
  }

  let meta = false
  onKeyDown((e) => true, (e) => {
    if (e.key === 'Meta') meta = true
  })

  onKeyUp((e) => true, (e) => {
    if (e.key === 'Meta') meta = false
  })

  let shift = false

  onKeyDown((e) => true, (e) => {
    if (e.key === 'Shift') shift = true
  })

  onKeyUp((e) => true, (e) => {
    if (e.key === 'Shift') shift = false
  })

  onKeyDown('p', (e) => {
    if (meta && shift) {
      openFunConsole.value = true
    }
  })

  onKeyStroke((e) => e.key === 'ArrowRight' || e.key === 'ArrowLeft', (e) => {
    if (meta) {
      e.preventDefault()
      const dir = e.key === 'ArrowRight'
      const next = newTheme(dir)
      console.log(currentTheme.value, ' to ', next)
      document.documentElement.classList.replace(currentTheme.value, next)
      flashMessage && flashMessage(`
        <div class="text-primary font-semibold text-xl flex flex-col items-center space-y-4">
          <span class="text-5xl mr-2">${twemoji.parse(next, { className: 'twemoji' })}</span> 
          <p>
            ${themesMap[next]} Theme 
            <span class="px-2 py-1 ml-2 text-sm border-primary border-2 rounded-md mx-2">⌘ ${e.key === 'ArrowRight' ? '→' : '←'}</span>
          </p>
        </div>
      `)
      currentTheme.value = next
      localStorage.setItem('theme', next)
    }
  })

  onKeyStroke((e) => e.key === 'ArrowUp' || e.key === 'ArrowDown', (e) => {
    if (meta) {
      e.preventDefault()
      toggleDark()
      const icon = isDark.value ? '🌝' : '🌞'
      const message = isDark.value ? 'Dark' : 'Light'
      flashMessage && flashMessage(`
          <div class="text-primary font-semibold text-xl flex flex-col items-center space-y-4">
            <span class="text-5xl mr-2">${twemoji.parse(icon, { className: 'twemoji' })}</span> 
            <p>
              ${message} Mode 
              <span class="px-2 py-1 ml-2 text-sm border-primary border-2 rounded-md mx-2">⌘ Shift</span>
            </p>
          </div>
        `)
      }
    })
  })
</script>

<template>
  <slot></slot>
</template>