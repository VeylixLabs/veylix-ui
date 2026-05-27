import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Badge } from './Badge';
import { Modal } from './Modal';

const meta = {
  title: 'Components/Modal',
  component: Modal,
  tags: ['autodocs'],
  args: {
    title: 'Mint Synthetic Asset',
    size: 'md',
    closeOnBackdropClick: true,
    closeOnEscape: true,
    showCloseButton: true,
  },
  argTypes: {
    size: {
      control: 'inline-radio',
      options: ['sm', 'md', 'lg', 'xl', 'full'],
    },
  },
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Interactive: Story = {
  render: (args) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <>
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="rounded-lg border border-[rgba(170,98,245,0.35)] bg-[rgba(170,98,245,0.12)] px-5 py-3 font-tech text-sm uppercase tracking-widest text-white transition hover:bg-[rgba(170,98,245,0.25)]"
        >
          Open Modal
        </button>
        <Modal {...args} isOpen={isOpen} onClose={() => setIsOpen(false)}>
          <div className="space-y-4">
            <Badge status="pending">Awaiting wallet confirmation</Badge>
            <p className="text-sm leading-6 text-white/70">
              Review the asset metadata and confirm the mint request in your connected wallet.
            </p>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="w-full rounded-md border border-white/10 bg-white/10 px-4 py-2 font-tech text-xs uppercase tracking-widest text-white transition hover:bg-white/20"
            >
              Confirm Preview
            </button>
          </div>
        </Modal>
      </>
    );
  },
};
