import React from "react";
import { motion } from "framer-motion";
import {
  User, ClipboardCheck, FileText, Plane, Stethoscope, HeartPulse,
  ChevronRight, ExternalLink
} from "lucide-react";
import CTASection from "../components/compass-connect/CTASection";
import { TEXT_PRIMARY, TEXT_PRIMARY_ALPHA_70, TEXT_PRIMARY_ALPHA_50, ACCENT_PRIMARY, ACCENT_SECONDARY, ACCENT_PRIMARY_ALPHA_20, COMPONENTS, SHADOWS, GLASS, BORDERS } from "../constants/colors";

const PHASES = [
  {
    num: "01",
    icon: User,
    title: "Your Details",
    subtitle: "Provide contact information",
    description: "Start by providing your basic contact details. This helps us track your journey and ensures you receive important updates about your travel coordination.",
    details: [
      "Full name, email, and phone number",
      "Country of residence",
      "Terms acceptance for non-medical services",
      "Quick and secure form submission",
    ],
    color: ACCENT_PRIMARY,
  },
  {
    num: "02",
    icon: ClipboardCheck,
    title: "Hospital Assessment",
    subtitle: "Complete the health questionnaire",
    description: "After submitting your details, you'll access the hospital's secure health questionnaire. This is completed directly with the hospital — Compass Connect does not collect or handle any medical information.",
    details: [
      "Free, confidential assessment",
      "Completed directly on hospital website",
      "Medical team reviews your health profile",
      "Compass Connect has no access to your medical data",
    ],
    color: ACCENT_PRIMARY,
  },
  {
    num: "03",
    icon: FileText,
    title: "Surgery Quote",
    subtitle: "Receive pricing directly from hospital",
    description: "Once the hospital has assessed your questionnaire, they will provide a personalised surgery quote directly to you. This includes all medical fees, hospital stay, and clinical aftercare.",
    details: [
      "Quote sent directly from hospital",
      "Includes all medical and surgical fees",
      "Compass Connect does not set or influence pricing",
      "Hospital fees paid directly to hospital",
    ],
    color: ACCENT_PRIMARY,
  },
  {
    num: "04",
    icon: Plane,
    title: "Group Booking",
    subtitle: "Secure your travel seat with Compass Connect",
    description: "With your hospital quote confirmed, return to Compass Connect to book your seat on an upcoming group trip. Pay 4,000 which covers return flights and full concierge support.",
    details: [
      "Select from available group trips",
      "4,000 includes flights + concierge",
      "Trip confirmed once 4 travelers join",
      "Full refund if minimum not met",
    ],
    color: TEXT_PRIMARY,
  },
  {
    num: "05",
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
    color: ACCENT_PRIMARY,
  },
  {
    num: "06",
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
    color: ACCENT_PRIMARY,
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
            <span className="text-xs uppercase tracking-[0.2em] font-semibold" style={{ color: ACCENT_PRIMARY }}>The Process</span>
            <h1
              className="text-4xl sm:text-5xl lg:text-6xl font-bold mt-3"
              style={{ fontFamily: 'Playfair Display, serif', color: TEXT_PRIMARY }}
            >
              How It Works
            </h1>
            <p className="mt-5 text-lg leading-relaxed" style={{ fontFamily: 'Inter, sans-serif', color: TEXT_PRIMARY_ALPHA_70 }}>
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
            <div className="hidden lg:block absolute left-[39px] top-0 bottom-0 w-px" style={{ background: `linear-gradient(to bottom, ${TEXT_PRIMARY}, ${ACCENT_PRIMARY_ALPHA_20}, transparent)` }} />

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
                    <div className="flex-1 rounded-2xl p-6 sm:p-8 lg:p-10 shadow-sm hover:shadow-md transition-shadow" style={{ backgroundColor: GLASS.CARD_BACKGROUND, border: `1px solid ${ACCENT_PRIMARY_ALPHA_20}` }}>
                      {/* Mobile Icon */}
                      <div className="lg:hidden flex items-center gap-4 mb-5">
                        <div
                          className="w-12 h-12 rounded-xl flex items-center justify-center"
                          style={{ backgroundColor: phase.color }}
                        >
                          <phase.icon className="w-5 h-5" style={{ color: TEXT_PRIMARY }} />
                        </div>
                        <span className="text-3xl font-bold" style={{ fontFamily: 'Playfair Display, serif', color: TEXT_PRIMARY_ALPHA_50 }}>
                          {phase.num}
                        </span>
                      </div>

                      <div className="flex items-center gap-4 mb-2">
                        <span className="hidden lg:block text-4xl font-bold" style={{ fontFamily: 'Playfair Display, serif', color: TEXT_PRIMARY_ALPHA_50 }}>
                          {phase.num}
                        </span>
                        <div>
                          <span className="text-xs uppercase tracking-[0.15em] font-semibold" style={{ color: phase.color }}>
                            {phase.subtitle}
                          </span>
                          <h3
                            className="text-2xl font-bold"
                            style={{ fontFamily: 'Playfair Display, serif', color: TEXT_PRIMARY }}
                          >
                            {phase.title}
                          </h3>
                        </div>
                      </div>

                      <p className="leading-relaxed mt-4 mb-6" style={{ fontFamily: 'Inter, sans-serif', color: TEXT_PRIMARY_ALPHA_70 }}>
                        {phase.description}
                      </p>

                      <div className="space-y-3">
                        {phase.details.map((detail, di) => (
                          <div key={di} className="flex items-start gap-3">
                            <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ backgroundColor: ACCENT_PRIMARY_ALPHA_20 }}>
                              <span className="text-xs font-bold" style={{ color: ACCENT_PRIMARY }}>{di + 1}</span>
                            </div>
                            <p className="text-sm leading-relaxed" style={{ fontFamily: 'Inter, sans-serif', color: TEXT_PRIMARY_ALPHA_70 }}>
                              {detail}
                            </p>
                          </div>
                        ))}
                      </div>

                      {phase.cta && (
                        <div className="mt-6">
                          <a
                            href={phase.cta.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all shadow-md"
                            style={{ 
                              backgroundColor: COMPONENTS.STATUS_WARNING, 
                              color: TEXT_PRIMARY_ALPHA_50,
                              boxShadow: SHADOWS.ACCENT_MEDIUM
                            }}
                            onMouseEnter={(e) => {
                              e.target.style.backgroundColor = ACCENT_SECONDARY;
                              e.target.style.boxShadow = SHADOWS.ACCENT_STRONG;
                            }}
                            onMouseLeave={(e) => {
                              e.target.style.backgroundColor = COMPONENTS.STATUS_WARNING;
                              e.target.style.boxShadow = SHADOWS.ACCENT_MEDIUM;
                            }}
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

      <CTASection />
    </div>
  );
}