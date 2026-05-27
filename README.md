# VEYLIX Web3 UI

<p align="center">
  <img src="https://via.placeholder.com/1200x300/050505/d8b4fe?text=VEYLIX+Web3+UI" alt="VEYLIX Web3 UI banner" style="max-width: 100%;">
</p>

<p align="center">
  <a href="https://img.shields.io/badge/React-18%2F19-61DAFB?style=flat-square&logo=react&logoColor=black"><img src="https://img.shields.io/badge/React-18%2F19-61DAFB?style=flat-square&logo=react&logoColor=black" alt="React 18/19"></a>
  <a href="https://img.shields.io/badge/Tailwind_CSS-3.4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white"><img src="https://img.shields.io/badge/Tailwind_CSS-3.4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white" alt="Tailwind CSS 3.4"></a>
  <a href="https://img.shields.io/badge/TypeScript-5.x-3178C6?style=flat-square&logo=typescript&logoColor=white"><img src="https://img.shields.io/badge/TypeScript-5.x-3178C6?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript 5.x"></a>
  <a href="https://img.shields.io/badge/Storybook-10-FF4785?style=flat-square&logo=storybook&logoColor=white"><img src="https://img.shields.io/badge/Storybook-10-FF4785?style=flat-square&logo=storybook&logoColor=white" alt="Storybook 10"></a>
</p>

**VEYLIX Web3 UI** is the reusable React component library for VEYLIX interfaces. It packages the current Web3 UI primitives, 3D asset presentation components, and VEYLIX visual language into a tree-shakeable library that can be consumed by dApps, dashboards, and developer-facing tools.

The package is currently in **Phase 2: Component Expansion & Quality Assurance**. Core components are implemented, tested, documented with Storybook, and build successfully as ESM, CJS, and TypeScript declaration bundles.

## Current Status

- **Production-ready components:** `VeylixProvider`, `ConnectWalletButton`, `NFTCard`, `AssetViewer`, `Modal`, and `Badge`
- **Testing:** 20 Vitest + React Testing Library tests passing
- **Documentation:** Storybook 10 with React/Vite and autodocs
- **Build output:** ESM, CJS, CSS, source maps, and declaration files via `tsup`
- **Parity progress:** CSS token primitives, `ConnectWalletButton`, and `NFTCard` have been aligned with the latest `veylix-dapp` direction; full parity is still in progress

## Features

- **Base-aware Web3 foundation:** Provider integration for Wagmi, Viem, React Query, Base mainnet, and Base Sepolia.
- **Wallet connection primitive:** `ConnectWalletButton` now uses the dApp-style `vey-wallet-button` visual primitive for disconnected wallet selection and a Base-style connected address state.
- **3D asset UI:** `NFTCard` now uses the dApp-style `card-veylix` primitive with 3D, verified, selected, processing, and failed states; `AssetViewer` provides GLB/GLTF viewing through React Three Fiber and Drei.
- **Accessible overlays:** `Modal` includes portal rendering, focus trap, Escape handling, scroll lock, backdrop controls, and ARIA dialog attributes.
- **Status primitives:** `Badge` supports variants, status presets, network presets, dot indicators, glow states, and size variants.
- **Consumer overrides:** Component class names are merged with `clsx` and `tailwind-merge` through the shared `cn()` utility.

## Installation

```bash
npm install veylix-ui
```

Peer dependencies:

```bash
npm install react react-dom
```

Import the generated stylesheet once in your app root:

```tsx
import 'veylix-ui/dist/index.css';
```

If your consuming app uses Tailwind CSS, include this package in your Tailwind content paths so utility classes from the library are preserved:

```js
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/veylix-ui/dist/**/*.{js,mjs}',
  ],
};
```

## Quick Start

Wrap your application with `VeylixProvider`:

```tsx
import { VeylixProvider } from 'veylix-ui';
import 'veylix-ui/dist/index.css';

export function App({ children }: { children: React.ReactNode }) {
  return (
    <VeylixProvider theme="dark" network="mainnet">
      {children}
    </VeylixProvider>
  );
}
```

Use the exported components:

```tsx
import { Badge, ConnectWalletButton, NFTCard } from 'veylix-ui';

export function DashboardPreview() {
  return (
    <section className="space-y-6 bg-black p-8">
      <div className="flex items-center justify-between">
        <Badge network="base" dot glow>
          Base Mainnet
        </Badge>
        <ConnectWalletButton label="Connect Wallet" />
      </div>

      <NFTCard
        id="asset-001"
        name="Synthetic A1 H100 GPU"
        creator="VEYLIX Foundry"
        price="0.75"
        image="/images/asset-1.png"
        verified
        onBuy={() => console.log('Acquire asset')}
      />
    </section>
  );
}
```

Render a GLB/GLTF asset:

```tsx
import { AssetViewer } from 'veylix-ui';

export function AssetPreview() {
  return (
    <AssetViewer
      url="https://example.com/model.glb"
      autoRotate
      className="h-[480px]"
    />
  );
}
```

## Component Inventory

| Component | Purpose | Status |
| :--- | :--- | :--- |
| `VeylixProvider` | Theme, network, Wagmi, and React Query context | Implemented |
| `ConnectWalletButton` | Wallet connect/disconnect trigger with dApp-style disconnected and connected states | Implemented and tested |
| `NFTCard` | Synthetic asset card with dApp-style card primitive, status badges, metadata, price, and CTA | Implemented and tested |
| `AssetViewer` | GLB/GLTF model viewer with OrbitControls and VEYLIX lighting | Implemented |
| `Modal` | Accessible portal dialog with focus trap and scroll lock | Implemented and tested |
| `Badge` | Status, network, and variant badge primitive | Implemented and tested |

## Storybook

Storybook is configured for interactive component documentation and visual review.

```bash
npm run storybook
npm run build-storybook
```

Current stories cover:

- `AssetViewer`
- `Badge`
- `ConnectWalletButton`
- `Modal`
- `NFTCard`
- `VeylixProvider`

## Development

```bash
npm install
npm test
npm run build
npm run storybook
```

Useful scripts:

| Script | Description |
| :--- | :--- |
| `npm run build` | Build ESM, CJS, CSS, and declaration outputs with `tsup` |
| `npm run dev` | Run `tsup` in watch mode |
| `npm test` | Run the Vitest test suite |
| `npm run test:watch` | Run Vitest in watch mode |
| `npm run storybook` | Start Storybook on port 6006 |
| `npm run build-storybook` | Build static Storybook output |

## Stack

| Layer | Technology |
| :--- | :--- |
| Framework | React 18/19 |
| Language | TypeScript 5.x |
| Styling | Tailwind CSS 3.4, `clsx`, `tailwind-merge` |
| Web3 | Wagmi, Viem, Base, Base Sepolia |
| 3D Rendering | React Three Fiber, Drei, Three.js |
| Testing | Vitest, React Testing Library, jest-dom |
| Component Docs | Storybook 10 with React/Vite |
| Bundling | tsup |

## Roadmap

- [x] Web3 provider integration
- [x] Modal and Badge component expansion
- [x] 3D visualizer component
- [x] Storybook setup
- [x] Vitest + React Testing Library setup
- [ ] Continue dApp component parity alignment: wallet modal, modal variants, provider connector parity, and advanced model viewer behavior
- [ ] NPM publishing pipeline
- [ ] Dynamic theming engine with consumer-provided CSS variables

## dApp Parity Note

This package tracks the VEYLIX dApp visual system, but it is not yet fully identical to the latest `veylix-dapp` implementation. The first parity pass added the shared CSS token primitives and aligned `ConnectWalletButton` plus `NFTCard`. Known parity work remains around the richer wallet selection modal, provider connector setup, transaction/listing modal variants, and the advanced dApp model viewer behavior.

See `STATE.md` and `TODO.md` for the latest implementation state and roadmap.

## License

Apache 2.0.

---

**VEYLIX** - Decentralized Synthetic Production Infrastructure for Virtual AAA Worlds.
