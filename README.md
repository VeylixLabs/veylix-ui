# VEYLIX Web3 UI

<p align="center">
  <img src="https://via.placeholder.com/1200x300/000000/FFFFFF?text=VEYLIX+Web3+UI" alt="Veylix UI Banner" style="max-width: 100%;">
</p>

<p align="center">
  <a href="https://img.shields.io/badge/React-18+-61DAFB?style=flat-square&logo=react&logoColor=black"><img src="https://img.shields.io/badge/React-18+-61DAFB?style=flat-square&logo=react&logoColor=black" alt="React"></a>
  <a href="https://img.shields.io/badge/Tailwind_CSS-v3.4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white"><img src="https://img.shields.io/badge/Tailwind_CSS-v3.4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white" alt="Tailwind CSS"></a>
  <a href="https://img.shields.io/badge/TypeScript-5.9-3178C6?style=flat-square&logo=typescript&logoColor=white"><img src="https://img.shields.io/badge/TypeScript-5.9-3178C6?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript"></a>
  <a href="https://img.shields.io/badge/License-Apache_2.0-blue?style=flat-square"><img src="https://img.shields.io/badge/License-Apache_2.0-blue?style=flat-square" alt="License"></a>
</p>

The **VEYLIX Web3 UI** is a reusable component library built with React and Tailwind CSS. It extracts the core visual language, layout components, and Web3 interactions from the VEYLIX dApp and Console into an easily installable package.

This library ensures consistency across all VEYLIX ecosystem interfaces while allowing developers to quickly build decentralized spatial production dashboards.

## Features

- **Web3 Native**: Built-in `ConnectWalletButton`, wallet modal wrappers, and network switchers.
- **Spatial Focus**: Pre-built components like `NFTCard` tailored for 3D assets and high-fidelity previews.
- **Themeable**: Native Dark/Light mode support managed via `VeylixProvider`.
- **Tailwind Integrated**: Completely styled using utility classes, allowing easy overrides.

## Installation

```bash
npm install veylix-ui
# or
yarn add veylix-ui
```

> [!NOTE]
> Make sure you also have `react` and `react-dom` installed in your project. If you are using Tailwind CSS, ensure you add the UI library to your `tailwind.config.js` content array.

## Quick Start

### 1. Wrap your application

Wrap the root of your application with the `VeylixProvider`.

```tsx
import { VeylixProvider } from 'veylix-ui';
import 'veylix-ui/dist/style.css'; // Import the base styles

export default function App({ children }) {
  return (
    <VeylixProvider theme="dark" network="mainnet">
      {children}
    </VeylixProvider>
  );
}
```

### 2. Use Components

```tsx
import { ConnectWalletButton, NFTCard } from 'veylix-ui';

export function Dashboard() {
  return (
    <div className="p-8">
      <ConnectWalletButton />
      
      <div className="mt-8">
        <NFTCard 
          name="Synthetic A1 H100 GPU" 
          imageUrl="/images/asset-1.png" 
          price="500" 
        />
      </div>
    </div>
  );
}
```

## Stack Matrix

| Layer | Technology |
| :--- | :--- |
| **Framework** | React 18+ (Compatible with Next.js) |
| **Styling** | Tailwind CSS v3.4 |
| **Icons & Micro-interactions** | Heroicons, Radix UI Primitives, Framer Motion |
| **Bundler** | tsup (Outputting ESM and CJS) |

---

## License

Apache 2.0 - see [LICENSE](./LICENSE) for more details.

---
**VEYLIX** • Decentralized Synthetic Production Infrastructure for Virtual AAA Worlds.
