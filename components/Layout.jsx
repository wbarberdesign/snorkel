import React, {useState} from 'react'
import { motion } from "framer-motion";
import { Header } from './Header';
import { Footer } from './Footer';

export const Layout = ({children}) => {
    const [lightMode, toggleLightMode] = useState(false);
  return (
    <main className={`dive-rakiura ${lightMode ? 'light-mode' : ''}`}>
        <Header toggleLightMode={(e) => toggleLightMode(!lightMode)}/>
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
