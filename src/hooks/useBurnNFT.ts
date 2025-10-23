import { useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { MysteryBoxABI } from "@/abi";
import { CONTRACTS } from "@/lib/contracts";

/**
 * Hook to burn/redeem an NFT for ETH
 * User receives 20% of NFT value, 80% goes to platform
 *
 * @example
 * const { burnNFT, isPending, isConfirming, isSuccess } = useBurnNFT();
 * burnNFT(tokenId);
 */
export function useBurnNFT() {
  const { writeContract, data: hash, isPending, error } = useWriteContract();

  const {
    isLoading: isConfirming,
    isSuccess,
    data: receipt,
  } = useWaitForTransactionReceipt({
    hash,
  });

  const burnNFT = (tokenId: bigint) => {
    writeContract({
      address: CONTRACTS.baseSepolia.mysteryBox,
      abi: MysteryBoxABI,
      functionName: "redeemNFT",
      args: [tokenId],
    });
  };

  return {
    burnNFT,
    isPending,
    isConfirming,
    isSuccess,
    hash,
    error,
    receipt,
  };
}
