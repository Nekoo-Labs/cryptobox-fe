import { useReadContract, useAccount } from "wagmi";
import { MysteryBoxABI } from "@/abi";
import { CONTRACTS } from "@/lib/contracts";

/**
 * Hook to check if connected wallet is the contract owner
 *
 * @example
 * const { isOwner, isLoading } = useIsContractOwner();
 */
export function useIsContractOwner() {
  const { address, isConnected } = useAccount();

  const { data: ownerAddress, isLoading } = useReadContract({
    address: CONTRACTS.baseSepolia.mysteryBox,
    abi: MysteryBoxABI,
    functionName: "owner",
    query: {
      enabled: isConnected && !!address,
    },
  });

  const isOwner: boolean =
    isConnected &&
    !!address &&
    !!ownerAddress &&
    address.toLowerCase() === (ownerAddress as string).toLowerCase();

  return {
    isOwner,
    isLoading,
    ownerAddress: ownerAddress as string | undefined,
  };
}
