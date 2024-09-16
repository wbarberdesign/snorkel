import { PortableText } from '@portabletext/react'
import Link from 'next/link'
/* eslint-disable react-hooks/rules-of-hooks */
import { createClient } from 'next-sanity'
import React from 'react'

import { Image } from '../../components/Image'
import { Layout } from '../../components/Layout'

export default function blogs({ blogs, siteSettings }) {
  const data = blogs[0]
  console.log(blogs)
  return (
    <Layout siteSettings={siteSettings} pageTitle="Blogs">
      <nav className="flex-middle flex-s-between mobile-only pd-y--xs pd-x--s flex">
        <Link href="/">
          <svg
            width="5"
            height="9"
            viewBox="0 0 5 9"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4.70001 0.848015L1.31601 4.17202L4.68801 7.47202L3.99201 8.18002L0.0320129 4.17202L4.00401 0.140015L4.70001 0.848015Z"
              fill="white"
            />
          </svg>
        </Link>
        <p className="small">Blog</p>
        <span></span>
      </nav>
      <section className="gc gc pd-top--m pd-bottom--l pd-x--l gap--s m-pd--s">
        <h1 className="small span-12">Blog</h1>
        {blogs.map((blog, index) => (
          <Link
            className="span-4 t-span-6 m-span-12 gap--xs flex-column flex"
            href={`/blog/${blog.slug.current}`}
            key={index}
          >
            {blog.galleryBlocks && (
              <Image
                client={client}
                image={blog.galleryBlocks[0].image}
                alt={blog.title}
              />
            )}
            <h2>{blog.title}</h2>
          </Link>
        ))}
      </section>
    </Layout>
  )
}

const client = createClient({
  projectId: 'yfcljbw1',
  dataset: 'production',
  apiVersion: '2022-03-25',
  useCdn: false,
})

export async function getStaticProps() {
  const blogs = await client.fetch(`*[_type == "blog"]`)
  const siteSettings = await client.fetch(`*[_type == "siteSettings"]`)

  return {
    props: {
      blogs,
      siteSettings,
    },
  }
}
