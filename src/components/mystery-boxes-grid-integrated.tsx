"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { useState } from "react";
import { useAccount } from "wagmi";
import { CaseOpeningModal } from "./case-opening-modal";
import { useOpenBox, useBoxConfig } from "@/hooks";
import { BoxType, BOX_PRICES } from "@/lib/contracts";
import { formatETH } from "@/lib/utils/format";
import { toast } from "sonner";

const mysteryBoxes = [
  {
    id: BoxType.Rare,
    name: "Rare Box",
    image: "/assets/cases/rare-box.png",
    boxType: BoxType.Rare,
    color: "from-yellow-400/20 to-yellow-600/20",
    borderColor: "border-yellow-500/30",
    hoverBorder: "hover:border-yellow-400/50",
  },
  {
    id: BoxType.Epic,
    name: "Epic Box",
    image: "/assets/cases/epic-box.png",
    boxType: BoxType.Epic,
    color: "from-purple-400/20 to-purple-600/20",
    borderColor: "border-purple-500/30",
    hoverBorder: "hover:border-purple-400/50",
  },
  {
    id: BoxType.Legendary,
    name: "Legendary Box",
    image: "/assets/cases/legendary-box.png",
    boxType: BoxType.Legendary,
    color: "from-cyan-400/20 to-cyan-600/20",
    borderColor: "border-cyan-500/30",
    hoverBorder: "hover:border-cyan-400/50",
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

export function MysteryBoxesGridIntegrated() {
  const { address, isConnected } = useAccount();
  const [selectedBox, setSelectedBox] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBoxData, setSelectedBoxData] = useState<
    (typeof mysteryBoxes)[0] | null
  >(null);

  const { openBox, isPending, isConfirming, isSuccess, error } = useOpenBox();

  const handleOpenBox = (box: (typeof mysteryBoxes)[0]) => {
    if (!isConnected) {
      toast.error("Please connect your wallet first");
      return;
    }

    setSelectedBoxData(box);
    
    // Open the box on-chain
    try {
      openBox(box.boxType);
      toast.success("Transaction submitted! Opening box...");
      setIsModalOpen(true);
    } catch (err) {
      console.error("Error opening box:", err);
      toast.error("Failed to open box. Please try again.");
    }
  };

  // Show success toast when transaction confirms
  if (isSuccess && !isModalOpen) {
    toast.success("Box opened successfully! Check your inventory.");
  }

  return (
    <>
      <CaseOpeningModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        boxName={selectedBoxData?.name || ""}
        isLoading={isPending || isConfirming}
        isSuccess={isSuccess}
      />
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {mysteryBoxes.map((box) => (
          <BoxCard
            key={box.id}
            box={box}
            isSelected={selectedBox === box.id}
            onSelect={() => setSelectedBox(box.id)}
            onOpen={() => handleOpenBox(box)}
            isOpening={isPending || isConfirming}
            isConnected={isConnected}
          />
        ))}
      </motion.div>
    </>
  );
}

interface BoxCardProps {
  box: (typeof mysteryBoxes)[0];
  isSelected: boolean;
  onSelect: () => void;
  onOpen: () => void;
  isOpening: boolean;
  isConnected: boolean;
}

function BoxCard({
  box,
  isSelected,
  onSelect,
  onOpen,
  isOpening,
  isConnected,
}: BoxCardProps) {
  const { config, isLoading } = useBoxConfig(box.boxType);
  
  const price = config?.price
    ? `ETH ${formatETH(config.price, 2)}`
    : `ETH ${BOX_PRICES[box.boxType]}`;
  
  const isActive = config?.isActive ?? true;
  const totalOpened = config?.totalOpened ? Number(config.totalOpened) : 0;

  return (
    <motion.div
      variants={boxVariants}
      whileHover={{ y: -10, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      onClick={onSelect}
      className="cursor-pointer"
    >
      <div
        className={`relative group bg-gradient-to-b from-[#1a1f3a]/80 to-[#0f1729]/80 backdrop-blur-sm rounded-2xl p-6 border-2 ${box.borderColor} ${box.hoverBorder} transition-all duration-300 shadow-lg hover:shadow-2xl overflow-hidden ${
          isSelected ? "ring-2 ring-cyan-400" : ""
        } ${!isActive ? "opacity-50" : ""}`}
      >
        {/* Selected indicator */}
        {isSelected && (
          <motion.div
            className="absolute top-4 right-4 w-6 h-6 bg-cyan-400 rounded-full flex items-center justify-center z-10"
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

        {/* Not Active Badge */}
        {!isActive && (
          <div className="absolute top-4 left-4 bg-red-500/80 text-white text-xs px-2 py-1 rounded z-10">
            Inactive
          </div>
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
          
          {isLoading ? (
            <div className="h-8 bg-gray-700/50 animate-pulse rounded mb-4" />
          ) : (
            <p className="text-2xl sm:text-3xl font-audiowide bg-gradient-to-r from-cyan-400 to-cyan-600 bg-clip-text text-transparent mb-4">
              {price}
            </p>
          )}

          {/* Stats */}
          {totalOpened > 0 && (
            <p className="text-xs text-gray-400 mb-3">
              {totalOpened.toLocaleString()} opened
            </p>
          )}

          {/* Open Box Button */}
          <motion.button
            onClick={(e) => {
              e.stopPropagation();
              onOpen();
            }}
            disabled={!isActive || isOpening || !isConnected}
            className={`w-full py-3 ${
              !isActive || !isConnected
                ? "bg-gray-600 cursor-not-allowed"
                : "bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700"
            } text-white font-medium rounded-lg transition-all duration-300 shadow-lg shadow-cyan-500/30 disabled:opacity-50`}
            whileHover={isActive && isConnected ? { scale: 1.05 } : {}}
            whileTap={isActive && isConnected ? { scale: 0.98 } : {}}
          >
            {!isConnected
              ? "Connect Wallet"
              : isOpening
                ? "Opening..."
                : !isActive
                  ? "Not Available"
                  : "Open Box"}
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
  );
}
