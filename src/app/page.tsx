import { Hero } from "@/components/home/Hero";
import { TrustBar } from "@/components/home/TrustBar";
import { Categories } from "@/components/home/Categories";
import { HowItWorks } from "@/components/home/HowItWorks";
import { FeaturedVendors } from "@/components/home/FeaturedVendors";
import { CTA } from "@/components/home/CTA";

export default function Home() {
  return (
    <>
      <Hero />
      <TrustBar />
      <Categories />
      <HowItWorks />
      <FeaturedVendors />
      <CTA />
    </>
  );
}
