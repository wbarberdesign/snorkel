/* eslint-disable react-hooks/rules-of-hooks */
import "yet-another-react-lightbox/styles.css";

import { useRouter } from 'next/router'
import { createClient } from "next-sanity";
import { useEffect,useState } from "react";
import Lightbox from "yet-another-react-lightbox";

import { Footer } from "../components/Footer";
import { GalleryFilter } from "../components/GalleryFilter";
import { Header } from "../components/Header";
import { Image } from "../components/Image";
import { Layout } from "../components/Layout";

import { useNextSanityImage, getImageAttributes } from "next-sanity-image";

import NextJsImage from "../components/NextJsImage";

export default function GalleryPage({ gallery, siteSettings }) {
    if(!gallery) {return(<></>)}
    const data = gallery[0];
    const [activeFilter, setActiveFilter] = useState('all');
    const [index, setIndex] = useState(-1);
    const router = useRouter()
    
    const slides = data.galleryBlocks.map((block, i) => {
        const imgProps = useNextSanityImage(client, block.image);
        console.log(imgProps);
        return imgProps;
      });

    useEffect(() => {
        if(router.query?.filter) {
            setActiveFilter(router.query.filter)
        }
      return () => {
      }
    }, [router.query])
    

    const updateFilter = (e) => {
        router.push({ pathname: 'gallery', query: { filter: e } });
        setActiveFilter(e)
    }

    if(!data) { return(<></>)}
    let results = 0;
    return (
        <Layout siteSettings={siteSettings}>
            <section className="gc full-height">
                <div className="d-1-13 pd--s pd-x--l pd-bottom--m m-pd-x--s pd-top--m flex gap--s flex-column">
                    <h1 className="small">Gallery</h1>
                    <GalleryFilter 
                        activeFilter={activeFilter}
                        setActiveFilter={(e) => updateFilter(e)}
                    />
                    {data.galleryBlocks ?
                        data.galleryBlocks.map((block, i) => (
                            activeFilter == 'all' || activeFilter == block.type ?
                                ((results++),
                                <Image 
                                    image={block.image} 
                                    client={client} 
                                    ratio="16-9" 
                                    index={i}
                                    setIndex={(e) => setIndex(e)}
                                    alt={block.image.caption} />)
                            : null
                        ))
                    : null}
                        <Lightbox
                            open={index >= 0}
                            index={index}
                            close={() => setIndex(-1)}
                            slides={slides}
                            // render={{ slide: NextJsImage }}
                        />
                    {results == 0 ? <p className="flex flex-column gap--s">Sorry, your search returned no results. <button className="btn-2" onClick={(e) => updateFilter('all')}>See all</button></p> : ''}
                </div>
            </section>
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
    const gallery = await client.fetch(`*[_type == "gallery"]`);
    const siteSettings = await client.fetch(`*[_type == "siteSettings"]`);
  
    return {
      props: {
        gallery,
        siteSettings
      }
    };
  }
