"use client";

import { useReadContract } from "wagmi";
import { MysteryBoxABI } from "@/abi";
import { CONTRACTS, BoxType } from "@/lib/contracts";

export interface BoxConfig {
  price: bigint;
  isActive: boolean;
  totalOpened: bigint;
}

/**
 * Hook to get box configuration
 * 
 * @param boxType - The box type to query
 * 
 * @example
 * const { config, isLoading } = useBoxConfig(BoxType.Rare);
 */
export function useBoxConfig(boxType: BoxType) {
  const { data: config, isLoading } = useReadContract({
    address: CONTRACTS.baseSepolia.mysteryBox,
    abi: MysteryBoxABI,
    functionName: "getBoxConfig",
    args: [boxType],
  });

  return {
    config: config as BoxConfig | undefined,
    isLoading,
  };
}
