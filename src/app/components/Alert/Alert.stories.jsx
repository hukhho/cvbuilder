// Alert.stories.jsx
import React from 'react';
import Alert from './Alert';

export default {
  title: 'Components/Alert',
  component: Alert,
  argTypes: {
    type: {
      control: {
        type: 'select',
        options: ['success', 'error', 'info'],
      },
    },
  },
};

const Template = (args) => <Alert {...args} />;

export const Success = Template.bind({});
Success.args = {
  message: 'This is a success alert!',
  type: 'success',
};

export const Error = Template.bind({});
Error.args = {
  message: 'This is an error alert!',
  type: 'error',
};

export const Info = Template.bind({});
Info.args = {
  message: 'This is an info alert!',
  type: 'info',
};
