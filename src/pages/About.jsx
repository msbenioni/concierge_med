import React from "react";
import { motion } from "framer-motion";
import { Heart, Users, Globe, Shield, Compass, Star } from "lucide-react";
import { Link } from "react-router-dom";
import * as COLORS from "../constants/colors";

const VALUES = [
  {
    icon: Shield,
    title: "Structured",
    description: "Clear processes and organized journey management"
  },
  {
    icon: Heart,
    title: "Transparent",
    description: "Open communication and ethical boundaries"
  },
  {
    icon: Users,
    title: "Supported",
    description: "Guidance without overstepping medical boundaries"
  },
  {
    icon: Globe,
    title: "Experienced",
    description: "Built on real patient journey understanding"
  }
];

export default function About() {
  return (
    <div>
      {/* Hero */}
      <section className="pt-16 pb-8 lg:pt-24 lg:pb-12">
        <div className="max-w-3xl mx-auto px-5 sm:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <span className="text-[11px] font-sans font-semibold uppercase tracking-[0.3em] mb-4 block" style={{ color: COLORS.ACCENT_PRIMARY }}>
              Our Story
            </span>
            <h1 className="font-serif text-4xl md:text-5xl mb-4" style={{ color: COLORS.TEXT_PRIMARY }}>
              About Compass Connect
            </h1>
            <p className="text-lg" style={{ color: COLORS.TEXT_PRIMARY_ALPHA_70 }}>
              Founded by Experience. Built on Understanding.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-12 lg:py-20">
        <div className="max-w-3xl mx-auto px-5 sm:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="prose prose-lg max-w-none"
          >
            <p className="text-lg mb-6" style={{ color: COLORS.TEXT_PRIMARY_ALPHA_70 }}>
              Compass Connect was created by two women who understand the medical travel journey firsthand.
            </p>
            
            <div className="space-y-2 mb-8">
              <p className="text-lg font-medium" style={{ color: COLORS.TEXT_PRIMARY }}>
                We are not medical providers.
              </p>
              <p className="text-lg font-medium" style={{ color: COLORS.TEXT_PRIMARY }}>
                We are not surgeons.
              </p>
              <p className="text-lg font-medium" style={{ color: COLORS.TEXT_PRIMARY }}>
                We are not advisors on clinical care.
              </p>
            </div>
            
            <p className="text-lg font-semibold mb-4" style={{ color: COLORS.TEXT_PRIMARY }}>
              We are patients who have walked the path — and built a structured way to support others doing the same.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-12 lg:py-20">
        <div className="max-w-3xl mx-auto px-5 sm:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-serif text-3xl md:text-4xl mb-8" style={{ color: COLORS.TEXT_PRIMARY }}>
              Our Story
            </h2>
            
            <div className="space-y-6" style={{ color: COLORS.TEXT_PRIMARY_ALPHA_70 }}>
              <p className="text-lg">
                Both founders of Compass Connect have undergone bariatric surgery ourselves.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
                <div className="p-6 rounded-2xl" style={{ backgroundColor: COLORS.ACCENT_PRIMARY_ALPHA_10, border: `1px solid ${COLORS.ACCENT_PRIMARY_ALPHA_20}` }}>
                  <h3 className="font-semibold text-lg mb-2" style={{ color: COLORS.TEXT_PRIMARY }}>Angela</h3>
                  <p className="text-sm">TBC</p>
                </div>
                <div className="p-6 rounded-2xl" style={{ backgroundColor: COLORS.ACCENT_PRIMARY_ALPHA_10, border: `1px solid ${COLORS.ACCENT_PRIMARY_ALPHA_20}` }}>
                  <h3 className="font-semibold text-lg mb-2" style={{ color: COLORS.TEXT_PRIMARY }}>Jasmin</h3>
                  <p className="text-sm">TBC</p>
                </div>
              </div>
              
              <p className="text-lg font-semibold mb-4">We know what it feels like to:</p>
              
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <Star className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: COLORS.ACCENT_PRIMARY }} />
                  <span>Research hospitals late at night</span>
                </li>
                <li className="flex items-start gap-3">
                  <Star className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: COLORS.ACCENT_PRIMARY }} />
                  <span>Compare surgeons and outcomes</span>
                </li>
                <li className="flex items-start gap-3">
                  <Star className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: COLORS.ACCENT_PRIMARY }} />
                  <span>Worry about travelling overseas</span>
                </li>
                <li className="flex items-start gap-3">
                  <Star className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: COLORS.ACCENT_PRIMARY }} />
                  <span>Navigate quotes, flights, and logistics</span>
                </li>
                <li className="flex items-start gap-3">
                  <Star className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: COLORS.ACCENT_PRIMARY }} />
                  <span>Feel excited and nervous at the same time</span>
                </li>
              </ul>
              
              <p className="text-lg font-semibold mt-8">We also know the relief of having clarity.</p>
              <p className="text-lg font-medium">Compass Connect was built to provide that clarity.</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Why We Created */}
      <section className="py-12 lg:py-20">
        <div className="max-w-3xl mx-auto px-5 sm:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-serif text-3xl md:text-4xl mb-8" style={{ color: COLORS.TEXT_PRIMARY }}>
              Why We Created Compass Connect
            </h2>
            
            <div className="space-y-6" style={{ color: COLORS.TEXT_PRIMARY_ALPHA_70 }}>
              <p className="text-lg">
                When pursuing surgery abroad, patients often face two separate worlds:
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
                <div className="p-6 rounded-2xl" style={{ backgroundColor: COLORS.GLASS.CARD_BACKGROUND, border: `1px solid ${COLORS.BORDERS.ACCENT_SUBTLE}` }}>
                  <h3 className="font-semibold text-lg mb-3" style={{ color: COLORS.TEXT_PRIMARY }}>The Medical Side</h3>
                  <ul className="space-y-2 text-sm">
                    <li>• Hospital</li>
                    <li>• Surgeon</li>
                    <li>• Assessment</li>
                  </ul>
                </div>
                <div className="p-6 rounded-2xl" style={{ backgroundColor: COLORS.GLASS.CARD_BACKGROUND, border: `1px solid ${COLORS.BORDERS.ACCENT_SUBTLE}` }}>
                  <h3 className="font-semibold text-lg mb-3" style={{ color: COLORS.TEXT_PRIMARY }}>The Travel Side</h3>
                  <ul className="space-y-2 text-sm">
                    <li>• Flights</li>
                    <li>• Transfers</li>
                    <li>• Accommodation</li>
                    <li>• Group coordination</li>
                  </ul>
                </div>
              </div>
              
              <p className="text-lg">
                These worlds rarely speak the same language.
              </p>
              
              <p className="text-lg font-semibold">
                We created Compass Connect to sit in the middle — connecting patients to trusted, accredited hospitals while coordinating structured group travel for medically approved individuals.
              </p>
              
              <p className="text-lg font-medium mt-4">
                We are the bridge between assessment and departure.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* What We Do */}
      <section className="py-12 lg:py-20">
        <div className="max-w-3xl mx-auto px-5 sm:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-serif text-3xl md:text-4xl mb-8" style={{ color: COLORS.TEXT_PRIMARY }}>
              What We Do
            </h2>
            
            <div className="p-6 rounded-2xl mb-8" style={{ backgroundColor: COLORS.ACCENT_PRIMARY_ALPHA_10, border: `1px solid ${COLORS.ACCENT_PRIMARY_ALPHA_20}` }}>
              <p className="text-lg font-semibold mb-4" style={{ color: COLORS.TEXT_PRIMARY }}>
                Compass Connect is an independent, non-medical concierge service.
              </p>
              
              <p className="text-lg mb-4">We:</p>
              
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <Compass className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: COLORS.ACCENT_PRIMARY }} />
                  <span>Coordinate group travel for approved surgical patients</span>
                </li>
                <li className="flex items-start gap-3">
                  <Compass className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: COLORS.ACCENT_PRIMARY }} />
                  <span>Organise structured departure schedules</span>
                </li>
                <li className="flex items-start gap-3">
                  <Compass className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: COLORS.ACCENT_PRIMARY }} />
                  <span>Provide clear communication between travel stages</span>
                </li>
                <li className="flex items-start gap-3">
                  <Compass className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: COLORS.ACCENT_PRIMARY }} />
                  <span>Support patients in understanding next steps</span>
                </li>
                <li className="flex items-start gap-3">
                  <Compass className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: COLORS.ACCENT_PRIMARY }} />
                  <span>Ensure travel logistics are professionally managed</span>
                </li>
              </ul>
            </div>
            
            <div className="p-6 rounded-2xl" style={{ backgroundColor: COLORS.GLASS.CARD_BACKGROUND, border: `1px solid ${COLORS.BORDERS.ACCENT_SUBTLE}` }}>
              <p className="text-lg font-semibold mb-3" style={{ color: COLORS.TEXT_PRIMARY }}>
                All medical assessments, advice, and procedures are handled solely by licensed partner hospitals.
              </p>
              <p className="text-lg font-medium" style={{ color: COLORS.TEXT_PRIMARY }}>
                We never access or store medical records.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Why Lived Experience */}
      <section className="py-12 lg:py-20">
        <div className="max-w-3xl mx-auto px-5 sm:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-serif text-3xl md:text-4xl mb-8" style={{ color: COLORS.TEXT_PRIMARY }}>
              Why Lived Experience Matters
            </h2>
            
            <div className="space-y-6" style={{ color: COLORS.TEXT_PRIMARY_ALPHA_70 }}>
              <p className="text-lg">
                Having personally experienced bariatric surgery, we understand:
              </p>
              
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <Heart className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: COLORS.ACCENT_PRIMARY }} />
                  <span>The emotional weight of the decision</span>
                </li>
                <li className="flex items-start gap-3">
                  <Heart className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: COLORS.ACCENT_PRIMARY }} />
                  <span>The vulnerability of sharing health information</span>
                </li>
                <li className="flex items-start gap-3">
                  <Heart className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: COLORS.ACCENT_PRIMARY }} />
                  <span>The importance of structure and reassurance</span>
                </li>
                <li className="flex items-start gap-3">
                  <Heart className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: COLORS.ACCENT_PRIMARY }} />
                  <span>The comfort of travelling with others on the same journey</span>
                </li>
              </ul>
              
              <div className="p-6 rounded-2xl mt-8" style={{ backgroundColor: COLORS.ACCENT_PRIMARY_ALPHA_10, border: `1px solid ${COLORS.ACCENT_PRIMARY_ALPHA_20}` }}>
                <p className="text-lg font-medium" style={{ color: COLORS.TEXT_PRIMARY }}>
                  Compass Connect exists because we wanted a system like this when we were in your position.
                </p>
                <p className="text-lg mt-2 font-semibold" style={{ color: COLORS.TEXT_PRIMARY }}>
                  Not luxury.<br />
                  Not fluff.<br />
                  Just clarity, coordination, and continuity.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Our Commitment */}
      <section className="py-12 lg:py-20">
        <div className="max-w-3xl mx-auto px-5 sm:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-serif text-3xl md:text-4xl mb-8" style={{ color: COLORS.TEXT_PRIMARY }}>
              Our Commitment
            </h2>
            
            <p className="text-lg mb-8" style={{ color: COLORS.TEXT_PRIMARY_ALPHA_70 }}>
              We believe medical travel should feel:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {VALUES.map((value, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="p-6 rounded-2xl"
                  style={{ backgroundColor: COLORS.GLASS.CARD_BACKGROUND, border: `1px solid ${COLORS.BORDERS.ACCENT_SUBTLE}` }}
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: COLORS.ACCENT_PRIMARY }}>
                      <value.icon className="w-6 h-6" style={{ color: COLORS.COMPONENTS.BUTTON_PRIMARY_TEXT }} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2" style={{ color: COLORS.TEXT_PRIMARY }}>{value.title}</h3>
                      <p className="text-sm" style={{ color: COLORS.TEXT_PRIMARY_ALPHA_70 }}>{value.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <p className="text-lg font-medium" style={{ color: COLORS.TEXT_PRIMARY }}>
              We are here to guide you through the process — not to replace medical professionals, but to ensure your journey from assessment to departure is seamless.
            </p>
          </motion.div>
        </div>
      </section>

      {/* From Patients to Partners */}
      <section className="py-12 lg:py-20">
        <div className="max-w-3xl mx-auto px-5 sm:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-serif text-3xl md:text-4xl mb-8" style={{ color: COLORS.TEXT_PRIMARY }}>
              From Patients to Partners
            </h2>
            
            <div className="space-y-6" style={{ color: COLORS.TEXT_PRIMARY_ALPHA_70 }}>
              <p className="text-lg">
                Compass Connect is built on real experience, clear boundaries, and a genuine desire to support others making informed decisions about their health.
              </p>
              
              <p className="text-lg">
                We know this journey is personal.
              </p>
              
              <p className="text-lg font-semibold" style={{ color: COLORS.TEXT_PRIMARY }}>
                That's why we treat it with respect.
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
