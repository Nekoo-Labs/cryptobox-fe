"use client";

import { motion } from "motion/react";
import { useContractStats } from "@/hooks/useContractStats";
import { formatETH } from "@/lib/utils/format";
import {
  Package,
  Coins,
  Flame,
  TrendingUp,
  Users,
  DollarSign,
} from "lucide-react";

/**
 * Admin component displaying contract statistics
 */
export function AdminStats() {
  const { stats, isLoading } = useContractStats();

  const statCards = [
    {
      icon: Package,
      label: "Total Boxes Opened",
      value: stats?.totalBoxesOpened?.toString() || "0",
      color: "cyan",
      gradient: "from-cyan-500/10 to-cyan-600/10",
      border: "border-cyan-500/20",
      iconBg: "bg-cyan-500/10",
      iconColor: "text-cyan-400",
    },
    {
      icon: Coins,
      label: "Total Value Distributed",
      value: stats?.totalValueDistributed
        ? `${formatETH(stats.totalValueDistributed, 2)} ETH`
        : "0 ETH",
      color: "green",
      gradient: "from-green-500/10 to-green-600/10",
      border: "border-green-500/20",
      iconBg: "bg-green-500/10",
      iconColor: "text-green-400",
    },
    {
      icon: Flame,
      label: "NFTs Burned",
      value: stats?.totalNFTsRedeemed?.toString() || "0",
      color: "red",
      gradient: "from-red-500/10 to-red-600/10",
      border: "border-red-500/20",
      iconBg: "bg-red-500/10",
      iconColor: "text-red-400",
    },
    {
      icon: TrendingUp,
      label: "Value Redeemed (20%)",
      value: stats?.totalValueRedeemed
        ? `${formatETH(stats.totalValueRedeemed, 2)} ETH`
        : "0 ETH",
      color: "purple",
      gradient: "from-purple-500/10 to-purple-600/10",
      border: "border-purple-500/20",
      iconBg: "bg-purple-500/10",
      iconColor: "text-purple-400",
    },
    {
      icon: DollarSign,
      label: "Platform Fees (80%)",
      value: stats?.totalPlatformFees
        ? `${formatETH(stats.totalPlatformFees, 2)} ETH`
        : "0 ETH",
      color: "yellow",
      gradient: "from-yellow-500/10 to-yellow-600/10",
      border: "border-yellow-500/20",
      iconBg: "bg-yellow-500/10",
      iconColor: "text-yellow-400",
    },
    {
      icon: Users,
      label: "Contract Balance",
      value: stats?.contractBalance
        ? `${formatETH(stats.contractBalance, 2)} ETH`
        : "0 ETH",
      color: "blue",
      gradient: "from-blue-500/10 to-blue-600/10",
      border: "border-blue-500/20",
      iconBg: "bg-blue-500/10",
      iconColor: "text-blue-400",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-audiowide text-white mb-2">
          Contract Statistics
        </h2>
        <p className="text-gray-400">
          Real-time metrics from the MysteryBox contract
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {statCards.map((card, index) => (
          <motion.div
            key={card.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`bg-gradient-to-br ${card.gradient} rounded-xl p-6 border ${card.border} shadow-lg`}
          >
            <div className="flex items-start justify-between mb-4">
              <div
                className={`p-3 rounded-xl ${card.iconBg} border ${card.border}`}
              >
                <card.icon className={`w-6 h-6 ${card.iconColor}`} />
              </div>
            </div>

            <div>
              <p className="text-sm text-gray-400 mb-1">{card.label}</p>
              {isLoading ? (
                <div className="h-8 bg-gray-700/50 animate-pulse rounded" />
              ) : (
                <p className={`text-2xl font-audiowide ${card.iconColor}`}>
                  {card.value}
                </p>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
