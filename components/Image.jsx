import Img from 'next/image';
import { useNextSanityImage } from 'next-sanity-image';
import React from "react"

export const Image = ({client, image, ratio, priority, setIndex, index, classes}) => {
    let classNames = 'image-container';
    if(ratio) {
        classNames += ' ratio-' + ratio;
    }
    return (
        <div className={classNames}>
            <Img
                {...useNextSanityImage(client, image)}
                style={{ maxWidth: '100%' }} // layout="intrinsic" prior to Next 13.0.0
                alt={image?.caption ?? 'Image'}
                sizes="(max-width: 800px) 100vw, 800px"
                className={`content ${classes}`}
                loading={priority ? 'eager' : 'lazy'} 
                priority={priority}
                onClick={setIndex ? (e) => setIndex(index) : null}
            />  
        </div>
    )
}