import Link from "next/link";
import { NftInventoryGrid } from "@/components";

export const metadata = {
  title: "Inventory - CryptoBox",
  description: "View and manage your NFT collection",
};

export default function InventoryPage() {
  return (
    <main className="min-h-screen pt-24 pb-20">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Header Section */}
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-audiowide text-white mb-6">
            Your NFT Collection
          </h1>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <button
              disabled
              className="relative px-8 py-3 bg-transparent border-2 border-gray-500/30 text-gray-500 font-medium rounded-lg min-w-[160px] cursor-not-allowed group overflow-hidden"
            >
              <span className="relative z-10">View Market</span>
              <span className="absolute z-20 backdrop-blur-md inset-0 flex items-center justify-center bg-gradient-to-r from-cyan-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-xs text-cyan-400 font-medium">
                  Coming Soon
                </span>
              </span>
            </button>
            <Link
              href="/cases"
              className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 text-white font-medium rounded-lg transition-all duration-300 shadow-lg shadow-cyan-500/30 min-w-[160px]"
            >
              Open More
            </Link>
          </div>
        </div>

        {/* Total Value Card */}
        <div className="mx-auto mb-12 sm:mb-16">
          <div className="space-y-8 relative bg-gradient-to-b from-[#1a2838]/80 to-transparent backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-cyan-500/20 overflow-hidden">
            {/* Background glow */}
            {/* <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-blue-500/5 pointer-events-none" /> */}

            <div className="relative text-center">
              <p className="text-sm sm:text-base text-gray-400 mb-2">
                Total Value
              </p>
              <p className="text-4xl sm:text-2xl font-audiowide bg-gradient-to-r from-cyan-400 to-cyan-600 bg-clip-text text-transparent">
                0.029 ETH
              </p>
            </div>
            <NftInventoryGrid />
          </div>
        </div>
      </div>
    </main>
  );
}
