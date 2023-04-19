import { gql } from '@apollo/client'

// Menus
export const GET_MENU_DATA = gql`
  query GetMenuData($slug: String!) {
    menus(where: { slug: $slug }) {
      nodes {
        menuItems(after: "0") {
          nodes {
            label
            url
          }
        }
      }
    }
  }
`

// Seo fragment
export const SEO_FIELDS = gql`
  fragment SeoFields on Page {
    seo {
      fullHead
    }
  }
`

// Template fragments
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

export const UPCOMING_EVENTS_TEMPLATE_FIELDS = gql`
  fragment UpcomingEventsTemplateFields on Template_UpcomingEvents {
    upcomingEvents {
      hero {
        bgImage {
          sourceUrl
        }
      }
    }
  }
`

//Page queries
export const GET_All_PAGES = gql`
  query getAllPages {
    pages(after: "0") {
      nodes {
        uri
      }
    }
  }
`

export const GET_PAGE_DATA = gql`
  ${SEO_FIELDS}
  ${HOME_TEMPLATE_FIELDS}

  query getPageData($uri: String!) {
    nodeByUri(uri: $uri) {
      ... on Page {
        ...SeoFields
        template {
          templateName
          ... on Template_Home {
            ...HomeTemplateFields
          }
        }
      }
    }
  }
`
