import Head from 'next/head'

import { CallToAction } from '@/components/CallToAction'
import { Faqs } from '@/components/Faqs'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { Hero } from '@/components/Hero'
import { Pricing } from '@/components/Pricing'
import { PrimaryFeatures } from '@/components/PrimaryFeatures'
import { Reviews } from '@/components/Reviews'
import { SecondaryFeatures } from '@/components/SecondaryFeatures'
import { GET_HOME_DATA, getPageData } from '@/services/api'

export default function Home(home) {
  return (
    <>
      <Head>
        <title>Pocket - Invest at the perfect time.</title>
        <meta
          name="description"
          content="By leveraging insights from our network of industry insiders, you’ll know exactly when to buy to maximize profit, and exactly when to sell to avoid painful losses."
        />
      </Head>
      <Header />
      <main>
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

export const getStaticProps = async () => {
  const home = await getPageData('home', GET_HOME_DATA)

  return {
    props: home,
    revalidate: 10,
  }
}
