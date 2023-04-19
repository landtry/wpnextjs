import { createContext } from 'react'
import { getAllPaths, getMenuData, getPageTemplateData } from '@/services/api'
import TemplateSwitcher from '@/components/TemplateSwitcher'

export const PageContext = createContext({})

export default function Page({ pageData }) {
  return (
    <PageContext.Provider value={pageData}>
      <TemplateSwitcher />
    </PageContext.Provider>
  )
}

export const getStaticProps = async ({ params }) => {
  const primaryNavData = await getMenuData('primary-navigation')
  const footerNavData = await getMenuData('footer-navigation')
  const templateData = await getPageTemplateData(params.uri)

  const pageData = { ...templateData, primaryNavData, footerNavData }

  return {
    props: { pageData },
    revalidate: 10,
  }
}

export const getStaticPaths = async () => {
  const data = await getAllPaths()

  const paths =
    data.pages.nodes.map(({ uri }) => ({
      params: { uri },
    })) || []

  return {
    paths,
    fallback: true,
  }
}
