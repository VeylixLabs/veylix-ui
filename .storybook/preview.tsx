import type { Preview } from '@storybook/react-vite';
import '../src/style.css';

const preview: Preview = {
  parameters: {
    backgrounds: {
      default: 'veylix-dark',
      values: [
        { name: 'veylix-dark', value: '#050505' },
        { name: 'veylix-light', value: '#f8fafc' },
      ],
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div className="min-h-screen w-full bg-[#050505] p-8 text-white">
        <Story />
      </div>
    ),
  ],
};

export default preview;
