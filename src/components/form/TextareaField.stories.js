import TextareaField from './TextareaField'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
export default {
  title: 'Form/TextareaField',
  component: TextareaField,
}

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default = {
  args: {
    label: 'Label',
  },
}
