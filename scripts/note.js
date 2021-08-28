/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-console */
const fs = require('fs')
const chalk = require('chalk')
const slugify = require('./slugify')

// eslint-disable-next-line no-use-before-define
const create = (title) => {
  title = slugify(title)
  const path = `src/pages/notes/${title}.md`
  const template = `---
title: ${title}
date: ${new Date().toISOString()}
lang: en
---
`
  fs.writeFile(path, template, (err) => {
    if (err) return console.log(err)
    console.log(chalk.cyan(`🙈 Created ${title}.md!`))
    return true
  })
}

module.exports = create
