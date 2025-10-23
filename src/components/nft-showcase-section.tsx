"use client";

import Image from "next/image";
import { motion } from "motion/react";

const nftCards = [
  {
    id: 1,
    image: "/assets/lp-nft-card/legendary-lp-nft-card.png",
    name: "Platinum LP Vault",
    price: "ETH 10.00",
    rarity: "gold",
  },
  {
    id: 2,
    image: "/assets/lp-nft-card/common-lp-nft-card.png",
    name: "Bronze LP Token",
    price: "ETH 1.50",
    rarity: "silver",
  },
  {
    id: 3,
    image: "/assets/lp-nft-card/rare-lp-nft-card.png",
    name: "Sapphire LP Certificate",
    price: "ETH 3.20",
    rarity: "cyan",
  },
  {
    id: 4,
    image: "/assets/lp-nft-card/epic-lp-nft-card.png",
    name: "Amethyst LP Vault",
    price: "ETH 5.00",
    rarity: "purple",
  },
  {
    id: 5,
    image: "/assets/lp-nft-card/legendary-lp-nft-card.png",
    name: "Golden LP Vault",
    price: "ETH 12.00",
    rarity: "gold",
  },
  {
    id: 6,
    image: "/assets/lp-nft-card/common-lp-nft-card.png",
    name: "Silver LP Token",
    price: "ETH 1.80",
    rarity: "silver",
  },
  {
    id: 7,
    image: "/assets/lp-nft-card/rare-lp-nft-card.png",
    name: "Diamond LP Certificate",
    price: "ETH 3.80",
    rarity: "cyan",
  },
  {
    id: 8,
    image: "/assets/lp-nft-card/epic-lp-nft-card.png",
    name: "Ruby LP Vault",
    price: "ETH 5.50",
    rarity: "purple",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

export function NftShowcaseSection() {
  return (
    <section className="relative py-20 sm:py-24 md:py-32 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[100px]"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-12 sm:mb-16"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-audiowide text-white mb-4">
            Open. Collect. Earn.
          </h2>
          <p className="text-base sm:text-lg text-gray-400 max-w-2xl mx-auto">
            Join the most secure and exciting platform for LP NFT mystery boxes.
          </p>
        </motion.div>

        {/* NFT Cards Grid */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 max-w-7xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {nftCards.map((card, index) => (
            <motion.div
              key={card.id}
              variants={cardVariants}
              whileHover={{ y: -10, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <div className="group relative bg-gradient-to-b from-[#1a1f3a]/80 to-[#0f1729]/80 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-white/5 hover:border-cyan-500/30 transition-all duration-300 shadow-lg hover:shadow-cyan-500/20 overflow-hidden">
                {/* Card Image Container */}
                <div className="relative aspect-[3/4] mb-4 rounded-xl overflow-hidden bg-gradient-to-br from-white/5 to-white/10">
                  {/* Glow effect on hover */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-t from-cyan-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    initial={false}
                  />

                  <div className="relative w-full h-full flex items-center justify-center p-4">
                    <div className="relative w-full h-full">
                      <Image
                        src={card.image}
                        alt={card.name}
                        fill
                        className="object-contain"
                      />
                    </div>
                  </div>
                </div>

                {/* Card Info */}
                <div className="text-center">
                  <h3 className="text-sm sm:text-base font-medium text-gray-300 mb-2">
                    {card.name}
                  </h3>
                  <p className="text-lg sm:text-xl font-audiowide bg-gradient-to-r from-cyan-400 to-cyan-600 bg-clip-text text-transparent">
                    {card.price}
                  </p>
                </div>

                {/* Hover shine effect */}
                <motion.div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{
                    background:
                      "linear-gradient(135deg, transparent 0%, rgba(34, 211, 238, 0.1) 50%, transparent 100%)",
                  }}
                  animate={{
                    x: ["-100%", "100%"],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    repeatDelay: 2,
                  }}
                />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
