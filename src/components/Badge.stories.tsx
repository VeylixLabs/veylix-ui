import type { Meta, StoryObj } from '@storybook/react-vite';
import { Badge } from './Badge';

const meta = {
  title: 'Components/Badge',
  component: Badge,
  tags: ['autodocs'],
  args: {
    children: 'Verified',
    variant: 'accent',
    size: 'md',
    glow: true,
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'success', 'warning', 'error', 'info', 'accent'],
    },
    size: {
      control: 'inline-radio',
      options: ['sm', 'md', 'lg'],
    },
    status: {
      control: 'select',
      options: [undefined, 'connected', 'disconnected', 'pending', 'verified', 'error'],
    },
    network: {
      control: 'select',
      options: [undefined, 'base', 'base-sepolia', 'ethereum'],
    },
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const StatusPresets: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Badge status="connected">Connected</Badge>
      <Badge status="disconnected">Disconnected</Badge>
      <Badge status="pending">Confirming</Badge>
      <Badge status="verified">Verified</Badge>
      <Badge status="error">Rejected</Badge>
    </div>
  ),
};

export const NetworkPresets: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Badge network="base" dot glow>
        Base
      </Badge>
      <Badge network="base-sepolia" dot glow>
        Base Sepolia
      </Badge>
      <Badge network="ethereum" dot glow>
        Ethereum
      </Badge>
    </div>
  ),
};
