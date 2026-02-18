import React from "react";
import HeroSection from "../components/compass-connect/HeroSection";
import StepTimeline from "../components/compass-connect/StepTimeline";
import WhatWeDoSection from "../components/compass-connect/WhatWeDoSection";
import WhyGroupTravel from "../components/compass-connect/WhyGroupTravel";
import DisclaimerBlock from "../components/compass-connect/DisclaimerBlock";
import CTASection from "../components/compass-connect/CTASection";

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