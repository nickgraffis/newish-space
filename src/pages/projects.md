---
title: Projects
lookingForFeedback: false
projects:
  Web Apps:
    - name: Petite Vin
      github: nickgraffis/petite-vin
      icon: '🍷'
    - name: Hadena
      github: nickgraffis/hadena-react-2
      icon: '🎏'
      description: Dear to my heart, my first web app project while taking CS50x. It went from vanilla js to now a React app with TailwindCSS and serverless functions with Netlify. Application accepts a query and finds images from UnSplash that match the query, but more importantly, finds the k-means clustering of those image's colors. You get back, quickly, the main color and a 6 part color palette. 
    - name: nickgraffis.me
      github: nickgraffis/ng-space
      icon: '🙈'
      description: This website, which was built with Vue 3, Vite, Vite-SSG, Markdown-it, and a ton of other great tools. It has a ton of fun things the deeper you dig! So feel free to dive in.
    - name: My Resume
      github: nickgraffis/resume
      icon: '👨🏻‍💼'
      description: A simple resume site built with Vite and handlebars. It uses JSON to store the resume data, base on the JSON Resume standard. It's styled with WindiCSS, and uses pupeteer to generate a PDFs of the resume's at build time. You can create multiple resumes quickly by having a new directory for each resume. It will use the same template, just add in a new resume.json and index.html. 
    - name: Neptune Blog
      github: nickgraffis/lo
      icon: '🪐'
      description: A minimalist web blog built with handlebars, express, and vanilla javascript. Uses a MySQL database, with static content stored in s3 buckets. The WYSIWYG editor is powered by Editorjs. Hosted on Heroku.
    - name: Spelling Bee
      github: nickgraffis/spelling-bee
      icon: '🐝'
      description: A copy of the NY Times Spelling Bee Game.
    - name: Flexbox Demo
      github: nickgraffis/flex-box-demo
      icon: '📦'
      description: Vanilla javascript from start to finsih, TailwindCSS. A good visual playground for learning about the awesome power of flexbox.
    - name: Youmoji
      github: nickgraffis/youmoji
      icon: '🥳'
      description: Vanilla javascript from start to finsih, TailwindCSS. Uses pieces of the twemoji set and lets you drag and drop them on top of each other to create your own emoji.
    - name: Edison High School Water Polo
      github: nickgraffis/hbedison
      icon: '⚡️'
      description: I coach water polo at Edison high school, and this is a simple static site to keep everyone up to date on the latest news.
    - name: Babel Box
      github: BAVEL-Technology/BabelBox-V1.0
      icon: '🤡'
      description: A project built with my collegues at Bavel, babel box is a super fun word game you can play with friends online. Built with handlebars, express, and vanilla javascript. Uses a NoSQL database hosted on mongodb atlas. Hosted on Heroku. There is also a partner here, the database and GUI to help navigate that is below.
    - name: Babel Box Database
      github: BAVEL-Technology/BabelBox
      icon: '💾'
      description: GUI for working with a mongo database hosted on mongodb atlas. Built with Svelte and tailwindcss, think AirTables, but better.
  Open Source: 
    - name: Vite Plugin Blurhash
      github: nickgraffis/vite-plugin-blurhash
      icon: '🌉'
    - name: Tailwind Color Palette Generator
      github: nickgraffis/tailwind-color-generator
      icon: '🎨'
    - name: Tailwind Toast
      github: nickgraffis/tailwind-toast
      icon: '🍞'
    - name: Tailwind Dracula Plugin
      github: dracula/tailwind
      icon: '🧛🏻‍♂️'
---
_All of the projects I am proud of. If the project's source code is hosted on GitHub, you'll see the language breakdown to the right, and a description underneath. Thanks for the interest!_

<ProjectsList :projects="frontmatter.projects" />