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
  const { data: stats, isLoading, refetch } = useReadContract({
    address: CONTRACTS.baseSepolia.mysteryBox,
    abi: MysteryBoxABI,
    functionName: "getStats",
  });

  return {
    stats: stats
      ? ({
          totalBoxesOpened: stats[0],
          totalValueDistributed: stats[1],
          contractBalance: stats[2],
        } as ContractStats)
      : undefined,
    isLoading,
    refetch,
  };
}
