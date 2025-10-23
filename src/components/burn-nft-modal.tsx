"use client";

import Image from "next/image";
import { Flame, AlertTriangle } from "lucide-react";
import { Rarity } from "@/lib/contracts";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

interface BurnNFTModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  nft: {
    tokenId: bigint;
    name: string;
    rarity: Rarity;
    value: bigint;
    image: string;
  };
  isPending: boolean;
  isConfirming: boolean;
}

const RARITY_COLORS = {
  [Rarity.Common]: "text-gray-400 border-gray-500",
  [Rarity.Rare]: "text-cyan-400 border-cyan-500",
  [Rarity.Epic]: "text-purple-400 border-purple-500",
  [Rarity.Legendary]: "text-yellow-400 border-yellow-500",
};

const RARITY_NAMES = {
  [Rarity.Common]: "Common",
  [Rarity.Rare]: "Rare",
  [Rarity.Epic]: "Epic",
  [Rarity.Legendary]: "Legendary",
};

export function BurnNFTModal({
  isOpen,
  onClose,
  onConfirm,
  nft,
  isPending,
  isConfirming,
}: BurnNFTModalProps) {
  const formatETH = (wei: bigint) => {
    return (Number(wei) / 1e18).toFixed(2);
  };

  const fullValue = formatETH(nft.value);
  const redeemValue = formatETH(nft.value / 5n); // 20% of value
  const fee = formatETH((nft.value * 4n) / 5n); // 80% fee

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-full max-w-md bg-gradient-to-b from-[#1a2838] to-[#0f1729] border-red-500/30 shadow-2xl shadow-red-500/20 p-6 sm:p-8">
        <DialogHeader className="space-y-4">
          <div className="flex justify-center">
            <div className="p-4 rounded-full bg-red-500/10 border border-red-500/30">
              <Flame className="w-8 h-8 text-red-500" />
            </div>
          </div>

          <div className="text-center space-y-2">
            <DialogTitle className="text-2xl font-audiowide text-white">
              Burn NFT?
            </DialogTitle>
            <DialogDescription className="text-gray-400 text-sm">
              This action is permanent and cannot be undone
            </DialogDescription>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* NFT Preview */}
          <div
            className={`relative bg-gradient-to-br from-white/5 to-white/10 rounded-xl p-4 border-2 ${RARITY_COLORS[nft.rarity]} mb-6`}
          >
            <div className="flex items-center gap-4">
              {/* NFT Image */}
              <div className="relative w-24 h-32 rounded-lg overflow-hidden bg-gradient-to-br from-white/5 to-white/10 flex-shrink-0">
                <Image
                  src={nft.image}
                  alt={nft.name}
                  fill
                  className="object-contain p-2"
                />
              </div>

              {/* NFT Info */}
              <div className="flex-1 min-w-0">
                <p
                  className={`text-sm font-medium mb-1 ${RARITY_COLORS[nft.rarity].split(" ")[0]}`}
                >
                  {RARITY_NAMES[nft.rarity]}
                </p>
                <h3 className="text-lg font-audiowide text-white mb-1 truncate">
                  {nft.name}
                </h3>
                <p className="text-gray-400 text-sm">
                  #{nft.tokenId.toString()}
                </p>
                <p className="text-white font-medium mt-2">
                  Value: {fullValue} ETH
                </p>
              </div>
            </div>
          </div>

          {/* Redemption Details */}
          <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-4 mb-6">
            <div className="flex items-start gap-2 mb-3">
              <AlertTriangle className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-yellow-500 font-medium text-sm mb-1">
                  High Redemption Fee
                </p>
                <p className="text-yellow-200/80 text-xs">
                  80% of NFT value goes to platform
                </p>
              </div>
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">NFT Value:</span>
                <span className="text-white font-medium">{fullValue} ETH</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Platform Fee (80%):</span>
                <span className="text-red-400 font-medium">-{fee} ETH</span>
              </div>
              <div className="h-px bg-white/10 my-2" />
              <div className="flex justify-between">
                <span className="text-white font-medium">
                  You Receive (20%):
                </span>
                <span className="text-green-400 font-bold">
                  {redeemValue} ETH
                </span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <button
              onClick={onClose}
              disabled={isPending || isConfirming}
              className="flex-1 px-6 py-3 rounded-lg bg-white/5 hover:bg-white/10 text-white font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              disabled={isPending || isConfirming}
              className="flex-1 px-6 py-3 rounded-lg bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-medium transition-all shadow-lg shadow-red-500/30 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isPending || isConfirming ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  {isPending ? "Confirm in Wallet..." : "Burning..."}
                </>
              ) : (
                <>
                  <Flame className="w-4 h-4" />
                  Burn & Redeem
                </>
              )}
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
