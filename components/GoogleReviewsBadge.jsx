import React from 'react'

/** Google “G” + Reviews label. Use `embedded` when nested inside another link. */
export const GoogleReviewsBadge = ({
  href,
  className = '',
  embedded = false,
}) => {
  const label = 'Google Reviews'
  const content = (
    <>
      <img
        className="google-reviews-badge__logo"
        src="/google-g.svg"
        alt=""
        width={20}
        height={20}
        decoding="async"
      />
      <span className="google-reviews-badge__text">
        <span className="google-reviews-badge__brand">Google</span>
        <span className="google-reviews-badge__suffix">Reviews</span>
      </span>
    </>
  )

  const classNames = `google-reviews-badge${embedded ? ' google-reviews-badge--embedded' : ''} ${className}`.trim()

  if (href && !embedded) {
    return (
      <a
        className={classNames}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={label}
      >
        {content}
      </a>
    )
  }

  return <span className={classNames}>{content}</span>
}
