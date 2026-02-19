import React from "react";
import { motion } from "framer-motion";
import { Heart, Users, Globe, Shield, Compass, Star, Plane, MapPin, Calendar, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";
import CTASection from "../components/compass-connect/CTASection";
import * as COLORS from "../constants/colors";

const VALUES = [
  {
    icon: Shield,
    title: "Structured Support",
    description: "Clear processes and organized journey management"
  },
  {
    icon: Heart,
    title: "Emotional Safety",
    description: "Understanding the vulnerability of transformation"
  },
  {
    icon: Users,
    title: "Group Connection",
    description: "Never feeling alone on your journey"
  },
  {
    icon: Globe,
    title: "Trusted Hospitals",
    description: "Only recommending places we'd go ourselves"
  }
];

export default function About() {
  return (
    <div>
      {/* Hero */}
      <section className="pt-16 pb-8 lg:pt-24 lg:pb-12">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <span className="text-xs uppercase tracking-[0.2em] font-semibold mb-4 block" style={{ color: COLORS.ACCENT_PRIMARY }}>
              Our Story
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6" style={{ fontFamily: 'font-serif', color: COLORS.TEXT_PRIMARY }}>
              Built by Women Who've Walked the Journey
            </h1>
            <p className="max-w-3xl mx-auto text-lg" style={{ fontFamily: 'Inter, sans-serif', color: COLORS.TEXT_PRIMARY_ALPHA_70 }}>
              Compass Connect was founded by two women who understand medical travel not as a concept — but as lived experience.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto"
          >
            <div className="space-y-2 mb-8">
              <p className="text-lg font-medium font-serif" style={{ color: COLORS.TEXT_PRIMARY }}>
                We are not medical professionals.
              </p>
              <p className="text-lg font-medium font-serif" style={{ color: COLORS.TEXT_PRIMARY }}>
                We are not surgeons.
              </p>
              <p className="text-lg font-medium font-serif" style={{ color: COLORS.TEXT_PRIMARY }}>
                We are not here to provide clinical advice.
              </p>
            </div>
            
            <p className="text-xl font-medium mb-3 font-serif" style={{ color: COLORS.TEXT_PRIMARY }}>
              We are patients who have walked this path — and built the support system we wish we had.
            </p>

            {/* Hero Image */}
            <div className="relative rounded-2xl overflow-hidden mb-8" style={{ height: '400px' }}>
              <img 
                src="/friends.png" 
                alt="Women supporting each other on a journey"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, transparent, rgba(0,0,0,0.3))' }} />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Jasmin's Journey */}
      <section className="py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <span className="text-xs uppercase tracking-[0.2em] font-semibold mb-4 block" style={{ color: COLORS.ACCENT_PRIMARY }}>
              Founder Stories
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6" style={{ fontFamily: 'font-serif', color: COLORS.TEXT_PRIMARY }}>
              Jasmin's Journey
            </h2>
          </motion.div>
            
          <div className="max-w-3xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start mb-8">
              <div className="space-y-6 font-serif" style={{ color: COLORS.TEXT_PRIMARY_ALPHA_70 }}>
                <p className="text-lg">
                  In February 2025, Jasmin travelled to Mexico for bariatric surgery with Mexico Bariatric Center.
                </p>
                
                <p className="text-lg">
                  She travelled with her partner — but not with a group.
                </p>
                
                <p className="text-lg font-medium font-serif">
                  And even though she wasn't physically alone, she felt it.
                </p>
                
                <p className="text-lg">
                  There was endless research. So much reading. So many unknowns.
                </p>
                
                <p className="text-lg">
                  She worried about getting stuck at the Mexico or U.S. border, missing something important, being too far from home and her children, making the wrong decision.
                </p>
                
                <p className="text-lg font-medium font-serif">
                  The fear wasn't about the surgery itself. It was about the unknown.
                </p>
                
                <p className="text-lg">
                  There was no one to ask. No one she trusted. Online forums felt unreliable.
                </p>
                
                <p className="text-lg font-semibold">
                  She wished she had travelled with a group — not just for logistics, but for understanding.
                </p>
              </div>
              
              <div className="space-y-4">
                {/* Jasmin's Photo */}
                <div className="rounded-2xl overflow-hidden" style={{ height: '450px' }}>
                  <img 
                    src="/jasmin.png" 
                    alt="Portrait of Jasmin"
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {/* Results Card */}
                <div className="p-6 rounded-2xl" style={{ backgroundColor: COLORS.COMPONENTS.CARD_BACKGROUND, border: `1px solid ${COLORS.COMPONENTS.CARD_BORDER}` }}>
                  <h3 className="text-xl font-bold mb-3" style={{ fontFamily: 'font-serif', color: COLORS.TEXT_PRIMARY }}>One Year Later:</h3>
                  <ul className="space-y-2 text-sm" style={{ color: COLORS.TEXT_PRIMARY_ALPHA_70 }}>
                    <li className="flex items-center gap-2">
                      <Star className="w-4 h-4" style={{ color: COLORS.ACCENT_PRIMARY }} />
                      30kg lost
                    </li>
                    <li className="flex items-center gap-2">
                      <Star className="w-4 h-4" style={{ color: COLORS.ACCENT_PRIMARY }} />
                      Type 2 diabetes reversed
                    </li>
                    <li className="flex items-center gap-2">
                      <Star className="w-4 h-4" style={{ color: COLORS.ACCENT_PRIMARY }} />
                      Liver issues resolved
                    </li>
                    <li className="flex items-center gap-2">
                      <Star className="w-4 h-4" style={{ color: COLORS.ACCENT_PRIMARY }} />
                      Size 22 to 12/14
                    </li>
                    <li className="flex items-center gap-2">
                      <Star className="w-4 h-4" style={{ color: COLORS.ACCENT_PRIMARY }} />
                      Health restored, confidence regained
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            
            <p className="text-lg font-medium font-serif" style={{ color: COLORS.TEXT_PRIMARY }}>
              But the emotional gaps she felt along the way never left her.
            </p>
          </div>
        </div>
      </section>

      {/* Angela's Journey */}
      <section className="py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6" style={{ fontFamily: 'font-serif', color: COLORS.TEXT_PRIMARY }}>
              Angela's Journey
            </h2>
          </motion.div>
          
          <div className="max-w-3xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start mb-8">
              <div className="space-y-6 font-serif" style={{ color: COLORS.TEXT_PRIMARY_ALPHA_70 }}>
                <p className="text-lg">
                  Angela had bariatric surgery in Australia.
                </p>
                
                <p className="text-lg">
                  Although her experience was different geographically, the emotional thread was the same:
                </p>
                
                <p className="text-lg font-medium font-serif">
                  There was no structured, consistent mental support.
                </p>
                
                <p className="text-lg">
                  Patients are often left to navigate fear, hormonal changes, identity shifts, post-surgery emotions, and social adjustment. Alone.
                </p>
                
                <p className="text-lg font-medium font-serif">
                  Angela brings something powerful to Compass Connect: She is a trauma coach.
                </p>
                
                <p className="text-lg font-serif">
                  She understands the mindset shifts required before and after surgery. She understands emotional regulation. She understands the vulnerability of transformation.
                </p>
              </div>
              
              <div className="space-y-4">
                {/* Angela's Photo */}
                <div className="rounded-2xl overflow-hidden" style={{ height: '450px' }}>
                  <img 
                    src="/angela.webp" 
                    alt="Portrait of Angela"
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {/* Trauma Coach Card */}
                <div className="p-6 rounded-2xl" style={{ backgroundColor: COLORS.COMPONENTS.CARD_BACKGROUND, border: `1px solid ${COLORS.COMPONENTS.CARD_BORDER}` }}>
                  <div className="flex items-center gap-3 mb-3">
                    <Heart className="w-6 h-6" style={{ color: COLORS.ACCENT_PRIMARY }} />
                    <h3 className="text-xl font-bold" style={{ fontFamily: 'font-serif', color: COLORS.TEXT_PRIMARY }}>Trauma-Informed Support</h3>
                  </div>
                  <p className="text-sm" style={{ color: COLORS.TEXT_PRIMARY_ALPHA_70 }}>
                    Angela brings deep emotional understanding and trauma-informed coaching to help patients navigate the psychological aspects of their transformation journey.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How Compass Connect Was Born */}
      <section className="py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6" style={{ fontFamily: 'font-serif', color: COLORS.TEXT_PRIMARY }}>
              How Compass Connect Was Born
            </h2>
          </motion.div>
          
          <div className="max-w-3xl mx-auto">
            {/* Meeting Image */}
            <div className="rounded-2xl overflow-hidden mb-8" style={{ height: '500px' }}>
              <img 
                src="/womens_business_meeting.png" 
                alt="Women meeting in professional setting"
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="space-y-6 font-serif" style={{ color: COLORS.TEXT_PRIMARY_ALPHA_70 }}>
              <p className="text-lg">
                The two founders met at a women's business networking group.
              </p>
              
              <p className="text-lg">
                On just their second meeting, they discovered they had both undergone bariatric surgery.
              </p>
              
              <p className="text-lg font-medium">
                Different journeys. Different countries. Same emotional gap.
              </p>
              
              <p className="text-lg">
                They realised: The hospital handles the surgery. But no one truly walks beside the patient.
              </p>
              
              <p className="text-lg font-semibold">
                So they built what they both needed.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What Makes Compass Connect Different */}
      <section className="py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6" style={{ fontFamily: 'font-serif', color: COLORS.TEXT_PRIMARY }}>
              What Makes Compass Connect Different
            </h2>
          </motion.div>
          
          <div className="max-w-3xl mx-auto">
            <div className="p-6 rounded-2xl mb-8" style={{ backgroundColor: COLORS.COMPONENTS.CARD_BACKGROUND, border: `1px solid ${COLORS.COMPONENTS.CARD_BORDER}` }}>
              <p className="text-xl font-bold mb-4" style={{ fontFamily: 'font-serif', color: COLORS.TEXT_PRIMARY }}>
                Compass Connect is an independent, non-medical concierge service.
              </p>
              
              <div className="space-y-3 mb-6 font-serif">
                <p className="text-lg font-medium" style={{ color: COLORS.TEXT_PRIMARY }}>
                  We do not provide clinical advice.
                </p>
                <p className="text-lg font-medium" style={{ color: COLORS.TEXT_PRIMARY }}>
                  We do not access medical records.
                </p>
                <p className="text-lg font-medium" style={{ color: COLORS.TEXT_PRIMARY }}>
                  We do not replace surgeons.
                </p>
              </div>
              
              <p className="text-lg mb-4 font-serif">We:</p>
              
              <ul className="space-y-3 font-serif">
                <li className="flex items-start gap-3">
                  <Compass className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: COLORS.ACCENT_PRIMARY }} />
                  <span>Coordinate structured group travel for medically approved patients</span>
                </li>
                <li className="flex items-start gap-3">
                  <Compass className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: COLORS.ACCENT_PRIMARY }} />
                  <span>Travel with our groups</span>
                </li>
                <li className="flex items-start gap-3">
                  <Compass className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: COLORS.ACCENT_PRIMARY }} />
                  <span>Provide online pre-surgery support spaces</span>
                </li>
                <li className="flex items-start gap-3">
                  <Compass className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: COLORS.ACCENT_PRIMARY }} />
                  <span>Offer emotional reassurance during hotel and hospital stays</span>
                </li>
                <li className="flex items-start gap-3">
                  <Compass className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: COLORS.ACCENT_PRIMARY }} />
                  <span>Return home with our patients</span>
                </li>
                <li className="flex items-start gap-3">
                  <Compass className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: COLORS.ACCENT_PRIMARY }} />
                  <span>Provide continued mindset and emotional support for 3 months post-surgery</span>
                </li>
              </ul>
            </div>
            
            <div className="p-6 rounded-2xl text-center" style={{ backgroundColor: COLORS.COMPONENTS.CARD_BACKGROUND, border: `1px solid ${COLORS.COMPONENTS.CARD_BORDER}` }}>
              <p className="text-xl font-bold" style={{ fontFamily: 'font-serif', color: COLORS.TEXT_PRIMARY }}>
                Because the journey doesn't end at discharge.
              </p>
              <p className="text-lg font-medium mt-2" style={{ color: COLORS.ACCENT_PRIMARY }}>
                It begins there.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Promise */}
      <section className="py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6" style={{ fontFamily: 'font-serif', color: COLORS.TEXT_PRIMARY }}>
              Our Promise
            </h2>
          </motion.div>
          
          <div className="max-w-3xl mx-auto">
            <div className="space-y-6 font-serif" style={{ color: COLORS.TEXT_PRIMARY_ALPHA_70 }}>
              <p className="text-lg">
                We cannot remove every fear.
              </p>
              
              <p className="text-lg">
                But we can ensure you:
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
                {[
                  "Understand each stage",
                  "Feel supported before departure",
                  "Travel in a structured group", 
                  "Have someone present",
                  "Return home not alone",
                  "Receive post-surgery support"
                ].map((promise, i) => (
                  <div key={i} className="flex items-center gap-3 p-4 rounded-xl" style={{ backgroundColor: COLORS.COMPONENTS.CARD_BACKGROUND, border: `1px solid ${COLORS.COMPONENTS.CARD_BORDER}` }}>
                    <Heart className="w-5 h-5 flex-shrink-0" style={{ color: COLORS.ACCENT_PRIMARY }} />
                    <span className="text-sm font-medium">{promise}</span>
                  </div>
                ))}
              </div>
              
              <p className="text-xl font-bold text-center mt-8" style={{ fontFamily: 'font-serif', color: COLORS.TEXT_PRIMARY }}>
                Most importantly — we want you to feel safe.<br />
                Not just physically.<br />
                Emotionally.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* This Is Personal */}
      <section className="py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6" style={{ fontFamily: 'font-serif', color: COLORS.TEXT_PRIMARY }}>
              This Is Personal
            </h2>
          </motion.div>
          
          <div className="max-w-3xl mx-auto">
            {/* Personal Image */}
            <div className="rounded-2xl overflow-hidden mb-8" style={{ height: '400px' }}>
              <img 
                src="/helping_hands.png" 
                alt="Helping hands showing support and connection"
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="space-y-6 font-serif" style={{ color: COLORS.TEXT_PRIMARY_ALPHA_70 }}>
              <p className="text-lg">
                Compass Connect isn't just a business.
              </p>
              
              <p className="text-lg">
                It's built from the moments we wished someone had stood beside us and said:
              </p>
              
              <div className="p-8 rounded-2xl text-center my-8" style={{ backgroundColor: COLORS.COMPONENTS.CARD_BACKGROUND, border: `1px solid ${COLORS.COMPONENTS.CARD_BORDER}` }}>
                <p className="text-2xl font-serif font-semibold mb-4" style={{ color: COLORS.TEXT_PRIMARY }}>
                  "You're not alone in this."
                </p>
              </div>
              
              <p className="text-lg">
                Five years from now, we want Compass Connect to be known for one thing above all:
              </p>
              
              <p className="text-xl font-bold text-center mt-6" style={{ color: COLORS.ACCENT_PRIMARY }}>
                Caring for people to a high standard.
              </p>
            </div>
          </div>
        </div>
      </section>

      <CTASection />
    </div>
  );
}
