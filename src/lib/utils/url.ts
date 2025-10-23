/**
 * Get the base URL for the application
 * Uses Vercel's system environment variables with fallbacks
 *
 * Priority:
 * 1. NEXT_PUBLIC_SITE_URL (custom domain)
 * 2. NEXT_PUBLIC_VERCEL_URL (Vercel deployment URL)
 * 3. localhost:3000 (development fallback)
 */
export function getBaseUrl(): string {
  // Custom site URL (for production with custom domain)
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL.startsWith("http")
      ? process.env.NEXT_PUBLIC_SITE_URL
      : `https://${process.env.NEXT_PUBLIC_SITE_URL}`;
  }

  // Vercel deployment URL (automatically set by Vercel)
  if (process.env.NEXT_PUBLIC_VERCEL_URL) {
    return `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`;
  }

  // Development fallback
  if (typeof window !== "undefined") {
    return window.location.origin;
  }

  return "http://localhost:3000";
}

/**
 * Convert a relative path to an absolute URL
 *
 * @param path - Relative path (e.g., "/assets/image.png")
 * @returns Absolute URL (e.g., "https://your-site.vercel.app/assets/image.png")
 *
 * @example
 * getAbsoluteUrl("/assets/logo.png")
 * // Returns: "https://your-site.vercel.app/assets/logo.png"
 */
export function getAbsoluteUrl(path: string): string {
  const baseUrl = getBaseUrl();

  // Ensure path starts with /
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;

  return `${baseUrl}${normalizedPath}`;
}

/**
 * Get absolute URL for NFT card image
 *
 * @param imagePath - Relative image path
 * @returns Absolute URL for the image
 *
 * @example
 * getNFTImageUrl("/assets/lp-nft-card/rare-lp-nft-card.png")
 * // Returns: "https://your-site.vercel.app/assets/lp-nft-card/rare-lp-nft-card.png"
 */
export function getNFTImageUrl(imagePath: string): string {
  return getAbsoluteUrl(imagePath);
}
