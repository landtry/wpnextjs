/** @type { import('@storybook/react').Preview } */
import '../src/styles/tailwind.css'
import 'focus-visible'

const preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
}

export default preview