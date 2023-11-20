import { motion } from "framer-motion";
import { useRouter } from "next/router";
import React, {useState} from 'react'

import { Footer } from './Footer';
import { Header } from './Header';
import { SEO } from "./Seo";

export const Layout = ({children, siteSettings, pageTitle}) => {
    const router = useRouter();
    const global = siteSettings?.[0];
    const [lightMode, toggleLightMode] = useState(false);
  return (
    <main className={`dive-rakiura ${lightMode ? 'light-mode' : ''}`}>
        <SEO siteSettings={siteSettings} pageTitle={pageTitle} />
        <Header 
        email={global?.email}
        toggleLightMode={(e) => toggleLightMode(!lightMode)}/>
            <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9 }}
        >
            {children}
        </motion.div>
        <Footer 
        instagram={global?.instagram}
        facebook={global?.facebook}
        email={global?.email}
        phone={global?.phone}
        />
    </main>
  )
}
