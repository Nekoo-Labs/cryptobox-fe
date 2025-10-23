"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAccount } from "wagmi";
import { useIsContractOwner } from "@/hooks/useIsContractOwner";
import { AdminStats } from "@/components/admin-stats";
import { AdminPlatformFees } from "@/components/admin-platform-fees";
import { AdminWithdrawAll } from "@/components/admin-withdraw-all";
import { motion } from "motion/react";
import { Shield, Lock, AlertCircle } from "lucide-react";

export default function AdminPage() {
  const router = useRouter();
  const { isConnected } = useAccount();
  const { isOwner, isLoading, ownerAddress } = useIsContractOwner();

  // Redirect if not owner
  useEffect(() => {
    if (!isLoading && !isOwner && isConnected) {
      router.push("/");
    }
  }, [isOwner, isLoading, isConnected, router]);

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#0a0f1a] via-[#0f1729] to-[#0a0f1a] py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-center py-20">
              <div className="text-center">
                <div className="w-16 h-16 border-4 border-cyan-500/30 border-t-cyan-500 rounded-full animate-spin mx-auto mb-4" />
                <p className="text-gray-400">Verifying access...</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Not connected
  if (!isConnected) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#0a0f1a] via-[#0f1729] to-[#0a0f1a] py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-b from-[#1a2838]/60 to-[#0f1729]/60 backdrop-blur-sm rounded-2xl p-8 border border-yellow-500/20 shadow-lg shadow-yellow-500/10"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-xl bg-yellow-500/10 border border-yellow-500/30">
                  <Lock className="w-6 h-6 text-yellow-400" />
                </div>
                <div>
                  <h2 className="text-xl font-audiowide text-white">
                    Access Restricted
                  </h2>
                  <p className="text-sm text-gray-400">
                    Admin area - Authentication required
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                    <div className="text-sm text-yellow-200/80">
                      <p className="font-medium mb-1">Wallet Not Connected</p>
                      <p>
                        Please connect your wallet to access the admin
                        dashboard. Only the contract owner can view this page.
                      </p>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => router.push("/")}
                  className="w-full py-3 px-6 rounded-lg bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 text-white font-medium transition-all shadow-lg shadow-cyan-500/30"
                >
                  Go to Home
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    );
  }

  // Not owner
  if (!isOwner) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#0a0f1a] via-[#0f1729] to-[#0a0f1a] py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-b from-[#1a2838]/60 to-[#0f1729]/60 backdrop-blur-sm rounded-2xl p-8 border border-red-500/20 shadow-lg shadow-red-500/10"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30">
                  <Shield className="w-6 h-6 text-red-400" />
                </div>
                <div>
                  <h2 className="text-xl font-audiowide text-white">
                    Access Denied
                  </h2>
                  <p className="text-sm text-gray-400">
                    Owner privileges required
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                    <div className="text-sm text-red-200/80">
                      <p className="font-medium mb-1">Unauthorized Access</p>
                      <p className="mb-3">
                        This page is restricted to the contract owner only. Your
                        wallet does not have the required permissions.
                      </p>
                      {ownerAddress && (
                        <div className="mt-3 pt-3 border-t border-red-500/20">
                          <p className="text-xs text-gray-400 mb-1">
                            Contract Owner:
                          </p>
                          <p className="font-mono text-xs text-red-300 break-all">
                            {ownerAddress}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => router.push("/")}
                  className="w-full py-3 px-6 rounded-lg bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 text-white font-medium transition-all shadow-lg shadow-cyan-500/30"
                >
                  Go to Home
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    );
  }

  // Owner - show admin dashboard
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0f1a] via-[#0f1729] to-[#0a0f1a] py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/30">
                <Shield className="w-8 h-8 text-cyan-400" />
              </div>
              <div>
                <h1 className="text-3xl sm:text-4xl font-audiowide text-white">
                  Admin Dashboard
                </h1>
                <p className="text-gray-400">Contract owner control panel</p>
              </div>
            </div>

            {/* Owner Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-green-500/10 border border-green-500/30">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-sm text-green-400 font-medium">
                Verified Owner
              </span>
            </div>
          </motion.div>

          {/* Stats Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-8"
          >
            <AdminStats />
          </motion.div>

          {/* Withdrawal Sections */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Platform Fees */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <AdminPlatformFees />
            </motion.div>

            {/* Withdraw All */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <AdminWithdrawAll />
            </motion.div>
          </div>

          {/* Info Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-8"
          >
            <div className="bg-gradient-to-b from-[#1a2838]/60 to-[#0f1729]/60 backdrop-blur-sm rounded-2xl p-6 border border-blue-500/20">
              <h3 className="text-lg font-audiowide text-white mb-4">
                Admin Functions
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5" />
                    <div>
                      <p className="text-white font-medium">Platform Fees</p>
                      <p className="text-gray-400 text-xs">
                        Withdraw 80% fees from NFT burns only
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5" />
                    <div>
                      <p className="text-white font-medium">Withdraw All</p>
                      <p className="text-gray-400 text-xs">
                        Withdraw entire contract balance (fees + box sales)
                      </p>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5" />
                    <div>
                      <p className="text-white font-medium">Statistics</p>
                      <p className="text-gray-400 text-xs">
                        Real-time contract metrics and analytics
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5" />
                    <div>
                      <p className="text-white font-medium">Access Control</p>
                      <p className="text-gray-400 text-xs">
                        Owner-only functions with wallet verification
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
