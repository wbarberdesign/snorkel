import React from 'react'

import { GoogleReviewsBadge } from './GoogleReviewsBadge'
import { Image } from './Image'

const StarRating = ({ rating }) => {
  const value = Math.min(5, Math.max(1, Math.round(rating)))
  return (
    <div
      className="google-reviews__stars"
      role="img"
      aria-label={`${value} out of 5 stars`}
    >
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className={
            star <= value
              ? 'google-reviews__star google-reviews__star--filled'
              : 'google-reviews__star'
          }
          aria-hidden="true"
        >
          ★
        </span>
      ))}
    </div>
  )
}

export const FeaturedGoogleReviews = ({ client, reviews, listingUrl }) => {
  if (!reviews?.length) {
    return null
  }

  const ctaInner = (
    <>
      <span className="tiny google-reviews__cta-label">See all reviews at</span>
      <GoogleReviewsBadge embedded />
    </>
  )

  return (
    <section
      id="featured-google-reviews"
      className="google-reviews gc pd-y--l m-pd--s"
      aria-labelledby="featured-google-reviews-title"
    >
      <h2
        id="featured-google-reviews-title"
        className="small text--center d-1-13"
      >
        Featured Google reviews
      </h2>
      <ul className="google-reviews__list d-2-12 m-1-13 gc-3-col t-gc-2-col m-gc-1-col gap--s">
        {reviews.map((item, index) => (
          <li key={index} className="google-reviews__card flex-column gap--s flex">
            <StarRating rating={item.rating} />
            <blockquote className="google-reviews__quote">
              <p>{item.review}</p>
            </blockquote>
            <div className="google-reviews__author flex-middle gap--s flex">
              {item.authorImage ? (
                <div className="google-reviews__avatar">
                  <Image
                    client={client}
                    image={{
                      ...item.authorImage,
                      caption: item.authorName,
                    }}
                    ratio="1-1"
                    classes="google-reviews__avatar-img"
                  />
                </div>
              ) : null}
              <p className="tiny google-reviews__name">{item.authorName}</p>
            </div>
          </li>
        ))}
      </ul>
      <div className="d-1-13 flex-center flex pd-top--m flex">
        {listingUrl ? (
          <a
            href={listingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="google-reviews__cta"
          >
            {ctaInner}
          </a>
        ) : (
          <div
            className="google-reviews__cta google-reviews__cta--unset"
            title="Add Google Maps listing URL in Sanity (Home or Site settings)"
          >
            {ctaInner}
          </div>
        )}
      </div>
    </section>
  )
}
