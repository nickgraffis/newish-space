---
title: Create Sitemap Easily During Static Site Build
date: 2021-08-30T03:38:30.657Z
lang: en
description: <Write Description>
tags: ssg, ssr, sitemap, seo, xml, google, duckduckgo
---
# Create a Sitemap Easily Everytime you Deply your Site

A super simple script will do the trick here. You can have this script run after you've built your static site. So you'd have something like this as your build command:

```json
"build": "vite-ssg build && node scripts/create-sitemap.js"
```

Here is what the script would look like. It requires only one dependency, [glob](https://www.npmjs.com/package/glob). So first we'll install that:

```bash
npm i -D glob
```

Then we'll use _glob_ to recursively find all the html files in the _dist_ directory. Then we'll write the sitemap to the _dist_ directory.

```js
/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs')
const glob = require('glob')
const { get } = require('axios').default

// Get all the pages from your dist directory that end with .html
glob('dist/**/*.html', async(err, pages) => {
  if (err) return console.error(err)
  const sitemap = []
  pages.forEach((page) => {
    const data = {
      loc: `https://nickgraffis.me${file.replace('dist', '').replace('.html', '/')}`,
      // This will actually only give you the time of the build for most hosting platforms, 
      // such as Netlify as the platform will clone your repo from scratch and build it, and 
      // the last modified time will be the time of the build.
      lastmod: stats.mtime.toISOString().split('T')[0],
    }
    if (data) sitemap.push(data)
  })

  // Write them to your sitemap.xml file
  fs.writeFileSync('dist/sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${sitemap.map(({ loc, lastmod }) => `<url>
        <loc>${loc}</loc>
        <lastmod>${lastmod}</lastmod>
      </url>`).join('')}
  </urlset>
  `)

  // Ping Google that you've updated your sitemap
  await get('https://www.google.com/ping?sitemap=https://www.nickgraffis.me/sitemap.xml')
  // eslint-disable-next-line no-console
    .then(res => console.log('Google responded to the sitemap ping: ', res.status))
    .catch(err => console.error('Google responded to the sitemap ping: ', err))
})
```

If you want to be more careful with the `lastmod` date, you can store the last modified time of the file somewhere. If you're using `markdown` you can store it in the `lastModifiedDate` field of the frontmatter.

For this we'll need to add another modue, [js-yaml](https://www.npmjs.com/package/js-yaml).

```bash
npm i -D js-yaml
```

Then we'll use this to parse the frontmatter and get the last modified date. This does mean that whenever you update a post, you'll have to manually change the last modified date. 

```js {2-9} {15}
const fs = require('fs')
const yaml = require('js-yaml')

const getlastModifiedDate = (file) => {
  const page = fs.readFileSync(file, 'utf8').split('---')
  const frontmatter = yaml.safeLoad(page[1])

  return frontmatter.lastModifiedDate.toISOString().split('T')[0]
}


const sitemap = []
  pages.forEach((page) => {
    const data = {
      loc: `https://nickgraffis.me${file.replace('dist', '').replace('.html', '/')}`,
      lastmod: getlastModifiedDate(page),
    }
    if (data) sitemap.push(data)
  })
```

Another option could be the create a script that you run on your machine, that attaches a lastModifedDate to all of your markdown files. This is something you'd have to run before you published your site, and specifically not run in during your build.

_Let's table that for now....:wink:_