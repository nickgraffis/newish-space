/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-console */
const fs = require('fs')
const chalk = require('chalk')
const slugify = require('./slugify')

const create = (title, tags) => {
  const path = `src/pages/posts/${slugify(title)}.md`

  const template = `---
title: ${title}
date: ${new Date().toISOString()}
lang: en
description: <Write Description>
${tags ? `tags: ${tags}` : ''}
---
`
  fs.writeFile(path, template, (err) => {
    if (err) return console.log(err)
    console.log(chalk.cyan(`🙈 Created ${slugify(title)}.md!`))
    return true
  })
}

module.exports = create
