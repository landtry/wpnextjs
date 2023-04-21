import { createContext } from 'react'
import TemplateSwitcher from '@/components/TemplateSwitcher'
import { getMenuData, getPageTemplateData } from '@/services/api'

export const HomeContext = createContext({})

export default function Home({ pageData }) {
  return (
    <HomeContext.Provider value={pageData}>
      <TemplateSwitcher />
    </HomeContext.Provider>
  )
}

export const getStaticProps = async () => {
  const primaryNavData = await getMenuData('primary-navigation')
  const footerNavData = await getMenuData('footer-navigation')
  const templateData = await getPageTemplateData('/')

  const pageData = { ...templateData, primaryNavData, footerNavData }

  return {
    props: { pageData },
    revalidate: 10,
  }
}
