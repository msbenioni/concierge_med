import React from "react";
import { motion } from "framer-motion";
import {
  Plane, HeartHandshake, MapPin, Phone, Smile,
  Stethoscope, Scissors, Brain, Clipboard, BadgeDollarSign
} from "lucide-react";

const WE_PROVIDE = [
  { icon: HeartHandshake, label: "Non-medical support" },
  { icon: Plane, label: "Group flights coordination" },
  { icon: MapPin, label: "On-the-ground concierge" },
  { icon: Phone, label: "Travel logistics" },
  { icon: Smile, label: "Emotional support" },
];

const HOSPITAL_PROVIDES = [
  { icon: Stethoscope, label: "Medical advice" },
  { icon: Scissors, label: "Surgery" },
  { icon: Brain, label: "Clinical decisions" },
  { icon: Clipboard, label: "Post-operative care" },
  { icon: BadgeDollarSign, label: "Medical pricing" },
];

function RoleColumn({ title, subtitle, items, accent }) {
  return (
    <div className="bg-white rounded-2xl p-8 lg:p-10 shadow-sm border border-[#B8D963]/5">
      <span className="text-xs uppercase tracking-[0.2em] font-semibold" style={{ color: accent }}>
        {subtitle}
      </span>
      <h3
        className="text-2xl font-bold text-[#0E7C8C] mt-2 mb-8"
        style={{ fontFamily: 'Playfair Display, serif' }}
      >
        {title}
      </h3>
      <div className="space-y-4">
        {items.map((item, i) => (
          <div key={i} className="flex items-center gap-4">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: `${accent}10` }}
            >
              <item.icon className="w-4 h-4" style={{ color: accent }} />
            </div>
            <span className="text-sm font-medium text-[#1E1E1E]" style={{ fontFamily: 'Inter, sans-serif' }}>
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function WhatWeDoSection() {
  return (
    <section className="py-24 lg:py-32 bg-[#F9F9F9]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-xs uppercase tracking-[0.2em] text-[#B8D963] font-semibold">Clear Boundaries</span>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0E7C8C] mt-3"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            What We Do & What the Hospital Does
          </h2>
          <p className="mt-4 text-[#7A9BA8] max-w-lg mx-auto" style={{ fontFamily: 'Inter, sans-serif' }}>
            A clear division of responsibilities ensures you receive the best care and support.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <RoleColumn
              title="Compass Connect Provides"
              subtitle="Concierge & Travel"
              items={WE_PROVIDE}
              accent="#1BA8B8"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <RoleColumn
              title="Hospital Provides"
              subtitle="Medical & Clinical"
              items={HOSPITAL_PROVIDES}
              accent="#B8D963"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}