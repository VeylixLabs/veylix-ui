import type { Meta, StoryObj } from '@storybook/react-vite';
import { NFTCard } from './NFTCard';

const meta = {
  title: 'Components/NFTCard',
  component: NFTCard,
  tags: ['autodocs'],
  args: {
    id: 'asset-001',
    name: 'Synthetic A1 H100 GPU',
    creator: 'VEYLIX Foundry',
    price: '0.75',
    verified: true,
    image: 'https://images.unsplash.com/photo-1639322537228-f710d846310a?auto=format&fit=crop&w=900&q=80',
  },
} satisfies Meta<typeof NFTCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const VerifiedAsset: Story = {};

export const EmptyPreview: Story = {
  args: {
    image: undefined,
    verified: false,
    name: 'Offline Spatial Rig',
    creator: 'Node Operator 17',
    price: '0.28',
  },
};

export const ProcessingAsset: Story = {
  args: {
    image: undefined,
    verified: false,
    name: 'Neural Terrain Bake',
    creator: 'VEYLIX Queue',
    price: '0.42',
    status: 'processing',
  },
};

export const SelectedAsset: Story = {
  args: {
    selected: true,
  },
};
