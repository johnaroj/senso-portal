import '../styles/globals.css'
import 'tailwindcss/tailwind.css'
import type { AppProps } from 'next/app'
import React from 'react'
import { AuthProvider } from '@/context/AuthContext';


function MyApp({ Component, pageProps }: AppProps) {
  return <AuthProvider><Component {...pageProps} /></AuthProvider>
}
export default MyApp
