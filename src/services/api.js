import { gql } from '@apollo/client'
import { apolloClient } from './apollo'

export async function getPageData(pageName, pageQuery) {
  const { data } = await apolloClient.query({
    query: pageQuery,
  })
  return data?.pages.nodes[0][pageName]
}

export const GET_HOME_DATA = gql`
  query getHomePageData {
    pages(where: { name: "home" }) {
      nodes {
        home {
          hero {
            body
            heading
          }
          primaryFeatures {
            heading
            body
            list {
              body
              heading
            }
          }
          secondaryFeatures {
            heading
            body
            list {
              name
              description
              icon {
                sourceUrl
              }
            }
          }
          callToAction {
            heading
            body
            link {
              title
              url
            }
          }
          reviews {
            heading
            body
            reviews {
              title
              body
              author
              rating
            }
          }
          pricing {
            heading
            body
            plans {
              name
              featured
              price {
                monthly
                annually
              }
              description
              button {
                title
                url
              }
              features {
                feature
              }
              logomarkClassName
            }
          }
          faqs {
            heading
            body
            columns {
              faqs {
                answer
                question
              }
            }
          }
        }
      }
    }
  }
`
