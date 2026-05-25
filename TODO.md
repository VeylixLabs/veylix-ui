# VEYLIX Web3 UI - TODO

## 🎯 Short-Term Goals (Sprint 1)
- [x] **Web3 Integration:** 
  - Install and configure `wagmi` and `viem` inside `VeylixProvider`.
  - Upgrade `ConnectWalletButton` to trigger real MetaMask/WalletConnect prompts.
- [ ] **Component Expansion:** 
  - Build `Modal` component (for transaction status / wallet selection).
  - Build `Badge` component (for network / status indicators).
- [ ] **Styling Overrides:** 
  - Ensure Tailwind classes can be properly overridden by consumers using `tailwind-merge` and `clsx`.

## 🚀 Mid-Term Goals (Sprint 2)
- [ ] **3D Visualizer Component:** 
  - Build a React Three Fiber wrapper (`AssetViewer.tsx`) that can directly take a VEYLIX IPFS hash and render the 3D model gracefully within the UI library.
- [ ] **Storybook Setup:** 
  - Integrate Storybook to catalog components, visually test them, and provide interactive documentation for developers.
- [ ] **Testing:** 
  - Setup React Testing Library and Vitest for UI component testing.

## 🌟 Long-Term Goals
- [ ] **NPM Publishing Pipeline:** Setup GitHub Actions to run linters, build the library, and automatically publish to NPM registry on new releases.
- [ ] **Theming Engine:** Support dynamic custom CSS variables injected by the consumer app to match their specific branding beyond just dark/light mode.
