export const featuredGoogleReview = {
  name: 'featuredGoogleReview',
  type: 'object',
  title: 'Featured Google review',
  fields: [
    {
      name: 'rating',
      type: 'number',
      title: 'Star rating',
      description: 'Whole number from 1 to 5',
      validation: (Rule) =>
        Rule.required().min(1).max(5).integer().error('Use a whole number from 1 to 5'),
    },
    {
      name: 'review',
      type: 'text',
      title: 'Review text',
      rows: 4,
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'authorName',
      type: 'string',
      title: 'Reviewer name',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'authorImage',
      type: 'image',
      title: 'Reviewer photo (optional)',
      options: { hotspot: true },
    },
  ],
  preview: {
    select: {
      title: 'authorName',
      subtitle: 'review',
      rating: 'rating',
      media: 'authorImage',
    },
    prepare({ title, subtitle, rating, media }) {
      return {
        title: title || 'Review',
        subtitle: rating ? `${rating}/5 — ${subtitle || ''}` : subtitle,
        media,
      }
    },
  },
}
