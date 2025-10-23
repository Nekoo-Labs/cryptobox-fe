"use client";

import { useReadContract } from "wagmi";
import { LPRewardNFTABI } from "@/abi";
import { CONTRACTS, Rarity } from "@/lib/contracts";
import { getNFTImageUrl } from "@/lib/utils/url";

export interface NFTMetadata {
  rarity: Rarity;
  value: bigint;
  mintedAt: bigint;
  tokenURI?: string;
  name?: string;
  description?: string;
  image?: string;
}

// Rarity to card image mapping (relative paths)
const RARITY_IMAGE_PATHS: Record<Rarity, string> = {
  [Rarity.Common]: "/assets/lp-nft-card/common-lp-nft-card.png",
  [Rarity.Rare]: "/assets/lp-nft-card/rare-lp-nft-card.png",
  [Rarity.Epic]: "/assets/lp-nft-card/epic-lp-nft-card.png",
  [Rarity.Legendary]: "/assets/lp-nft-card/legendary-lp-nft-card.png",
};

const RARITY_NAMES: Record<Rarity, string> = {
  [Rarity.Common]: "Common",
  [Rarity.Rare]: "Rare",
  [Rarity.Epic]: "Epic",
  [Rarity.Legendary]: "Legendary",
};

/**
 * Hook to get NFT metadata
 *
 * @param tokenId - The NFT token ID
 *
 * @example
 * const { metadata, isLoading } = useNFTMetadata(1n);
 */
export function useNFTMetadata(tokenId: bigint | undefined) {
  // Get on-chain metadata
  const { data: onChainMetadata, isLoading: isLoadingMetadata } =
    useReadContract({
      address: CONTRACTS.baseSepolia.lpRewardNFT,
      abi: LPRewardNFTABI,
      functionName: "getMetadata",
      args: tokenId ? [tokenId] : undefined,
      query: {
        enabled: !!tokenId && tokenId > 0n,
      },
    });

  // Get tokenURI
  const { data: tokenURI, isLoading: isLoadingURI } = useReadContract({
    address: CONTRACTS.baseSepolia.lpRewardNFT,
    abi: LPRewardNFTABI,
    functionName: "tokenURI",
    args: tokenId ? [tokenId] : undefined,
    query: {
      enabled: !!tokenId && tokenId > 0n,
    },
  });

  const isLoading = isLoadingMetadata || isLoadingURI;

  // Combine metadata with default values
  const metadata = onChainMetadata as
    | { rarity: Rarity; value: bigint; mintedAt: bigint }
    | undefined;

  if (!metadata) {
    return { metadata: undefined, isLoading };
  }

  const rarity = metadata.rarity;
  const enrichedMetadata: NFTMetadata = {
    ...metadata,
    tokenURI: tokenURI as string | undefined,
    name: `${RARITY_NAMES[rarity]} LP Reward NFT`,
    description: `A ${RARITY_NAMES[rarity]} rarity LP Reward NFT from CryptoBox`,
    image: getNFTImageUrl(RARITY_IMAGE_PATHS[rarity]), // Convert to absolute URL
  };

  return {
    metadata: enrichedMetadata,
    isLoading,
  };
}
