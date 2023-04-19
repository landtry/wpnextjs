import Head from 'next/head'

import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'

export default function TestTemplate({ test }) {
  console.log({ test }, 'test template')
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

      <main>{test?.hero?.heading}</main>

      <Footer />
    </>
  )
}
