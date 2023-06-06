/* eslint-disable react-hooks/rules-of-hooks */
import { createClient } from "next-sanity";
import {PortableText} from '@portabletext/react'

import { Image } from "../components/Image";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { useState } from "react";

export default function IndexPage({ home }) {
    const data = home[0];
    const [lightMode, toggleLightMode] = useState(false)
    console.log(data);
    if(!data) { return(<></>)}

    return (
        <div className={`dive-rakiura ${lightMode ? 'light-mode' : ''}`}>
        <Header lightMode={(e) => toggleLightMode(!lightMode)}/>
        <main>
            <section className="gc full-height">
                {data.imagesGallery ? 
                    <div className="d-1-13">
                        {data.imagesGallery.map((img, i) => (
                            <Image client={client} image={img} key={i} />
                        ))}
                    </div>
                : ''}
                <div className="d-4-10 m-1-13 pd-top--m pd-bottom--l flex flex-column flex-center flex-middle gap--m">
                    <h1 className="text--center">{data.title}</h1>
                    <a href="mailto:test@test.com"><button>Book Now</button></a>
                </div>
                {data.content ?
                    <div className="d-2-6 m-1-13 flex flex-column gap--s">
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
                    <div className="d-7-13">
                        <Image client={client} image={data.poster} />
                    </div>
                :''}
            </section>
            {data.imageBlocks ? 
                <section class="gc pd-top--m pd-bottom--l">
                    <div className="d-2-6 m-1-13 flex flex-column gap--s">
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
                    <div className="d-7-13 m-1-13 gc-2-col col-gap--s">
                        {data.imageBlocks.map((block, i) => (
                            <a className="flex flex-column" key={i} href={`/gallery?filter=${block.caption}`}>
                                <Image client={client} image={block.image} ratio="3-2" />
                                <button className="btn-2 mg-y--s">{block.caption}</button>
                            </a>
                        ))}
                    </div>
                </section>
            : null}
            <Footer />
        </main>
    </div>
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
