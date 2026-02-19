import React from "react";
import { motion } from "framer-motion";
import {
  User, ClipboardCheck, FileText, Plane, HeartPulse,
  ChevronRight, ExternalLink
} from "lucide-react";
import CTASection from "../components/compass-connect/CTASection";
import { TEXT_PRIMARY, TEXT_PRIMARY_ALPHA_70, TEXT_PRIMARY_ALPHA_50, ACCENT_PRIMARY, ACCENT_SECONDARY, ACCENT_PRIMARY_ALPHA_20, COMPONENTS, SHADOWS, GLASS, BORDERS } from "../constants/colors";

const MEDICAL_PHASE = [
  {
    num: "01",
    icon: User,
    title: "Submit Interest",
    subtitle: "Provide basic travel details",
    description: "Start by providing your basic contact and travel details. This helps us begin coordinating your journey while keeping the medical assessment separate.",
    details: [
      "Full name, email, and phone number",
      "Country of residence and departure location",
      "Travel preferences and timing",
      "Non-medical information only",
    ],
    color: ACCENT_PRIMARY,
  },
  {
    num: "02",
    icon: ClipboardCheck,
    title: "Complete Hospital Questionnaire",
    subtitle: "Secure medical assessment",
    description: "You'll complete the hospital's secure health questionnaire directly with them. This is handled entirely by licensed medical professionals.",
    details: [
      "Free, confidential assessment",
      "Completed directly on hospital website",
      "Medical team reviews your health profile",
      "Compass Connect does not access or store medical data",
    ],
    color: ACCENT_PRIMARY,
  },
  {
    num: "03",
    icon: FileText,
    title: "Receive Medical Quote",
    subtitle: "Personalized pricing from hospital",
    description: "The hospital assesses your eligibility and sends you a personalized quote including procedure details, pricing, and your unique reference number.",
    details: [
      "Quote sent directly from hospital",
      "Includes all medical and surgical fees",
      "Hospital reference number provided",
      "Medical approval confirmed",
    ],
    color: ACCENT_PRIMARY,
  },
];

const TRAVEL_PHASE = [
  {
    num: "04",
    icon: Plane,
    title: "Return to Compass Connect",
    subtitle: "Coordinate travel arrangements",
    description: "Using your hospital reference number, return to us to coordinate your travel arrangements with other approved patients.",
    details: [
      "Present hospital reference number",
      "Select group departure dates",
      "Begin travel coordination process",
      "Join approved patient community",
    ],
    color: ACCENT_SECONDARY,
  },
  {
    num: "05",
    icon: HeartPulse,
    title: "Travel Coordination",
    subtitle: "Premium concierge service",
    description: "We organize all travel logistics including flights, accommodation, transfers, and on-ground support for your group departure.",
    details: [
      "Group flight coordination",
      "Premium accommodation near hospital",
      "Private transfers and ground transport",
      "24/7 on-ground concierge support",
    ],
    color: ACCENT_SECONDARY,
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
            <span className="text-[11px] font-sans font-semibold uppercase tracking-[0.3em] mb-4 block" style={{ color: ACCENT_PRIMARY }}>The Process</span>
            <h1 className="font-serif text-4xl md:text-5xl mb-4" style={{ color: TEXT_PRIMARY }}>
              How It Works
            </h1>
            <p className="text-lg" style={{ color: TEXT_PRIMARY_ALPHA_70 }}>
              A transparent two-phase journey that separates medical assessment from travel coordination. Every step is clearly defined and legally protected.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-12 lg:py-20">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="relative">
            {/* Vertical Line */}
            <div className="hidden lg:block absolute left-[39px] top-0 bottom-0 w-px" style={{ background: `linear-gradient(to bottom, ${TEXT_PRIMARY}, ${ACCENT_PRIMARY_ALPHA_20}, transparent)` }} />

            <div className="space-y-8 lg:space-y-12">
              {/* Medical Phase */}
              <div className="mb-12">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="text-center mb-8"
                >
                  <h2 className="text-2xl font-bold mb-2" style={{ color: ACCENT_PRIMARY }}>
                    Phase One: Medical Assessment
                  </h2>
                  <p className="text-sm" style={{ color: TEXT_PRIMARY_ALPHA_70 }}>
                    Handled directly by accredited hospital partners
                  </p>
                </motion.div>
                
                {MEDICAL_PHASE.map((phase, i) => (
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
                          style={{ backgroundColor: phase.color, color: COMPONENTS.BUTTON_PRIMARY_TEXT }}
                        >
                          <phase.icon className="w-8 h-8" />
                        </div>
                        <div className="flex-1 flex items-center justify-center">
                          <span className="text-xs font-bold" style={{ color: TEXT_PRIMARY_ALPHA_50 }}>{phase.num}</span>
                        </div>
                      </div>
                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="bg-white rounded-2xl p-6 lg:p-8 shadow-sm" style={{ backgroundColor: GLASS.CARD_BACKGROUND, border: `1px solid ${BORDERS.ACCENT_SUBTLE}` }}>
                          <h3 className="text-xl font-bold mb-1" style={{ color: TEXT_PRIMARY }}>{phase.title}</h3>
                          <p className="text-sm font-medium mb-3" style={{ color: phase.color }}>{phase.subtitle}</p>
                          <p className="text-base mb-4 leading-relaxed" style={{ color: TEXT_PRIMARY_ALPHA_70 }}>{phase.description}</p>
                          <ul className="space-y-2">
                            {phase.details.map((detail, idx) => (
                              <li key={idx} className="flex items-start gap-2 text-sm" style={{ color: TEXT_PRIMARY_ALPHA_60 }}>
                                <ChevronRight className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: phase.color }} />
                                {detail}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Phase Divider */}
              <div className="text-center py-8">
                <div className="inline-flex items-center gap-4">
                  <div className="h-px w-20" style={{ backgroundColor: ACCENT_PRIMARY_ALPHA_20 }} />
                  <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: TEXT_PRIMARY_ALPHA_50 }}>
                    Medical Complete → Travel Begins
                  </span>
                  <div className="h-px w-20" style={{ backgroundColor: ACCENT_PRIMARY_ALPHA_20 }} />
                </div>
              </div>

              {/* Travel Phase */}
              <div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="text-center mb-8"
                >
                  <h2 className="text-2xl font-bold mb-2" style={{ color: ACCENT_SECONDARY }}>
                    Phase Two: Travel Coordination
                  </h2>
                  <p className="text-sm" style={{ color: TEXT_PRIMARY_ALPHA_70 }}>
                    Coordinated by Compass Connect concierge team
                  </p>
                </motion.div>
                
                {TRAVEL_PHASE.map((phase, i) => (
                  <motion.div
                    key={phase.num}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: (i + 3) * 0.1 }}
                    className="relative"
                  >
                    <div className="flex gap-6 lg:gap-10">
                      {/* Timeline Dot */}
                      <div className="hidden lg:flex flex-col items-center flex-shrink-0">
                        <div
                          className="w-20 h-20 rounded-2xl flex items-center justify-center shadow-lg z-10"
                          style={{ backgroundColor: phase.color, color: COMPONENTS.BUTTON_PRIMARY_TEXT }}
                        >
                          <phase.icon className="w-8 h-8" />
                        </div>
                        <div className="flex-1 flex items-center justify-center">
                          <span className="text-xs font-bold" style={{ color: TEXT_PRIMARY_ALPHA_50 }}>{phase.num}</span>
                        </div>
                      </div>
                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="bg-white rounded-2xl p-6 lg:p-8 shadow-sm" style={{ backgroundColor: GLASS.CARD_BACKGROUND, border: `1px solid ${BORDERS.ACCENT_SUBTLE}` }}>
                          <h3 className="text-xl font-bold mb-1" style={{ color: TEXT_PRIMARY }}>{phase.title}</h3>
                          <p className="text-sm font-medium mb-3" style={{ color: phase.color }}>{phase.subtitle}</p>
                          <p className="text-base mb-4 leading-relaxed" style={{ color: TEXT_PRIMARY_ALPHA_70 }}>{phase.description}</p>
                          <ul className="space-y-2">
                            {phase.details.map((detail, idx) => (
                              <li key={idx} className="flex items-start gap-2 text-sm" style={{ color: TEXT_PRIMARY_ALPHA_60 }}>
                                <ChevronRight className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: phase.color }} />
                                {detail}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Legal Disclaimer */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center p-8 rounded-2xl"
            style={{ backgroundColor: ACCENT_PRIMARY_ALPHA_10, border: `1px solid ${ACCENT_PRIMARY_ALPHA_20}` }}
          >
            <p className="text-sm font-medium mb-2" style={{ color: TEXT_PRIMARY }}>
              Compass Connect is an independent, non-medical concierge service.
            </p>
            <p className="text-xs" style={{ color: TEXT_PRIMARY_ALPHA_60 }}>
              We coordinate travel logistics only. All medical care, assessments, and treatments are provided directly by accredited hospital partners.
            </p>
          </motion.div>
        </div>
      </section>

      <CTASection />
    </div>
  );
}
