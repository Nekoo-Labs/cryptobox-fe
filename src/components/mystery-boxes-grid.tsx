"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { useState } from "react";

const mysteryBoxes = [
  {
    id: 1,
    name: "Rare Box",
    image: "/assets/cases/rare-box.png",
    price: "ETH 3.20",
    rarity: "rare",
    color: "from-yellow-400/20 to-yellow-600/20",
    borderColor: "border-yellow-500/30",
    hoverBorder: "hover:border-yellow-400/50",
  },
  {
    id: 2,
    name: "Epic Box",
    image: "/assets/cases/epic-box.png",
    price: "ETH 3.20",
    rarity: "epic",
    color: "from-purple-400/20 to-purple-600/20",
    borderColor: "border-purple-500/30",
    hoverBorder: "hover:border-purple-400/50",
  },
  {
    id: 3,
    name: "Legendary Box",
    image: "/assets/cases/legendary-box.png",
    price: "ETH 3.20",
    rarity: "legendary",
    color: "from-cyan-400/20 to-cyan-600/20",
    borderColor: "border-cyan-500/30",
    hoverBorder: "hover:border-cyan-400/50",
  },
  {
    id: 4,
    name: "Epic Box",
    image: "/assets/cases/epic-box.png",
    price: "ETH 3.20",
    rarity: "epic",
    color: "from-purple-400/20 to-purple-600/20",
    borderColor: "border-purple-500/30",
    hoverBorder: "hover:border-purple-400/50",
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

const boxVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

export function MysteryBoxesGrid() {
  const [selectedBox, setSelectedBox] = useState<number | null>(null);

  return (
    <motion.div
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {mysteryBoxes.map((box) => (
        <motion.div
          key={box.id}
          variants={boxVariants}
          whileHover={{ y: -10, scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          onClick={() => setSelectedBox(box.id)}
          className="cursor-pointer"
        >
          <div
            className={`relative group bg-gradient-to-b from-[#1a1f3a]/80 to-[#0f1729]/80 backdrop-blur-sm rounded-2xl p-6 border-2 ${box.borderColor} ${box.hoverBorder} transition-all duration-300 shadow-lg hover:shadow-2xl overflow-hidden ${
              selectedBox === box.id ? "ring-2 ring-cyan-400" : ""
            }`}
          >
            {/* Selected indicator */}
            {selectedBox === box.id && (
              <motion.div
                className="absolute top-4 right-4 w-6 h-6 bg-cyan-400 rounded-full flex items-center justify-center"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 500 }}
              >
                <svg
                  className="w-4 h-4 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={3}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </motion.div>
            )}

            {/* Box Image */}
            <div className="relative aspect-square mb-6 rounded-xl overflow-hidden">
              {/* Glow effect */}
              <motion.div
                className={`absolute inset-0 bg-gradient-to-t ${box.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                initial={false}
              />

              <div className="relative w-full h-full flex items-center justify-center p-4">
                <Image
                  src={box.image}
                  alt={box.name}
                  fill
                  className="object-contain drop-shadow-2xl"
                />
              </div>
            </div>

            {/* Box Info */}
            <div className="text-center">
              <h3 className="text-lg sm:text-xl font-audiowide text-white mb-3">
                {box.name}
              </h3>
              <p className="text-2xl sm:text-3xl font-audiowide bg-gradient-to-r from-cyan-400 to-cyan-600 bg-clip-text text-transparent mb-4">
                {box.price}
              </p>

              {/* Open Box Button */}
              <motion.button
                className="w-full py-3 bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 text-white font-medium rounded-lg transition-all duration-300 shadow-lg shadow-cyan-500/30"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                Open Box
              </motion.button>
            </div>

            {/* Shine effect */}
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
  );
}
