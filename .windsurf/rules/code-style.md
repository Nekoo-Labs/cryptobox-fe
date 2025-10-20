---
trigger: always_on
description: Activate when developing or reviewing the CryptoBox website — apply .windsurf rules for Next.js, Web3, UI, and performance decisions. Enforce best practices before commit, build, or deployment actions.
---

# .windsurf — Rules for **CryptoBox** (Next.js 15.5.6, App Router, Wagmi + RainbowKit, Tailwind CSS v4.1, shadcn/ui, TanStack Query, motion/react)

These rules standardize how we build and review the **CryptoBox** dApp. Paste this file into the repo root as `.windsurf` (markdown is fine). Treat it as the canonical engineering playbook.

---

## 0) Project Meta

- **Framework**: Next.js **15.5.6** (App Router)
- **Language**: TypeScript strict mode (`"strict": true`)
- **Styling**: Tailwind CSS **v4.1** + **shadcn/ui** (Radix primitives)
- **Animations**: `motion/react` (Framer Motion API)
- **Web3**: Wagmi + RainbowKit (Viem under the hood)
- **Data**: TanStack/React Query for _all_ async/remote data (HTTP + on-chain reads)
- **Node**: v20 LTS
- **Target**: Edge-compatible by default; opt into Node runtime only when needed

---

## 1) App Router & Component Model

- **Default to Server Components** at the page/layout/segment level.
- Use `"use client"` **at the lowest possible leaf** for interactive bits (buttons, forms, RainbowKit UI, animated elements that need client-side state).
- **Route organization**
  - `src/app/(public)/*` for public pages.
  - `src/app/(app)/*` for authenticated/connected wallet experiences.
  - `src/app/api/*` → **Route Handlers**. Prefer `runtime: "edge"` unless you need Node APIs.
- **Streaming/Suspense**:
  - Use `async` Server Components with `await` and `<Suspense>` boundaries to stream critical shells first.
  - Co-locate skeletons in `loading.tsx` (server).
- **Metadata**:
  - Use `export const metadata` + `generateMetadata` with stable URLs, OpenGraph images, and canonical tags.

---

## 2) Tailwind CSS v4.1 & shadcn/ui

- Tailwind config follows v4.1 “flat” setup; **no global @apply inside components**—prefer utilities.
- **Design tokens** live in `src/styles/tokens.css` (CSS variables), imported in `app/globals.css`.
- **shadcn/ui**
  - Generate shadcn components into `src/components/ui/*`.
  - **Do not** fork component logic; extend via wrappers/slots.
  - Keep **ARIA** and **Radix** attributes intact.
- **Theming**:
  - System theme + class strategy using `next-themes`.
  - Respect prefers-reduced-motion with motion-safe utilities and conditional animation.

---

## 3) Animation with `motion/react`

- Use the **new `motion/react` entrypoint** for Framer APIs.
- Keep animations **purely presentational**; no business logic in animation handlers.
- Gate complex animations behind `prefers-reduced-motion`; provide non-animated fallback states.
- Small interactive motion → leaf client component; otherwise prefer **CSS transitions**.

---

## 4) Web3 Architecture (Wagmi + RainbowKit + Viem)

- **Single source of truth** for chains and transports: `src/lib/wagmi/config.ts`.
- **RainbowKit** config and theme in `src/lib/rainbowkit.ts`.
- **Providers** (client) live in `src/app/providers.tsx` and are imported in `app/layout.tsx` (server) via a **Client Boundary**.
- **WalletConnect** project id comes from `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID`.
- **Chain policy**:
  - Support **Base Sepolia** for test flow; production toggled via env flag.
  - Hard-fail UI (banner) if connected chain ≠ supported chain(s).
- **Contract ABIs**:
  - Store in `src/abi/*.ts` (typed `as const`), export using `viem` `Abi` types.
  - Version ABIs with semantic suffixes (`MysteryBoxV1`, `MysteryBoxV2`) and document deployed addresses per chain in `src/lib/addresses.ts`.
- **RPC**:
  - Use `http(process.env.NEXT_PUBLIC_RPC_URL ?? undefined)` for public transport.
  - For server-only reads, **never** expose privileged RPC keys to client; use Route Handlers or Server Actions.

---

## 5) Data Fetching Strategy (React Query + Wagmi)

- **All asynchronous data** (HTTP or on-chain reads) must be modeled as **queries** (React Query).
- **Cache keys** are **namespaced**: `["onchain", "box", { chainId, contract, account }]`.
- **Prefetch on Server**:
  - Use `@tanstack/react-query` **dehydration**:
    - Prefetch in a server component or Route Handler.
    - Pass dehydrated state to a **client** `Providers` boundary with `HydrationBoundary`.
- **Writes / Mutations**:
  - All wallet **writes are client-side** (`useWriteContract`, or `useWaitForTransactionReceipt`).
  - Wrap in React Query **mutations** to standardize toasts, errors, and optimistic UI.
- **Consistency**:
  - After writes, invalidate precise keys (not `invalidateQueries()` broad-brush).
  - Prefer _idempotent_ re-validation patterns (e.g., `refetchOnMount: false`, `staleTime` tuned per query).
- **Error boundaries**:
  - Use React Query error boundaries for leaf client components + Next.js `error.tsx` at segment level.

---

## 6) Server Reads & Server Actions

- When feasible, **perform read-only on-chain queries server-side** using Viem clients within:
  - **Server Components**, **Route Handlers** (`app/api/*`), or **Server Actions**.
- **Never sign** on the server; signing is **wallet-only** on client.
- Use `cache()` + `revalidateTag()` (Next.js caching) for _pure_ on-chain reads that can be shared across users.
- Tag cache by `(chainId, contract, method, args)`.

---

## 7) File/Folder Layout (enforced)

src/
app/
(public)/
(app)/
api/
layout.tsx # server
page.tsx # server
providers.tsx # client (React Query, Wagmi, RainbowKit, Theme)
globals.css
components/
ui/ # shadcn
shared/ # app-agnostic atoms/molecules
web3/ # wallet/connect, network guards
features/
boxes/ # feature slice: pages, hooks, components, queries
hooks/
lib/
wagmi/
config.ts
chains.ts
addresses.ts
env.ts # typed env loader
queryClient.ts
analytics.ts
logger.ts
abi/
styles/
types/

- **Feature-first**: colocate `queries.ts`, `mutations.ts`, and UI per feature.
- **No barrel files** at `src/*` root to avoid bundling surprises; feature-level barrels are OK.

---

## 8) Environment & Secrets

- All client-read variables start with `NEXT_PUBLIC_`.
- Centralize env parsing in `src/lib/env.ts` with `zod`:
  - Fail fast at startup (server) and provide **safe defaults** only for dev.
- **Do not** leak server-only secrets to browser bundles. Audit with `next build` output and `@next/bundle-analyzer` when in doubt.

---

## 9) Accessibility & UX

- Wallet flows must be **keyboard navigable** and **screen-reader friendly**.
- Provide **deterministic fallbacks** for animated elements.
- Color contrast meets WCAG AA; respect system dark mode by default.

---

## 10) Performance & Caching

- **Images** via Next/Image with static `width/height` and `priority` only above-the-fold.
- Use **Partial Prerendering** (PPR) for public pages where safe.
- On-chain read queries: set `staleTime` thoughtfully; common default `staleTime: 5_000`ms.
- Use `revalidate`/`revalidateTag` for shared server reads; never over-cache volatile contract state.

---

## 11) Error Handling & Toasts

- Normalize error shapes from:
  - Viem/Wagmi (contract call errors)
  - Route Handlers (HTTP errors)
- Map to **user-safe** messages; include **debug id** in dev only.
- Use a shared `useTxToasts()` helper for submit → pending → confirmed → failed.

---

## 12) Network & Chain Guards

- **NetworkGate** client component prevents unsupported networks:
  - Shows RainbowKit chain switch prompt.
  - Displays non-blocking banner when on wrong chain.
- **Chain constants** in `src/lib/wagmi/chains.ts` with enforced **chainId enum**.

---

## 13) Testing

- **Unit**: Vitest + React Testing Library for hooks/components.
- **Contract integration (read)**: Mock with Viem’s `testClient` or MSW for HTTP.
- **E2E**: Playwright minimal critical paths: connect wallet (mock), open box flow, receipt.

---

## 14) CI/CD & Quality Gates

- Required on PR:
  - `type-check` (tsc)
  - `lint` (eslint)
  - `build` (Next)
  - `vitest --run`
- **Conventional Commits** enforced.
- Preview deploys to Vercel; comment preview URL on PR.

---

## 15) Logging & Analytics

- `src/lib/logger.ts` wrapper:
  - `info`, `warn`, `error` with minimal PII.
- Client analytics opt-in; send only **anonymized** events (page view, connect, open box success).
- No wallet addresses in analytics without explicit consent.

---

## 16) Security

- Strict CSP with `nonce` for inline scripts (Next 15 supports `headers()` easy mode).
- `Sec-CH-UA-Platform` etc. are not logged.
- Validate **user-supplied calldata** (if any) prior to submitting writes.
- **Replay safety**: display pending tx hash and disable duplicate submits.
- Confirmations:
  - UX targets **1 confirmation** on testnets; let chain config tune this for mainnet.

---

## 17) Internationalization & Formatting

- Keep copy in `messages/en.json` and use a tiny `t()` util. Avoid runtime heavy i18n libs unless needed.
- Prettier single source of truth; **no inline eslint formatting rules**.

---

## 18) Example: Providers & Config (authoritative patterns)

**`src/wagmi.ts`**

```ts
import { http, createConfig } from "wagmi";
import { baseSepolia } from "wagmi/chains";

export const chains = [baseSepolia] as const;

export const wagmiConfig = createConfig({
  chains,
  transports: {
    [baseSepolia.id]: http(process.env.NEXT_PUBLIC_RPC_URL),
  },
  multiInjectedProviderDiscovery: true,
  ssr: true, // enables RSC-safe hydration hints
});
```
