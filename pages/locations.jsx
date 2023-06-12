import {PortableText} from '@portabletext/react'
import Link from 'next/link';
/* eslint-disable react-hooks/rules-of-hooks */
import { createClient } from "next-sanity";
import React from 'react'

import { Image } from '../components/Image';
import { Layout } from '../components/Layout';

export default function tours({ locations, siteSettings }) {
    const data = locations[0];
    console.log(data)
  return (
    <Layout siteSettings={siteSettings}>
        <nav class="flex flex-middle flex-s-between mobile-only pd-y--xs pd-x--s">
            <Link href="/">
                <svg width="5" height="9" viewBox="0 0 5 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4.70001 0.848015L1.31601 4.17202L4.68801 7.47202L3.99201 8.18002L0.0320129 4.17202L4.00401 0.140015L4.70001 0.848015Z" fill="white"/>
                </svg>
            </Link>
            <p className="small">{data.title}</p>
            <span></span>
        </nav>
        <section className="gc pd-top--m pd-bottom--l m-pd--0">
            {data.content ?
                <div className="d-2-6 m-1-13 flex flex-column gap--s m-pd--s m-pd-bottom--m">
                    {data.title ? 
                        <h1 className="small">{data.title}</h1>
                    : null}
                    <PortableText
                        value={data.content}
                    />
                    {data.tourDetails ? 
                        <ul className="flex flex-column gap--s">
                            {data.tourDetails.map((detail, i) => (
                                <li 
                                className="flex flex-s-between flex-middle" 
                                key={i}>
                                    <p className="small">{detail.title}</p>
                                    <p className="small">{detail.info}</p>
                                </li>
                            ))}
                        </ul>
                    :null}
                </div>
            :''}
            {data.poster ?
                <div className="d-7-13 m-1-13 m-r-1">
                    <Image client={client} image={data.poster} ratio="1-1"  alt={data.poster.alt} />
                </div>
            :''}
        </section>
        <section className="gc pd-top--m pd-bottom--l m-pd--0">
            <div className="d-2-6 m-1-13 flex flex-column gap--s m-pd--s m-pd-bottom--m">
                {data.sTwoTitle ? 
                    <h2 className="small">{data.sTwoTitle}</h2>
                : null}
                <PortableText
                    value={data.sTwoContent}
                />
            </div>
            {data.sTwoImage ?
                <div className="d-7-13 m-1-13 m-r-1">
                    <Image client={client} image={data.sTwoImage} ratio="1-1"  alt={data.sTwoImage.alt} />
                </div>
            :''}
        </section>
        {data.sThreeTitle ? 
            <section className="gc pd-top--m pd-bottom--l m-pd--0">
                <div className="d-2-6 m-1-13 flex flex-column gap--s m-pd--s m-pd-bottom--m">
                    {data.sThreeTitle ? 
                        <h2 className="small">{data.sThreeTitle}</h2>
                    : null}
                    <PortableText
                        value={data.sThreeContent}
                    />
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
    const locations = await client.fetch(`*[_type == "locations"]`);
    const siteSettings = await client.fetch(`*[_type == "siteSettings"]`);
  
    return {
      props: {
        locations,
        siteSettings
      }
    };
  }