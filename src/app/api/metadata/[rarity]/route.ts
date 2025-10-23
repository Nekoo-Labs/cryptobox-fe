import { NextRequest, NextResponse } from "next/server";
import { getAbsoluteUrl } from "@/lib/utils/url";

// Rarity names mapping
const RARITY_NAMES: Record<string, string> = {
  common: "Common",
  rare: "Rare",
  epic: "Epic",
  legendary: "Legendary",
};

// Rarity descriptions
const RARITY_DESCRIPTIONS: Record<string, string> = {
  common:
    "A Common LP Reward NFT representing your liquidity provision. Redeem for 20% of its value in ETH.",
  rare: "A Rare LP Reward NFT with enhanced value. Redeem for 20% of its value in ETH.",
  epic: "An Epic LP Reward NFT with substantial value. Redeem for 20% of its value in ETH.",
  legendary:
    "A Legendary LP Reward NFT with exceptional value. Redeem for 20% of its value in ETH.",
};

// Rarity attributes
const RARITY_ATTRIBUTES: Record<
  string,
  Array<{ trait_type: string; value: string | number }>
> = {
  common: [
    { trait_type: "Rarity", value: "Common" },
    { trait_type: "Type", value: "LP Reward" },
    { trait_type: "Redeemable", value: "Yes" },
    { trait_type: "Redemption Rate", value: "20%" },
  ],
  rare: [
    { trait_type: "Rarity", value: "Rare" },
    { trait_type: "Type", value: "LP Reward" },
    { trait_type: "Redeemable", value: "Yes" },
    { trait_type: "Redemption Rate", value: "20%" },
  ],
  epic: [
    { trait_type: "Rarity", value: "Epic" },
    { trait_type: "Type", value: "LP Reward" },
    { trait_type: "Redeemable", value: "Yes" },
    { trait_type: "Redemption Rate", value: "20%" },
  ],
  legendary: [
    { trait_type: "Rarity", value: "Legendary" },
    { trait_type: "Type", value: "LP Reward" },
    { trait_type: "Redeemable", value: "Yes" },
    { trait_type: "Redemption Rate", value: "20%" },
  ],
};

/**
 * GET /api/metadata/[rarity]
 * Returns NFT metadata in OpenSea standard format
 *
 * @example
 * GET /api/metadata/common
 * GET /api/metadata/rare
 * GET /api/metadata/epic
 * GET /api/metadata/legendary
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ rarity: string }> }
) {
  const { rarity } = await params;
  const rarityLower = rarity.toLowerCase();

  // Validate rarity
  if (!RARITY_NAMES[rarityLower]) {
    return NextResponse.json(
      { error: "Invalid rarity. Must be: common, rare, epic, or legendary" },
      { status: 400 }
    );
  }

  // Get absolute URL for the NFT image
  const imageUrl = getAbsoluteUrl(
    `/assets/lp-nft-card/${rarityLower}-lp-nft-card.png`
  );

  // Construct metadata following OpenSea standard
  // https://docs.opensea.io/docs/metadata-standards
  const metadata = {
    name: `${RARITY_NAMES[rarityLower]} LP Reward NFT`,
    description: RARITY_DESCRIPTIONS[rarityLower],
    image: imageUrl,
    external_url: getAbsoluteUrl("/"),
    attributes: RARITY_ATTRIBUTES[rarityLower],
  };

  // Return JSON with proper headers for NFT metadata
  return NextResponse.json(metadata, {
    headers: {
      "Content-Type": "application/json",
      // Cache for 1 hour (metadata is static per rarity)
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
      // CORS headers for MetaMask and other wallets
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}

/**
 * OPTIONS /api/metadata/[rarity]
 * Handle CORS preflight requests
 */
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}
