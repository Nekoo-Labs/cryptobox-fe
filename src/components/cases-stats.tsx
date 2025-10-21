"use client";

import { motion } from "motion/react";

const stats = [
  {
    value: "10K+",
    label: "Boxes Opened.",
  },
  {
    value: "$2.5M+",
    label: "Total Value Distributed.",
  },
  {
    value: "100%",
    label: "Secure & Fair.",
  },
];

export function CasesStats() {
  return (
    <motion.div
      className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-5xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
    >
      {stats.map((stat, index) => (
        <motion.div
          key={index}
          className="text-center"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <div className="text-4xl sm:text-5xl md:text-6xl font-audiowide bg-gradient-to-br from-white to-gray-300 bg-clip-text text-transparent mb-2">
            {stat.value}
          </div>
          <p className="text-sm sm:text-base text-gray-400">{stat.label}</p>
        </motion.div>
      ))}
    </motion.div>
  );
}
