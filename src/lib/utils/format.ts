import { formatEther } from "viem";

/**
 * Format ETH value with specified decimals
 */
export function formatETH(value: bigint, decimals: number = 4): string {
  const eth = formatEther(value);
  const num = parseFloat(eth);
  return num.toFixed(decimals);
}

/**
 * Format large numbers with K, M, B suffixes
 */
export function formatNumber(num: number | bigint): string {
  const n = typeof num === "bigint" ? Number(num) : num;
  
  if (n >= 1_000_000_000) {
    return (n / 1_000_000_000).toFixed(1) + "B";
  }
  if (n >= 1_000_000) {
    return (n / 1_000_000).toFixed(1) + "M";
  }
  if (n >= 1_000) {
    return (n / 1_000).toFixed(1) + "K";
  }
  return n.toString();
}

/**
 * Shorten address for display
 */
export function shortenAddress(address: string, chars: number = 4): string {
  return `${address.slice(0, chars + 2)}...${address.slice(-chars)}`;
}

/**
 * Format timestamp to readable date
 */
export function formatDate(timestamp: bigint): string {
  const date = new Date(Number(timestamp) * 1000);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}
