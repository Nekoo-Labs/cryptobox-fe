"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background glow effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[120px]"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-1/3 left-1/3 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[100px]"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid lg:grid-cols-[1fr_auto_1fr] gap-8 lg:gap-12 items-center">
          {/* Left Side - Description */}
          <motion.div
            className="flex flex-col items-center lg:items-end text-center lg:text-start order-2 lg:order-1"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="max-w-xs">
              <motion.div
                className="w-32 h-32 sm:w-40 sm:h-40 mb-4 relative mx-auto"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/20 to-blue-500/20 rounded-full blur-xl" />
                <div className="relative w-full h-full">
                  <Image
                    src="/assets/hero-section/isometric-lp-nft.png"
                    alt="NFT Collection"
                    fill
                    className="object-contain drop-shadow-2xl"
                  />
                </div>
              </motion.div>
              <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
                Discover rare NFT tokens. Buy boxes, spin for rewards, and build
                your digital collection on the blockchain.
              </p>
            </div>
          </motion.div>

          {/* Center - Main Content */}
          <div className="flex flex-col items-center order-1 lg:order-2">
            {/* Title */}
            <motion.div
              className="text-center mb-8 sm:mb-12"
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-audiowide mb-2 sm:mb-4">
                <motion.span
                  className="block text-white"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  Open Mystery
                </motion.span>
                <motion.span
                  className="block bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 bg-clip-text text-transparent"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  Crypto Boxes
                </motion.span>
              </h1>
            </motion.div>

            {/* 3D Box Image */}
            <motion.div
              className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 mb-8 sm:mb-12"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              {/* Enhanced Breathing Glow effect behind box */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-b from-cyan-400/50 via-cyan-500/60 to-blue-500/50 rounded-full blur-3xl"
                animate={{
                  scale: [0.8, 1.2, 0.8],
                  opacity: [0.5, 0.8, 0.5],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />

              {/* Box Image - Static (no floating) */}
              <div className="relative w-full h-full flex items-center justify-center">
                <motion.div
                  className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Image
                    src="/assets/hero-section/cryptobox-opened.png"
                    alt="Crypto Mystery Box"
                    fill
                    className="object-contain drop-shadow-2xl"
                    priority
                  />
                </motion.div>
              </div>

              {/* Floating particles effect */}
              <motion.div
                className="absolute top-1/4 left-1/4 w-2 h-2 bg-cyan-400 rounded-full opacity-75"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.75, 0, 0.75],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeOut",
                }}
              />
              <motion.div
                className="absolute top-1/3 right-1/4 w-1.5 h-1.5 bg-blue-400 rounded-full opacity-75"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.75, 0, 0.75],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeOut",
                  delay: 0.3,
                }}
              />
              <motion.div
                className="absolute bottom-1/3 left-1/3 w-1 h-1 bg-cyan-300 rounded-full opacity-75"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.75, 0, 0.75],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeOut",
                  delay: 0.7,
                }}
              />
            </motion.div>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <Link href="/cases">
                <motion.div
                  className="group relative inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-cyan-500 to-cyan-600 text-white font-medium rounded-xl shadow-lg shadow-cyan-500/30 cursor-pointer"
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 20px 50px rgba(34, 211, 238, 0.5)",
                  }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <span className="relative z-10">Start Opening Boxes</span>
                  <motion.svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </motion.svg>
                </motion.div>
              </Link>
            </motion.div>
          </div>

          {/* Right Side - Stats */}
          <motion.div
            className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-8 order-3"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="max-w-xs">
              {/* Stat 1 */}
              <motion.div
                className="mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <motion.div
                  className="text-5xl sm:text-6xl md:text-7xl font-audiowide bg-gradient-to-br from-white to-gray-300 bg-clip-text text-transparent mb-2"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  10K+
                </motion.div>
                <p className="text-sm sm:text-base text-gray-400">
                  Boxes Opened.
                </p>
              </motion.div>

              {/* Stat 2 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <motion.div
                  className="text-5xl sm:text-6xl md:text-7xl font-audiowide bg-gradient-to-br from-white to-gray-300 bg-clip-text text-transparent mb-2"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  100%
                </motion.div>
                <p className="text-sm sm:text-base text-gray-400">
                  Secure & Fair.
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{
          opacity: { duration: 1, delay: 1 },
          y: { duration: 2, repeat: Infinity, ease: "easeInOut" },
        }}
      >
        <div className="w-6 h-10 border-2 border-cyan-500/30 rounded-full flex items-start justify-center p-2">
          <motion.div
            className="w-1.5 h-3 bg-cyan-500/50 rounded-full"
            animate={{
              y: [0, 12, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>
      </motion.div>
    </section>
  );
}
