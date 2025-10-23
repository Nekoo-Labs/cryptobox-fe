"use client";

import { useReadContract } from "wagmi";
import { MysteryBoxABI } from "@/abi";
import { CONTRACTS } from "@/lib/contracts";

export interface ContractStats {
  totalBoxesOpened: bigint;
  totalValueDistributed: bigint;
  contractBalance: bigint;
  totalNFTsRedeemed?: bigint;
  totalValueRedeemed?: bigint;
  totalPlatformFees?: bigint;
}

/**
 * Hook to get contract statistics
 *
 * @example
 * const { stats, isLoading } = useContractStats();
 */
export function useContractStats() {
  // Get basic stats
  const {
    data: basicStats,
    isLoading: isLoadingBasic,
    refetch: refetchBasic,
  } = useReadContract({
    address: CONTRACTS.baseSepolia.mysteryBox,
    abi: MysteryBoxABI,
    functionName: "getStats",
  });

  // Get NFTs redeemed
  const { data: nftsRedeemed, isLoading: isLoadingRedeemed } = useReadContract({
    address: CONTRACTS.baseSepolia.mysteryBox,
    abi: MysteryBoxABI,
    functionName: "totalNFTsRedeemed",
  });

  // Get value redeemed
  const { data: valueRedeemed, isLoading: isLoadingValue } = useReadContract({
    address: CONTRACTS.baseSepolia.mysteryBox,
    abi: MysteryBoxABI,
    functionName: "totalValueRedeemed",
  });

  // Get platform fees
  const { data: platformFees, isLoading: isLoadingFees } = useReadContract({
    address: CONTRACTS.baseSepolia.mysteryBox,
    abi: MysteryBoxABI,
    functionName: "totalPlatformFees",
  });

  const isLoading =
    isLoadingBasic || isLoadingRedeemed || isLoadingValue || isLoadingFees;

  // getStats returns [totalOpened: bigint, totalValue: bigint, contractBalance: bigint]
  const typedStats = basicStats as
    | readonly [bigint, bigint, bigint]
    | undefined;

  return {
    stats: typedStats
      ? ({
          totalBoxesOpened: typedStats[0],
          totalValueDistributed: typedStats[1],
          contractBalance: typedStats[2],
          totalNFTsRedeemed: nftsRedeemed as bigint | undefined,
          totalValueRedeemed: valueRedeemed as bigint | undefined,
          totalPlatformFees: platformFees as bigint | undefined,
        } as ContractStats)
      : undefined,
    isLoading,
    refetch: refetchBasic,
  };
}
