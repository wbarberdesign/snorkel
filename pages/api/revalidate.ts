import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  message: string
  revalidated?: boolean
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  // Check for secret to confirm this is a valid request
  if (req.query.secret !== process.env.SANITY_REVALIDATE_SECRET) {
    return res.status(401).json({ message: 'Invalid token' })
  }

  try {
    const { _type, slug } = req.body

    // Revalidate based on document type
    if (_type === 'blog') {
      // Revalidate blog index page
      await res.revalidate('/blog')
      
      // Revalidate specific blog post if slug is provided
      if (slug?.current) {
        await res.revalidate(`/blog/${slug.current}`)
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
    }

    return res.json({ 
      message: 'Revalidation successful',
      revalidated: true 
    })
  } catch (err) {
    // If there was an error, Next.js will continue
    // to show the last successfully generated page
    return res.status(500).json({ 
      message: 'Error revalidating',
      revalidated: false 
    })
  }
}
