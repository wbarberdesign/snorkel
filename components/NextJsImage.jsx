import Image from 'next/image';
import { useNextSanityImage, getImageAttributes } from 'next-sanity-image';
import React from "react"

export const NextJsImage = ({ client, image, ratio, priority, setIndex, index }) => {
  const imgProps = useNextSanityImage(client, image);
  const { src, srcSet, sizes } = getImageAttributes(imgProps);
  let classNames = 'image-container';
  if (ratio) {
    classNames += ' ratio-' + ratio;
  }
  return (
    <div className={classNames}>
        <img         
        srcSet={srcSet}
        sizes={sizes} />
      {/* <Image
        src={src}
        srcSet={srcSet}
        sizes={sizes}
        layout="responsive"
        objectFit="cover"
        objectPosition="center"
        alt={image?.caption ?? 'Image'}
        className="content"
        loading={priority ? 'eager' : 'lazy'}
        priority={priority}
        onClick={(e) => setIndex(index)}
      /> */}
    </div>
  )
}