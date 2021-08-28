/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-console */
const fs = require('fs')
const chalk = require('chalk')
const yaml = require('js-yaml')

const create = () => {
  const projectsFile = fs.readFileSync('./src/pages/projects.md', 'utf8').split('---')
  const projects = yaml.safeLoad(projectsFile[1])
  const args = process.argv.slice(3)
  const newProject = {}

  args.forEach((a) => {
    const nameValue = a.split('=')
    newProject[nameValue[0]] = nameValue[1]
  })

  projects.projects[newProject.cat] = [
    ...projects.projects[newProject.cat],
    {
      ...(newProject.name) && { name: newProject.name },
      ...(newProject.icon) && { icon: newProject.icon },
      ...(newProject.description) && { description: newProject.description },
      ...(newProject.github) && { github: newProject.github.includes('/') ? newProject.github : `nickgraffis/${newProject.github}` },
    },
  ]

  fs.writeFileSync(
    './src/pages/projects.md',
    `---
${yaml.safeDump(projects)}
---${projectsFile[2]}`,
    'utf8',
  )

  console.log(chalk.cyan(`🙈 Added ${newProject.name} ${newProject.icon}!`))
}

module.exports = create
