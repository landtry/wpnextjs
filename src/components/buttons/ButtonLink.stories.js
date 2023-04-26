import ButtonLink from './ButtonLink'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
export default {
  title: 'Buttons/ButtonLink',
  component: ButtonLink,
}

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary = {
  args: {
    children: 'Link Element',
    fullWidth: false,
    href: '#',
  },
}
