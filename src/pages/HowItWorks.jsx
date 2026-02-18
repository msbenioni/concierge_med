import React from "react";
import { motion } from "framer-motion";
import {
  ClipboardCheck, FileText, Plane, Stethoscope, HeartPulse,
  ChevronRight, ExternalLink
} from "lucide-react";
import DisclaimerBlock from "../components/compass-connect/DisclaimerBlock";
import CTASection from "../components/compass-connect/CTASection";

const PHASES = [
  {
    num: "01",
    icon: ClipboardCheck,
    title: "Hospital Assessment",
    subtitle: "Complete the health questionnaire",
    description: "Your journey begins with the Mexico Bariatric Center's online health questionnaire. This is completed directly with the hospital — Compass Connect does not collect or handle any medical information.",
    details: [
      "Free, confidential assessment",
      "Completed directly on hospital website",
      "Medical team reviews your health profile",
      "Compass Connect has no access to your medical data",
    ],
    cta: {
      label: "Start Questionnaire",
      href: "https://mexicobariatriccenter.com/health-questionnaire/?RefID=2120",
      external: true,
    },
    color: "#1F4E5F",
  },
  {
    num: "02",
    icon: FileText,
    title: "Surgery Quote",
    subtitle: "Receive pricing directly from hospital",
    description: "Once the hospital has assessed your information, they will provide a personalised surgery quote directly to you. This includes all medical fees, hospital stay, and clinical aftercare.",
    details: [
      "Quote sent directly from hospital",
      "Includes all medical and surgical fees",
      "Compass Connect does not set or influence pricing",
      "Hospital fees paid directly to hospital",
    ],
    color: "#FF8C42",
  },
  {
    num: "03",
    icon: Plane,
    title: "Group Booking",
    subtitle: "Secure your travel seat with Compass Connect",
    description: "With your hospital quote confirmed, return to Compass Connect to book your seat on an upcoming group trip. Pay NZD $3,500 which covers return flights and full concierge support.",
    details: [
      "Select from available group trips",
      "$3,500 NZD includes flights + concierge",
      "Trip confirmed once 4 travelers join",
      "Full refund if minimum not met",
    ],
    color: "#0F1C2E",
  },
  {
    num: "04",
    icon: Stethoscope,
    title: "Travel & Surgery",
    subtitle: "Clear roles, seamless experience",
    description: "During your trip, Compass Connect handles all travel logistics and non-medical support, while the hospital manages your entire surgical journey and clinical care.",
    details: [
      "Compass Connect: airport transfers, accommodation logistics, emotional support",
      "Hospital: surgery, clinical decisions, medical aftercare",
      "On-the-ground concierge available throughout",
      "Group companionship for reassurance",
    ],
    color: "#1F4E5F",
  },
  {
    num: "05",
    icon: HeartPulse,
    title: "Return & Ongoing Support",
    subtitle: "Continued care after you return home",
    description: "After your procedure, the hospital provides ongoing medical follow-up and instructions. Compass Connect remains available for non-medical support and coordination as you recover at home.",
    details: [
      "Hospital provides medical follow-up plan",
      "Compass Connect offers non-medical check-in support",
      "Access to group community for peer support",
      "Clear guidance on who to contact for what",
    ],
    color: "#FF8C42",
  },
];

export default function HowItWorks() {
  return (
    <div>
      {/* Hero */}
      <section className="pt-16 pb-8 lg:pt-24 lg:pb-12">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl"
          >
            <span className="text-xs uppercase tracking-[0.2em] text-[#FF8C42] font-semibold">The Process</span>
            <h1
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#0F1C2E] mt-3"
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              How It Works
            </h1>
            <p className="mt-5 text-lg text-[#7C848E] leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>
              A transparent, five-phase journey from initial assessment to your return home. Every step is clearly defined.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-12 lg:py-20">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="relative">
            {/* Vertical Line */}
            <div className="hidden lg:block absolute left-[39px] top-0 bottom-0 w-px bg-gradient-to-b from-[#1F4E5F] via-[#FF8C42]/30 to-transparent" />

            <div className="space-y-8 lg:space-y-12">
              {PHASES.map((phase, i) => (
                <motion.div
                  key={phase.num}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="relative"
                >
                  <div className="flex gap-6 lg:gap-10">
                    {/* Timeline Dot */}
                    <div className="hidden lg:flex flex-col items-center flex-shrink-0">
                      <div
                        className="w-20 h-20 rounded-2xl flex items-center justify-center shadow-lg z-10"
                        style={{ backgroundColor: phase.color }}
                      >
                        <phase.icon className="w-8 h-8 text-white" />
                      </div>
                    </div>

                    {/* Content Card */}
                    <div className="flex-1 bg-white rounded-2xl p-6 sm:p-8 lg:p-10 shadow-sm border border-[#FF8C42]/5 hover:shadow-md transition-shadow">
                      {/* Mobile Icon */}
                      <div className="lg:hidden flex items-center gap-4 mb-5">
                        <div
                          className="w-12 h-12 rounded-xl flex items-center justify-center"
                          style={{ backgroundColor: phase.color }}
                        >
                          <phase.icon className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-3xl font-bold text-[#0F1C2E]/5" style={{ fontFamily: 'Playfair Display, serif' }}>
                          {phase.num}
                        </span>
                      </div>

                      <div className="flex items-center gap-4 mb-2">
                        <span className="hidden lg:block text-4xl font-bold text-[#0F1C2E]/5" style={{ fontFamily: 'Playfair Display, serif' }}>
                          {phase.num}
                        </span>
                        <div>
                          <span className="text-xs uppercase tracking-[0.15em] font-semibold" style={{ color: phase.color }}>
                            {phase.subtitle}
                          </span>
                          <h3
                            className="text-2xl font-bold text-[#0F1C2E]"
                            style={{ fontFamily: 'Playfair Display, serif' }}
                          >
                            {phase.title}
                          </h3>
                        </div>
                      </div>

                      <p className="text-[#7C848E] leading-relaxed mt-4 mb-6" style={{ fontFamily: 'Inter, sans-serif' }}>
                        {phase.description}
                      </p>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {phase.details.map((detail, j) => (
                          <div key={j} className="flex items-start gap-3">
                            <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ backgroundColor: `${phase.color}15` }}>
                              <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: phase.color }} />
                            </div>
                            <span className="text-sm text-[#1E1E1E]/70" style={{ fontFamily: 'Inter, sans-serif' }}>
                              {detail}
                            </span>
                          </div>
                        ))}
                      </div>

                      {phase.cta && (
                        <div className="mt-6">
                          <a
                            href={phase.cta.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#FF8C42] text-[#0F1C2E] text-sm font-semibold hover:bg-[#b8953e] transition-all shadow-md shadow-[#FF8C42]/20"
                          >
                            {phase.cta.label}
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="py-12 lg:py-16">
        <div className="max-w-3xl mx-auto px-5 sm:px-8">
          <DisclaimerBlock />
        </div>
      </section>

      <CTASection />
    </div>
  );
}