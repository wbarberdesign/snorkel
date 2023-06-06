import Img from 'next/image';
import { useNextSanityImage } from 'next-sanity-image';
import React from "react"

export const Image = ({client, image}) => {
    return (
    <Img
        {...useNextSanityImage(client, image)}
        style={{ maxWidth: '100%', height: 'auto' }} // layout="intrinsic" prior to Next 13.0.0
        alt={image.caption}
    />  
    )
}