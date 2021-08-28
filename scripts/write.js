/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-console */
const chalk = require('chalk')
const post = require('./post')
const note = require('./note')
const project = require('./projects')

const write = () => {
  if (!process.argv[2])
    console.log(chalk.red('✋ Missing Arguements!'))

  switch (process.argv[2]) {
    case 'post':
      if (!process.argv[3]) console.log(chalk.red('✋ Please specify a title!'))
      return post(process.argv[3], process.argv[4])
    case 'note':
      if (!process.argv[3]) console.log(chalk.red('✋ Please specify a title!'))
      return note(process.argv[3])
    case 'project':
      if (!process.argv[3]) console.log(chalk.red('✋ Please specify a title!'))
      return project()
    default:
      console.log(chalk.red('✋ Unknown Option!'))
  }
}

write()
