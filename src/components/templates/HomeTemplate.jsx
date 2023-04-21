import Head from 'next/head'
import parse from 'html-react-parser'
import { usePageContext } from '@/hooks/usePageContext'

import { CallToAction } from '@/components/CallToAction'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { Hero } from '@/components/Hero'
import { PrimaryFeatures } from '@/components/PrimaryFeatures'
import { SecondaryFeatures } from '@/components/SecondaryFeatures'

export default function HomeTemplate() {
  const pageData = usePageContext()
  const seo = pageData.seo

  return (
    <>
      <Head>{parse(seo?.fullHead)}</Head>
      <main>
        <Header />
        <Hero />
        <PrimaryFeatures />
        <SecondaryFeatures />
        <CallToAction />
        <Footer />
      </main>
    </>
  )
}
