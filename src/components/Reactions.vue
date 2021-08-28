<template>
  <div class="flex flex-wrap items-center text-lg -ml-2 my-2">
    <div v-if="userReactions" class="flex flex-wrap items-center">
      <div
        v-for="(reaction, index) in Object.keys(userReactions.reactions).sort((a, b) => userReactions.reactions[b] - userReactions.reactions[a])"
        :key="index"
        @click="addReaction(reaction)"
      >
        <div v-if="index < 6 || showAllReactions" class="py-0.25 px-3 text-xl bg-middle rounded-md cursor-pointer flex items-center space-x-2 m-2">
          <span v-html="twemoji.parse(reaction, { className: 'twemoji' })"></span>
          <span class="font-semibold text-sm">{{ userReactions.reactions[reaction] }}</span>
        </div>
      </div>
      <div
        v-if="userReactions && Object.keys(userReactions.reactions).length > 7"
        @click="showAllReactions = !showAllReactions"
      >
        <div class="py-0.25 px-3 text-xl bg-middle rounded-md cursor-pointer flex items-center space-x-2 m-2">
          <svg
            v-if="!showAllReactions"
            xmlns="http://www.w3.org/2000/svg"
            class="h-7 w-7"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
          </svg>
          <svg
            v-if="showAllReactions"
            xmlns="http://www.w3.org/2000/svg"
            class="h-7 w-7"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
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
        class="py-0.25 px-3 text-xl bg-middle rounded-md relative"
        @click="emojiPicker = !emojiPicker"
        v-html="twemoji.parse('😀', { className: 'twemoji filter-grayscale group-hover:filter-none' })"
      >
      </span>
      <div
        class="absolute -bottom-26 transform transition-transform duration-150 origin-top-right right-0"
        :class="[emojiPicker ? 'scale-100' : 'scale-0']"
      >
        <div class="bg-middle rounded-md w-36 px-2 text-xl grid grid-cols-4 h-24 items-center justify-center">
          <span
            v-for="reaction in reactions"
            :key="reaction"
            class="col-span-1 rounded-md cursor-pointer hover:bg-front p-0.5"
            @click="addReaction(reaction)"
            v-html="twemoji.parse(reaction, { className: 'twemoji' })"
          >
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import twemoji from 'twemoji'
import { onClickOutside, onKeyStroke } from '@vueuse/core'
import { Client, Call } from 'faunadb'
import { emojiMap } from '../statics'
import { commandFocus } from '../logics' // For the console that is not in use
const faunaClient = new Client({
  secret: `${import.meta.env.VITE_FAUNA_SCOPED_KEY}`,
})

const { post } = defineProps<{ post: string }>()

const showAllReactions = ref<boolean>(false)
// Default reactions
const reactions = ['😀', '🚀', '🤣', '👍', '🥳', '♥️', '👀', '👎']

// Logic to handle showing and hiding the emoji picker
const emojiPicker = ref<boolean>(false)
const emojiPickerRef = ref<HTMLElement | null>(null)
onClickOutside(
  emojiPickerRef,
  event => emojiPicker.value = false,
  { event: 'mousedown' },
)

// How we fetch the reactions from fauna
const fetcher = () => faunaClient && faunaClient.query(
  Call('GetPostReactions', post),
)

// We are not currently refreshing the reactions at any time
const userReactions = ref()
fetcher().then(data => userReactions.value = data)
const historicalReactions = ref()
const update = (emoji: string) => {
  historicalReactions.value = userReactions.value
  if (Object.keys(userReactions.value.reactions).includes(emoji)) userReactions.value.reactions[emoji]++
  else userReactions.value.reactions[emoji] = 1
  emojiPicker.value = false
}
const undo = () => userReactions.value = historicalReactions.value
const addReaction = (emoji: string) => {
  // Optemistic update
  update(emoji)

  // Update the db
  faunaClient.query(
    Call('ReactToPost', [
      post, userReactions.value.reactions,
    ]),
  ).then().catch((err) => {
    // If we get an unlikly error, undo the optimistic update
    undo()
    console.error(err)
  })
}

// 🥚 Add reactions from keystroke
onKeyStroke(e => Object.keys(emojiMap).includes(e.key), (e) => {
  if (commandFocus.value) return false
  e.preventDefault()
  addReaction(emojiMap[e.key])
})
</script>
