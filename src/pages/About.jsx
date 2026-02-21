import React from "react";
import { motion } from "framer-motion";
import { Heart, Users, Globe, Shield, Compass } from "lucide-react";
import CTASection from "../components/compass-connect/CTASection";
import * as COLORS from "../constants/colors";

export default function About() {
  return (
    <div>
      {/* Hero Section */}
      <section className="pt-16 pb-8 lg:pt-24 lg:pb-12">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto text-center"
          >
            <span className="text-[11px] font-sans font-semibold uppercase tracking-[0.3em] mb-4 block" style={{ color: COLORS.ACCENT_PRIMARY }}>
              Our Story
            </span>
            <h1 className="font-serif text-4xl md:text-5xl mb-6" style={{ color: COLORS.TEXT_PRIMARY }}>
              You Don't Have to Do This Alone
            </h1>
            <p className="text-lg mb-4" style={{ color: COLORS.TEXT_PRIMARY_ALPHA_70 }}>
              Choosing surgery overseas is not a small decision. It often follows years of trying. Years of navigating waitlists or financial barriers. Years of carrying frustration, hope, and vulnerability. Too often, it is done quietly.
            </p>
            <p className="text-lg mb-4" style={{ color: COLORS.TEXT_PRIMARY_ALPHA_70 }}>
              Compass Connect was founded by two women who have travelled overseas for surgery ourselves. We understand the nerves. The research. The second-guessing. The courage it takes to say yes to change.
            </p>
            <p className="text-lg font-medium italic" style={{ color: COLORS.TEXT_PRIMARY_ALPHA_80 }}>
              You will know who you are travelling with. You will know what to expect. You will not be walking into the unknown by yourself.
            </p>
          </motion.div>
        </div>
      </section>

      {/* What Makes Us Different */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="font-serif text-3xl md:text-4xl mb-4" style={{ color: COLORS.TEXT_PRIMARY }}>
              What Makes Us Different
            </h2>
            <p className="text-lg" style={{ color: COLORS.TEXT_PRIMARY_ALPHA_70 }}>
              Most medical tourism services focus on bookings. We focus on people.
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full flex-shrink-0 mt-1" style={{ background: COLORS.ACCENT_PRIMARY }}></div>
                <div>
                  <h3 className="font-semibold mb-2" style={{ color: COLORS.TEXT_PRIMARY }}>A dedicated concierge team</h3>
                  <p style={{ color: COLORS.TEXT_PRIMARY_ALPHA_70 }}>From first enquiry through to your return home</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full flex-shrink-0 mt-1" style={{ background: COLORS.ACCENT_PRIMARY }}></div>
                <div>
                  <h3 className="font-semibold mb-2" style={{ color: COLORS.TEXT_PRIMARY }}>Small group journeys with intimate support</h3>
                  <p style={{ color: COLORS.TEXT_PRIMARY_ALPHA_70 }}>Supportive environment for sharing</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full flex-shrink-0 mt-1" style={{ background: COLORS.ACCENT_PRIMARY }}></div>
                <div>
                  <h3 className="font-semibold mb-2" style={{ color: COLORS.TEXT_PRIMARY }}>Pre-travel group sessions</h3>
                  <p style={{ color: COLORS.TEXT_PRIMARY_ALPHA_70 }}>So you feel prepared and connected</p>
                </div>
              </div>
            </div>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full flex-shrink-0 mt-1" style={{ background: COLORS.ACCENT_PRIMARY }}></div>
                <div>
                  <h3 className="font-semibold mb-2" style={{ color: COLORS.TEXT_PRIMARY }}>Daily non-medical check-ins while overseas</h3>
                  <p style={{ color: COLORS.TEXT_PRIMARY_ALPHA_70 }}>Regular support during your journey</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full flex-shrink-0 mt-1" style={{ background: COLORS.ACCENT_PRIMARY }}></div>
                <div>
                  <h3 className="font-semibold mb-2" style={{ color: COLORS.TEXT_PRIMARY }}>Structured, non-clinical group support after you return</h3>
                  <p style={{ color: COLORS.TEXT_PRIMARY_ALPHA_70 }}>Continued care and community connection</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full flex-shrink-0 mt-1" style={{ background: COLORS.ACCENT_PRIMARY }}></div>
                <div>
                  <h3 className="font-semibold mb-2" style={{ color: COLORS.TEXT_PRIMARY }}>Clear separation between medical care, travel logistics, and concierge support</h3>
                  <p style={{ color: COLORS.TEXT_PRIMARY_ALPHA_70 }}>We do not provide medical advice or treatment</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trauma-Informed Approach */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="font-serif text-3xl md:text-4xl mb-4" style={{ color: COLORS.TEXT_PRIMARY }}>
              A Trauma-Informed Approach
            </h2>
            <p className="text-lg" style={{ color: COLORS.TEXT_PRIMARY_ALPHA_70 }}>
              Major body change can activate old emotions, fears, and patterns. We understand that.
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <Heart className="w-6 h-6 flex-shrink-0 mt-1" style={{ color: COLORS.ACCENT_PRIMARY }}></Heart>
                <div>
                  <h3 className="font-semibold mb-2" style={{ color: COLORS.TEXT_PRIMARY }}>We prioritise safety and informed choice</h3>
                  <p style={{ color: COLORS.TEXT_PRIMARY_ALPHA_70 }}>Your comfort and autonomy come first</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Shield className="w-6 h-6 flex-shrink-0 mt-1" style={{ color: COLORS.ACCENT_PRIMARY }}></Shield>
                <div>
                  <h3 className="font-semibold mb-2" style={{ color: COLORS.TEXT_PRIMARY }}>We move without pressure or shame</h3>
                  <p style={{ color: COLORS.TEXT_PRIMARY_ALPHA_70 }}>No judgment, only support</p>
                </div>
              </div>
            </div>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <Users className="w-6 h-6 flex-shrink-0 mt-1" style={{ color: COLORS.ACCENT_PRIMARY }}></Users>
                <div>
                  <h3 className="font-semibold mb-2" style={{ color: COLORS.TEXT_PRIMARY }}>We respect personal history and vulnerability</h3>
                  <p style={{ color: COLORS.TEXT_PRIMARY_ALPHA_70 }}>Your story matters and is honored</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Compass className="w-6 h-6 flex-shrink-0 mt-1" style={{ color: COLORS.ACCENT_PRIMARY }}></Compass>
                <div>
                  <h3 className="font-semibold mb-2" style={{ color: COLORS.TEXT_PRIMARY }}>We are clear about what we do and what we do not do</h3>
                  <p style={{ color: COLORS.TEXT_PRIMARY_ALPHA_70 }}>Transparent boundaries and expectations</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-12 text-center max-w-3xl mx-auto">
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
              <p className="text-sm font-medium" style={{ color: COLORS.TEXT_PRIMARY }}>
                <strong>Important:</strong> We are not medical providers. We do not interpret medical results or override clinical guidance. All medical responsibility remains with your chosen hospital and surgeon. Our responsibility is to ensure you feel supported, connected, and clearly informed throughout the journey.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Vision */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="font-serif text-3xl md:text-4xl mb-6" style={{ color: COLORS.TEXT_PRIMARY }}>
              Our Vision
            </h2>
            <p className="text-lg mb-8" style={{ color: COLORS.TEXT_PRIMARY_ALPHA_70 }}>
              To redefine medical travel as ethical, connected, and human. To remove isolation from a life-changing decision. To build small, intentional group journeys where safety, transparency, and community matter more than volume.
            </p>
            <p className="text-lg font-medium italic" style={{ color: COLORS.TEXT_PRIMARY_ALPHA_80 }}>
              Compass Connect is not about rushing people through a process. It is about guiding them through it well.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto text-center"
          >
            <span className="text-[11px] font-sans font-semibold uppercase tracking-[0.3em] mb-4 block" style={{ color: COLORS.ACCENT_PRIMARY }}>
              Founded by Women Who've Been There
            </span>
            <h2 className="font-serif text-3xl md:text-4xl mb-6" style={{ color: COLORS.TEXT_PRIMARY }}>
              Jasmin & Angela's Journey
            </h2>
            <p className="text-lg mb-8" style={{ color: COLORS.TEXT_PRIMARY_ALPHA_70 }}>
              Compass Connect was founded by Jasmin and Angela, two businesswomen with full lives, competing priorities, and a shared experience of travelling overseas for surgery.
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
            <div>
              <p className="text-lg mb-6" style={{ color: COLORS.TEXT_PRIMARY_ALPHA_70 }}>
                On the outside, we were capable. Managing businesses. Managing families. Managing everything.
              </p>
              <p className="text-lg mb-6" style={{ color: COLORS.TEXT_PRIMARY_ALPHA_70 }}>
                On the inside, we were quietly carrying something heavier. The frustration with our bodies. The exhaustion of trying. The late nights researching hospitals and surgeons. The spreadsheets. The quotes. The fear of getting it wrong. And the loneliness.
              </p>
              <p className="text-lg mb-6" style={{ color: COLORS.TEXT_PRIMARY_ALPHA_70 }}>
                We created Compass Connect because we genuinely care about making that journey different for others. So no one has to navigate it quietly. So no one feels like they are doing it alone.
              </p>
              <p className="text-lg font-medium italic" style={{ color: COLORS.TEXT_PRIMARY_ALPHA_80 }}>
                This is not just coordination. It is compassion, structure, and continuity.
              </p>
            </div>
            
            <div className="flex justify-center gap-12">
              <div className="text-center space-y-4">
                <div className="w-32 h-36 rounded-full mx-auto overflow-hidden border-2" style={{ borderColor: COLORS.ACCENT_PRIMARY_ALPHA_30 }}>
                  <img 
                    src="/jasmin.webp" 
                    alt="Jasmin Benioni - Co-Founder" 
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextElementSibling.style.display = 'flex';
                    }}
                  />
                  <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center" style={{ display: 'none' }}>
                    <span className="text-white text-3xl font-bold">J</span>
                  </div>
                </div>
                <h3 className="font-semibold text-xl" style={{ color: COLORS.TEXT_PRIMARY }}>Jasmin Benioni</h3>
                <p className="text-sm" style={{ color: COLORS.TEXT_PRIMARY_ALPHA_60 }}>Co-Founder</p>
              </div>
              <div className="text-center space-y-4">
                <div className="w-32 h-36 rounded-full mx-auto overflow-hidden border-2" style={{ borderColor: COLORS.ACCENT_PRIMARY_ALPHA_30 }}>
                  <img 
                    src="/angela.webp" 
                    alt="Angela Malakai - Co-Founder" 
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextElementSibling.style.display = 'flex';
                    }}
                  />
                  <div className="w-full h-full bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center" style={{ display: 'none' }}>
                    <span className="text-white text-3xl font-bold">Angela Malakai</span>
                  </div>
                </div>
                <h3 className="font-semibold text-xl" style={{ color: COLORS.TEXT_PRIMARY }}>Angela Malakai</h3>
                <p className="text-sm" style={{ color: COLORS.TEXT_PRIMARY_ALPHA_60 }}>Co-Founder</p>
              </div>
            </div>
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center max-w-3xl mx-auto mt-12"
          >
            <p className="text-2xl font-serif font-semibold" style={{ color: COLORS.ACCENT_PRIMARY }}>
              You do not need to do this alone anymore.
            </p>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <CTASection />
    </div>
  );
}
