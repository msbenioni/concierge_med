import React from "react";
import { motion } from "framer-motion";
import { Plane, Users, Shield, Heart } from "lucide-react";
import { 
  BACKGROUND_PRIMARY, 
  TEXT_PRIMARY, 
  ACCENT_PRIMARY, 
  TEXT_PRIMARY_ALPHA_70, 
  TEXT_PRIMARY_ALPHA_50, 
  ACCENT_PRIMARY_ALPHA_20, 
  GRADIENTS, 
  GLASS, 
  SHADOWS,
  COMPONENTS
} from "../../constants/colors";

const SERVICES = [
  {
    icon: Plane,
    title: "Travel Coordination",
    desc: "We handle all flight bookings, airport transfers, and accommodation logistics for your group journey.",
  },
  {
    icon: Users,
    title: "Group Support",
    desc: "Travel with others on similar journeys. Share experiences and provide mutual support throughout the process.",
  },
  {
    icon: Shield,
    title: "Non-Medical Care",
    desc: "We provide emotional support, companionship, and coordination while medical care is handled by partner hospitals.",
  },
  {
    icon: Heart,
    title: "Personal Concierge",
    desc: "Dedicated support throughout your journey, from pre-trip planning to post-travel follow-up and recovery.",
  },
];

export default function WhatWeDoSection() {
  return (
    <section className="py-20 lg:py-24" style={{ backgroundColor: BACKGROUND_PRIMARY }}>
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-xs uppercase tracking-[0.2em] font-semibold mb-4 block" style={{ color: ACCENT_PRIMARY }}>
            Our Services
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4" style={{ fontFamily: 'Playfair Display, serif', color: TEXT_PRIMARY }}>
            What We Do
          </h2>
          <p className="text-lg max-w-2xl mx-auto" style={{ fontFamily: 'Inter, sans-serif', color: TEXT_PRIMARY_ALPHA_70 }}>
            We coordinate all travel logistics and provide non-medical support while our partner hospitals handle your medical care.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {SERVICES.map((service, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center"
            >
              <div className="w-16 h-16 mx-auto rounded-2xl flex items-center justify-center mb-6" style={{ backgroundColor: ACCENT_PRIMARY_ALPHA_20 }}>
                <service.icon className="w-8 h-8" style={{ color: ACCENT_PRIMARY }} />
              </div>
              <h3 className="text-xl font-semibold mb-3" style={{ fontFamily: 'Playfair Display, serif', color: TEXT_PRIMARY }}>
                {service.title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ fontFamily: 'Inter, sans-serif', color: TEXT_PRIMARY_ALPHA_70 }}>
                {service.desc}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-16 text-center"
        >
          <div className="rounded-2xl p-8" style={{ backgroundColor: GLASS.CARD_BACKGROUND, border: `1px solid ${ACCENT_PRIMARY_ALPHA_20}` }}>
            <h3 className="text-2xl font-semibold mb-4" style={{ fontFamily: 'Playfair Display, serif', color: TEXT_PRIMARY }}>
              Clear Boundaries, Complete Support
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
              <div>
                <h4 className="font-semibold mb-2" style={{ color: ACCENT_PRIMARY }}>What We Provide</h4>
                <ul className="space-y-2 text-sm" style={{ color: TEXT_PRIMARY_ALPHA_70 }}>
                  <li>• Group flight coordination</li>
                  <li>• Airport transfers</li>
                  <li>• Accommodation logistics</li>
                  <li>• On-the-ground concierge support</li>
                  <li>• Emotional companionship</li>
                  <li>• Travel planning assistance</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2" style={{ color: ACCENT_PRIMARY }}>What We Don't Provide</h4>
                <ul className="space-y-2 text-sm" style={{ color: TEXT_PRIMARY_ALPHA_70 }}>
                  <li>• Medical advice or assessments</li>
                  <li>• Surgical procedures</li>
                  <li>• Clinical care or treatment</li>
                  <li>• Medical aftercare</li>
                  <li>• Medical follow-up</li>
                  <li>• Healthcare decisions</li>
                </ul>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}