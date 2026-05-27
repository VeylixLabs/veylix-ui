# VEYLIX Web3 UI - State

**Last Updated:** May 2026  
**Current Phase:** Phase 2 (Component Expansion & Quality Assurance)

## 📌 Current Status
The UI library has matured beyond scaffolding into a robust component collection with full Web3 integration, 3D rendering capabilities, comprehensive test coverage, and Storybook-powered component documentation. The library now ships 6 production-ready components: VeylixProvider, ConnectWalletButton, NFTCard, AssetViewer, Modal, and Badge. Components are covered by 20 tests, documented with interactive stories, and build successfully into tree-shakeable ESM + CJS bundles. Parity stage 1 is complete for shared CSS primitives, ConnectWalletButton, and NFTCard.

## 🏗️ Architecture & Stack
- **Framework:** React 18/19 (UI Primitives)
- **Styling:** Tailwind CSS v3.4 + PostCSS (`tailwind-merge` & `clsx` via `cn()`)
- **3D Rendering:** React Three Fiber + Drei (GLB/GLTF viewer)
- **Web3:** wagmi + viem (Base Network)
- **Bundler:** tsup → ESM (18.68 KB) + CJS (22.14 KB) + DTS (5.35 KB)
- **Testing:** Vitest + React Testing Library + jest-dom (20 tests)
- **Component Docs:** Storybook 10 + React Vite builder
- **Language:** TypeScript 5.x (Strict Mode)
- **Design System:** Glassmorphism, Dark Monochrome, Glow Effects (VEYLIX Aesthetic)

## 🧩 Implemented Components
1. **`VeylixProvider` (`src/components/VeylixProvider.tsx`)**
   - [x] React Context for Theme (Dark/Light) and Network state.
   - [x] Integrated `wagmi`, `viem`, and `@tanstack/react-query`.
   - [x] Base Network (mainnet + Sepolia testnet) support.
2. **`ConnectWalletButton` (`src/components/ConnectWalletButton.tsx`)**
   - [x] Fully integrated with Wagmi hooks (`useAccount`, `useConnect`, `useDisconnect`).
   - [x] Truncated wallet address display when connected.
   - [x] dApp-style disconnected `vey-wallet-button` state and connected address state.
   - [x] Accent dot indicator (emerald pulse when connected).
3. **`NFTCard` (`src/components/NFTCard.tsx`)**
   - [x] Reusable card for displaying 3D synthetic assets.
   - [x] dApp-style `card-veylix` primitive with hover overlay and glow effects.
   - [x] Verification badge, 3D badge, price display, selected/status states, and "Acquire Asset" CTA.
4. **`AssetViewer` (`src/components/AssetViewer.tsx`)**
   - [x] React Three Fiber wrapper for GLB/GLTF 3D models.
   - [x] Auto-rotate with OrbitControls (zoom, rotate, no pan).
   - [x] VEYLIX-themed lighting (purple directional lights).
   - [x] Suspense fallback with animated "LOADING_MESH" indicator.
5. **`Modal` (`src/components/Modal.tsx`)**
   - [x] Portal-based rendering (`createPortal` into `document.body`).
   - [x] Glassmorphism: `rgba(10,10,10,0.85)` + `backdrop-blur-xl`.
   - [x] Purple glow border + `shadow-[0_0_40px_rgba(170,98,245,0.15)]`.
   - [x] CSS keyframe animations (opacity + scale + translateY).
   - [x] Focus trap (Tab/Shift+Tab cycling within modal).
   - [x] Scroll lock (body overflow hidden).
   - [x] WAI-ARIA: `role="dialog"`, `aria-modal`, `aria-labelledby`.
   - [x] 5 size variants: sm, md, lg, xl, full.
   - [x] `React.forwardRef` with merged internal ref.
   - [x] Configurable: `closeOnBackdropClick`, `closeOnEscape`, `showCloseButton`.
6. **`Badge` (`src/components/Badge.tsx`)**
   - [x] 6 color variants: default, success, warning, error, info, accent.
   - [x] 5 status presets: connected, disconnected, pending, verified, error.
   - [x] 3 network presets: base, base-sepolia, ethereum.
   - [x] 3 sizes: sm, md, lg.
   - [x] Animated dot indicators with pulse for `pending`.
   - [x] Glow effects per variant.
   - [x] `React.forwardRef`.
7. **Test Suite (`src/__tests__/`)**
   - [x] `Modal.test.tsx` — 8 tests (open/close, escape, backdrop, sizes, aria).
   - [x] `Badge.test.tsx` — 6 tests (variants, status/network presets, dots, sizes).
   - [x] `ConnectWalletButton.test.tsx` - 3 tests (dApp-style visual primitive, connect, disconnect).
   - [x] `NFTCard.test.tsx` - 3 tests (dApp-style card primitive, empty preview, acquire action).
8. **Configuration**
   - [x] `vitest.config.ts` with jsdom environment + globals.
   - [x] Test setup with `@testing-library/jest-dom` matchers.
   - [x] `tsup` for tree-shakeable builds (CJS + ESM + DTS).
   - [x] Storybook React/Vite setup with autodocs and component stories.

## 🚦 Known Issues / Blockers
- **dApp parity gap:** Parity stage 1 is complete for shared CSS primitives, ConnectWalletButton, and NFTCard. Remaining gaps include the richer custom wallet selection modal, provider connector parity, transaction/listing-specific modal variants, and the more capable 3D viewer with proxy loading, grid/light controls, progress overlay, and error handling.

## 📋 Remaining Roadmap
- [x] **Storybook Setup** — Interactive component documentation & visual testing.
- [ ] **dApp Component Parity Audit & Alignment** - Bring exported library components in line with the latest dApp component behavior and visual primitives.
- [ ] **NPM Publishing Pipeline** — GitHub Actions for automated NPM releases.
- [ ] **Theming Engine** — Dynamic CSS variables for consumer branding beyond dark/light.
