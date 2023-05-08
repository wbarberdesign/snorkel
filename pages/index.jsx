/* eslint-disable react-hooks/rules-of-hooks */
import { createClient } from "next-sanity";

import { Image } from "../components/Image";

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
                <Image client={client} image={page.poster} />
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
