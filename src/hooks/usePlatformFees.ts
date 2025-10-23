import { useReadContract } from "wagmi";
import { MysteryBoxABI } from "@/abi";
import { CONTRACTS } from "@/lib/contracts";

/**
 * Hook to read accumulated platform fees from NFT burns
 *
 * @example
 * const { platformFees, isLoading } = usePlatformFees();
 */
export function usePlatformFees() {
  const { data, isLoading, error, refetch } = useReadContract({
    address: CONTRACTS.baseSepolia.mysteryBox,
    abi: MysteryBoxABI,
    functionName: "totalPlatformFees",
  });

  return {
    platformFees: data as bigint | undefined,
    isLoading,
    error,
    refetch,
  };
}
