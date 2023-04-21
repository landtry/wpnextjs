import ButtonNew from '../components/buttons/ButtonNew'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
export default {
  title: 'Example/Button',
  component: ButtonNew,
  tags: ['autodocs'],
}

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary = {
  args: {
    children: 'Button',
    fullWidth: false,
  },
}
