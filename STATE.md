# VEYLIX Web3 UI - State

**Last Updated:** May 2026
**Current Phase:** Phase 1 (Scaffolding & Architecture Initialization)

## 📌 Current Status
The UI component library has been scaffolded using React and Tailwind CSS. The foundation for exporting presentational Web3 components is established. The repository is tracked by Git and linked to the official VeylixLabs GitHub organization.

## 🏗️ Architecture & Stack
- **Framework:** React 18/19 (UI Primitives)
- **Styling:** Tailwind CSS v3.4 + PostCSS
- **Bundler:** tsup (outputs externalized React components)
- **Language:** TypeScript 5.x (Strict Mode)

## 🧩 Implemented Components
1. **`VeylixProvider` (`src/components/VeylixProvider.tsx`)**
   - [x] Basic React Context for Theme (Dark/Light) and Network state.
2. **`ConnectWalletButton` (`src/components/ConnectWalletButton.tsx`)**
   - [x] Presentational UI button with active/inactive states.
   - [ ] Web3 Logic (Pending).
3. **`NFTCard` (`src/components/NFTCard.tsx`)**
   - [x] Reusable card component tailored for displaying 3D synthetic assets.

## 🚦 Known Issues / Blockers
- The `ConnectWalletButton` currently lacks a Web3 provider backend (like `wagmi` or `viem`). It acts only as a visual placeholder for now.
