import { shouldBeHighlightable, shouldHighlightLine, escapeHtml, Meta } from '../utils'
import { HtmlRendererOptions, preOpenerFromRenderingOptsWithExtras } from './plain'
import { FontStyle } from './stackElementMetadata'

type Lines = import('shiki').IThemedToken[][]

const FONT_STYLE_TO_CSS = {
  [FontStyle.Italic]: 'font-style: italic',
  [FontStyle.Bold]: 'font-weight: bold',
  [FontStyle.Underline]: 'text-decoration: underline',
}

export function defaultShikiRenderer(lines: Lines, options: HtmlRendererOptions, meta: Meta) {
  const bg = options.bg || '#fff'
  let html = ''
  const hasHighlight = meta.highlight && shouldBeHighlightable(meta.highlight)
  const hl = shouldHighlightLine(meta.highlight)

  html += preOpenerFromRenderingOptsWithExtras(options, meta, [])
  if (meta.title)
    html += `<div class='code-title'>${meta.title}</div>`

  if (options.langId)
    html += `<div class="language-id">${options.langId}</div>`

  html += '<code class=\'code-container\'>'

  lines.forEach((l, i) => {
    if (l.length === 0) {
      html += '<div class=\'line\'></div>'
    }
    else {
      const hiClass = hasHighlight ? (hl(i) ? ' highlight' : ' dim') : ''
      const prefix = `<div class='line${hiClass}'>`
      html += prefix

      l.forEach((token) => {
        const cssDeclarations = [`color: ${token.color || options.fg}`]
        if (token.fontStyle > FontStyle.None)
          cssDeclarations.push(FONT_STYLE_TO_CSS[token.fontStyle])

        html += `<span style="${cssDeclarations.join('; ')}" class="${token.explanation}">${escapeHtml(token.content)}</span>`
      })
      html += '</div>'
    }
  })

  html = html.replace(/\n*$/, '') // Get rid of final new lines
  html += '</code></pre>'
  return html
}
