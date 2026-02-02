import type { NextApiRequest, NextApiResponse } from 'next'

/**
 * Test endpoint to verify revalidation setup
 * Visit: https://your-domain.com/api/revalidate-test
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const hasSecret = !!process.env.SANITY_REVALIDATE_SECRET
  const secretLength = process.env.SANITY_REVALIDATE_SECRET?.length || 0

  return res.status(200).json({
    message: 'Revalidation test endpoint',
    environment: process.env.NODE_ENV,
    hasSecret,
    secretLength,
    secretPreview: hasSecret 
      ? `${process.env.SANITY_REVALIDATE_SECRET?.substring(0, 10)}...` 
      : 'NOT SET',
    timestamp: new Date().toISOString(),
    hint: hasSecret 
      ? 'Secret is configured. Check Sanity webhook URL and delivery logs.'
      : '⚠️ SANITY_REVALIDATE_SECRET is not set in environment variables!',
  })
}
