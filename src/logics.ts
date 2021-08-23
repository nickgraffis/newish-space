import { useDark, useToggle } from '@vueuse/core'
import { remove } from 'diacritics'
import axios from 'axios'
const { get } = axios
export function formatDate(string: string | Date) {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  const months = ['Jan', 'Feb', 'March', 'April', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']
  const date = new Date(string)
  const ellapsed = (new Date().getTime() / 1000) - (date.getTime() / 1000)
  if (ellapsed < 604800) {
    if (ellapsed < 3600)
      return `${Math.floor(ellapsed / 60)} minutes ago`

    else if (ellapsed < 86400)
      return `${Math.floor(ellapsed / 3600)} hours ago`

    else if (ellapsed < 60)
      return 'a few seconds ago'

    else
      return days[date.getDay()]
  }
  else if (ellapsed < 3154000) {
    return `${months[date.getMonth()]} ${date.getDate()}`
  }
  else {
    return `${months[date.getMonth()]} ${date.getDate()}`
  }
}
export const openFunConsole = ref(false)
export const commandFocus = ref(false)
export const isDark = useDark()
export const toggleDark: any = useToggle(isDark)
export const currentPost = ref('')
export const postUserReactions: any = ref<{reactions: {[key: string]: string}}>({ reactions: {} })
const rControl = /[\u0000-\u001F]/g
const rSpecial = /[\s~`!@#$%^&*()\-_+=[\]{}|\\;:"'<>,.?/]+/g
export const slugify = (str: string): string => {
  return (
    remove(str)
      // Remove control characters
      .replace(rControl, '')
      // Replace special characters
      .replace(rSpecial, '-')
      // Remove continuos separators
      .replace(/-{2,}/g, '-')
      // Remove prefixing and trailing separtors
      .replace(/^-+|-+$/g, '')
      // ensure it doesn't start with a number (#121)
      .replace(/^(\d)/, '_$1')
      // lowercase
      .toLowerCase()
  )
}

export type RepoData = {
  description?: string
  stars?: number
  forks?: number
  created_at?: string
  updated_at?: string
  pushed_at?: string
  homepage?: string
  html_url?: string
  languages?: { [key: string]: string }
}

const gitHubData = ref({})

const methods = {
  fetchGitHubData: async(repo: string) => {
    let repoData: RepoData = {}
    await get(`https://api.github.com/repos/${repo}`)
      .then(res => repoData = {
        description: res.data.description,
        stars: res.data.stargazers_count,
        forks: res.data.forks_count,
        created_at: res.data.created_at,
        updated_at: res.data.updated_at,
        pushed_at: res.data.pushed_at,
        homepage: res.data.homepage,
        html_url: res.data.html_url,
      })
      .catch(err => console.log(err))
    await get(`https://api.github.com/repos/${repo}/languages`)
      .then(res => repoData.languages = res.data)
      .catch(err => console.log(err))

    gitHubData.value = {
      ...gitHubData.value,
      [repo]: repoData,
    }
  },
}

export default {
  gitHubData,
  methods,
}
