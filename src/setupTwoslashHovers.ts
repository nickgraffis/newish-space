// Gets the position of an element relative to the whole page
const getAbsoluteElementPos = (element: HTMLElement) => {
  const bodyRect = document.body.getBoundingClientRect()
  const elemRect = element.getBoundingClientRect()
  const top = elemRect.top - bodyRect.top
  const left = elemRect.left - bodyRect.left
  return {
    top,
    left,
  }
}

// Hide it
const resetHover = () => {
  const globalPopover = document.getElementById('twoslash-mouse-hover-info')
  if (globalPopover) globalPopover.style.display = 'none'
}

// Get it
const findOrCreateTooltip = () => {
  let globalPopover = document.getElementById('twoslash-mouse-hover-info')
  if (!globalPopover) {
    globalPopover = document.createElement('div')
    globalPopover.style.position = 'absolute'
    globalPopover.id = 'twoslash-mouse-hover-info'
    document.body.appendChild(globalPopover)
  }
  return globalPopover
}

const getRootRect = (element: HTMLElement): DOMRect => {
  if (element.nodeName.toLowerCase() === 'pre')
    return element.getBoundingClientRect()

  return getRootRect(element.parentElement!)
}

const setupTwoslashHovers = () => {
  // prettier-ignore
  const twoslashes = document.querySelectorAll('.shiki.twoslash .code-container')

  // Gets triggered on the spans inside the codeblocks
  const hover = (event: Event) => {
    const hovered = event.target as HTMLElement
    if (hovered.nodeName !== 'DATA-LSP') return resetHover()
    const message = hovered.getAttribute('lsp')!
    const position = getAbsoluteElementPos(hovered)

    // Create or re-use the current hover div
    const tooltip = findOrCreateTooltip()

    // Use a textarea to un-htmlencode for presenting to the user
    const txt = document.createElement('textarea')
    txt.innerHTML = message
    tooltip.innerHTML = txt.value
    // remove shiki wrapper element
    const codeblock = tooltip.querySelector('code')
    tooltip.innerHTML = tooltip.querySelector('code') && codeblock
      ? codeblock.innerHTML
      : '<span>Could not find LSP</span>'

    // Offset it a bit from the mouse and present it at an absolute position
    const yOffset = 20
    tooltip.style.display = 'block'
    tooltip.style.fontSize = '18px'
    tooltip.style.top = `${position.top + yOffset}px`
    tooltip.style.left = `${position.left}px`

    // limit the width of the tooltip to the outer container (pre)
    const rootRect = getRootRect(hovered)
    const relativeLeft = position.left - rootRect.x
    tooltip.style.maxWidth = `${rootRect.width - relativeLeft}px`
  }

  twoslashes.forEach((codeblock) => {
    codeblock.addEventListener('mouseover', hover)
    codeblock.addEventListener('mouseout', resetHover)
  })
}

export default setupTwoslashHovers
