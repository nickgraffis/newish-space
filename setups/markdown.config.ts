import Anchor from 'markdown-it-anchor'
import Emoji from 'markdown-it-emoji'
import twemoji from 'twemoji'
import LinkAttributes from 'markdown-it-link-attributes'
import Markdown from 'vite-plugin-md'
import Footnote from 'markdown-it-footnote'
import TableOfContents from 'markdown-it-table-of-contents'
import { setupForFile, transformAttributesToHTML } from '../lib/shiki-md'
import CodeCopy from '../src/markdown-it-code-copy'

export const markdownWrapperClasses = 'prose prose-sm m-auto text-left'
export const markdownItShikiTwoslashSetup = async(settings: any) => {
  const { highlighters } = await setupForFile(settings)

  return (markdownit: any, options: any) => {
    markdownit.options.highlight = (code, lang, attrs) => {
      code = code.replace(/\r?\n$/, '') // strip trailing newline fed during code block parsing
      return transformAttributesToHTML(code, [lang, attrs].join(' '), highlighters, options!)
    }
  }
}

export default async() => {
  // Dracula Pro Theme is hidden because it isn't free
  const theme = await import('../shiki-themes/shiki-dracula.json').then(m => m.default)
  const Shiki = await markdownItShikiTwoslashSetup({ theme })

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
        return `
        <span class="emoji-wrapper">
        <span class="native-emoji">${token[idx].content}</span>
        ${twemoji.parse(token[idx].content, { className: 'twemoji' })}
        </span>
        `
      }
      md.renderer.rules.emoji = (token, idx) => {
        return `
        <span class="emoji-wrapper">
        <span class="native-emoji">${token[idx].content}</span>
        ${twemoji.parse(token[idx].content, { className: 'twemoji' })}
        </span>
        `
      }
      md.use(Anchor, {
        permalink: Anchor.permalink.ariaHidden({
          symbol: '#',
          placement: 'before',
        }),
      })
      md.use(Footnote)
      md.use(Shiki)
      md.use(TableOfContents)
    },
  })
}
