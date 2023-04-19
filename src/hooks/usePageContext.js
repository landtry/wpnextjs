import { useContext } from 'react'
import { HomeContext } from '@/pages'
import { PageContext } from '@/pages/[uri]'

export function usePageContext() {
  const homeData = useContext(HomeContext)
  const pageData = useContext(PageContext)

  function exists(context) {
    if (context) {
      return Object.entries(context).length > 0
    }
  }

  if (exists(homeData)) {
    return homeData
  }

  if (exists(pageData)) {
    return pageData
  }
}
