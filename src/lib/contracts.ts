/**
 * Smart Contract Addresses and Configuration
 *
 * Deployed on Base Sepolia Testnet
 */

export const CONTRACTS = {
  baseSepolia: {
    lpRewardNFT: "0x233d257a8f3b395c10df89d0e2dbbb8286c1dc64" as const,
    mysteryBox: "0xe164de6c927398bd7490647f7cefe12e5b3ce68a" as const,
  },
} as const;

export const CHAIN_ID = 84532; // Base Sepolia

export const BLOCK_EXPLORER = {
  baseSepolia: "https://sepolia.basescan.org",
} as const;

// Box Types (matches contract enum)
export enum BoxType {
  Rare = 0,
  Epic = 1,
  Legendary = 2,
}

// Rarity Types (matches contract enum)
export enum Rarity {
  Common = 0,
  Rare = 1,
  Epic = 2,
  Legendary = 3,
}

// Box prices in ETH (testnet pricing)
// NOTE: These are fallback values. Actual prices are fetched from contract via useBoxConfig
export const BOX_PRICES = {
  [BoxType.Rare]: "0.001",
  [BoxType.Epic]: "0.002",
  [BoxType.Legendary]: "0.005",
} as const;

// Rarity display names
export const RARITY_NAMES = {
  [Rarity.Common]: "Common",
  [Rarity.Rare]: "Rare",
  [Rarity.Epic]: "Epic",
  [Rarity.Legendary]: "Legendary",
} as const;

// Rarity colors (Tailwind classes)
export const RARITY_COLORS = {
  [Rarity.Common]: "text-gray-400",
  [Rarity.Rare]: "text-cyan-400",
  [Rarity.Epic]: "text-purple-400",
  [Rarity.Legendary]: "text-yellow-400",
} as const;

// Rarity border colors
export const RARITY_BORDER_COLORS = {
  [Rarity.Common]: "border-gray-500",
  [Rarity.Rare]: "border-cyan-500",
  [Rarity.Epic]: "border-purple-500",
  [Rarity.Legendary]: "border-yellow-500",
} as const;
