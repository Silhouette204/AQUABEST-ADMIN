import { LandingHero, LandingBody, LandingFooter } from "@/components/landing/landing-sections";

export default function HomePage() {
  return (
    <main className="bg-[#0b192c] font-sans antialiased text-white selection:bg-teal-500 selection:text-white">
      <LandingHero />
      <LandingBody />
      <LandingFooter />
    </main>
  );
}