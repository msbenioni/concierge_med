import React from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "../../utils";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { 
  BACKGROUND_PRIMARY, 
  BACKGROUND_SECONDARY,
  TEXT_PRIMARY, 
  ACCENT_PRIMARY, 
  TEXT_PRIMARY_ALPHA_60, 
  TEXT_PRIMARY_ALPHA_25, 
  ACCENT_PRIMARY_ALPHA_20, 
  GRADIENTS, 
  GLASS, 
  SHADOWS,
  COMPONENTS,
  BORDERS
} from "../../constants/colors";

export default function CTASection() {
  return (
    <section className="py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative rounded-3xl overflow-hidden"
          style={{ backgroundColor: BACKGROUND_SECONDARY }}
        >
          {/* Decorative */}
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" style={{ backgroundColor: ACCENT_PRIMARY_ALPHA_20 }} />
          <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" style={{ backgroundColor: COMPONENTS.STATUS_WARNING + '10' }} />

          <div className="relative z-10 p-10 sm:p-14 lg:p-20 text-center">
            <span className="text-xs uppercase tracking-[0.2em] font-semibold" style={{ color: ACCENT_PRIMARY }}>
              Begin Your Journey
            </span>
            <h2
              className="text-3xl sm:text-4xl lg:text-5xl font-bold mt-4 mb-6"
              style={{ fontFamily: 'Playfair Display, serif', color: TEXT_PRIMARY }}
            >
              Ready to take the{" "}
              <span className="italic" style={{ color: ACCENT_PRIMARY }}>first step?</span>
            </h2>
            <p className="max-w-lg mx-auto mb-10 text-lg" style={{ fontFamily: 'Inter, sans-serif', color: TEXT_PRIMARY_ALPHA_60 }}>
              Start with the hospital health questionnaire. It's free, confidential, and handled directly by the medical team.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to={createPageUrl("Booking")}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-semibold text-sm transition-all duration-300 shadow-xl"
                style={{ 
                  backgroundColor: COMPONENTS.STATUS_WARNING, 
                  color: '#0F1C2E',
                  boxShadow: SHADOWS.ACCENT_MEDIUM
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#b8953e';
                  e.target.style.boxShadow = SHADOWS.ACCENT_STRONG;
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = COMPONENTS.STATUS_WARNING;
                  e.target.style.boxShadow = SHADOWS.ACCENT_MEDIUM;
                }}
              >
                Start Health Questionnaire
                <ChevronRight className="w-4 h-4" />
              </Link>
              <Link
                to={createPageUrl("Trips")}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-semibold text-sm transition-all duration-300 border"
                style={{ 
                  backgroundColor: COMPONENTS.BUTTON_SECONDARY, 
                  color: TEXT_PRIMARY,
                  borderColor: BORDERS.TEXT_SUBTLE
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = COMPONENTS.BUTTON_HOVER;
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = COMPONENTS.BUTTON_SECONDARY;
                }}
              >
                View Group Trips
              </Link>
            </div>

            <p className="text-xs mt-8" style={{ fontFamily: 'Inter, sans-serif', color: TEXT_PRIMARY_ALPHA_25 }}>
              Non-medical concierge service • All surgery by licensed professionals
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}