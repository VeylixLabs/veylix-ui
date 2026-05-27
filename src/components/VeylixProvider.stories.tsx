import type { Meta, StoryObj } from '@storybook/react-vite';
import { Badge } from './Badge';
import { VeylixProvider, useVeylix } from './VeylixProvider';

function ProviderStatePreview() {
  const { theme, network } = useVeylix();

  return (
    <div className="space-y-4 rounded-lg border border-white/10 bg-black/40 p-5">
      <div className="flex items-center gap-3">
        <Badge variant="accent" glow>
          {theme}
        </Badge>
        <Badge network={network === 'mainnet' ? 'base' : 'base-sepolia'} dot glow>
          {network}
        </Badge>
      </div>
      <p className="max-w-md text-sm leading-6 text-white/70">
        The provider supplies VEYLIX theme state, network mode, Wagmi, and React Query context.
      </p>
    </div>
  );
}

const meta = {
  title: 'Components/VeylixProvider',
  component: VeylixProvider,
  tags: ['autodocs'],
  args: {
    theme: 'dark',
    network: 'mainnet',
  },
  argTypes: {
    theme: {
      control: 'inline-radio',
      options: ['dark', 'light'],
    },
    network: {
      control: 'inline-radio',
      options: ['mainnet', 'testnet'],
    },
  },
} satisfies Meta<typeof VeylixProvider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ContextPreview: Story = {
  render: (args) => (
    <VeylixProvider {...args}>
      <ProviderStatePreview />
    </VeylixProvider>
  ),
};
