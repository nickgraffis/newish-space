<template>
  <slot></slot>
  <div class="w-screen flex justify-center sticky z-50 bottom-12">
    <transition name="fade">
      <div
        v-if="flashMessage"
        class="py-4 px-12 animate-animated animate-fade-in rounded-xl fade bg-middle bg-opacity-90 flex items-center justify-center"
        :class="fade"
      >
        <span v-html="message"></span>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
const flashMessage = ref<boolean>(false)
const message = ref('')
const fade = ref('animate-fade-in')
let timer: ReturnType<typeof setTimeout>
const updateNoticeMessage = (updateMessage: string) => {
  clearTimeout(timer)
  let classTimer: ReturnType<typeof setTimeout>
  timer = setTimeout(() => {
    clearTimeout(classTimer)
    fade.value = 'animate-fade-out'
    classTimer = setTimeout(() => flashMessage.value = false, 800)
  }, 2000)
  fade.value = 'animate-fade-in'
  flashMessage.value = true
  message.value = updateMessage
}
provide('updateNoticeMessage', updateNoticeMessage)
</script>
