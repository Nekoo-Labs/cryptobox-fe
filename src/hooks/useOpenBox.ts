"use client";

import { useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { decodeEventLog } from "viem";
import { MysteryBoxABI } from "@/abi";
import { CONTRACTS, BoxType, Rarity } from "@/lib/contracts";

/**
 * Hook to open a mystery box
 *
 * @example
 * const { openBox, isPending, isConfirming, isSuccess, hash } = useOpenBox();
 *
 * // Open a Rare box with the correct price from config
 * openBox(BoxType.Rare, boxPrice);
 */
export interface MintedNFT {
  tokenId: bigint;
  rarity: Rarity;
  value: bigint;
}

export function useOpenBox() {
  const { writeContract, data: hash, isPending, error } = useWriteContract();

  const {
    isLoading: isConfirming,
    isSuccess,
    data: receipt,
  } = useWaitForTransactionReceipt({
    hash,
  });

  /**
   * Open a mystery box
   * @param boxType - The type of box to open
   * @param price - The price in wei (bigint) from the box config
   */
  const openBox = (boxType: BoxType, price: bigint) => {
    writeContract({
      address: CONTRACTS.baseSepolia.mysteryBox,
      abi: MysteryBoxABI,
      functionName: "openBox",
      args: [boxType],
      value: price,
    });
  };

  // Extract minted NFT data from transaction logs
  const mintedNFT: MintedNFT | null = (() => {
    if (!receipt || !isSuccess) return null;

    try {
      // Find the BoxOpened event in the logs
      const boxOpenedLog = receipt.logs.find((log) => {
        try {
          const decoded = decodeEventLog({
            abi: MysteryBoxABI,
            data: log.data,
            topics: log.topics,
          });
          return decoded.eventName === "BoxOpened";
        } catch {
          return false;
        }
      });

      if (!boxOpenedLog) return null;

      const decoded = decodeEventLog({
        abi: MysteryBoxABI,
        data: boxOpenedLog.data,
        topics: boxOpenedLog.topics,
      });

      if (decoded.eventName === "BoxOpened" && decoded.args) {
        const args = decoded.args as unknown as {
          tokenId: bigint;
          rarity: number;
          value: bigint;
        };
        return {
          tokenId: args.tokenId,
          rarity: args.rarity as Rarity,
          value: args.value,
        };
      }
    } catch (err) {
      console.error("Failed to decode BoxOpened event:", err);
    }

    return null;
  })();

  return {
    openBox,
    isPending,
    isConfirming,
    isSuccess,
    hash,
    error,
    mintedNFT,
  };
}
