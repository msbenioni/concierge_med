import React from "react";
import { motion } from "framer-motion";
import { ClipboardCheck, FileText, Plane } from "lucide-react";

const STEPS = [
  {
    num: "01",
    icon: ClipboardCheck,
    title: "Complete Hospital Questionnaire",
    desc: "Fill out the health questionnaire directly with our partner hospitals. This is your first step toward assessment.",
    accent: "#0A4A52",
  },
  {
    num: "02",
    icon: FileText,
    title: "Receive Your Surgery Quote",
    desc: "The hospital will assess your information and provide a personalised surgery quote directly to you.",
    accent: "#5A6B00",
  },
  {
    num: "03",
    icon: Plane,
    title: "Secure Your Group Travel Seat",
    desc: "Return to Compass Connect and book your seat for $3,500 NZD — includes return flights, concierge support, and group coordination.",
    accent: "#063A45",
  },
];

export default function StepTimeline() {
  return (
    <section className="py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-xs uppercase tracking-[0.2em] text-[#B8D963] font-semibold">Your Journey</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0E7C8C] mt-3" style={{ fontFamily: 'Playfair Display, serif' }}>
            How It Works
          </h2>
          <p className="mt-4 text-[#7A9BA8] max-w-lg mx-auto" style={{ fontFamily: 'Inter, sans-serif' }}>
            Three clear steps from assessment to travel — with full transparency at every stage.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {STEPS.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="group relative"
            >
              <div className="bg-white rounded-2xl p-8 lg:p-10 shadow-sm hover:shadow-xl transition-all duration-500 border border-[#B8D963]/5 h-full">
                {/* Step Number */}
                <div className="flex items-center justify-between mb-8">
                  <span className="text-5xl font-bold text-[#0E7C8C]/5" style={{ fontFamily: 'Playfair Display, serif' }}>
                    {step.num}
                  </span>
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300"
                    style={{ backgroundColor: `${step.accent}10` }}
                  >
                    <step.icon className="w-5 h-5" style={{ color: step.accent }} />
                  </div>
                </div>

                <h3 className="text-xl font-semibold text-[#0E7C8C] mb-3" style={{ fontFamily: 'Playfair Display, serif' }}>
                  {step.title}
                </h3>
                <p className="text-[#7A9BA8] text-sm leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>
                  {step.desc}
                </p>
              </div>

              {/* Connector line */}
              {i < STEPS.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-4 lg:-right-4 w-8 border-t-2 border-dashed border-[#B8D963]/20" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}