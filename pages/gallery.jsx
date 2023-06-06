/* eslint-disable react-hooks/rules-of-hooks */
import { createClient } from "next-sanity";

import { Image } from "../components/Image";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { useState } from "react";
import { GalleryFilter } from "../components/GalleryFilter";
import { Layout } from "../components/Layout";

export default function IndexPage({ home }) {
    const data = home[0];
    const [lightMode, toggleLightMode] = useState(false)
    console.log(data);
    if(!data) { return(<></>)}

    return (
        <Layout>
            <div className={`dive-rakiura ${lightMode ? 'light-mode' : ''}`}>
            <Header lightMode={(e) => toggleLightMode(!lightMode)}/>
            <main>
                <section className="gc full-height">
                    <div className="d-1-13 pd--s pd-top--m flex gap--s flex-column">
                        <h1 className="small">Gallery</h1>
                        <GalleryFilter />
                    </div>
                </section>
                <Footer />
            </main>
        </div>
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
