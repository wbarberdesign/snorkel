import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  message: string
  revalidated?: boolean
  error?: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  // Check for secret to confirm this is a valid request
  const secret = req.query.secret || req.headers['x-sanity-secret']
  if (secret !== process.env.SANITY_REVALIDATE_SECRET) {
    console.error('Invalid revalidation secret')
    return res.status(401).json({ message: 'Invalid token' })
  }

  try {
    // Sanity webhooks send the document in the body
    const body = req.body
    const _type = body._type

    if (!_type) {
      console.error('Missing _type in webhook payload:', JSON.stringify(body))
      return res.status(400).json({ 
        message: 'Missing _type in webhook payload',
        error: 'No _type found'
      })
    }

    console.log(`Revalidating for type: ${_type}`)

    // Revalidate based on document type
    if (_type === 'blog') {
      // Revalidate blog index page
      await res.revalidate('/blog')
      
      // Revalidate specific blog post if slug is provided
      const slug = body.slug?.current || body.slug
      if (slug) {
        console.log(`Revalidating blog post: /blog/${slug}`)
        await res.revalidate(`/blog/${slug}`)
      }
    } else if (_type === 'gallery') {
      await res.revalidate('/gallery')
    } else if (_type === 'tours') {
      await res.revalidate('/tours')
    } else if (_type === 'locations') {
      await res.revalidate('/locations')
    } else if (_type === 'home') {
      await res.revalidate('/')
    } else if (_type === 'siteSettings') {
      // Revalidate all pages that use siteSettings
      await res.revalidate('/')
      await res.revalidate('/blog')
      await res.revalidate('/gallery')
      await res.revalidate('/tours')
      await res.revalidate('/locations')
    } else {
      console.log(`Unknown document type: ${_type}, skipping revalidation`)
      return res.json({ 
        message: `Document type ${_type} not configured for revalidation`,
        revalidated: false 
      })
    }

    console.log(`Successfully revalidated for type: ${_type}`)
    return res.json({ 
      message: 'Revalidation successful',
      revalidated: true 
    })
  } catch (err) {
    // If there was an error, Next.js will continue
    // to show the last successfully generated page
    console.error('Revalidation error:', err)
    return res.status(500).json({ 
      message: 'Error revalidating',
      error: err instanceof Error ? err.message : 'Unknown error',
      revalidated: false 
    })
  }
}
