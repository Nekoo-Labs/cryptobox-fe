"use client";

import { useState } from "react";
import { motion } from "motion/react";
import {
  useAccount,
  useReadContract,
  useWriteContract,
  useWaitForTransactionReceipt,
} from "wagmi";
import { MysteryBoxABI } from "@/abi";
import { CONTRACTS } from "@/lib/contracts";
import { formatETH } from "@/lib/utils/format";
import { toast } from "sonner";
import { Wallet, Download, AlertTriangle } from "lucide-react";

/**
 * Admin component for withdrawing all contract funds
 * Includes box sales revenue + platform fees
 */
export function AdminWithdrawAll() {
  const { address, isConnected } = useAccount();
  const [recipientAddress, setRecipientAddress] = useState<string>("");
  const [useConnectedWallet, setUseConnectedWallet] = useState(true);

  // Read contract balance
  const {
    data: contractBalance,
    isLoading,
    refetch,
  } = useReadContract({
    address: CONTRACTS.baseSepolia.mysteryBox,
    abi: MysteryBoxABI,
    functionName: "getStats",
  });

  const { writeContract, data: hash, isPending } = useWriteContract();

  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  // Handle successful withdrawal
  if (isSuccess) {
    toast.success("All funds withdrawn successfully!");
    refetch();
  }

  const handleWithdraw = () => {
    const targetAddress = useConnectedWallet
      ? address
      : (recipientAddress as `0x${string}`);

    if (!targetAddress) {
      toast.error("Please enter a valid recipient address");
      return;
    }

    if (!targetAddress.startsWith("0x") || targetAddress.length !== 42) {
      toast.error("Invalid Ethereum address format");
      return;
    }

    writeContract({
      address: CONTRACTS.baseSepolia.mysteryBox,
      abi: MysteryBoxABI,
      functionName: "withdraw",
      args: [targetAddress],
    });

    toast.info("Withdrawing all funds... Please confirm in your wallet.");
  };

  if (!isConnected) {
    return null;
  }

  const stats = contractBalance as [bigint, bigint, bigint] | undefined;
  const balance = stats?.[2] || 0n;
  const balanceInETH = formatETH(balance, 4);
  const hasBalance = balance > 0n;

  return (
    <div className="bg-gradient-to-b from-[#1a2838]/60 to-[#0f1729]/60 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-red-500/20 shadow-lg shadow-red-500/10">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30">
          <Wallet className="w-6 h-6 text-red-400" />
        </div>
        <div>
          <h2 className="text-xl font-audiowide text-white">
            Withdraw All Funds
          </h2>
          <p className="text-sm text-gray-400">
            Withdraw entire contract balance (box sales + fees)
          </p>
        </div>
      </div>

      {/* Warning */}
      <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 mb-6">
        <div className="flex items-start gap-2">
          <AlertTriangle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="text-red-400 font-medium text-sm mb-1">
              Withdraw Everything
            </p>
            <p className="text-red-200/80 text-xs">
              This will withdraw ALL funds from the contract, including box
              sales revenue and platform fees. Users won&apos;t be able to
              redeem NFTs until contract is refunded.
            </p>
          </div>
        </div>
      </div>

      {/* Balance Display */}
      <div className="bg-gradient-to-r from-red-500/10 to-red-600/10 rounded-xl p-6 mb-6 border border-red-500/20">
        <div className="text-center">
          <p className="text-sm text-gray-400 mb-2">Total Contract Balance</p>
          {isLoading ? (
            <div className="h-12 bg-gray-700/50 animate-pulse rounded-lg" />
          ) : (
            <motion.p
              className="text-4xl sm:text-5xl font-audiowide bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              {balanceInETH} ETH
            </motion.p>
          )}
        </div>
      </div>

      {/* Withdrawal Section */}
      <div className="space-y-4">
        {/* Recipient Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-3">
            Withdraw To:
          </label>

          {/* Toggle */}
          <div className="flex gap-3 mb-3">
            <button
              onClick={() => setUseConnectedWallet(true)}
              className={`flex-1 py-2 px-4 rounded-lg border transition-all ${
                useConnectedWallet
                  ? "bg-red-500/20 border-red-500/50 text-red-400"
                  : "bg-white/5 border-white/10 text-gray-400 hover:bg-white/10"
              }`}
            >
              <div className="flex items-center justify-center gap-2">
                <Wallet className="w-4 h-4" />
                <span className="text-sm font-medium">My Wallet</span>
              </div>
            </button>
            <button
              onClick={() => setUseConnectedWallet(false)}
              className={`flex-1 py-2 px-4 rounded-lg border transition-all ${
                !useConnectedWallet
                  ? "bg-red-500/20 border-red-500/50 text-red-400"
                  : "bg-white/5 border-white/10 text-gray-400 hover:bg-white/10"
              }`}
            >
              <span className="text-sm font-medium">Custom Address</span>
            </button>
          </div>

          {/* Custom Address Input */}
          {!useConnectedWallet && (
            <input
              type="text"
              value={recipientAddress}
              onChange={(e) => setRecipientAddress(e.target.value)}
              placeholder="0x..."
              className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-red-500/50 transition-colors font-mono text-sm"
            />
          )}

          {/* Connected Wallet Display */}
          {useConnectedWallet && address && (
            <div className="px-4 py-3 rounded-lg bg-white/5 border border-white/10">
              <p className="text-sm text-gray-400 mb-1">Connected Wallet:</p>
              <p className="text-white font-mono text-sm break-all">
                {address}
              </p>
            </div>
          )}
        </div>

        {/* Withdraw Button */}
        <motion.button
          onClick={handleWithdraw}
          disabled={!hasBalance || isPending || isConfirming || isLoading}
          className="w-full py-4 px-6 rounded-lg bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-medium transition-all shadow-lg shadow-red-500/30 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          whileHover={
            hasBalance && !isPending && !isConfirming ? { scale: 1.02 } : {}
          }
          whileTap={
            hasBalance && !isPending && !isConfirming ? { scale: 0.98 } : {}
          }
        >
          {isPending || isConfirming ? (
            <>
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              {isPending ? "Confirm in Wallet..." : "Withdrawing..."}
            </>
          ) : (
            <>
              <Download className="w-5 h-5" />
              {hasBalance ? "Withdraw All Funds" : "No Funds Available"}
            </>
          )}
        </motion.button>
      </div>
    </div>
  );
}
