import Anchor from 'markdown-it-anchor'
import Emoji from 'markdown-it-emoji'
import twemoji from 'twemoji'
import LinkAttributes from 'markdown-it-link-attributes'
import Markdown from 'vite-plugin-md'
import Footnote from 'markdown-it-footnote'
import type { Highlighter } from 'shiki'
import { setupForFile, transformAttributesToHTML } from 'remark-shiki-twoslash'
import { sleep } from 'deasync'

import Shiki from 'markdown-it-shiki'
import CodeCopy from './src/markdown-it-code-copy'
// import 'prismjs/components/prism-regex'
// import 'prismjs/components/prism-javascript'
// import 'prismjs/components/prism-typescript'
// import 'prismjs/components/prism-xml-doc'
// import 'prismjs/components/prism-yaml'
// import 'prismjs/components/prism-json'
// import 'prismjs/components/prism-markdown'
// import 'prismjs/components/prism-java'
// import 'prismjs/components/prism-javadoclike'
// import 'prismjs/components/prism-javadoc'
// import 'prismjs/components/prism-jsdoc'
export const markdownWrapperClasses = 'prose prose-sm m-auto text-left'

export const markdownItShikiTwoslashSetup = async(settings) => {
  const { highlighters } = await setupForFile(settings)

  return (markdownit, options) => {
    markdownit.options.highlight = (code, lang, attrs) => {
      code = code.replace(/\r?\n$/, '') // strip trailing newline fed during code block parsing
      return transformAttributesToHTML(code, [lang, attrs].join(' '), highlighters, options!)
    }
  }
}

export default async() => {
  const Shiki = await markdownItShikiTwoslashSetup({ theme: 'nord' })

  return Markdown({
    wrapperComponent: 'post',
    wrapperClasses: markdownWrapperClasses,
    headEnabled: true,
    markdownItOptions: {
      quotes: '""\'\'',
    },
    markdownItSetup(md) {
      md.use(CodeCopy, {
        iconClass: 'heroicon heroicon-duplicate',
        iconStyle: '',
      })
      md.use(LinkAttributes, {
        pattern: /^https?:\/\//,
        attrs: {
          target: '_blank',
          rel: 'noopener',
        },
      })
      md.use(Emoji)
      md.renderer.rules.text = (token, idx) => {
        return twemoji.parse(token[idx].content, { className: 'twemoji' })
      }
      md.renderer.rules.emoji = (token, idx) => {
        return twemoji.parse(token[idx].content, { className: 'twemoji' })
      }
      md.use(Anchor, {
        permalink: true,
        permalinkBefore: true,
        permalinkSymbol: '#',
      })
      md.use(Footnote)
      md.use(Shiki)
    // md.use(Prism)
    },
  })
}
