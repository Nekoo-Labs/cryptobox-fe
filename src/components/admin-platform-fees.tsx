"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { useAccount } from "wagmi";
import { usePlatformFees } from "@/hooks/usePlatformFees";
import { useWithdrawPlatformFees } from "@/hooks/useWithdrawPlatformFees";
import { formatETH } from "@/lib/utils/format";
import { toast } from "sonner";
import { Wallet, DollarSign, Download, AlertCircle } from "lucide-react";

/**
 * Admin component for viewing and withdrawing platform fees
 * Only visible to contract owner
 */
export function AdminPlatformFees() {
  const { address, isConnected } = useAccount();
  const { platformFees, isLoading, refetch } = usePlatformFees();
  const { withdrawFees, isPending, isConfirming, isSuccess } =
    useWithdrawPlatformFees();

  const [recipientAddress, setRecipientAddress] = useState<string>("");
  const [useConnectedWallet, setUseConnectedWallet] = useState(true);

  // Handle successful withdrawal
  if (isSuccess) {
    toast.success("Platform fees withdrawn successfully!");
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

    withdrawFees(targetAddress);
    toast.info("Withdrawing platform fees... Please confirm in your wallet.");
  };

  if (!isConnected) {
    return (
      <div className="bg-gradient-to-b from-[#1a2838]/60 to-[#0f1729]/60 backdrop-blur-sm rounded-2xl p-6 border border-white/5">
        <div className="flex items-center gap-3 text-gray-400">
          <AlertCircle className="w-5 h-5" />
          <p>Connect your wallet to access admin features</p>
        </div>
      </div>
    );
  }

  const feesInETH = platformFees ? formatETH(platformFees, 4) : "0.00";
  const hasFees = platformFees && platformFees > 0n;

  return (
    <div className="bg-gradient-to-b from-[#1a2838]/60 to-[#0f1729]/60 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-cyan-500/20 shadow-lg shadow-cyan-500/10">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/30">
          <DollarSign className="w-6 h-6 text-cyan-400" />
        </div>
        <div>
          <h2 className="text-xl font-audiowide text-white">Platform Fees</h2>
          <p className="text-sm text-gray-400">
            Accumulated from NFT burns (80% fee)
          </p>
        </div>
      </div>

      {/* Fees Display */}
      <div className="bg-gradient-to-r from-cyan-500/10 to-cyan-600/10 rounded-xl p-6 mb-6 border border-cyan-500/20">
        <div className="text-center">
          <p className="text-sm text-gray-400 mb-2">Available to Withdraw</p>
          {isLoading ? (
            <div className="h-12 bg-gray-700/50 animate-pulse rounded-lg" />
          ) : (
            <motion.p
              className="text-4xl sm:text-5xl font-audiowide bg-gradient-to-r from-cyan-400 to-cyan-600 bg-clip-text text-transparent"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              {feesInETH} ETH
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
                  ? "bg-cyan-500/20 border-cyan-500/50 text-cyan-400"
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
                  ? "bg-cyan-500/20 border-cyan-500/50 text-cyan-400"
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
              className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 transition-colors font-mono text-sm"
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
          disabled={!hasFees || isPending || isConfirming || isLoading}
          className="w-full py-4 px-6 rounded-lg bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 text-white font-medium transition-all shadow-lg shadow-cyan-500/30 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          whileHover={
            hasFees && !isPending && !isConfirming ? { scale: 1.02 } : {}
          }
          whileTap={
            hasFees && !isPending && !isConfirming ? { scale: 0.98 } : {}
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
              {hasFees ? "Withdraw Fees" : "No Fees Available"}
            </>
          )}
        </motion.button>

        {/* Info */}
        <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
          <div className="flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
            <div className="text-xs text-blue-200/80">
              <p className="font-medium mb-1">Owner Only</p>
              <p>
                Only the contract owner can withdraw platform fees. These are
                the 80% fees collected from NFT burns.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
