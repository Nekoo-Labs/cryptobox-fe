import { useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { MysteryBoxABI } from "@/abi";
import { CONTRACTS } from "@/lib/contracts";

/**
 * Hook to withdraw accumulated platform fees from NFT burns
 * Only callable by contract owner
 *
 * @example
 * const { withdrawFees, isPending, isConfirming, isSuccess } = useWithdrawPlatformFees();
 * withdrawFees("0x...recipientAddress");
 */
export function useWithdrawPlatformFees() {
  const { writeContract, data: hash, isPending, error } = useWriteContract();

  const {
    isLoading: isConfirming,
    isSuccess,
    data: receipt,
  } = useWaitForTransactionReceipt({
    hash,
  });

  const withdrawFees = (recipientAddress: `0x${string}`) => {
    writeContract({
      address: CONTRACTS.baseSepolia.mysteryBox,
      abi: MysteryBoxABI,
      functionName: "withdrawPlatformFees",
      args: [recipientAddress],
    });
  };

  return {
    withdrawFees,
    isPending,
    isConfirming,
    isSuccess,
    hash,
    error,
    receipt,
  };
}
