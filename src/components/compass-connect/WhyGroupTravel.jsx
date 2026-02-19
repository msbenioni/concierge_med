import React from "react";
import { motion } from "framer-motion";
import { Users, Heart, BadgeDollarSign, Shield } from "lucide-react";
import { 
  BACKGROUND_PRIMARY, 
  BACKGROUND_SECONDARY,
  TEXT_PRIMARY, 
  ACCENT_PRIMARY, 
  TEXT_PRIMARY_ALPHA_50, 
  TEXT_PRIMARY_ALPHA_70,
  ACCENT_PRIMARY_ALPHA_20, 
  ACCENT_PRIMARY_ALPHA_30,
  GRADIENTS, 
  GLASS, 
  SHADOWS,
  COMPONENTS
} from "../../constants/colors";

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
    desc: "Group coordination means reduced airfare costs, all included in your concierge fee.",
  },
  {
    icon: Shield,
    title: "Structured Support",
    desc: "Organised logistics, airport transfers, and on-the-ground coordination from departure to return.",
  },
];

export default function WhyGroupTravel() {
  return (
    <section className="relative overflow-hidden min-h-[560px]">
      {/* Background image (desaturated) */}
      <div
        className="absolute inset-0 scale-[1.02] bg-center bg-cover
                   [filter:saturate(.72)_contrast(1.02)_brightness(.96)]"
        style={{ backgroundImage: `url(/group_travel.png)` }}
      />

      {/* Dark overlay gradient (guarantees readability) */}
      <div className="absolute inset-0 z-[1]
                      bg-[linear-gradient(to_bottom,rgba(44,38,35,0.72),rgba(44,38,35,0.45),rgba(44,38,35,0.78))]" />

      {/* Soft spotlight behind title/cards (adds spa glow) */}
      <div className="absolute inset-0 z-[2]
                      bg-[radial-gradient(circle_at_50%_55%,rgba(243,239,232,0.22)_0%,rgba(243,239,232,0.10)_35%,rgba(243,239,232,0)_70%)]" />

      {/* Content */}
      <div className="relative z-[3] max-w-7xl mx-auto px-6 pt-40 pb-16 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="text-[12px] tracking-[0.22em] uppercase text-[rgba(243,239,232,0.85)]">
            Strength in Numbers
          </p>

          <h2 className="mt-3 text-4xl md:text-5xl font-semibold text-[#F3EFE8]
                         [text-shadow:0_10px_30px_rgba(44,38,35,0.45)]">
            Why Group Travel?
          </h2>
        </motion.div>

        {/* Cards */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {REASONS.map((r, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ 
                delay: i * 0.15, 
                duration: 0.6,
                type: "spring",
                stiffness: 100
              }}
              whileHover={{ 
                y: -8,
                scale: 1.02,
                transition: { duration: 0.3, type: "spring", stiffness: 300 }
              }}
              className="rounded-2xl p-6
                         bg-[rgba(243,239,232,0.72)]
                         border border-[rgba(184,146,58,0.20)]
                         shadow-[0_14px_28px_rgba(44,38,35,0.18)]
                         backdrop-blur-[10px]
                         transition hover:-translate-y-[2px]
                         hover:shadow-[0_18px_36px_rgba(44,38,35,0.20)]
                         hover:border-[rgba(184,146,58,0.32)]"
            >
              <div className="mx-auto mb-3 grid h-11 w-11 place-items-center rounded-xl
                              bg-[linear-gradient(135deg,#FFF4D6_0%,#F3E3B8_18%,#E4C978_42%,#C79A3A_70%,#8C651E_100%)]
                              shadow-[0_10px_24px_rgba(199,154,58,0.18)]
                              border border-[rgba(140,101,30,0.22)]">
                <r.icon className="h-5 w-5 text-[#2C2623]" />
              </div>

              <h3 className="text-center font-semibold text-[#2C2623]">{r.title}</h3>
              <p className="mt-2 text-center text-sm leading-relaxed text-[rgba(44,38,35,0.78)]">
                {r.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}