import { usePageContext } from '@/hooks/usePageContext'
import HomeTemplate from '@/templates/HomeTemplate'
import UpcomingEventsTemplate from '@/templates/UpcomingEventsTemplate'

export default function TemplateSwitcher() {
  const pageData = usePageContext()
  const templateName = pageData?.template?.templateName

  switch (templateName) {
    case 'Home':
      return <HomeTemplate />
    case 'Upcoming Events':
      return <UpcomingEventsTemplate />
    default:
      // return <HomeTemplate home={pageData.home} />
      return
  }
}
