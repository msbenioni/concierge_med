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

const services = [
  { title: "Flights Coordination", desc: "Premium group flights with meticulous booking support with our travel partner.", icon: Plane, featured: true },
  { title: "Accommodation", desc: "Vetted stays near your partner clinic with comfort in mind.", icon: Building2 },
  { title: "Private Transfers", desc: "Seamless pickup and drop-off.", icon: Car },
  { title: "Emotional Support", desc: "A dedicated companion throughout your travel experience.", icon: HeartHandshake },
  { title: "Dining", desc: "Meals coordinated to suit dietary requirements and comfort.", icon: Utensils },
  { title: "Elite Concierge", desc: "24/7 on-the-ground support from arrival to departure.", icon: ShieldCheck, featured: true },
];

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const item = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

export default function TripHighlights() {
  return (
    <section className="bg-white py-16 rounded-3xl">
      <div className="mx-auto max-w-6xl px-6">
        {/* Split layout */}
        <div className="grid gap-6 lg:grid-cols-12">
          {/* Cards */}
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
            className="lg:col-span-7 grid gap-4 sm:grid-cols-2"
          >
            {services.map((s) => (
              <motion.div
                key={s.title}
                variants={item}
                whileHover={{ y: -4 }}
                className={[
                  "relative overflow-hidden rounded-2xl p-6",
                  "bg-[rgba(243,239,232,0.78)] border border-[rgba(184,146,58,0.18)]",
                  "shadow-[0_14px_28px_rgba(44,38,35,0.12)] backdrop-blur-[10px]",
                  "transition",
                  s.featured
                    ? "sm:col-span-2"
                    : "",
                ].join(" ")}
              >
                {/* subtle gleam (featured only) */}
                {s.featured && (
                  <div className="pointer-events-none absolute -top-24 -right-24 h-56 w-56 rounded-full
                                  bg-[radial-gradient(circle,rgba(255,244,214,0.55)_0%,rgba(243,227,184,0.18)_45%,rgba(243,239,232,0)_70%)]" />
                )}

                <div className="flex items-start gap-4">
                  <div className="grid h-11 w-11 place-items-center rounded-xl
                                  bg-[linear-gradient(135deg,#FFF4D6_0%,#F3E3B8_18%,#E4C978_42%,#C79A3A_70%,#8C651E_100%)]
                                  border border-[rgba(140,101,30,0.22)]
                                  shadow-[0_10px_24px_rgba(199,154,58,0.18)]">
                    <s.icon className="h-5 w-5 text-[#2C2623]" />
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-[#2C2623]">{s.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-[rgba(44,38,35,0.75)]">
                      {s.desc}
                    </p>
                  </div>
                </div>

                {/* hover sheen */}
                <div className="pointer-events-none absolute inset-0 opacity-0 hover:opacity-100 transition duration-300
                                bg-[linear-gradient(135deg,rgba(255,255,255,0.35)_0%,rgba(255,255,255,0.10)_30%,rgba(255,255,255,0)_60%)]" />
              </motion.div>
            ))}
          </motion.div>

          {/* Image panel */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5 relative overflow-hidden rounded-3xl min-h-[420px] lg:min-h-[520px]"
          >
            <div
              className="absolute inset-0 bg-center bg-cover scale-[1.03]
                         [filter:saturate(.75)_contrast(1.02)_brightness(.98)]"
              style={{ backgroundImage: `url(/transfers.png)` }}
            />
            {/* overlay */}
            <div className="absolute inset-0
                            bg-[linear-gradient(to_bottom,rgba(44,38,35,0.38),rgba(44,38,35,0.20),rgba(44,38,35,0.45))]" />

            {/* little label card */}
            <div className="absolute bottom-5 left-5 right-5 rounded-2xl p-5
                            bg-[rgba(243,239,232,0.78)] border border-[rgba(184,146,58,0.20)]
                            backdrop-blur-[10px] shadow-[0_14px_28px_rgba(44,38,35,0.16)]">
              <p className="text-xs tracking-[0.18em] uppercase text-[#C79A3A]">
                Comfort-first logistics
              </p>
              <p className="mt-2 text-sm text-[rgba(44,38,35,0.78)]">
                A calm, supported journey — designed around your needs from departure to return.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
