import type { Meta, StoryObj } from '@storybook/react-vite';
import { AssetViewer } from './AssetViewer';

const meta = {
  title: 'Components/AssetViewer',
  component: AssetViewer,
  tags: ['autodocs'],
  args: {
    url: 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/main/2.0/Duck/glTF-Binary/Duck.glb',
    autoRotate: true,
    className: 'w-[720px] max-w-[90vw]',
  },
} satisfies Meta<typeof AssetViewer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const GLBModel: Story = {};
