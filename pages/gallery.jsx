/* eslint-disable react-hooks/rules-of-hooks */
import { useRouter } from 'next/router'
import { createClient } from "next-sanity";
import { useEffect,useState } from "react";

import { Footer } from "../components/Footer";
import { GalleryFilter } from "../components/GalleryFilter";
import { Header } from "../components/Header";
import { Image } from "../components/Image";
import { Layout } from "../components/Layout";

export default function GalleryPage({ gallery }) {
    if(!gallery) {return(<></>)}
    const data = gallery[0];
    const [activeFilter, setActiveFilter] = useState('all');
    const router = useRouter()

    useEffect(() => {
        if(router.query?.filter) {
            setActiveFilter(router.query.filter)
        }
      return () => {
      }
    }, [router.query])
    

    const updateFilter = (e) => {
        console.log(e);
        router.push({ pathname: 'gallery', query: { filter: e } });
        setActiveFilter(e)
    }

    console.log(data);
    if(!data) { return(<></>)}
    let results = 0;
    return (
        <Layout>
            <section className="gc full-height">
                <div className="d-1-13 pd--s pd-top--m flex gap--s flex-column">
                    <h1 className="small">Gallery</h1>
                    <GalleryFilter 
                        activeFilter={activeFilter}
                        setActiveFilter={(e) => updateFilter(e)}
                    />
                    {data.galleryBlocks ?
                        data.galleryBlocks.map((block, i) => (
                            activeFilter == 'all' || activeFilter == block.type ?
                                ((results++),
                                <Image image={block.image} client={client} ratio="16-9" />)
                            : null
                        ))
                    : null}
                    {results == 0 ? <p className="flex flex-column gap--s">I'm sorry, your search returned no results. <button className="btn-2" onClick={(e) => updateFilter('all')}>See all</button></p> : ''}
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
  
    return {
      props: {
        gallery
      }
    };
  }
