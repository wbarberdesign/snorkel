/* eslint-disable react-hooks/rules-of-hooks */
import 'swiper/css';
import "swiper/css/effect-fade";

import {PortableText} from '@portabletext/react'
import Link from "next/link";
import { createClient } from "next-sanity";
import { useState } from "react";
import { A11y,Autoplay, EffectFade,Navigation, Pagination, Scrollbar } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { Image } from "../components/Image";
import { Layout } from "../components/Layout";

export default function IndexPage({ home, siteSettings }) {
    const data = home[0];
    const [lightMode, toggleLightMode] = useState(false)
    console.log(data);
    if(!data) { return(<></>)}

    return (
        <Layout siteSettings={siteSettings}>
            <section className="gc full-height pd-bottom--l m-pd-bottom--0">
                {data.imagesGallery ? 
                    <div className="d-1-13">
                            <Swiper
                                modules={[Autoplay, Navigation, Pagination, Scrollbar, A11y, EffectFade]}
                                navigation
                                loop={true}
                                pagination={{ clickable: true }}
                                onSlideChange={() => console.log('slide change')}
                                onSwiper={(swiper) => console.log(swiper)}
                                effect={"fade"}
                                autoplay={{
                                    delay: 5000,
                                    disableOnInteraction: false
                                }}
                                >
                                {data.imagesGallery.map((img, i) => (
                                    <SwiperSlide key={i}>
                                        <Image 
                                        client={client} 
                                        image={img} 
                                        priority={i === 0 ? true : false}
                                        ratio="3-1 m-ratio-1-1" />
                                    </SwiperSlide>
                                ))}
                            </Swiper>

                    </div>
                : ''}
                <div className="d-4-10 m-1-13 pd-top--m pd-bottom--l m-pd-bottom--m flex flex-column flex-center flex-middle gap--m">
                    <h1 className="text--center">{data.title}</h1>
                    <a href={`mailto:${siteSettings[0].email}?subject=Dive Rakiura - Website booking enquiry`}><button>Book Now</button></a>
                </div>
                {data.content ?
                    <div className="meta mg-left--l m-mg-left--0 d-1-6 m-1-13 flex flex-column gap--s m-pd--s m-pd-bottom--m">
                        {data.pageTitle ? 
                            <p className="tiny">{data.pageTitle}</p>
                        : null}
                        <PortableText
                            value={data.content}
                        />
                        {data.buttonText ? 
                            <Link href={data.buttonUrl ?? ''}>
                                <button className="btn-2">{data.buttonText}</button>
                            </Link>
                        : null}
                    </div>
                :''}
                {data.poster ?
                    <div className="d-7-13 m-1-13 m-r-3">
                        <Image client={client} image={data.poster} />
                    </div>
                :''}
            </section>
            {data.imageBlocks ? 
                <section class="gc pd-top--m m-pd-top--s pd-bottom--l">
                    <div className="meta mg-left--l m-mg-left--0 d-1-6 m-1-13 flex flex-column gap--s m-pd-x--s m-pd-bottom--m">
                    {data.secondaryTitle ? 
                            <p className="tiny">{data.secondaryTitle}</p>
                        : null}
                        <PortableText
                            value={data.secondaryContent}
                        />
                        {data.secondaryButtonText ? 
                            <Link href={data.secondaryButtonUrl ?? ''}>
                                <button className="btn-2">{data.secondaryButtonText}</button>
                            </Link>
                        : null}
                    </div>
                    <div className="d-7-13 m-1-13 gc-2-col m-gc-1-col col-gap--s">
                        {data.imageBlocks.map((block, i) => (
                            <Link className="flex flex-column" key={i} href={`/gallery?filter=${block.caption.toLowerCase().replaceAll(" ", "-")}`}>
                                <Image client={client} image={block.image} ratio="3-2" />
                                <button className="btn-2 mg-y--s m-mg-x--s">{block.caption}</button>
                            </Link>
                        ))}
                    </div>
                </section>
            : null}
    </Layout>
    )
}

const client = createClient({
    projectId: "yfcljbw1",
    dataset: "production",
    apiVersion: "2022-03-25",
    useCdn: false
  });
  
  export async function getStaticProps() {
    const home = await client.fetch(`*[_type == "home"]`);
    const siteSettings = await client.fetch(`*[_type == "siteSettings"]`);
  
    return {
      props: {
        home,
        siteSettings
      }
    };
  }
  
