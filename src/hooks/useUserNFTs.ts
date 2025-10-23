"use client";

import { useReadContract, useAccount } from "wagmi";
import { LPRewardNFTABI } from "@/abi";
import { CONTRACTS } from "@/lib/contracts";

/**
 * Hook to get user's NFT token IDs
 * 
 * @example
 * const { tokenIds, isLoading, refetch } = useUserNFTs();
 */
export function useUserNFTs() {
  const { address } = useAccount();

  const { data: tokenIds, isLoading, refetch } = useReadContract({
    address: CONTRACTS.baseSepolia.lpRewardNFT,
    abi: LPRewardNFTABI,
    functionName: "tokensOfOwner",
    args: address ? [address] : undefined,
    query: {
      enabled: !!address,
    },
  });

  return {
    tokenIds: (tokenIds as bigint[]) || [],
    isLoading,
    refetch,
  };
}
