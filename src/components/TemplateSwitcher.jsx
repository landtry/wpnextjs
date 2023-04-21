import { usePageContext } from '@/hooks/usePageContext'
import HomeTemplate from '@/components/templates/HomeTemplate'

export default function TemplateSwitcher() {
  const pageData = usePageContext()
  const templateName = pageData?.template?.templateName

  switch (templateName) {
    case 'Home':
      return <HomeTemplate />

    default:
      // return <HomeTemplate home={pageData.home} />
      return
  }
}
