import React from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "../../utils";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";

export default function CTASection() {
  return (
    <section className="py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative rounded-3xl bg-[#0F1C2E] overflow-hidden"
        >
          {/* Decorative */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#1F4E5F]/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#FF8C42]/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

          <div className="relative z-10 p-10 sm:p-14 lg:p-20 text-center">
            <span className="text-xs uppercase tracking-[0.2em] text-[#B8D963] font-semibold">
              Begin Your Journey
            </span>
            <h2
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mt-4 mb-6"
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              Ready to take the{" "}
              <span className="italic text-[#B8D963]">first step?</span>
            </h2>
            <p className="text-white/60 max-w-lg mx-auto mb-10 text-lg" style={{ fontFamily: 'Inter, sans-serif' }}>
              Start with the hospital health questionnaire. It's free, confidential, and handled directly by the medical team.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to={createPageUrl("Booking")}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-[#FF8C42] text-[#0F1C2E] font-semibold text-sm hover:bg-[#b8953e] transition-all duration-300 shadow-xl shadow-[#FF8C42]/25"
              >
                Start Health Questionnaire
                <ChevronRight className="w-4 h-4" />
              </Link>
              <Link
                to={createPageUrl("Trips")}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-white/10 text-white font-semibold text-sm hover:bg-white/20 transition-all duration-300 border border-white/15"
              >
                View Group Trips
              </Link>
            </div>

            <p className="text-xs text-white/25 mt-8" style={{ fontFamily: 'Inter, sans-serif' }}>
              Non-medical concierge service • All surgery by licensed professionals
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}