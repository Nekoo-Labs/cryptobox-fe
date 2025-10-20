import {
  HeroSection,
  NftShowcaseSection,
  UnboxStepsSection,
} from "@/components";

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <NftShowcaseSection />
      <UnboxStepsSection />
    </main>
  );
}
