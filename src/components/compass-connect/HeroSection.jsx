import React from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "../../utils";
import { motion } from "framer-motion";
import { ChevronRight, ArrowDown } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative min-h-[92vh] flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="/hospital_hero.png"
          alt="Modern medical facility"
          className="w-full h-full object-cover object-center scale-110"
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 py-24 lg:py-32 w-full">
        <div className="max-w-2xl ml-auto text-right">
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6"
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#B8D963]/15 border border-[#B8D963]/30 text-[#B8D963] text-xs font-semibold uppercase tracking-[0.15em]">
              NZ & AU Patients
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-[1.05] mb-6"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            International Surgery.{" "}
            <span className="italic text-[#B8D963]" style={{ whiteSpace: 'nowrap' }}>Personally Guided.</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-lg sm:text-xl text-white/70 leading-relaxed mb-10 text-right ml-auto"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            Independent medical tourism concierge for NZ & AU patients travelling overseas for bariatric and cosmetic surgery.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <div className="flex flex-col sm:flex-row gap-4 justify-end">
              <Link
                to={createPageUrl("Booking")}
                className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl bg-[#FF8C42] text-[#0F1C2E] font-semibold text-sm hover:bg-[#b8953e] transition-all duration-300 shadow-xl shadow-[#FF8C42]/25"
              >
                Start Hospital Health Questionnaire
                <ChevronRight className="w-4 h-4" />
              </Link>
              <Link
                to={createPageUrl("Trips")}
                className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl bg-white/10 text-white font-semibold text-sm hover:bg-white/20 transition-all duration-300 border border-white/20 backdrop-blur-sm"
              >
                View Upcoming Group Trips
              </Link>
            </div>
          </motion.div>

          {/* Trust Indicator */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="mt-8 text-xs text-white/35"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            Non-medical concierge service • All surgery by licensed professionals
          </motion.p>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 hidden lg:block"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <ArrowDown className="w-5 h-5 text-white/30" />
        </motion.div>
      </motion.div>
    </section>
  );
}