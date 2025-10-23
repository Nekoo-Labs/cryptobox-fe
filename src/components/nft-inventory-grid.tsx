"use client";

import { motion } from "motion/react";
import Image from "next/image";

const nftCards = [
  {
    id: 1,
    name: "Sapphire LP Certificate",
    rarity: "Rare",
    value: "ETH 3.20",
    image: "/assets/lp-nft-card/rare-lp-nft-card.png",
    rarityColor: "text-cyan-400",
  },
  {
    id: 2,
    name: "Bronze LP Token",
    rarity: "Common",
    value: "ETH 1.50",
    image: "/assets/lp-nft-card/common-lp-nft-card.png",
    rarityColor: "text-gray-400",
  },
  {
    id: 3,
    name: "Amethyst LP Vault",
    rarity: "Epic",
    value: "ETH 5.00",
    image: "/assets/lp-nft-card/epic-lp-nft-card.png",
    rarityColor: "text-purple-400",
  },
  {
    id: 4,
    name: "Platinum LP Vault",
    rarity: "Legendary",
    value: "ETH 10.00",
    image: "/assets/lp-nft-card/legendary-lp-nft-card.png",
    rarityColor: "text-yellow-400",
  },
  {
    id: 5,
    name: "Ruby LP Vault",
    rarity: "Epic",
    value: "ETH 5.50",
    image: "/assets/lp-nft-card/epic-lp-nft-card.png",
    rarityColor: "text-purple-400",
  },
  {
    id: 6,
    name: "Silver LP Token",
    rarity: "Common",
    value: "ETH 1.80",
    image: "/assets/lp-nft-card/common-lp-nft-card.png",
    rarityColor: "text-gray-400",
  },
  {
    id: 7,
    name: "Golden LP Vault",
    rarity: "Legendary",
    value: "ETH 12.00",
    image: "/assets/lp-nft-card/legendary-lp-nft-card.png",
    rarityColor: "text-yellow-400",
  },
  {
    id: 8,
    name: "Diamond LP Certificate",
    rarity: "Rare",
    value: "ETH 3.80",
    image: "/assets/lp-nft-card/rare-lp-nft-card.png",
    rarityColor: "text-cyan-400",
  },
  {
    id: 9,
    name: "Steel LP Token",
    rarity: "Common",
    value: "ETH 1.60",
    image: "/assets/lp-nft-card/common-lp-nft-card.png",
    rarityColor: "text-gray-400",
  },
  {
    id: 10,
    name: "Emerald LP Vault",
    rarity: "Epic",
    value: "ETH 4.80",
    image: "/assets/lp-nft-card/epic-lp-nft-card.png",
    rarityColor: "text-purple-400",
  },
  {
    id: 11,
    name: "Aquamarine LP Certificate",
    rarity: "Rare",
    value: "ETH 3.50",
    image: "/assets/lp-nft-card/rare-lp-nft-card.png",
    rarityColor: "text-cyan-400",
  },
  {
    id: 12,
    name: "Titanium LP Vault",
    rarity: "Legendary",
    value: "ETH 11.50",
    image: "/assets/lp-nft-card/legendary-lp-nft-card.png",
    rarityColor: "text-yellow-400",
  },
];

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

export function NftInventoryGrid() {
  return (
    <motion.div
      className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {nftCards.map((card) => (
        <motion.div
          key={card.id}
          variants={cardVariants}
          whileHover={{ y: -8, scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="cursor-pointer"
        >
          <div className="group relative bg-gradient-to-b from-[#1a2838]/60 to-[#0f1729]/60 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-white/5 hover:border-cyan-500/30 transition-all duration-300 shadow-lg hover:shadow-cyan-500/20 overflow-hidden">
            {/* Card Image */}
            <div className="relative aspect-[3/4] mb-4 rounded-xl overflow-hidden bg-gradient-to-br from-white/5 to-white/10">
              <div className="relative w-full h-full flex items-center justify-center p-3">
                <Image
                  src={card.image}
                  alt={card.name}
                  fill
                  className="object-contain"
                />
              </div>
            </div>

            {/* Card Info */}
            <div className="text-center">
              <h3 className="text-sm sm:text-base font-medium text-white mb-1">
                {card.name}
              </h3>
              <p
                className={`text-xs sm:text-sm font-medium mb-2 ${card.rarityColor}`}
              >
                {card.rarity}
              </p>
              <p className="text-base sm:text-lg font-audiowide bg-gradient-to-r from-cyan-400 to-cyan-600 bg-clip-text text-transparent">
                {card.value}
              </p>
            </div>

            {/* Hover glow effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-t from-cyan-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
              initial={false}
            />
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
