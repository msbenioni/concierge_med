import React from "react";
import { motion } from "framer-motion";
import { CheckCircle, ArrowRight } from "lucide-react";
import { 
  TEXT_PRIMARY, 
  ACCENT_PRIMARY, 
  TEXT_PRIMARY_ALPHA_70,
  TEXT_PRIMARY_ALPHA_50,
  ACCENT_PRIMARY_ALPHA_20,
  BACKGROUND_PRIMARY_ALPHA_10,
  COMPONENTS
} from "../../constants/colors";

const journeySteps = [
  {
    number: "1",
    title: "Express Interest",
    description: "Submit your details to begin your journey"
  },
  {
    number: "2", 
    title: "Complete Hospital Assessment",
    description: "Secure medical questionnaire with accredited hospital"
  },
  {
    number: "3",
    title: "Receive Medical Quote", 
    description: "Get personalized pricing and approval from hospital"
  },
  {
    number: "4",
    title: "Confirm & Return to Us",
    description: "Use your hospital reference to coordinate travel"
  },
  {
    number: "5",
    title: "We Organise Travel",
    description: "Premium concierge service for your group departure"
  }
];

export default function JourneyOverview() {
  return (
    <section className="py-20 px-6 lg:px-12">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 
            className="text-3xl md:text-4xl font-bold mb-4"
            style={{ fontFamily: 'Playfair Display, serif', color: TEXT_PRIMARY }}
          >
            Your Journey, Clearly Defined
          </h2>
          <p 
            className="text-lg max-w-2xl mx-auto"
            style={{ color: TEXT_PRIMARY_ALPHA_70 }}
          >
            A seamless, two-phase journey. Medical care handled by accredited professionals. 
            Travel coordination handled by Compass Connect.
          </p>
        </motion.div>

        {/* Journey Steps */}
        <div className="relative">
          {/* Connection Line */}
          <div 
            className="absolute top-1/2 left-0 right-0 h-0.5 -translate-y-1/2 hidden lg:block"
            style={{ 
              background: `linear-gradient(to right, ${ACCENT_PRIMARY} 20%, ${ACCENT_PRIMARY_ALPHA_20} 20%, ${ACCENT_PRIMARY_ALPHA_20} 80%, ${ACCENT_PRIMARY} 80%)`
            }}
          />

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8 relative">
            {journeySteps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                {/* Step Number */}
                <div 
                  className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-lg font-bold"
                  style={{ 
                    backgroundColor: index === 0 || index === 4 ? ACCENT_PRIMARY : ACCENT_PRIMARY_ALPHA_20,
                    color: index === 0 || index === 4 ? COMPONENTS.BUTTON_PRIMARY_TEXT : TEXT_PRIMARY_ALPHA_50
                  }}
                >
                  {step.number}
                </div>

                {/* Step Content */}
                <h3 
                  className="font-semibold mb-2 text-sm"
                  style={{ color: TEXT_PRIMARY }}
                >
                  {step.title}
                </h3>
                <p 
                  className="text-xs leading-relaxed"
                  style={{ color: TEXT_PRIMARY_ALPHA_50 }}
                >
                  {step.description}
                </p>

                {/* Arrow for mobile */}
                {index < journeySteps.length - 1 && (
                  <div className="lg:hidden flex justify-center mt-4">
                    <ArrowRight className="w-4 h-4" style={{ color: ACCENT_PRIMARY_ALPHA_20 }} />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Phase Labels */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-center p-6 rounded-2xl"
            style={{ backgroundColor: BACKGROUND_PRIMARY_ALPHA_10 }}
          >
            <div className="flex items-center justify-center gap-2 mb-3">
              <div 
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: ACCENT_PRIMARY }}
              />
              <span 
                className="text-sm font-semibold uppercase tracking-wider"
                style={{ color: ACCENT_PRIMARY }}
              >
                Medical Phase
              </span>
            </div>
            <p 
              className="text-sm"
              style={{ color: TEXT_PRIMARY_ALPHA_70 }}
            >
              Steps 1-3 handled directly by accredited hospital partners
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-center p-6 rounded-2xl"
            style={{ backgroundColor: BACKGROUND_PRIMARY_ALPHA_10 }}
          >
            <div className="flex items-center justify-center gap-2 mb-3">
              <div 
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: ACCENT_PRIMARY }}
              />
              <span 
                className="text-sm font-semibold uppercase tracking-wider"
                style={{ color: ACCENT_PRIMARY }}
              >
                Travel Phase
              </span>
            </div>
            <p 
              className="text-sm"
              style={{ color: TEXT_PRIMARY_ALPHA_70 }}
            >
              Steps 4-5 coordinated by Compass Connect concierge team
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
