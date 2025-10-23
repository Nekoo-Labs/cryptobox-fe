"use client";

import { useReadContract } from "wagmi";
import { MysteryBoxABI } from "@/abi";
import { CONTRACTS } from "@/lib/contracts";

export interface ContractStats {
  totalBoxesOpened: bigint;
  totalValueDistributed: bigint;
  contractBalance: bigint;
}

/**
 * Hook to get contract statistics
 *
 * @example
 * const { stats, isLoading } = useContractStats();
 */
export function useContractStats() {
  const {
    data: stats,
    isLoading,
    refetch,
  } = useReadContract({
    address: CONTRACTS.baseSepolia.mysteryBox,
    abi: MysteryBoxABI,
    functionName: "getStats",
  });

  // getStats returns [totalOpened: bigint, totalValue: bigint, contractBalance: bigint]
  const typedStats = stats as readonly [bigint, bigint, bigint] | undefined;

  return {
    stats: typedStats
      ? ({
          totalBoxesOpened: typedStats[0],
          totalValueDistributed: typedStats[1],
          contractBalance: typedStats[2],
        } as ContractStats)
      : undefined,
    isLoading,
    refetch,
  };
}
