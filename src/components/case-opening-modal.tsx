"use client";

import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { X } from "lucide-react";
import {
  Rarity,
  RARITY_NAMES,
  RARITY_COLORS,
  RARITY_BORDER_COLORS,
} from "@/lib/contracts";
import { formatETH } from "@/lib/utils/format";
import type { MintedNFT } from "@/hooks/useOpenBox";

interface CaseOpeningModalProps {
  isOpen: boolean;
  onClose: () => void;
  boxName: string;
  mintedNFT: MintedNFT | null;
  onOpenAnother: () => void;
}

const possibleRewards = [
  {
    id: 1,
    name: "Bronze LP Token",
    rarity: "Common",
    image: "/assets/lp-nft-card/common-lp-nft-card.png",
    rarityColor: "text-gray-400",
    borderColor: "border-gray-500",
  },
  {
    id: 2,
    name: "Silver LP Token",
    rarity: "Common",
    image: "/assets/lp-nft-card/common-lp-nft-card.png",
    rarityColor: "text-gray-400",
    borderColor: "border-gray-500",
  },
  {
    id: 3,
    name: "Sapphire LP Certificate",
    rarity: "Rare",
    image: "/assets/lp-nft-card/rare-lp-nft-card.png",
    rarityColor: "text-cyan-400",
    borderColor: "border-cyan-500",
  },
  {
    id: 4,
    name: "Steel LP Token",
    rarity: "Common",
    image: "/assets/lp-nft-card/common-lp-nft-card.png",
    rarityColor: "text-gray-400",
    borderColor: "border-gray-500",
  },
  {
    id: 5,
    name: "Amethyst LP Vault",
    rarity: "Epic",
    image: "/assets/lp-nft-card/epic-lp-nft-card.png",
    rarityColor: "text-purple-400",
    borderColor: "border-purple-500",
  },
  {
    id: 6,
    name: "Diamond LP Certificate",
    rarity: "Rare",
    image: "/assets/lp-nft-card/rare-lp-nft-card.png",
    rarityColor: "text-cyan-400",
    borderColor: "border-cyan-500",
  },
  {
    id: 7,
    name: "Platinum LP Vault",
    rarity: "Legendary",
    image: "/assets/lp-nft-card/legendary-lp-nft-card.png",
    rarityColor: "text-yellow-400",
    borderColor: "border-yellow-500",
  },
];

type CaseState = "idle" | "opening" | "revealing" | "claimed";

// Rarity to card image mapping
const RARITY_IMAGES: Record<Rarity, string> = {
  [Rarity.Common]: "/assets/lp-nft-card/common-lp-nft-card.png",
  [Rarity.Rare]: "/assets/lp-nft-card/rare-lp-nft-card.png",
  [Rarity.Epic]: "/assets/lp-nft-card/epic-lp-nft-card.png",
  [Rarity.Legendary]: "/assets/lp-nft-card/legendary-lp-nft-card.png",
};

export function CaseOpeningModal({
  isOpen,
  onClose,
  boxName,
  mintedNFT,
  onOpenAnother,
}: CaseOpeningModalProps) {
  const router = useRouter();
  const [caseState, setCaseState] = useState<CaseState>("idle");
  const [wonItem, setWonItem] = useState<(typeof possibleRewards)[0] | null>(
    null
  );
  const [spinItems, setSpinItems] = useState<
    Array<(typeof possibleRewards)[0] & { uniqueId: string }>
  >([]);

  // Generate a long list of items for the spinning animation
  const generateSpinItems = () => {
    const items = [];
    const totalItems = 60;
    const winningIndex = 50; // Position where the winning item will be

    // Pick a random winning item first
    const winningItem =
      possibleRewards[Math.floor(Math.random() * possibleRewards.length)];
    setWonItem(winningItem);

    // Fill with random items
    for (let i = 0; i < totalItems; i++) {
      if (i === winningIndex) {
        // Insert the winning item at the exact position
        items.push({ ...winningItem, uniqueId: `winning-item-${i}` });
      } else {
        const randomItem =
          possibleRewards[Math.floor(Math.random() * possibleRewards.length)];
        items.push({ ...randomItem, uniqueId: `item-${i}` });
      }
    }

    return items;
  };

  const handleOpenCase = () => {
    setCaseState("opening");

    // Animation completes after 5 seconds
    setTimeout(() => {
      setCaseState("revealing");
    }, 5000);
  };

  const handleClaimNFT = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Navigate to inventory to see the NFT
    router.push("/inventory");
    handleClose();
  };

  const handleClose = () => {
    setCaseState("idle");
    setWonItem(null);
    onClose();
  };

  const handleOpenAnotherBox = () => {
    // Close modal and trigger parent to open another box
    handleClose();
    onOpenAnother();
  };

  useEffect(() => {
    if (isOpen) {
      // Reset to idle and generate new items when modal opens
      setCaseState("idle");
      setSpinItems(generateSpinItems());
    }
  }, [isOpen]);

  // Auto-start opening animation when modal opens (only if NFT not yet revealed)
  useEffect(() => {
    if (isOpen && caseState === "idle" && !mintedNFT) {
      // Small delay before starting animation
      const timer = setTimeout(() => {
        handleOpenCase();
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isOpen, caseState, mintedNFT]);

  // Show real NFT when minted
  useEffect(() => {
    if (mintedNFT) {
      // Transition to revealing state if not already there
      if (caseState !== "revealing" && caseState !== "claimed") {
        setCaseState("revealing");
      }

      // Update wonItem with real NFT data
      const rarity = mintedNFT.rarity;
      setWonItem({
        id: Number(mintedNFT.tokenId),
        name: "LP Reward NFT",
        rarity: RARITY_NAMES[rarity],
        image: RARITY_IMAGES[rarity],
        rarityColor: RARITY_COLORS[rarity],
        borderColor: RARITY_BORDER_COLORS[rarity],
      });
    }
  }, [mintedNFT, caseState]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="relative w-full h-full flex flex-col">
            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 z-10 p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
              disabled={caseState === "opening"}
            >
              <X className="w-6 h-6 text-white" />
            </button>

            {/* Header */}
            <div className="text-center pt-12 pb-8">
              <motion.h2
                className="text-3xl sm:text-4xl md:text-5xl font-audiowide text-white mb-2"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {caseState === "opening"
                  ? "Opening Box..."
                  : caseState === "revealing"
                    ? "You Won!"
                    : caseState === "claimed"
                      ? "NFT Claimed!"
                      : "Ready to Open?"}
              </motion.h2>
              <p className="text-gray-400 text-lg">{boxName}</p>
            </div>

            {/* Spinning Container */}
            <div className="flex-1 flex items-center justify-center overflow-hidden px-4">
              <div className="relative w-full max-w-6xl">
                {/* Selection Indicator - Diamond shape at top */}
                <motion.div
                  className="absolute left-1/2 -translate-x-1/2 -top-8 z-20"
                  animate={{
                    y: [0, -10, 0],
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <div className="w-8 h-8 bg-cyan-400 rotate-45 shadow-lg shadow-cyan-500/50" />
                </motion.div>

                {/* Selection Box */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-96 border-4 border-cyan-400 rounded-2xl z-10 pointer-events-none shadow-2xl shadow-cyan-500/50" />

                {/* Scrolling Items */}
                <div className="relative h-96 overflow-hidden">
                  <motion.div
                    className="flex gap-4 absolute"
                    style={{ left: "50%", y: "24px" }}
                    animate={{
                      x:
                        caseState === "opening" ||
                        caseState === "revealing" ||
                        caseState === "claimed"
                          ? `calc(-${50 * (224 + 16)}px - ${224 / 2}px)` // Move to item 50, then center the card itself
                          : `-0.768%`,
                    }}
                    transition={{
                      duration: caseState === "opening" ? 5 : 0.5,
                      ease:
                        caseState === "opening"
                          ? [0.25, 0.1, 0.25, 1]
                          : "easeInOut",
                    }}
                  >
                    {spinItems.map((item) => (
                      <motion.div
                        key={item.uniqueId}
                        className={`flex-shrink-0 w-56 h-80 bg-gradient-to-b from-[#1a2838]/80 to-[#0f1729]/80 backdrop-blur-sm rounded-xl p-4 border-2 ${item.borderColor} flex flex-col items-center justify-center`}
                        initial={{ opacity: 0.5, scale: 0.9 }}
                        animate={{
                          opacity: 1,
                          scale: 1,
                        }}
                      >
                        <div className="relative w-full h-48 mb-4">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-contain"
                          />
                        </div>
                        <h3 className="text-white font-medium text-center mb-2">
                          {item.name}
                        </h3>
                        <p
                          className={`text-sm font-medium ${item.rarityColor}`}
                        >
                          {item.rarity}
                        </p>
                      </motion.div>
                    ))}
                  </motion.div>
                </div>

                {/* Gradient Overlays */}
                <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-black to-transparent pointer-events-none z-10" />
                <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-black to-transparent pointer-events-none z-10" />
              </div>
            </div>

            {/* Action Button */}
            <div className="text-center pb-12">
              {caseState === "idle" && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-gray-400"
                >
                  Opening box...
                </motion.div>
              )}

              {caseState === "revealing" && wonItem && mintedNFT && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="space-y-4"
                >
                  <div className="text-center">
                    <p className="text-gray-400 mb-2">You received:</p>
                    <p
                      className={`text-2xl font-audiowide ${wonItem.rarityColor} mb-1`}
                    >
                      {wonItem.rarity} {wonItem.name}
                    </p>
                    <p className="text-lg text-cyan-400">
                      #{mintedNFT.tokenId.toString()}
                    </p>
                    <p className="text-xl font-audiowide bg-gradient-to-r from-cyan-400 to-cyan-600 bg-clip-text text-transparent mt-2">
                      {formatETH(mintedNFT.value, 3)} ETH
                    </p>
                  </div>
                  <div className="flex gap-4 justify-center">
                    <button
                      onClick={handleClaimNFT}
                      className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 text-white font-medium rounded-lg transition-all shadow-lg shadow-cyan-500/30"
                    >
                      View in Inventory
                    </button>
                  </div>
                </motion.div>
              )}

              {caseState === "claimed" && wonItem && mintedNFT && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="space-y-4"
                >
                  <div className="text-center">
                    <p className="text-gray-400 mb-2">You received:</p>
                    <p
                      className={`text-2xl font-audiowide ${wonItem.rarityColor} mb-1`}
                    >
                      {wonItem.rarity} {wonItem.name}
                    </p>
                    <p className="text-lg text-cyan-400">
                      #{mintedNFT.tokenId.toString()}
                    </p>
                    <p className="text-xl font-audiowide bg-gradient-to-r from-cyan-400 to-cyan-600 bg-clip-text text-transparent mt-2">
                      {formatETH(mintedNFT.value, 3)} ETH
                    </p>
                  </div>
                  <div className="flex gap-4 justify-center">
                    <button
                      onClick={handleClose}
                      className="px-8 py-3 bg-white/10 hover:bg-white/20 text-white font-medium rounded-lg transition-all"
                    >
                      Close
                    </button>
                    <button
                      onClick={handleOpenAnotherBox}
                      className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 text-white font-medium rounded-lg transition-all shadow-lg shadow-cyan-500/30"
                    >
                      Open Another
                    </button>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
