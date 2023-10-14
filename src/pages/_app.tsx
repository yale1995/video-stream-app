import '@/styles/globals.css'

import type { AppProps } from 'next/app'
import { Poppins } from 'next/font/google'

const poppins = Poppins({
  weight: ['700', '600', '500', '400'],
  subsets: ['latin'],
})

export default function App({ Component, pageProps }: AppProps) {
  return <Component className={poppins.className} {...pageProps} />
}
