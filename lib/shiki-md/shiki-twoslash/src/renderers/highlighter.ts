
import { loadTheme, getHighlighter, getTheme } from 'shiki'
import { Highlighter } from 'shiki/dist/highlighter'
import { commonLangIds, commonLangAliases, otherLangIds } from 'shiki-languages'

export const languages = [...commonLangIds, ...commonLangAliases, ...otherLangIds]

/**
 * This gets filled in by the promise in index.ts, then should
 * hopefully be more or less synchronous access by each parse
 * of the highlighter
 */
// eslint-disable-next-line import/no-mutable-exports
export let highlighter: Highlighter = null as any

export const getHighlighterObj = (options: import('shiki/dist/highlighter').HighlighterOptions) => {
  if (highlighter) return highlighter

  const settings = options || {}
  const theme: any = settings.theme || 'nord'
  let shikiTheme

  try {
    shikiTheme = getTheme(theme)
  }
  catch (error) {
    try {
      shikiTheme = loadTheme(theme)
    }
    catch (error) {
      throw new Error(`Unable to load theme: ${theme} - ${error.message}`)
    }
  }

  return getHighlighter({ theme: shikiTheme, langs: languages }).then((newHighlighter) => {
    highlighter = newHighlighter
    return highlighter
  })
}
