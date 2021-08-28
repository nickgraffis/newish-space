export class FunFunctions {
  constructor() {

  }

  meaningOfLife() {
    return 42
  }

  help() {
    return 'No fun! It\'s a secret!'
  }

  dracula() {
    document.documentElement.classList.replace(localStorage.getItem('theme') || '🧛🏻‍♂️', '🧛🏻‍♂️')
    localStorage.setItem('theme', '🧛🏻‍♂️')
    return 'Switched to dracula theme'
  }

  penguin() {
    document.documentElement.classList.replace(localStorage.getItem('theme') || '🧛🏻‍♂️', '🐧')
    localStorage.setItem('theme', '🐧')
    return 'Switched to penguin theme'
  }

  nord() {
    document.documentElement.classList.replace(localStorage.getItem('theme') || '🧛🏻‍♂️', '🐺')
    localStorage.setItem('theme', '🐺')
    return 'Switched to nord theme'
  }

  uci() {
    return 'Zot Zot! 💙💛'
  }

  wesley() {
    return 'Woof Woof 🐶'
  }

  err() {
    return 'error: command not found'
  }
}
