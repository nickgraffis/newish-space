<template>
  <div class="flex flex-wrap items-center text-lg -ml-2 my-2">
    <div v-if="!isLoading && userReactions" class="flex flex-wrap items-center">
      <div
        @click="addReaction(reaction)"
        v-for="(reaction, index) in Object.keys(userReactions.reactions).sort((a, b) => userReactions.reactions[b] - userReactions.reactions[a])"
        :key="index"
      >
        <div v-if="index < 6 || showAllReactions" class="py-0.25 px-3 text-xl bg-middle rounded-md cursor-pointer flex items-center space-x-2 m-2">
          <span v-html="twemoji.parse(reaction, { className: 'twemoji' })"></span>
          <span class="font-semibold text-sm">{{userReactions.reactions[reaction]}}</span>
        </div>
      </div>
      <div
        v-if="userReactions && Object.keys(userReactions.reactions).length > 7"
        @click="showAllReactions = !showAllReactions"
      >
        <div class="py-0.25 px-3 text-xl bg-middle rounded-md cursor-pointer flex items-center space-x-2 m-2">
          <svg v-if="!showAllReactions" xmlns="http://www.w3.org/2000/svg" class="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
          </svg>
          <svg v-if="showAllReactions" xmlns="http://www.w3.org/2000/svg" class="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4" />
          </svg>
        </div>
      </div>
    </div>
    <div 
      id="emoji-picker"
      ref="emojiPickerRef" 
      class="relative flex group cursor-pointer m-2"
    >
      <span 
        id="emojiPicker"
        @click="emojiPicker = !emojiPicker"
        class="py-0.25 px-3 text-xl bg-middle rounded-md relative" 
        v-html="twemoji.parse('😀', { className: 'twemoji filter-grayscale group-hover:filter-none' })"
      >
      </span>
      <div 
        class="absolute -bottom-26 transform transition-transform duration-150 origin-top-right right-0"
        :class="[emojiPicker ? 'scale-100' : 'scale-0']"
      >
        <div class="bg-middle rounded-md w-36 px-2 text-xl grid grid-cols-4 h-24 items-center justify-center">
          <span
            @click="addReaction(reaction)"
            v-for="reaction in reactions"
            :key="reaction"
            class="col-span-1 rounded-md cursor-pointer hover:bg-front p-0.5" 
            v-html="twemoji.parse(reaction, { className: 'twemoji' })"
          >
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import twemoji from 'twemoji';
  import { onClickOutside, onKeyStroke } from '@vueuse/core'
  import { emojiMap } from '../statics'
  import { Client, Call } from 'faunadb';
  import { useSWR } from 'vswr'
  import { commandFocus } from '../logics';
  const showAllReactions = ref<boolean>(false)
  onKeyStroke((e) => Object.keys(emojiMap).includes(e.key), (e) => {
    if (commandFocus.value) return false
    e.preventDefault()
    addReaction(emojiMap[e.key])
  })
  const { post } = defineProps<{ post: string }>()
  const reactions = ['😀', '🚀', '🤣', '👍', '🥳', '♥️', '👀', '👎']
  const emojiPicker = ref<boolean>(false)
  const emojiPickerRef = ref<HTMLElement | null>(null)
  let sessionReactions: number = 0

  onClickOutside(
    emojiPickerRef,
    (event) => emojiPicker.value = false,
    { event: 'mousedown' },
  )
  
  const faunaClient = new Client({
    secret: 'fnAERFohIWACQ_C7h1qYeIejqMpHS5EMwVPMKUv5'
  })

  const fetcher = () => faunaClient && faunaClient.query(
      Call('GetPostReactions', post)
    )
  const data = useSWR(post, {
    fetcher,
  })
  const userReactions: any = data.data

  const { mutate, isLoading } = data

  const addReaction = (emoji: string) => {
    // if (sessionReactions > 10) return
    if (Object.keys(userReactions.value.reactions).includes(emoji)) userReactions.value.reactions[emoji]++
    else userReactions.value.reactions[emoji] = 1
    emojiPicker.value = false
    sessionReactions++
    mutate(() => {
      faunaClient.query(
        Call("ReactToPost", [
          post, userReactions.value.reactions
        ])
      ).then().catch(err => console.log(err))
      return userReactions.value
    })
  }
</script>