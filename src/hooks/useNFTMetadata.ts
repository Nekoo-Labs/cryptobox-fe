"use client";

import { useReadContract } from "wagmi";
import { LPRewardNFTABI } from "@/abi";
import { CONTRACTS, Rarity } from "@/lib/contracts";

export interface NFTMetadata {
  rarity: Rarity;
  value: bigint;
  mintedAt: bigint;
}

/**
 * Hook to get NFT metadata
 * 
 * @param tokenId - The NFT token ID
 * 
 * @example
 * const { metadata, isLoading } = useNFTMetadata(1n);
 */
export function useNFTMetadata(tokenId: bigint | undefined) {
  const { data: metadata, isLoading } = useReadContract({
    address: CONTRACTS.baseSepolia.lpRewardNFT,
    abi: LPRewardNFTABI,
    functionName: "getMetadata",
    args: tokenId ? [tokenId] : undefined,
    query: {
      enabled: !!tokenId && tokenId > 0n,
    },
  });

  return {
    metadata: metadata as NFTMetadata | undefined,
    isLoading,
  };
}
