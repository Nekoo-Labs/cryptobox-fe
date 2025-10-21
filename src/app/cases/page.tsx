import { MysteryBoxesGrid, CasesStats } from "@/components";

export const metadata = {
  title: "Open Cases - CryptoBox",
  description: "Choose your mystery box and reveal unique LP NFT tokens",
};

export default function CasesPage() {
  return (
    <main className="min-h-screen pt-24 pb-20">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Header Section */}
        <div className="text-center mb-12 sm:mb-16">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-audiowide text-white mb-4">
            Choose Mystery Box
          </h1>
          <p className="text-base sm:text-lg text-gray-400 max-w-3xl mx-auto">
            Each box contains unique LP NFT tokens with different rarities.
            Higher rarity means better rewards!
          </p>
        </div>

        {/* Mystery Boxes Grid - Client Component */}
        <div className="mb-16 sm:mb-20">
          <MysteryBoxesGrid />
        </div>

        {/* Stats Section - Client Component */}
        <CasesStats />
      </div>
    </main>
  );
}
