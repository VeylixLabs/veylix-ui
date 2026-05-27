import type { Meta, StoryObj } from '@storybook/react-vite';
import { ConnectWalletButton } from './ConnectWalletButton';
import { VeylixProvider } from './VeylixProvider';

const meta = {
  title: 'Components/ConnectWalletButton',
  component: ConnectWalletButton,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <VeylixProvider>
        <Story />
      </VeylixProvider>
    ),
  ],
  args: {
    label: 'Select wallet',
  },
} satisfies Meta<typeof ConnectWalletButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const CustomLabel: Story = {
  args: {
    label: 'Link Operator Wallet',
  },
};
