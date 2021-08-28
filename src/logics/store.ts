import axios from 'axios'
const { get } = axios

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
    const repoData: RepoData = {}
    // await get(`https://api.github.com/repos/${repo}`)
    //   .then(res => repoData = {
    //     description: res.data.description,
    //     stars: res.data.stargazers_count,
    //     forks: res.data.forks_count,
    //     created_at: res.data.created_at,
    //     updated_at: res.data.updated_at,
    //     pushed_at: res.data.pushed_at,
    //     homepage: res.data.homepage,
    //     html_url: res.data.html_url,
    //   })
    //   .catch(err => console.error(err))
    // await get(`https://api.github.com/repos/${repo}/languages`)
    //   .then(res => repoData.languages = res.data)
    //   .catch(err => console.error(err))

    // gitHubData.value = {
    //   ...gitHubData.value,
    //   [repo]: repoData,
    // }
  },
}

export default {
  gitHubData,
  methods,
}
