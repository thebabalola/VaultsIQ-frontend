# Frontend Issues

This file contains all GitHub issues for the VaultsIQ frontend. Each issue is ready to be copied into GitHub.

## ✅ Completed Issues



### Issue #1: Wallet Integration — Reown AppKit + Wagmi

**Status:** ✅ COMPLETED  
**Completed Date:** 2024

**Labels:** `frontend`, `wallet`, `infrastructure`  

**Priority:** HIGH

**Description:**

Add wallet connection using Reown AppKit (WalletConnect) + Wagmi. Provide a `Navbar` component that shows connect/disconnect, address and network. Configure for Base Sepolia testnet.

**Acceptance Criteria:**

- [x] Users can connect with MetaMask and WalletConnect
- [x] Address displays in navbar
- [x] Network information displays (Base Sepolia)
- [x] Signer is available to send transactions
- [x] Disconnect functionality works
- [x] Network switching works (with proper prompts)

**Implementation Notes:**

- Navbar component created at `components/layout/navbar.tsx` ✅
- AppKit integration configured in `config/wagmi.ts` ✅
- Adapter utilities created in `config/adapter.ts` ✅
- Wagmi configuration in `config/wagmi.ts` ✅
- Base Sepolia chain ID: 84532 ✅
- Environment configuration with `.env.example` ✅
- Constants file created at `config/constants.ts` ✅

---

### Issue #2: Wagmi Configuration & Provider Setup

**Status:** ✅ COMPLETED  
**Completed Date:** 2024

**Labels:** `frontend`, `infrastructure`, `web3`  

**Priority:** HIGH

**Description:**

Create `config/wagmi.ts` and `config/adapter.ts` to expose providers and signers to the app. Configure for Base Sepolia testnet with proper RPC endpoints.

**Acceptance Criteria:**

- [x] Wagmi config configured for Base Sepolia
- [x] Hooks/components can get an ethers provider from the adapter
- [x] Hooks/components can get an ethers signer from the adapter
- [x] `walletClientToSigner` utility function works
- [x] `publicClientToProvider` utility function works
- [x] RPC endpoints properly configured

**Implementation Notes:**

- Base Sepolia RPC: `https://sepolia.base.org` ✅
- Chain ID: 84532 ✅
- Utilities handle viem to ethers conversions correctly ✅
- Created `hooks/useEthersProvider.ts` for getting ethers provider ✅
- Created `hooks/useEthersSigner.ts` for getting ethers signer ✅
- RPC endpoint explicitly configured in wagmi config ✅

---

### Issue #3: Styling, Accessibility & Responsiveness

**Status:** ✅ COMPLETED  
**Completed Date:** 2024

**Labels:** `frontend`, `ui/ux`, `design`  

**Priority:** MEDIUM

**Description:**

Polish UI using Tailwind; ensure components are responsive and accessible. Implement a cohesive design system for VaultsIQ.

**Acceptance Criteria:**

- [x] UI passes basic accessibility checks (labels, focus states)
- [x] Components work on mobile widths
- [x] Modern, responsive design with Tailwind CSS
- [x] Dark mode support
- [x] Proper semantic HTML
- [x] Consistent color scheme and typography

**Implementation Notes:**

- Modern, responsive UI implemented across all pages ✅
- Tailwind CSS used throughout ✅
- Dark mode support via Tailwind dark: classes ✅
- Red color scheme with black, grey, and white accents (VaultsIQ brand colors) ✅
- Added VaultsIQ brand color system to globals.css ✅
- Improved Navbar with ARIA labels, focus states, and mobile responsiveness ✅
- Created VaultsIQ landing page with proper semantic HTML ✅
- Focus-visible styles added for keyboard navigation ✅

---

## ❌ Pending Issues

### Issue #4: Logo Design & Brand Identity

**Status:** ❌ PENDING  

**Labels:** `frontend`, `design`, `branding`  

**Priority:** MEDIUM

**Description:**

Create a professional logo and brand identity for VaultsIQ. The logo should represent intelligence, automation, and multiple vaults. Should work well in both light and dark modes.

**Acceptance Criteria:**

- [ ] Logo designed in multiple formats (SVG, PNG, favicon)
- [ ] Logo works on light and dark backgrounds
- [ ] Logo is scalable (works at small and large sizes)
- [ ] Logo files added to `public/` directory
- [ ] Favicon updated
- [ ] Logo integrated into header/navbar
- [ ] Brand guidelines document (optional but preferred)

**Technical Notes:**

- SVG format preferred for scalability
- Consider creating variations: full logo, icon-only, horizontal/vertical layouts
- Ensure logo is optimized for web (small file size)
- Should convey "IQ" (intelligence) and "multiple vaults" concept

---

### Issue #5: UI Rebrand & Landing Page Redesign

**Status:** ❌ PENDING  

**Labels:** `frontend`, `design`, `ui/ux`  

**Priority:** HIGH

**Description:**

Complete UI rebrand with a modern, professional design. Create a new landing page with: header, hero section, features section, main content area, and footer. Implement a cohesive color scheme using shades of red with a mix of black, grey, and white for a sophisticated, modern look.

**Acceptance Criteria:**

- [ ] Remove existing landing page content
- [ ] Design and implement new layout structure:
  - [ ] Header/Navbar (with logo, navigation, wallet connect)
  - [ ] Hero section (compelling introduction to VaultsIQ)
  - [ ] Features section (highlighting multi-vault capabilities)
  - [ ] Main content area (explaining ERC-4626, yield generation)
  - [ ] Footer (links, social, copyright)
- [ ] Implement color scheme:
  - [ ] Primary: Shades of red for primary actions and branding
  - [ ] Neutral: Black, grey, and white for backgrounds, text, and UI elements
  - [ ] Accent: Red variations for highlights and interactive elements
- [ ] Update Tailwind config with new color palette
- [ ] Ensure design is cohesive across all pages
- [ ] Maintain responsive design (mobile, tablet, desktop)
- [ ] Ensure accessibility (contrast ratios, focus states)

**Technical Notes:**

- Update `tailwind.config.js` with custom color palette
- Consider using CSS variables for theme colors
- Hero section should highlight "multiple vaults" capability
- Feature section should emphasize ERC-4626 compliance and automation

---

### Issue #6: Multi-Vault Dashboard Interface

**Status:** ❌ PENDING  

**Labels:** `frontend`, `feature`, `vaults`  

**Priority:** HIGH

**Description:**

Create a dashboard page (`app/dashboard/page.tsx`) that displays all user vaults in a grid/list view. Each vault card should show key metrics, quick actions, and navigation to individual vault management.

**Acceptance Criteria:**

- [ ] Dashboard page displays all user vaults
- [ ] Vault cards show:
  - [ ] Vault name/identifier
  - [ ] Total assets/value
  - [ ] Current yield/APY
  - [ ] Protocol allocations breakdown
  - [ ] Quick action buttons (view, deposit, withdraw)
- [ ] Empty state when no vaults exist
- [ ] Filter/sort options (by value, date, yield)
- [ ] Responsive grid layout
- [ ] Loading states while fetching vault data
- [ ] Error handling for failed vault fetches

**Implementation Notes:**

- Use `useVaultFactory` hook to fetch user's vaults
- Create `components/vaults/VaultCard.tsx` component
- Integrate with wagmi for contract calls
- Show aggregate statistics (total across all vaults)

---

### Issue #7: Vault Creation Interface

**Status:** ❌ PENDING  

**Labels:** `frontend`, `feature`, `vaults`  

**Priority:** HIGH

**Description:**

Create a vault creation page (`app/create/page.tsx`) with a form to configure and deploy a new vault. Include options for asset selection, initial deposit, and strategy configuration.

**Acceptance Criteria:**

- [ ] Form for vault creation:
  - [ ] Asset selection (USDC, USDT, WETH, etc.)
  - [ ] Vault name (optional)
  - [ ] Initial deposit amount
  - [ ] Strategy selection (if applicable)
- [ ] Transaction flow:
  - [ ] Approve asset spending (if needed)
  - [ ] Call `createVault()` on VaultFactory
  - [ ] Show transaction status (pending, success, error)
  - [ ] Redirect to new vault on success
- [ ] Validation for all inputs
- [ ] Loading states during transaction
- [ ] Error messages for failed transactions
- [ ] Gas estimation display

**Implementation Notes:**

- Integrate with VaultFactory contract
- Handle ERC-20 approvals properly
- Use wagmi's `useWriteContract` hook
- Show transaction progress with toast notifications

---

### Issue #8: Individual Vault Management Page

**Status:** ❌ PENDING  

**Labels:** `frontend`, `feature`, `vaults`  

**Priority:** HIGH

**Description:**

Create a detailed vault management page (`app/vaults/[address]/page.tsx`) showing full vault information, operations (deposit/withdraw), and configuration options.

**Acceptance Criteria:**

- [ ] Display vault information:
  - [ ] Vault address
  - [ ] Owner address
  - [ ] Total assets
  - [ ] Total shares
  - [ ] User's share balance
  - [ ] Current yield/APY
  - [ ] Protocol allocations
- [ ] Deposit interface:
  - [ ] Amount input
  - [ ] Approve button (if needed)
  - [ ] Deposit button
  - [ ] Shows shares to be received
- [ ] Withdraw interface:
  - [ ] Amount or shares input
  - [ ] Withdraw button
  - [ ] Shows assets to be received
- [ ] Protocol allocation configuration
- [ ] Transaction history/activity feed
- [ ] Share transfer functionality

**Implementation Notes:**

- Use dynamic route `[address]` for vault address
- Integrate with UserVault contract (ERC-4626)
- Create separate components for each section
- Handle share calculations correctly

---

### Issue #9: ERC-4626 Vault Operations Integration

**Status:** ❌ PENDING  

**Labels:** `frontend`, `feature`, `web3`, `vaults`  

**Priority:** HIGH

**Description:**

Implement all ERC-4626 standard functions in the frontend: deposit, withdraw, mint, redeem, and share calculations. Create custom hooks for vault operations.

**Acceptance Criteria:**

- [ ] `useUserVault` hook with all ERC-4626 functions:
  - [ ] `deposit(amount)`
  - [ ] `withdraw(amount)`
  - [ ] `mint(shares)`
  - [ ] `redeem(shares)`
  - [ ] `totalAssets()`
  - [ ] `convertToShares(assets)`
  - [ ] `convertToAssets(shares)`
- [ ] Share calculations are accurate
- [ ] Handles edge cases (first deposit, zero assets)
- [ ] Loading states for all operations
- [ ] Error handling with user-friendly messages
- [ ] Transaction status tracking

**Implementation Notes:**

- Create `hooks/useUserVault.ts` hook
- Use wagmi's `useReadContract` and `useWriteContract`
- Handle BigNumber conversions properly
- Test with various scenarios

---

### Issue #10: Protocol Allocation Manager Component

**Status:** ❌ PENDING  

**Labels:** `frontend`, `feature`, `vaults`  

**Priority:** MEDIUM

**Description:**

Create a component (`components/vaults/ProtocolAllocationManager.tsx`) that allows users to configure how their vault assets are allocated across different DeFi protocols (Aave, Compound, Uniswap).

**Acceptance Criteria:**

- [ ] Visual allocation interface:
  - [ ] Sliders or percentage inputs for each protocol
  - [ ] Shows current allocations
  - [ ] Total must equal 100%
  - [ ] Real-time preview of changes
- [ ] Protocol options:
  - [ ] Aave (lending)
  - [ ] Compound (lending)
  - [ ] Uniswap (liquidity)
- [ ] Save/Update functionality:
  - [ ] Transaction for updating allocations
  - [ ] Validation before submission
- [ ] Display current protocol addresses (from factory)
- [ ] Show allocation in both percentage and absolute value

**Implementation Notes:**

- Integrate with vault's `setProtocolAllocation()` function
- Fetch protocol addresses from VaultFactory
- Use sliders from a UI library (e.g., shadcn/ui) or custom
- Validate allocations sum to 100%

---

### Issue #11: Vault Share Transfer Component

**Status:** ❌ PENDING  

**Labels:** `frontend`, `feature`, `vaults`, `erc20`  

**Priority:** MEDIUM

**Description:**

Create a component (`components/vaults/ShareTransfer.tsx`) that allows users to transfer their vault shares to other addresses. Implements ERC-20 transfer functionality for vault shares.

**Acceptance Criteria:**

- [ ] Transfer interface:
  - [ ] Recipient address input
  - [ ] Amount input (in shares)
  - [ ] Transfer button
  - [ ] Shows equivalent asset value
- [ ] Approve functionality:
  - [ ] For spending approvals (if needed)
  - [ ] Check current allowance
- [ ] Transaction flow:
  - [ ] Approve (if needed)
  - [ ] Transfer shares
  - [ ] Show transaction status
- [ ] Validation:
  - [ ] Valid recipient address
  - [ ] Sufficient balance
  - [ ] Non-zero amount
- [ ] Display share balance clearly

**Implementation Notes:**

- Use ERC-20 `transfer()` or `transferFrom()` functions
- Handle approvals properly with `approve()` function
- Show share balance from `balanceOf()`
- Convert shares to assets for display

---

### Issue #12: Vault Performance Analytics

**Status:** ❌ PENDING  

**Labels:** `frontend`, `feature`, `analytics`, `vaults`  

**Priority:** LOW

**Description:**

Create analytics components showing vault performance over time, yield history, and comparison metrics. Display charts and graphs for visual representation.

**Acceptance Criteria:**

- [ ] Performance metrics:
  - [ ] Total yield earned
  - [ ] Current APY
  - [ ] Historical APY graph
  - [ ] Asset growth over time
- [ ] Charts:
  - [ ] Line chart for asset value over time
  - [ ] Bar chart for yield by protocol
  - [ ] Pie chart for allocation breakdown
- [ ] Time range filters (7d, 30d, 90d, all time)
- [ ] Compare multiple vaults
- [ ] Export data functionality (optional)

**Implementation Notes:**

- Use a charting library (e.g., recharts, chart.js)
- Fetch historical data from events or subgraph
- Store data in local state or context
- Consider creating a subgraph for better performance

---

### Issue #13: Transaction History & Activity Feed

**Status:** ❌ PENDING  

**Labels:** `frontend`, `feature`, `activity`  

**Priority:** MEDIUM

**Description:**

Create a transaction history component showing all vault-related transactions for a user. Display deposits, withdrawals, transfers, and protocol deployments.

**Acceptance Criteria:**

- [ ] Activity feed shows:
  - [ ] Transaction type (deposit, withdraw, transfer, etc.)
  - [ ] Amount and asset
  - [ ] Timestamp
  - [ ] Transaction hash (link to explorer)
  - [ ] Status (pending, confirmed, failed)
- [ ] Filter by:
  - [ ] Transaction type
  - [ ] Vault
  - [ ] Date range
- [ ] Pagination or infinite scroll
- [ ] Refresh button
- [ ] Empty state message

**Implementation Notes:**

- Fetch events from contracts using wagmi
- Parse event logs for transaction details
- Use Base Sepolia explorer links
- Consider using a subgraph for better performance

---

### Issue #14: User Profile & Settings

**Status:** ❌ PENDING  

**Labels:** `frontend`, `feature`, `user`  

**Priority:** LOW

**Description:**

Create a user profile page showing registered user information (username, bio), registration date, and settings. Include ability to update profile information.

**Acceptance Criteria:**

- [ ] Display user information:
  - [ ] Wallet address
  - [ ] Username (if registered)
  - [ ] Bio (if registered)
  - [ ] Registration date
- [ ] Edit profile:
  - [ ] Update username
  - [ ] Update bio
  - [ ] Save changes (transaction)
- [ ] Settings:
  - [ ] Preferred network
  - [ ] Theme preference (light/dark)
  - [ ] Notification preferences
- [ ] View all user vaults (link to dashboard)

**Implementation Notes:**

- Integrate with VaultFactory's user registration functions
- Store theme preference in localStorage
- Handle username/bio updates on-chain

---

### Issue #15: Admin Panel Interface

**Status:** ❌ PENDING  

**Labels:** `frontend`, `feature`, `admin`  

**Priority:** LOW

**Description:**

Create an admin panel (`app/admin/page.tsx`) for managing protocol addresses, viewing platform statistics, and managing admins. Access should be restricted to admin addresses.

**Acceptance Criteria:**

- [ ] Admin-only access check
- [ ] Protocol management:
  - [ ] View current protocol addresses
  - [ ] Update protocol addresses
  - [ ] Set new protocols
- [ ] Platform statistics:
  - [ ] Total vaults created
  - [ ] Total users registered
  - [ ] Total assets under management
- [ ] Admin management:
  - [ ] View all admins
  - [ ] Add new admin
  - [ ] Remove admin (with confirmation)
- [ ] User management view (optional)

**Implementation Notes:**

- Check admin status using VaultFactory's `check_is_admin()`
- Show access denied if not admin
- Integrate with all admin functions from VaultFactory
- Add confirmation dialogs for critical actions

---

### Issue #16: Error Handling & User Feedback

**Status:** ❌ PENDING  

**Labels:** `frontend`, `infrastructure`, `ux`  

**Priority:** MEDIUM

**Description:**

Implement comprehensive error handling and user feedback throughout the application. Include toast notifications, error boundaries, and user-friendly error messages.

**Acceptance Criteria:**

- [ ] Toast notification system:
  - [ ] Success messages for transactions
  - [ ] Error messages with details
  - [ ] Loading indicators
  - [ ] Transaction status updates
- [ ] Error boundaries:
  - [ ] Catch React errors
  - [ ] Display fallback UI
  - [ ] Log errors for debugging
- [ ] User-friendly error messages:
  - [ ] Translate contract errors
  - [ ] Provide actionable guidance
  - [ ] Network error handling
- [ ] Loading states:
  - [ ] Skeleton loaders
  - [ ] Spinner components
  - [ ] Disabled states during transactions

**Implementation Notes:**

- Use a toast library (e.g., react-hot-toast, sonner)
- Create ErrorBoundary component
- Map common contract errors to user-friendly messages
- Test error scenarios

---

### Issue #17: Testing & Quality Assurance

**Status:** ❌ PENDING  

**Labels:** `frontend`, `testing`, `quality`  

**Priority:** MEDIUM

**Description:**

Set up comprehensive testing infrastructure including unit tests, integration tests, and E2E tests. Ensure code quality and reliability.

**Acceptance Criteria:**

- [ ] Unit tests:
  - [ ] Component tests (React Testing Library)
  - [ ] Hook tests
  - [ ] Utility function tests
- [ ] Integration tests:
  - [ ] Contract interaction tests
  - [ ] Multi-component workflows
- [ ] E2E tests (optional):
  - [ ] Critical user flows
  - [ ] Wallet connection flow
  - [ ] Vault creation flow
- [ ] Test coverage > 70%
- [ ] CI/CD integration for tests

**Implementation Notes:**

- Set up Jest and React Testing Library
- Mock wagmi hooks for testing
- Use MSW for API mocking (if applicable)
- Configure coverage reporting

---

## 📝 Issue Template

When creating new issues, use this template:

```markdown
### Issue #<number>: <Title>

**Status:** ❌ PENDING  

**Labels:** `<label1>`, `<label2>`  

**Priority:** HIGH | MEDIUM | LOW

**Description:**

<Detailed description of the issue>

**Acceptance Criteria:**

- [ ] Criterion 1
- [ ] Criterion 2
- [ ] Criterion 3

**Implementation Notes:**

- Technical details
- Code locations
- Dependencies
```

---

**Note:** When an issue is completed, move it to the "✅ Completed Issues" section and mark status as `✅ COMPLETED`.
