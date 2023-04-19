import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import parse from 'html-react-parser'
import { usePageContext } from '@/hooks/usePageContext'

import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { Container } from '@/components/Container'

function HeroSection() {
  const pageData = usePageContext()
  const heroData = pageData.template.home.hero

  return (
    <section className="relative -mt-28 h-screen pb-28 pt-28">
      <Container className="flex min-h-full flex-col ">
        <span className="font-sans text-sm uppercase text-accent-500">
          {parse(heroData?.blurb)}
        </span>
        <div className="mt-auto flex flex-col items-end justify-end gap-7">
          <h1 className="text-right font-display text-3xl tracking-tightest text-accent-500 sm:text-5xl md:text-6xl lg:text-7xl">
            {heroData?.headingLine1}
            <br />
            <span className="text-gray-100">{heroData?.headingLine2}</span>
          </h1>

          <Link
            href={heroData?.cta?.url}
            className="w-full max-w-[250px] rounded-full border-2 border-accent-500 px-12 py-5 text-center font-sans text-sm font-bold uppercase text-accent-500 hover:bg-accent-500 hover:text-siteBackground"
          >
            {heroData?.cta?.title}
          </Link>
        </div>

        <Image
          src={heroData.bgImageDesktop?.sourceUrl}
          className="absolute right-0 top-0 -z-10 object-cover mix-blend-lighten"
          fill
        />
      </Container>
    </section>
  )
}

function FeaturedSection() {
  const pageData = usePageContext()
  const featuredData = pageData.template.home.content1

  return (
    <section className="my-28 h-[500px]">
      <Container>
        <div className="grid h-[500px] grid-cols-12 grid-rows-6 gap-6">
          <h2 className="z-10 col-span-12 row-span-1 font-display text-[1.2em] tracking-tightest text-accent-500 sm:text-3xl md:text-4xl lg:col-span-9 lg:text-4xl">
            {featuredData?.heading}
          </h2>

          <div className="relative col-start-1 col-end-6 row-start-2 row-end-6">
            <Image
              src={featuredData?.image1?.sourceUrl}
              className="h-full w-full border border-accent-600 object-cover mix-blend-lighten"
              fill
            />
          </div>

          <div className="relative col-start-6 col-end-13 row-start-2 row-end-9 lg:col-end-10">
            <Image
              src={featuredData?.image2?.sourceUrl}
              className="h-full w-full border border-accent-600 object-cover mix-blend-lighten"
              fill
            />
          </div>

          <div className="relative col-start-10 col-end-13 row-start-1 row-end-9 hidden lg:block">
            <Image
              src={featuredData?.image3?.sourceUrl}
              className="h-full w-full border border-accent-600 object-cover mix-blend-lighten"
              fill
            />
          </div>

          <div className="col-start-1 col-end-6 row-start-6 row-end-9 flex flex-col items-center justify-center gap-6">
            <Link
              href={featuredData?.cta?.url}
              className="w-full rounded-full border-2 border-accent-500 px-12 py-5 text-center font-sans text-sm font-bold uppercase text-accent-500 hover:bg-accent-500 hover:text-siteBackground"
            >
              {featuredData?.cta?.title}
            </Link>
          </div>
        </div>
      </Container>
    </section>
  )
}

export default function HomeTemplate() {
  const pageData = usePageContext()
  const seo = pageData.seo

  return (
    <>
      <Head>{parse(seo?.fullHead)}</Head>
      <Header />
      <HeroSection />
      <FeaturedSection />
      <Footer />
    </>
  )
}
