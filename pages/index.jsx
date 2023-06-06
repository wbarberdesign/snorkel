/* eslint-disable react-hooks/rules-of-hooks */
import { createClient } from "next-sanity";
import {PortableText} from '@portabletext/react'

import { Image } from "../components/Image";
import { Header } from "../components/Header";

export default function IndexPage({ home }) {
    console.log(home);
  return (
    <div class="dive-rakiura">
    <Header />
    <main>
        <section className="gc full-height">
            {home[0].imagesGallery ? 
                <div className="d-1-13">
                    {home[0].imagesGallery.map((img) => (
                        <Image client={client} image={img} />
                    ))}
                </div>
            : ''}
            <div className="d-4-10 m-1-13 pd-top--m pd-bottom--l flex flex-column flex-center flex-middle gap--m">
                <h1 className="text--center">{home[0].title}</h1>
                <a href="mailto:test@test.com"><button>Book Now</button></a>
            </div>
            {home[0].content ?
                <div className="d-2-6 m-1-13 flex flex-column gap--s">
                    {home[0].pageTitle ? 
                        <p className="tiny">{home[0].pageTitle}</p>
                    : null}
                    <PortableText
                        value={home[0].content}
                    />
                    {home[0].buttonText ? 
                        <button className="btn-2">{home[0].buttonText}</button>
                    : null}
                </div>
            :''}
            {home[0].poster ?
                <div className="d-7-13">
                    <Image client={client} image={home[0].poster} />
                </div>
            :''}
        </section>
      {/* {pages.length > 0 && (
        <ul>
          {pages.map((page) => (
            <li key={page._id}>
                {page?.title}
                <Image client={client} image={page.poster} />
            </li>
          ))}
        </ul>
      )} */}
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
