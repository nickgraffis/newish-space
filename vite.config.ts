import path from 'path'
import fs from 'fs'
import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import WindiCSS from 'vite-plugin-windicss'
import Pages from 'vite-plugin-pages'
import Layouts from 'vite-plugin-vue-layouts'
import ViteComponents from 'vite-plugin-components'
import Blurhash from 'vite-plugin-blurhash'
import markdownToTxt from 'markdown-to-txt'
import ViteIcons, { ViteIconsResolver } from 'vite-plugin-icons'
import matter from 'gray-matter'
// import { generate, test } from './previewify'
// import { remove } from 'diacritics'
import MarkdownSetup, { markdownWrapperClasses } from './markdown.config'

// eslint-disable-next-line no-control-regex
// const rControl = /[\u0000-\u001F]/g
// const rSpecial = /[\s~`!@#$%^&*()\-_+=[\]{}|\\;:"'<>,.?/]+/g
// const slugify = (str: string): string => {
//   return (
//     remove(str)
//       // Remove control characters
//       .replace(rControl, '')
//       // Replace special characters
//       .replace(rSpecial, '-')
//       // Remove continuos separators
//       .replace(/-{2,}/g, '-')
//       // Remove prefixing and trailing separtors
//       .replace(/^-+|-+$/g, '')
//       // ensure it doesn't start with a number (#121)
//       .replace(/^(\d)/, '_$1')
//       // lowercase
//       .toLowerCase()
//   )
// }

// https://vitejs.dev/config/

export default defineConfig(async() => {
  const MarkdownIt = await MarkdownSetup()

  return {
    resolve: {
      alias: {
        '~/': `${path.resolve(__dirname, 'src')}/`,
      },
    },
    plugins: [
      Vue({
        include: [/\.vue$/, /\.md$/],
      }),
      // https://github.com/antfu/vite-plugin-windicss
      WindiCSS({
        safelist: markdownWrapperClasses,
      }),
      // https://github.com/hannoeru/vite-plugin-pages
      Pages({
        pagesDir: 'src/pages',
        extensions: ['vue', 'md'],

        extendRoute(route) {
          const p = path.resolve(__dirname, route.component.slice(1))
          if (p.split('.').pop() === 'md') {
            const md = fs.readFileSync(p, 'utf-8')
            const { data, content } = matter(md) || { data: {}, content: '' }
            const min = (md.split('').length / 6.7) / 200
            data.duration = `${Math.ceil(min)} min read`
            const removeScripts = content.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
            const removeHTML = removeScripts.replace(/(<([^>]+)>)/ig, '')
            data.content = markdownToTxt(removeHTML)
            // if (data.title && data.description) generate(data.title, data.description, slugify(data.title)).then(() => console.log('done'))
            route.meta = Object.assign(route.meta || {}, { frontmatter: data })
          }
          return route
        },
      }),
      // https://github.com/JohnCampionJr/vite-plugin-vue-layouts
      Layouts(),
      // https://github.com/antfu/vite-plugin-md
      MarkdownIt,
      ViteComponents({
        globalComponentsDeclaration: true,
        extensions: ['vue', 'md'],
        customLoaderMatcher: path => path.endsWith('.md'),
        customComponentResolvers: [
        // https://github.com/antfu/vite-plugin-icons
          ViteIconsResolver({
            componentPrefix: '',
          // enabledCollections: ['carbon']
          }),
        ],
      }),
      ViteIcons(),
      // https://github.com/nickgraffis/vite-plugin-blurhash
      Blurhash({
        define: false,
      }),
    ],
    server: {
      fs: {
        strict: true,
      },
      proxy: {
        '/api': {
          target: 'http://localhost:8888/.netlify/functions',
          changeOrigin: true,
          rewrite: path => path.replace(/^\/api/, ''),
        },
      },
    },
  }
})
