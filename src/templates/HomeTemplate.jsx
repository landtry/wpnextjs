import Head from 'next/head'
import parse from 'html-react-parser'
import { usePageContext } from '@/hooks/usePageContext'

import { CallToAction } from '@/components/CallToAction'
import { Faqs } from '@/components/Faqs'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { Hero } from '@/components/Hero'
import { Pricing } from '@/components/Pricing'
import { PrimaryFeatures } from '@/components/PrimaryFeatures'
import { Reviews } from '@/components/Reviews'
import { SecondaryFeatures } from '@/components/SecondaryFeatures'

export default function HomeTemplate() {
  const pageData = usePageContext()
  const seo = pageData.seo

  return (
    <>
      <Head>{parse(seo?.fullHead)}</Head>
      <main>
        <Header />
        <Hero hero={home.hero} />
        <PrimaryFeatures primaryFeatures={home.primaryFeatures} />
        <SecondaryFeatures secondaryFeatures={home.secondaryFeatures} />
        <CallToAction callToAction={home.callToAction} />
        <Reviews reviews={home.reviews} />
        <Pricing pricing={home.pricing} />
        <Faqs faqs={home.faqs} />
      </main>
      <Footer />
    </>
  )
}
