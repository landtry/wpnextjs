import { gql } from '@apollo/client'
import { apolloClient } from './apollo'

export async function getPageData(pageName, pageQuery) {
  const { data } = await apolloClient.query({
    query: pageQuery,
  })
  return data?.pages.nodes[0][pageName]
}

export async function getGFormData(formID, formQuery) {
  const { data } = await apolloClient.query({
    query: formQuery,
    variables: { formID },
  })
  return data?.gfForms.edges[0].node
}
