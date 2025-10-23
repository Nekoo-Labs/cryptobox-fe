"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { useAccount } from "wagmi";
import { useUserNFTs, useNFTMetadata } from "@/hooks";
import { useBurnNFT } from "@/hooks/useBurnNFT";
import {
  RARITY_NAMES,
  RARITY_COLORS,
  RARITY_BORDER_COLORS,
  Rarity,
} from "@/lib/contracts";
import { formatETH, formatDate } from "@/lib/utils/format";
import { BurnNFTModal } from "./burn-nft-modal";
import { useState } from "react";
import { toast } from "sonner";
import { Flame } from "lucide-react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.3,
    },
  },
};

// Note: Images are now provided by useNFTMetadata hook as absolute URLs

export function NftInventoryGridIntegrated() {
  const { isConnected } = useAccount();
  const { tokenIds, isLoading } = useUserNFTs();

  if (!isConnected) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-400 text-lg">
          Connect your wallet to view your NFT inventory
        </p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="bg-gradient-to-b from-[#1a2838]/60 to-[#0f1729]/60 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-white/5 animate-pulse"
          >
            <div className="aspect-[3/4] bg-gray-700/50 rounded-xl mb-4" />
            <div className="h-4 bg-gray-700/50 rounded mb-2" />
            <div className="h-3 bg-gray-700/50 rounded mb-2" />
            <div className="h-5 bg-gray-700/50 rounded" />
          </div>
        ))}
      </div>
    );
  }

  if (tokenIds.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-400 text-lg mb-4">
          You don&apos;t have any NFTs yet
        </p>
        <p className="text-gray-500">
          Open a mystery box to get your first NFT!
        </p>
      </div>
    );
  }

  return (
    <motion.div
      className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {tokenIds.map((tokenId) => (
        <NFTCard key={tokenId.toString()} tokenId={tokenId} />
      ))}
    </motion.div>
  );
}

function NFTCard({ tokenId }: { tokenId: bigint }) {
  const { metadata, isLoading } = useNFTMetadata(tokenId);
  const { burnNFT, isPending, isConfirming, isSuccess } = useBurnNFT();
  const [isBurnModalOpen, setIsBurnModalOpen] = useState(false);

  // Handle successful burn
  if (isSuccess && isBurnModalOpen) {
    setIsBurnModalOpen(false);
    toast.success("NFT burned successfully! ETH sent to your wallet.");
  }

  const handleBurnClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsBurnModalOpen(true);
  };

  const handleConfirmBurn = () => {
    burnNFT(tokenId);
    toast.info("Burning NFT... Please confirm in your wallet.");
  };

  if (isLoading || !metadata) {
    return (
      <div className="bg-gradient-to-b from-[#1a2838]/60 to-[#0f1729]/60 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-white/5 animate-pulse">
        <div className="aspect-[3/4] bg-gray-700/50 rounded-xl mb-4" />
        <div className="h-4 bg-gray-700/50 rounded mb-2" />
        <div className="h-3 bg-gray-700/50 rounded mb-2" />
        <div className="h-5 bg-gray-700/50 rounded" />
      </div>
    );
  }

  const rarity = metadata.rarity as Rarity;
  const rarityName = RARITY_NAMES[rarity];
  const rarityColor = RARITY_COLORS[rarity];
  const borderColor = RARITY_BORDER_COLORS[rarity];
  const cardImage = metadata.image || ""; // Image is now absolute URL from metadata
  const nftName = metadata.name || "LP Reward NFT";
  const value = formatETH(metadata.value, 2);
  const mintDate = formatDate(metadata.mintedAt);

  return (
    <>
      <BurnNFTModal
        isOpen={isBurnModalOpen}
        onClose={() => setIsBurnModalOpen(false)}
        onConfirm={handleConfirmBurn}
        nft={{
          tokenId,
          name: "LP Reward NFT",
          rarity,
          value: metadata.value,
          image: cardImage,
        }}
        isPending={isPending}
        isConfirming={isConfirming}
      />

      <motion.div
        variants={cardVariants}
        whileHover={{ y: -8, scale: 1.02 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="cursor-pointer"
      >
        <div
          className={`group relative bg-gradient-to-b from-[#1a2838]/60 to-[#0f1729]/60 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border ${borderColor} hover:border-opacity-50 transition-all duration-300 shadow-lg hover:shadow-cyan-500/20 overflow-hidden`}
        >
          {/* Token ID Badge */}
          <div className="absolute top-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded z-10">
            #{tokenId.toString()}
          </div>

          {/* Card Image */}
          <div className="relative aspect-[3/4] mb-4 rounded-xl overflow-hidden bg-gradient-to-br from-white/5 to-white/10">
            <div className="relative w-full h-full flex items-center justify-center p-3">
              <Image
                src={cardImage}
                alt={`${rarityName} NFT`}
                fill
                className="object-contain"
              />
            </div>
          </div>

          {/* Card Info */}
          <div className="text-center mb-3">
            <h3 className="text-sm sm:text-base font-medium text-white mb-1">
              {nftName}
            </h3>
            <p className={`text-xs sm:text-sm font-medium mb-2 ${rarityColor}`}>
              {rarityName}
            </p>
            <p className="text-base sm:text-lg font-audiowide bg-gradient-to-r from-cyan-400 to-cyan-600 bg-clip-text text-transparent mb-1">
              {value} ETH
            </p>
            <p className="text-xs text-gray-500">Minted {mintDate}</p>
          </div>

          {/* Burn Button */}
          <motion.button
            onClick={handleBurnClick}
            disabled={isPending || isConfirming}
            className="w-full py-2 px-4 rounded-lg bg-gradient-to-r from-red-500/20 to-red-600/20 hover:from-red-500/30 hover:to-red-600/30 border border-red-500/30 text-red-400 text-sm font-medium transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Flame className="w-4 h-4" />
            Redeem 20%
          </motion.button>

          {/* Hover glow effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-cyan-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
            initial={false}
          />
        </div>
      </motion.div>
    </>
  );
}
