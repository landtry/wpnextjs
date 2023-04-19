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
        headingLine1
        headingLine2
        bgImageDesktop {
          sourceUrl
        }
        bgImageMobile {
          sourceUrl
        }
        blurb
        cta {
          title
          url
        }
      }
      content1 {
        blurb
        heading
        image1 {
          sourceUrl
        }
        image2 {
          sourceUrl
        }
        image3 {
          sourceUrl
        }
        cta {
          title
          url
        }
      }
      cta {
        heading
        bgImage {
          sourceUrl
        }
        button {
          title
          url
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
