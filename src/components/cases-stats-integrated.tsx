"use client";

import { motion } from "motion/react";
import { useContractStats } from "@/hooks";
import { formatETH, formatNumber } from "@/lib/utils/format";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

export function CasesStatsIntegrated() {
  const { stats, isLoading } = useContractStats();

  const statsData = [
    {
      label: "Boxes Opened",
      value: stats ? formatNumber(stats.totalBoxesOpened) : "0",
      suffix: "+",
      isLoading,
    },
    {
      label: "Total Value",
      value: stats ? `$${formatETH(stats.totalValueDistributed, 1)}` : "$0",
      suffix: "M+",
      isLoading,
    },
    {
      label: "Security",
      value: "100",
      suffix: "%",
      isLoading: false,
    },
  ];

  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {statsData.map((stat, index) => (
        <motion.div
          key={index}
          variants={itemVariants}
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="relative group"
        >
          <div className="bg-gradient-to-br from-[#1a1f3a]/80 to-[#0f1729]/80 backdrop-blur-sm rounded-2xl p-6 border border-cyan-500/20 hover:border-cyan-400/40 transition-all duration-300 shadow-lg hover:shadow-cyan-500/20">
            {/* Glow effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/0 via-cyan-400/5 to-cyan-600/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />

            <div className="relative text-center">
              {stat.isLoading ? (
                <div className="h-12 bg-gray-700/50 animate-pulse rounded mb-2" />
              ) : (
                <h3 className="text-4xl sm:text-5xl font-audiowide bg-gradient-to-r from-cyan-400 to-cyan-600 bg-clip-text text-transparent mb-2">
                  {stat.value}
                  <span className="text-2xl sm:text-3xl">{stat.suffix}</span>
                </h3>
              )}
              <p className="text-gray-400 text-sm sm:text-base font-medium">
                {stat.label}
              </p>
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
