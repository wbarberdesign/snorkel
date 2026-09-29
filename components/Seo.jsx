import Head from 'next/head'
import { useRouter } from 'next/router'
import React from 'react'

const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || 'https://www.stewartislandsnorkel.co.nz'
).replace(/\/$/, '')

export const SEO = ({ siteSettings, pageTitle }) => {
  const router = useRouter()
  const path = router.asPath.split('?')[0].split('#')[0]
  const canonical =
    path === '/' ? `${SITE_URL}/` : `${SITE_URL}${path}`

  return (
    <Head>
      <title>Dive Rakiura | {pageTitle}</title>
      <meta
        name="description"
        content={siteSettings[0].metaDescription}
        key="desc"
      />
      <link rel="canonical" href={canonical} key="canonical" />
      <link rel="icon" href="/favicon.png" sizes="any" />
    </Head>
  )
}