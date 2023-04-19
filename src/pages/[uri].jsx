import { GET_All_PAGES } from '@/services/pageQueries'
import { apolloClient } from '@/services/apollo'
import { getPageTemplateData } from '@/services/api'
import TemplateSwitcher from '@/templates/TemplateSwitcher'

export default function Page(pageData) {
  const templateName = pageData?.template?.templateName
  return <TemplateSwitcher templateName={templateName} pageData={pageData} />
}

export const getStaticProps = async ({ params }) => {
  const pageData = await getPageTemplateData(params.uri)
  return {
    props: pageData,
    revalidate: 10,
  }
}

export const getStaticPaths = async () => {
  const { data } = await apolloClient.query({
    query: GET_All_PAGES,
  })

  const paths =
    data.pages.nodes.map(({ uri }) => ({
      params: { uri },
    })) || []

  return {
    paths,
    fallback: true,
  }
}
