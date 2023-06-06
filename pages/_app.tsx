import { IBM_Plex_Mono, Inter, PT_Serif } from '@next/font/google'
import { AppProps } from 'next/app'
import { AnimatePresence } from 'framer-motion'

const mono = IBM_Plex_Mono({
  variable: '--font-mono',
  subsets: ['latin'],
  weight: ['500', '700'],
})

const sans = Inter({
  variable: '--font-sans',
  subsets: ['latin'],
  weight: ['500', '700', '800'],
})

const serif = PT_Serif({
  variable: '--font-serif',
  style: ['normal', 'italic'],
  subsets: ['latin'],
  weight: ['400', '700'],
})


import 'styles/main.scss';

export default function App({ Component, pageProps, router }: AppProps) {
  return (
    <>
      <style jsx global>
        {`
          :root {
            --font-mono: ${mono.style.fontFamily};
            --font-sans: ${sans.style.fontFamily};
            --font-serif: ${serif.style.fontFamily};
          }
        `}
      </style>
      <AnimatePresence mode="wait" initial={false}>
        <Component {...pageProps} />
    </AnimatePresence>
    </>
  )
}
