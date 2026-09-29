import { client } from '../sanity/lib/client'

const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || 'https://www.stewartislandsnorkel.co.nz'
).replace(/\/$/, '')

const STATIC_PATHS = ['/', '/tours', '/gallery', '/locations', '/blog']

function escapeXml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

function urlEntry(loc, lastmod) {
  const lastmodLine = lastmod ? `\n    <lastmod>${lastmod}</lastmod>` : ''
  return `  <url>
    <loc>${escapeXml(loc)}</loc>${lastmodLine}
  </url>`
}

function formatLastmod(iso) {
  if (!iso) return undefined
  return new Date(iso).toISOString().split('T')[0]
}

export async function getServerSideProps({ res }) {
  const blogs = await client.fetch(
    `*[_type == "blog" && defined(slug.current)] | order(publicationDate desc) {
      "slug": slug.current,
      _updatedAt
    }`
  )

  const urls = STATIC_PATHS.map((path) =>
    urlEntry(path === '/' ? `${SITE_URL}/` : `${SITE_URL}${path}`)
  )

  for (const blog of blogs) {
    urls.push(
      urlEntry(
        `${SITE_URL}/blog/${blog.slug}`,
        formatLastmod(blog._updatedAt)
      )
    )
  }

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join('\n')}
</urlset>
`

  res.setHeader('Content-Type', 'text/xml; charset=utf-8')
  res.setHeader(
    'Cache-Control',
    'public, s-maxage=3600, stale-while-revalidate=86400'
  )
  res.write(sitemap)
  res.end()

  return { props: {} }
}

export default function Sitemap() {
  return null
}
