/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs')
const glob = require('glob')
const axios = require('axios')

const getPageData = (file) => {
  const original = file.replace('dist', '').replace('.html', '.md')
  const path = `src/pages${original}`
  if (fs.existsSync(path)) {
    const stats = fs.statSync(path)
    return {
      loc: `https://nickgraffis.me${file.replace('dist', '').replace('.html', '/')}`,
      lastmod: stats.mtime.toISOString().split('T')[0],
    }
  }

  return null
}

glob('dist/**/*.html', (err, pages) => {
  if (err) return console.error(err)
  const sitemap = []
  pages.forEach((page) => {
    const data = getPageData(page)
    if (data) sitemap.push(data)
  })

  fs.writeFileSync('dist/sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${sitemap.map(({ loc, lastmod }) => `<url>
        <loc>${loc}</loc>
        <lastmod>${lastmod}</lastmod>
      </url>`).join('')}
  </urlset>
  `)

  // axios.post('https://www.google.com/ping?sitemap=https://nickgraffis.me/sitemap.xml')
})
