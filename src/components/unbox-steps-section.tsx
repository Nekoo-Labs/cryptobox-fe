"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { Wallet, Package, Gift, ArrowRight, Sparkles } from "lucide-react";

const steps = [
  {
    id: 1,
    icon: Wallet,
    title: "1. Connect Wallet",
    description:
      "Link your Web3 wallet to get started. We support MetaMask, WalletConnect, and more.",
  },
  {
    id: 2,
    icon: Package,
    title: "2. Choose Box",
    description:
      "Select your box rarity and watch the excitement unfold with our CSGO-style animation.",
  },
  {
    id: 3,
    icon: Gift,
    title: "3. Claim Reward",
    description:
      "Receive your LP NFT instantly. View in your inventory, trade on marketplaces, or keep collecting.",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const stepVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
    },
  },
};

export function UnboxStepsSection() {
  return (
    <section className="relative py-20 sm:py-24 md:py-32 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[120px]"
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
          className="text-center mb-16 sm:mb-20"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-audiowide text-white mb-4">
            Ready to Unbox?
          </h2>
          <p className="text-base sm:text-lg text-gray-400 max-w-2xl mx-auto">
            Follow three simple steps to reveal your NFT rewards.
          </p>
        </motion.div>

        {/* Steps Container */}
        <motion.div
          className="max-w-6xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className="grid md:grid-cols-3 gap-8 md:gap-6 lg:gap-8 relative">
            {steps.map((step, index) => (
              <div key={step.id} className="relative">
                {/* Step Card */}
                <motion.div
                  variants={stepVariants}
                  whileHover={{ y: -10 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <div className="relative group">
                    {/* Icon Circle */}
                    <motion.div
                      className="w-24 h-24 sm:w-28 sm:h-28 mx-auto mb-6 relative"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      {/* Glow effect */}
                      <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/30 to-blue-500/30 rounded-full blur-xl" />

                      {/* Icon container */}
                      <div className="relative w-full h-full bg-gradient-to-br from-cyan-500/20 to-blue-500/20 backdrop-blur-sm rounded-full border-2 border-cyan-500/30 flex items-center justify-center group-hover:border-cyan-400/50 transition-colors duration-300">
                        <step.icon className="w-10 h-10 sm:w-12 sm:h-12 text-cyan-400" />
                      </div>

                      {/* Pulse effect */}
                      <motion.div
                        className="absolute inset-0 rounded-full border-2 border-cyan-400/30"
                        animate={{
                          scale: [1, 1.2, 1],
                          opacity: [0.5, 0, 0.5],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: index * 0.3,
                        }}
                      />
                    </motion.div>

                    {/* Step Content */}
                    <div className="text-center">
                      <h3 className="text-xl sm:text-2xl font-audiowide text-white mb-3">
                        {step.title}
                      </h3>
                      <p className="text-sm sm:text-base text-gray-400 leading-relaxed max-w-xs mx-auto">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </motion.div>

                {/* Arrow between steps (hidden on mobile) */}
                {index < steps.length - 1 && (
                  <motion.div
                    className="hidden md:block absolute top-12 -right-4 lg:-right-6 z-10"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 + index * 0.2 }}
                  >
                    <ArrowRight className="w-8 h-8 text-cyan-500/50" />
                  </motion.div>
                )}
              </div>
            ))}
          </div>
        </motion.div>

        {/* CTA Button */}
        <motion.div
          className="text-center mt-16 sm:mt-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Link href="/create">
            <motion.div
              className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-cyan-500 to-cyan-600 text-white font-medium rounded-xl shadow-lg shadow-cyan-500/30 cursor-pointer"
              whileHover={{
                scale: 1.05,
                boxShadow: "0 20px 50px rgba(34, 211, 238, 0.5)",
              }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <Sparkles className="w-5 h-5" />
              <span className="text-base sm:text-lg">Open Your First Box</span>
              <Sparkles className="w-5 h-5" />
            </motion.div>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
