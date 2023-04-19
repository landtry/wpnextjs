import { apolloClient } from './apollo'
import {
  GET_HOME_TEMPLATE,
  GET_PAGE_DATA,
  getPageTemplate,
} from './pageQueries'

export async function getPageData(pageName, pageQuery) {
  const { data } = await apolloClient.query({
    query: pageQuery,
  })
  return data?.pages.nodes[0][pageName]
}

export async function getPageTemplateData(uri) {
  const { data } = await apolloClient.query({
    query: GET_PAGE_DATA,
    variables: { uri },
  })
  return data?.nodeByUri
}

export async function getGFormData(formID, formQuery) {
  const { data } = await apolloClient.query({
    query: formQuery,
    variables: { formID },
  })
  return data?.gfForms.edges[0].node
}
