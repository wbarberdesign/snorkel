import React from 'react'
import { motion } from "framer-motion";
import { Header } from './Header';
import { Footer } from './Footer';
Footer

export const Layout = ({children, lightMode}) => {
  return (
    <main className={`dive-rakiura ${lightMode ? 'light-mode' : ''}`}>
        <Header lightMode={(e) => toggleLightMode(!lightMode)}/>
            <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9 }}
        >
            {children}
        </motion.div>
        <Footer />
    </main>
  )
}
