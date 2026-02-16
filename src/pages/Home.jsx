import React from "react";
import HeroSection from "../components/atlas/HeroSection";
import StepTimeline from "../components/atlas/StepTimeline";
import WhatWeDoSection from "../components/atlas/WhatWeDoSection";
import WhyGroupTravel from "../components/atlas/WhyGroupTravel";
import DisclaimerBlock from "../components/atlas/DisclaimerBlock";
import CTASection from "../components/atlas/CTASection";

export default function Home() {
  return (
    <div>
      <HeroSection />
      <StepTimeline />
      <WhatWeDoSection />
      <WhyGroupTravel />

      {/* Trust & Ethics */}
      <section className="py-16 lg:py-20">
        <div className="max-w-3xl mx-auto px-5 sm:px-8">
          <DisclaimerBlock />
        </div>
      </section>

      <CTASection />
    </div>
  );
}