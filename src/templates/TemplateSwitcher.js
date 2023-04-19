import HomeTemplate from './HomeTemplate'
import TestTemplate from './TestTemplate'

export default function TemplateSwitcher({ templateName, pageData }) {
  switch (templateName) {
    case 'Home':
      return <HomeTemplate home={pageData.template.home} />
    case 'Test':
      return <TestTemplate test={pageData.template.test} />
    default:
      // return <HomeTemplate home={pageData.home} />
      return
  }
}
