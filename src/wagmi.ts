import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { baseSepolia } from "wagmi/chains";

// Get your project ID from https://cloud.walletconnect.com
const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || "";

if (!projectId) {
  console.warn(
    "⚠️ WalletConnect Project ID is not set. Get one at https://cloud.walletconnect.com"
  );
}

export const config = getDefaultConfig({
  appName: "CryptoBox",
  projectId,
  chains: [baseSepolia],
  ssr: true,
});
