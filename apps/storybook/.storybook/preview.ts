import type { Preview } from '@storybook/react';
import '@sonagi/tokens/css';
import './global.css';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: 'light',
      values: [
        {
          name: 'light',
          value: '#ffffff',
        },
        {
          name: 'dark',
          value: '#212529',
        },
        {
          name: 'gray',
          value: '#f8f9fa',
        },
      ],
    },
    layout: 'centered',
  },
};

export default preview;
