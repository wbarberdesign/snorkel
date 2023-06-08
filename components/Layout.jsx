import { motion } from "framer-motion";
import React, {useState} from 'react'

import { Footer } from './Footer';
import { Header } from './Header';

export const Layout = ({children, siteSettings}) => {
    const global = siteSettings?.[0];
    console.log(siteSettings);
    const [lightMode, toggleLightMode] = useState(false);
  return (
    <main className={`dive-rakiura ${lightMode ? 'light-mode' : ''}`}>
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
