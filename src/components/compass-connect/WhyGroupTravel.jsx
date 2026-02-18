import React from "react";
import { motion } from "framer-motion";
import { Users, Heart, BadgeDollarSign, Shield } from "lucide-react";

const REASONS = [
  {
    icon: Users,
    title: "Shared Journey",
    desc: "Travel alongside others who understand what you're going through. You're never alone.",
  },
  {
    icon: Heart,
    title: "Emotional Reassurance",
    desc: "The comfort of having companions and a dedicated concierge by your side throughout the process.",
  },
  {
    icon: BadgeDollarSign,
    title: "Lower Travel Costs",
    desc: "Group coordination means reduced airfare costs, all included in your $3,500 NZD fee.",
  },
  {
    icon: Shield,
    title: "Structured Support",
    desc: "Organised logistics, airport transfers, and on-the-ground coordination from departure to return.",
  },
];

export default function WhyGroupTravel() {
  return (
    <section className="py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-xs uppercase tracking-[0.2em] text-[#FF8C42] font-semibold">Strength in Numbers</span>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0F1C2E] mt-3"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            Why Group Travel?
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {REASONS.map((r, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center group"
            >
              <div className="w-16 h-16 mx-auto rounded-2xl bg-[#0F1C2E] flex items-center justify-center mb-5 group-hover:bg-[#1F4E5F] transition-colors duration-300 shadow-lg shadow-[#0F1C2E]/10">
                <r.icon className="w-6 h-6 text-[#FF8C42]" />
              </div>
              <h3 className="text-lg font-bold text-[#0F1C2E] mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>
                {r.title}
              </h3>
              <p className="text-sm text-[#7C848E] leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>
                {r.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}