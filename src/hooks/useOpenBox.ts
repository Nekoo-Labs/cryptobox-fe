"use client";

import { useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { parseEther } from "viem";
import { MysteryBoxABI } from "@/abi";
import { CONTRACTS, BOX_PRICES, BoxType } from "@/lib/contracts";

/**
 * Hook to open a mystery box
 * 
 * @example
 * const { openBox, isPending, isConfirming, isSuccess, hash } = useOpenBox();
 * 
 * // Open a Rare box
 * openBox(BoxType.Rare);
 */
export function useOpenBox() {
  const { writeContract, data: hash, isPending, error } = useWriteContract();
  
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  const openBox = (boxType: BoxType) => {
    const price = BOX_PRICES[boxType];
    
    writeContract({
      address: CONTRACTS.baseSepolia.mysteryBox,
      abi: MysteryBoxABI,
      functionName: "openBox",
      args: [boxType],
      value: parseEther(price),
    });
  };

  return {
    openBox,
    isPending,
    isConfirming,
    isSuccess,
    hash,
    error,
  };
}
