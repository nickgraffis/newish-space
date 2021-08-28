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

export const fetchGitHubData = async(repo: string) => {
  let repoData: RepoData = {}
  await get(`https://api.github.com/repos/${repo}`, {
    headers: {
      Authorization: `token ${import.meta.env.VITE_GITHUB_TOKEN}`,
    },
  })
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
    .catch(err => console.error(err))
  await get(`https://api.github.com/repos/${repo}/languages`, {
    headers: {
      Authorization: `token ${import.meta.env.VITE_GITHUB_TOKEN}`,
    },
  })
    .then(res => repoData.languages = res.data)
    .catch(err => console.error(err))

  return repoData
}
