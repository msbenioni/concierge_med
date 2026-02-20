import React from "react";
import { motion } from "framer-motion";
import { Heart, Users, Shield, Compass } from "lucide-react";
import * as COLORS from "../../constants/colors";

export default function TrustSection() {
  return (
    <section className="py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center max-w-3xl mx-auto"
        >
          <span className="text-[11px] font-sans font-semibold uppercase tracking-[0.3em] mb-4 block" style={{ color: COLORS.ACCENT_PRIMARY }}>
            Founded by women who've been there
          </span>
          <h2 className="font-serif text-3xl md:text-4xl mb-6" style={{ color: COLORS.TEXT_PRIMARY }}>
            You do not need to do this alone anymore.
          </h2>
          <p className="text-lg mb-8" style={{ color: COLORS.TEXT_PRIMARY_ALPHA_70 }}>
            Compass Connect was founded by Jasmin and Angela, two businesswomen with full lives, competing priorities, and a shared experience of travelling overseas for surgery.
          </p>
          <p className="text-lg mb-8" style={{ color: COLORS.TEXT_PRIMARY_ALPHA_70 }}>
            On the outside, we were capable. Managing businesses. Managing families. Managing everything. On the inside, we were quietly carrying something heavier.
          </p>
          <p className="text-lg mb-8" style={{ color: COLORS.TEXT_PRIMARY_ALPHA_70 }}>
            We created Compass Connect because we genuinely care about making that journey different for others. So no one has to navigate it quietly. So no one feels like they are doing it alone.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex justify-center gap-8 mb-8"
        >
          <div className="text-center">
            <div className="w-16 h-16 rounded-full mx-auto mb-4 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
              <span className="text-white text-xl font-bold">J</span>
            </div>
            <h3 className="font-semibold text-lg" style={{ color: COLORS.TEXT_PRIMARY }}>Jasmin</h3>
            <p className="text-sm" style={{ color: COLORS.TEXT_PRIMARY_ALPHA_60 }}>Co-Founder</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 rounded-full mx-auto mb-4 bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center">
              <span className="text-white text-xl font-bold">A</span>
            </div>
            <h3 className="font-semibold text-lg" style={{ color: COLORS.TEXT_PRIMARY }}>Angela</h3>
            <p className="text-sm" style={{ color: COLORS.TEXT_PRIMARY_ALPHA_60 }}>Co-Founder</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center max-w-2xl mx-auto"
        >
          <p className="text-lg font-medium italic" style={{ color: COLORS.TEXT_PRIMARY_ALPHA_80 }}>
            This is not just coordination. It is compassion, structure, and continuity.
          </p>
        </motion.div>

        {/* Values Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16"
        >
          <div className="text-center">
            <div className="w-12 h-12 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ backgroundColor: COLORS.ACCENT_PRIMARY_ALPHA_20 }}>
              <Heart className="w-6 h-6" style={{ color: COLORS.ACCENT_PRIMARY }} />
            </div>
            <h3 className="font-semibold text-lg mb-2" style={{ color: COLORS.TEXT_PRIMARY }}>
              Empathy First
            </h3>
            <p className="text-sm" style={{ color: COLORS.TEXT_PRIMARY_ALPHA_70 }}>
              We've walked this path ourselves
            </p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ backgroundColor: COLORS.ACCENT_PRIMARY_ALPHA_20 }}>
              <Users className="w-6 h-6" style={{ color: COLORS.ACCENT_PRIMARY }} />
            </div>
            <h3 className="font-semibold text-lg mb-2" style={{ color: COLORS.TEXT_PRIMARY }}>
              Small Groups
            </h3>
            <p className="text-sm" style={{ color: COLORS.TEXT_PRIMARY_ALPHA_70 }}>
              Intimate, supportive environment
            </p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ backgroundColor: COLORS.ACCENT_PRIMARY_ALPHA_20 }}>
              <Shield className="w-6 h-6" style={{ color: COLORS.ACCENT_PRIMARY }} />
            </div>
            <h3 className="font-semibold text-lg mb-2" style={{ color: COLORS.TEXT_PRIMARY }}>
              Trauma-Informed
            </h3>
            <p className="text-sm" style={{ color: COLORS.TEXT_PRIMARY_ALPHA_70 }}>
              Safety and choice above all
            </p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ backgroundColor: COLORS.ACCENT_PRIMARY_ALPHA_20 }}>
              <Compass className="w-6 h-6" style={{ color: COLORS.ACCENT_PRIMARY }} />
            </div>
            <h3 className="font-semibold text-lg mb-2" style={{ color: COLORS.TEXT_PRIMARY }}>
              Clear Boundaries
            </h3>
            <p className="text-sm" style={{ color: COLORS.TEXT_PRIMARY_ALPHA_70 }}>
              Transparent roles and responsibilities
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
