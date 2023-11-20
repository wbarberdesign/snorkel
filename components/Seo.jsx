import Head from 'next/head'
import React from 'react'

export const SEO = ({siteSettings, pageTitle}) => {
    return(
        <Head>
        <title>
        Dive Rakiura | {pageTitle}
        </title>
        <meta
        name="description"
        content={siteSettings.metaDescription}
        key="desc"
        />
        <link rel="icon" href="/favicon.png" sizes="any" />
        </Head>
    )
}