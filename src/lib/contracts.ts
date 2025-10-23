/**
 * Smart Contract Addresses and Configuration
 * 
 * Deployed on Base Sepolia Testnet
 */

export const CONTRACTS = {
  baseSepolia: {
    lpRewardNFT: "0xFB97175208AA849fc48c74C2196666398aB7Ea4d" as const,
    mysteryBox: "0x58Fb0D3357563Ee7422042AC23c0F63D8724E1D9" as const,
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

// Box prices in ETH
export const BOX_PRICES = {
  [BoxType.Rare]: "3.2",
  [BoxType.Epic]: "3.2",
  [BoxType.Legendary]: "3.2",
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
