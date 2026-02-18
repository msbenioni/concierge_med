import React from "react";
import { motion } from "framer-motion";
import { Plane, Building2, Car, HeartHandshake, Utensils, ShieldCheck } from "lucide-react";
import { 
  BACKGROUND_PRIMARY, 
  TEXT_PRIMARY, 
  ACCENT_PRIMARY, 
  TEXT_PRIMARY_ALPHA_60, 
  TEXT_PRIMARY_ALPHA_50, 
  TEXT_PRIMARY_ALPHA_10,
  ACCENT_PRIMARY_ALPHA_20, 
  ACCENT_PRIMARY_ALPHA_30,
  ACCENT_PRIMARY_ALPHA_10,
  GRADIENTS, 
  GLASS, 
  BORDERS 
} from "../../constants/colors";

const HIGHLIGHTS = [
  {
    icon: Plane,
    title: "Flights Coordination",
    description: "We arrange premium group flights and handle all booking logistics with meticulous attention to detail.",
  },
  {
    icon: Building2,
    title: "Luxury Accommodation",
    description: "Exclusive, vetted accommodation near your partner clinic with five-star amenities and comfort.",
  },
  {
    icon: Car,
    title: "Private Transfers",
    description: "Seamless pickup and drop-off with premium vehicles at every point of your journey.",
  },
  {
    icon: HeartHandshake,
    title: "Emotional Support",
    description: "A dedicated companion throughout your travel experience, providing unwavering support and care.",
  },
  {
    icon: Utensils,
    title: "Gourmet Dining",
    description: "We coordinate gourmet meals that accommodate your dietary requirements with exceptional culinary standards.",
  },
  {
    icon: ShieldCheck,
    title: "Elite Concierge",
    description: "24/7 on-the-ground concierge service from arrival to departure, every step of the way.",
  },
];

export default function TripHighlights() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
      {HIGHLIGHTS.map((item, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: i * 0.08 }}
          className="group rounded-3xl p-6 sm:p-8 hover:-translate-y-2 transition-all duration-500 min-h-[280px] flex flex-col"
          style={{ 
            backgroundColor: GLASS.CARD_BACKGROUND, 
            backdropFilter: 'blur(16px)',
            border: `1px solid ${BORDERS.ACCENT_SUBTLE}`
          }}
          onMouseEnter={(e) => {
            e.target.style.borderColor = BORDERS.ACCENT_MEDIUM;
          }}
          onMouseLeave={(e) => {
            e.target.style.borderColor = BORDERS.ACCENT_SUBTLE;
          }}
        >
          <div 
            className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-all duration-300 border flex-shrink-0"
            style={{ 
              background: `linear-gradient(135deg, ${ACCENT_PRIMARY_ALPHA_20}, ${ACCENT_PRIMARY_ALPHA_10})`,
              borderColor: BORDERS.ACCENT_SUBTLE
            }}
            onMouseEnter={(e) => {
              e.target.style.background = `linear-gradient(135deg, ${ACCENT_PRIMARY_ALPHA_30}, ${ACCENT_PRIMARY_ALPHA_20})`;
            }}
            onMouseLeave={(e) => {
              e.target.style.background = `linear-gradient(135deg, ${ACCENT_PRIMARY_ALPHA_20}, ${ACCENT_PRIMARY_ALPHA_10})`;
            }}
          >
            <item.icon className="w-6 h-6" style={{ color: ACCENT_PRIMARY }} />
          </div>
          <h3 
            className="font-serif text-xl mb-3 transition-colors duration-300"
            style={{ color: TEXT_PRIMARY }}
            onMouseEnter={(e) => e.target.style.color = ACCENT_PRIMARY}
            onMouseLeave={(e) => e.target.style.color = TEXT_PRIMARY}
          >
            {item.title}
          </h3>
          <p className="text-sm leading-relaxed flex-grow" style={{ color: TEXT_PRIMARY_ALPHA_60 }}>{item.description}</p>
        </motion.div>
      ))}
    </div>
  );
}
