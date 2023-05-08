/* eslint-disable react-hooks/rules-of-hooks */
import Img from 'next/image';
import { createClient } from "next-sanity";
import { useNextSanityImage } from 'next-sanity-image';


export default function IndexPage({ pages }) {
    console.log(pages);
  return (
    <>
    <header>
      <h1>test</h1>
    </header>
    <main>
      <h2>Pages</h2>
      {pages.length > 0 && (
        <ul>
          {pages.map((page) => (
            <li key={page._id}>
                {page?.title}
                <Img
                    {...useNextSanityImage(client, page.poster)}
                    style={{ maxWidth: '100%', height: 'auto' }} // layout="intrinsic" prior to Next 13.0.0
                    alt="jonah"
                />  
            </li>
          ))}
        </ul>
      )}
    </main>
  </>
  )
}

const client = createClient({
    projectId: "yfcljbw1",
    dataset: "production",
    apiVersion: "2022-03-25",
    useCdn: false
  });
  
  export async function getStaticProps() {
    const pages = await client.fetch(`*[_type == "page"]`);
  
    return {
      props: {
        pages
      }
    };
  }
