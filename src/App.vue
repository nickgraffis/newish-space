<script setup lang="ts">
  import { useHead } from '@vueuse/head'
  import { openFunConsole } from './logics' 

  // https://github.com/vueuse/head
  useHead({
    title: 'Nick Graffis',
    meta: [
      { name: 'description', content: 'Nick Graffis\'s Personal Website' },
    ],
  })
  </script>
  
  <template>
    <Alert>
      <ThemeToggle> <!-- TODO: Rename to Keyboard Events && Add Another Componennt for ThemeToggle -->
        <router-view />
        <FunConsole v-if="openFunConsole" /> <!-- TODO: Rename FunConsle, and Improve significantly -->
      </ThemeToggle>
    </Alert>
  </template>
  