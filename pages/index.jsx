/* eslint-disable react-hooks/rules-of-hooks */
import {PortableText} from '@portabletext/react'
import Link from "next/link";
import { createClient } from "next-sanity";
import { useState } from "react";

import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { Image } from "../components/Image";
import { Layout } from "../components/Layout";

export default function IndexPage({ home }) {
    const data = home[0];
    const [lightMode, toggleLightMode] = useState(false)
    console.log(data);
    if(!data) { return(<></>)}

    return (
        <Layout>
            <section className="gc full-height pd-bottom--l m-pd-bottom--0">
                {data.imagesGallery ? 
                    <div className="d-1-13">
                        {data.imagesGallery.map((img, i) => (
                            <Image client={client} image={img} key={i} ratio="3-1 m-ratio-2-3" />
                        ))}
                    </div>
                : ''}
                <div className="d-4-10 m-1-13 pd-top--m pd-bottom--l m-pd-bottom--m flex flex-column flex-center flex-middle gap--m">
                    <h1 className="text--center">{data.title}</h1>
                    <a href="mailto:test@test.com"><button>Book Now</button></a>
                </div>
                {data.content ?
                    <div className="meta d-2-6 m-1-13 flex flex-column gap--s m-pd--s m-pd-bottom--m">
                        {data.pageTitle ? 
                            <p className="tiny">{data.pageTitle}</p>
                        : null}
                        <PortableText
                            value={data.content}
                        />
                        {data.buttonText ? 
                            <button className="btn-2">{data.buttonText}</button>
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
                    <div className="meta d-2-6 m-1-13 flex flex-column gap--s m-pd-x--s m-pd-bottom--m">
                    {data.secondaryTitle ? 
                            <p className="tiny">{data.secondaryTitle}</p>
                        : null}
                        <PortableText
                            value={data.secondaryContent}
                        />
                        {data.secondaryButtonText ? 
                            <button className="btn-2">{data.secondaryButtonText}</button>
                        : null}
                    </div>
                    <div className="d-7-13 m-1-13 gc-2-col m-gc-1-col col-gap--s">
                        {data.imageBlocks.map((block, i) => (
                            <Link className="flex flex-column" key={i} href={`/gallery?filter=${block.caption}`}>
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
  
    return {
      props: {
        home
      }
    };
  }
