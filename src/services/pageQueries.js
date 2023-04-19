import { gql } from '@apollo/client'

export const GET_HOME_PAGE = gql`
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

export const GET_All_PAGES = gql`
  query getAllPages {
    pages(after: "0") {
      nodes {
        uri
      }
    }
  }
`

export const HOME_TEMPLATE_FIELDS = gql`
  fragment HomeTemplateFields on Template_Home {
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
`

export const TEST_TEMPLATE_FIELDS = gql`
  fragment TestTemplateFields on Template_Test {
    test {
      hero {
        heading
      }
    }
  }
`

export const GET_PAGE_DATA = gql`
  ${HOME_TEMPLATE_FIELDS}
  ${TEST_TEMPLATE_FIELDS}

  query getPageData($uri: String!) {
    nodeByUri(uri: $uri) {
      ... on Page {
        databaseId
        template {
          templateName
          ... on Template_Home {
            ...HomeTemplateFields
          }
          ... on Template_Test {
            ...TestTemplateFields
          }
        }
      }
    }
  }
`
