/* eslint-disable react-hooks/rules-of-hooks */
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/captions.css";

import {PortableText} from '@portabletext/react'
import Img from 'next/image';
import { useRouter } from 'next/router'
import { createClient } from "next-sanity";
import { getImageAttributes,useNextSanityImage } from "next-sanity-image";
import { useEffect,useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import Captions from "yet-another-react-lightbox/plugins/captions";

import { Image } from "../../components/Image";
import { Layout } from "../../components/Layout";
import NextJsImage from "../../components/NextJsImage";

export default function GalleryPage({ data, siteSettings }) {
    if(!data) {return(<></>)}
    const [activeFilter, setActiveFilter] = useState('all');
    const [index, setIndex] = useState(-1);
    const router = useRouter()
    
    const myCustomImageBuilder = (imageUrlBuilder, options) => {
        return imageUrlBuilder
            .width(options.width || Math.min(options.originalImageDimensions.width, 2000))
    };

    const slides = data.galleryBlocks.map((block, i) => {
        // const imgProps = useNextSanityImage(client, block.image);
        const imgProps = useNextSanityImage(client, block.image, {
            imageBuilder: myCustomImageBuilder
        });

        imgProps.title = block.caption
        return  imgProps;
      });

    useEffect(() => {
        if(router.query?.filter) {
            setActiveFilter(router.query.filter)
        }
      return () => {
      }
    }, [router.query])

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

    console.log(data)
    let results = 0;
    const dateString = data.publicationDate;
    const dateObject = new Date(dateString);

    // Format the date to display only the date in a specific format
    const formattedDate = dateObject.toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
    return (
        <Layout siteSettings={siteSettings} pageTitle="blog">
            <section>
                <div className="gc">
                    <div className="d-1-7 m-1-13 d-1-13 pd--s pd-x--l pd-bottom--m m-pd-x--s pd-top--m flex gap--s flex-column">
                    <h1>{data.title}</h1>
                    <p className="small">{formattedDate}</p>
                        {data.content != null ?
                            <PortableText
                                value={data.content}
                            />
                        : null}  
                    </div>
                </div>
                {data.galleryBlocks ?
                        data.galleryBlocks.map((block, i) => (
                            activeFilter == 'all' || activeFilter == block.type ?
                                ((results++),
                                <Image 
                                    classes="pointer"
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
                            plugins={[Captions]}
                            open={index >= 0}
                            index={index}
                            close={() => setIndex(-1)}
                            slides={slides}
                            // render={{ slide: Image }}
                        />
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
  
  export async function getStaticPaths() {
    const blogs = await client.fetch(`
      *[_type == "blog" && defined(slug.current)] {
        "slug": slug.current
      }
    `);
  
    const paths = blogs.map((blog) => ({
      params: { slug: blog.slug },
    }));
  
    return { paths, fallback: false };
  }

  export async function getStaticProps(context) {
    // It's important to default the slug so that it doesn't return "undefined"
    const { slug = "" } = context.params;
    const data = await client.fetch(`
      *[_type == "blog" && slug.current == $slug][0]
    `, { slug });
  
    const siteSettings = await client.fetch(`*[_type == "siteSettings"]`);


    return {
      props: {
        data,
        siteSettings
    },
    };
  }
