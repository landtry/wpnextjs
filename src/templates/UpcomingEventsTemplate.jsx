import Head from 'next/head'
import Image from 'next/image'
import parse from 'html-react-parser'
import { usePageContext } from '@/hooks/usePageContext'

import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { Container } from '@/components/Container'
import Calendar from '@/components/Calendar'
import Slider from '@/components/Slider'

function HeroSection() {
  const pageData = usePageContext()
  const heroData = pageData.template.upcomingEvents.hero

  return (
    <section className="relative -mt-28 h-screen pb-28 pt-28">
      <Container className="flex min-h-full flex-col ">
        <Slider />

        <div className="absolute right-0 top-0 -z-10 h-full w-full bg-gradient-to-tr from-black to-transparent"></div>
        <Image
          src={heroData.bgImage?.sourceUrl}
          className="absolute right-0 top-0 -z-20 object-cover mix-blend-lighten"
          fill
        />
      </Container>
    </section>
  )
}

export default function UpcomingEventsTemplate() {
  const pageData = usePageContext()
  const seo = pageData.seo

  return (
    <>
      <Head>{parse(seo?.fullHead)}</Head>

      <Header navData={pageData?.primaryNavData} />

      <HeroSection heroData={pageData.template.upcomingEvents.hero} />

      <Container>
        <Calendar />
      </Container>

      <Footer navData={pageData?.footerNavData} />
    </>
  )
}
