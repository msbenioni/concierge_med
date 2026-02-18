import React from "react";
import { motion } from "framer-motion";
import FAQAccordion from "../components/compass-connect/FAQAccordion";
import CTASection from "../components/compass-connect/CTASection";

const FAQ_ITEMS = [
  {
    question: "Do you provide medical advice?",
    answer: "No. Compass Connect is a non-medical concierge service. We do not provide medical advice, assessment, or clinical decisions of any kind. All medical matters are handled exclusively by our partner hospitals and their licensed medical professionals. We coordinate travel and provide emotional and logistical support only.",
  },
  {
    question: "Who do I pay for surgery?",
    answer: "All surgical and medical fees are paid directly to the partner hospital. Compass Connect does not collect, process, or handle any medical payments. The $3,500 NZD you pay to Compass Connect covers only your group airfare and concierge support services.",
  },
  {
    question: "What does the $3,500 NZD include?",
    answer: "Your $3,500 NZD fee includes return flights from your departure city, airport transfers, on-the-ground concierge support, travel logistics coordination, and group travel companionship. It does not include hospital or surgical fees, which are paid directly to the hospital.",
  },
  {
    question: "What if fewer than 4 travelers join a trip?",
    answer: "Each group trip requires a minimum of 4 confirmed travelers to proceed. If the minimum is not met, the trip will not go ahead and you will receive a full refund of your $3,500 NZD payment. We will notify you as early as possible if this occurs.",
  },
  {
    question: "Can I travel alone instead of with a group?",
    answer: "Compass Connect specialises in group travel coordination. Our service is built around the benefits of shared journeys — including emotional support, lower costs, and structured logistics. If you prefer to travel independently, you are welcome to arrange your own travel and work directly with the hospital.",
  },
  {
    question: "Do you support both bariatric and cosmetic surgery?",
    answer: "Yes. Our concierge services support patients travelling for both bariatric and cosmetic surgery at our partner hospitals. The type of procedure does not affect your travel fee or the support we provide. All clinical decisions about your suitability for surgery are made by the hospital.",
  },
  {
    question: "What happens if my surgery is cancelled by the hospital?",
    answer: "If the hospital determines that surgery cannot proceed for any reason, Compass Connect will assist with your travel arrangements home. Refund policies for medical fees are governed by the hospital's own terms. Compass Connect will refund the travel component where applicable, minus any non-recoverable flight costs.",
  },
  {
    question: "How does the health questionnaire work?",
    answer: "The health questionnaire is completed on our partner hospital's website. It is a confidential medical form reviewed by the hospital's medical team. Compass Connect does not have access to your medical information. Once assessed, the hospital will contact you directly with a surgery quote.",
  },
  {
    question: "Is Compass Connect affiliated with the hospitals?",
    answer: "Compass Connect is an independent concierge service. While we work closely with our partner hospitals to coordinate travel for patients, we are not a medical provider, subsidiary, or official representative of any hospital. We operate independently to provide non-medical travel and support services.",
  },
];

export default function FAQ() {
  return (
    <div>
      {/* Header */}
      <section className="pt-16 pb-8 lg:pt-24 lg:pb-12">
        <div className="max-w-3xl mx-auto px-5 sm:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <span className="text-xs uppercase tracking-[0.2em] text-[#FF8C42] font-semibold">
              Questions & Answers
            </span>
            <h1
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#0F1C2E] mt-3"
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              Frequently Asked Questions
            </h1>
            <p className="mt-5 text-lg text-[#7C848E] leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>
              Transparency matters. Here are honest answers to the questions we're asked most often.
            </p>
          </motion.div>
        </div>
      </section>

      {/* FAQ List */}
      <section className="py-8 lg:py-12">
        <div className="max-w-3xl mx-auto px-5 sm:px-8">
          <FAQAccordion items={FAQ_ITEMS} />
        </div>
      </section>

      <CTASection />
    </div>
  );
}