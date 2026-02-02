import type { NextApiRequest, NextApiResponse } from 'next'
import { parseBody, config } from 'next-sanity/webhook'

// Disable body parsing, as we're using parseBody from next-sanity/webhook
export { config }

type WebhookPayload = {
  _type: string
  slug?: {
    current: string
  }
}

type Data = {
  message: string
  revalidated?: boolean
  error?: string
  now?: number
  body?: WebhookPayload
}

/**
 * This API route handles Sanity webhooks to trigger revalidation
 * Set up a webhook in Sanity: https://www.sanity.io/manage
 * 
 * Webhook URL: https://your-domain.com/api/revalidate
 * Secret: Set in SANITY_REVALIDATE_SECRET env variable
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  try {
    const { isValidSignature, body } = await parseBody<WebhookPayload>(
      req,
      process.env.SANITY_REVALIDATE_SECRET
    )

    if (!isValidSignature) {
      const message = 'Invalid signature'
      console.error(message, { isValidSignature, body })
      return res.status(401).json({ 
        message,
        error: 'Invalid webhook signature'
      })
    }

    if (!body?._type) {
      const message = 'Bad Request'
      console.error(message, { body })
      return res.status(400).json({ 
        message,
        error: 'Missing _type in webhook payload',
        body
      })
    }

    console.log(`Revalidating for type: ${body._type}`)

    // Revalidate the entire site when content changes (simplified approach like aligned-carpentry)
    // This ensures all pages are updated regardless of document type
    await res.revalidate('/')
    await res.revalidate('/blog')
    await res.revalidate('/gallery')
    await res.revalidate('/tours')
    await res.revalidate('/locations')

    // Also revalidate specific blog post if slug is provided
    if (body._type === 'blog' && body.slug?.current) {
      console.log(`Revalidating blog post: /blog/${body.slug.current}`)
      await res.revalidate(`/blog/${body.slug.current}`)
    }

    console.log(`Successfully revalidated for type: ${body._type}`)
    return res.status(200).json({
      message: 'Revalidation successful',
      revalidated: true,
      now: Date.now(),
      body,
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
