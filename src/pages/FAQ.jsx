import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { createPageUrl } from "../utils";
import { TEXT_PRIMARY, TEXT_PRIMARY_ALPHA_50, TEXT_PRIMARY_ALPHA_70, COLORS } from "../constants/colors";

const FAQS = [
  {
    category: "Journey Process",
    questions: [
      {
        q: "What happens after I submit my Expression of Interest?",
        a: "After submitting your EOI, you'll receive the hospital health questionnaire link. Complete the medical assessment, receive your quote with hospital reference, then we coordinate your travel group and logistics. The entire process ensures medical approval before any travel arrangements."
      },
      {
        q: "How long does the medical assessment take?",
        a: "The hospital health questionnaire is typically reviewed within 2-5 business days. You'll receive your medical approval and quote directly from the hospital with a reference number."
      },
      {
        q: "When do travel groups depart?",
        a: "Travel groups depart based on predefined dates (e.g., March 15, April 12, May 10). We coordinate groups to ensure minimum 4 travelers for each departure. Your travel dates will be confirmed after medical approval."
      },
    ],
  },
  {
    category: "About Us",
    questions: [
      {
        q: "What exactly does Compass Connect do?",
        a: "Compass Connect is a non-medical travel concierge service. We coordinate group flights and provide on-the-ground concierge support for patients traveling overseas for surgery. This includes flights coordination, emotional companionship, and dietary/mobility assistance during travel. We do NOT arrange accommodation, transfers, or provide any medical care — those are handled entirely by the partner hospital."
      },
      {
        q: "What makes Compass Connect different from other medical tourism services?",
        a: "Most medical tourism services focus on bookings. We focus on people. With Compass Connect, you receive a dedicated concierge team from first enquiry through to your return home, small group journeys with intimate support, pre-travel group sessions so you feel prepared and connected, daily non-medical check-ins while overseas, and structured, non-clinical group support after you return."
      },
      {
        q: "Is Compass Connect only for women?",
        a: "While our lived experience began with supporting women, Compass Connect is open to anyone seeking ethical, well-supported medical travel. We welcome all individuals who are considering surgery overseas and want to feel supported throughout their journey."
      },
      {
        q: "What is a non-medical concierge?",
        a: "A non-medical concierge focuses exclusively on flights coordination and on-the-ground support. We arrange group flights, provide emotional companionship, and assist with dietary/mobility needs during travel. We never give medical advice, arrange accommodation, or handle transfers — those are managed by the partner hospital."
      },
      {
        q: "Do you provide medical advice or recommendations?",
        a: "No, absolutely not. We do not provide medical advice, diagnosis, treatment recommendations, or guarantee any medical outcomes. All medical consultations, decisions, and care are managed exclusively by partner hospitals and clinics."
      },
    ],
  },
  {
    category: "Group Travel",
    questions: [
      {
        q: "What is the minimum group size?",
        a: "All travel groups require a minimum of 4 travelers to proceed. This allows us to provide dedicated concierge support while keeping costs accessible. If the minimum isn't met, we'll work with you on alternative dates or offer a full refund of concierge fees."
      },
      {
        q: "Can I travel alone?",
        a: "Our service is designed for group travel groups. You'll book with a group of at least 4 travelers heading to the same destination. This isn't just for cost — the companionship and shared experience is a core part of what we offer."
      },
      {
        q: "Who are my travel companions?",
        a: "Your travel group consists of other individuals traveling to the same destination for their own procedures at partner hospitals. All travelers receive the same level of concierge support."
      },
    ],
  },
  {
    category: "Payments",
    questions: [
      {
        q: "What does the Compass Connect fee cover?",
        a: "Our concierge fee covers: flights coordination, on-the-ground concierge support, emotional companionship, and dietary/mobility assistance during travel. We do NOT cover accommodation, transfers, or any medical costs, procedures, or hospital fees - these are handled directly by the hospital."
      },
      {
        q: "How do I pay the hospital?",
        a: "Medical costs are paid directly to the partner hospital or clinic. We have no involvement in medical billing. The hospital will provide you with their own payment process and information."
      },
      {
        q: "How do I pay Compass Connect?",
        a: "After you receive medical approval and a hospital reference number, we'll coordinate your travel group. Once the group reaches the minimum 4 travelers, we'll send you a secure Stripe payment link for the concierge and travel services fee. Payment is only required after medical approval is confirmed."
      },
      {
        q: "What is your refund policy?",
        a: "If a travel group doesn't reach the minimum 4 travelers and must be cancelled, you'll receive a full refund of your concierge fee. For individual cancellations, please contact us as terms vary based on timing."
      },
    ],
  },
  {
    category: "Medical & Safety",
    questions: [
      {
        q: "What is the Expression of Interest process?",
        a: "The Expression of Interest (EOI) is our streamlined 4-step process: 1) Submit your interest, 2) Complete the hospital's health questionnaire, 3) Receive your quote with hospital reference, 4) We coordinate your travel logistics. This ensures medical approval before any travel arrangements are made."
      },
      {
        q: "What is the hospital health questionnaire?",
        a: "The hospital health questionnaire is the partner hospital's own medical intake form. We provide you with the secure link to complete it directly with the hospital. We do not process, review, or store any medical information from this form."
      },
      {
        q: "How do I get a hospital reference number?",
        a: "After completing the hospital health questionnaire and receiving medical approval, the hospital will provide you with a reference number (e.g., MBC-2024-0315). This reference is used to coordinate your travel arrangements with our concierge service."
      },
      {
        q: "Is it safe to travel for surgery?",
        a: "We cannot provide medical guidance on the safety of any procedure. That decision is between you and your medical professionals. What we can say is that we take great care in coordinating comfortable, well-organized travel logistics and providing supportive companionship."
      },
      {
        q: "What happens in a medical emergency?",
        a: "In case of a medical emergency, standard emergency services (ambulance, hospital) should be contacted immediately. Our on-the-ground concierge can assist with communication and logistics, but we are not medical providers and cannot provide medical assistance."
      },
    ],
  },
];

function FAQItem({ question, answer }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-gray-200 last:border-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-5 text-left group"
      >
        <span className="font-sans font-medium text-sm pr-8 transition-colors" style={{ color: TEXT_PRIMARY }} onMouseEnter={(e) => e.target.style.color = COLORS.ACCENT_PRIMARY} onMouseLeave={(e) => e.target.style.color = TEXT_PRIMARY}>
          {question}
        </span>
        <ChevronDown
          className={`w-4 h-4 flex-shrink-0 transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
          style={{ color: TEXT_PRIMARY_ALPHA_50 }}
          onMouseEnter={(e) => e.target.style.color = COLORS.ACCENT_PRIMARY}
          onMouseLeave={(e) => e.target.style.color = TEXT_PRIMARY_ALPHA_50}
        />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-sm text-gray-600 leading-relaxed">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQ() {
  return (
    <div className="pt-28 pb-20">
      <div className="max-w-3xl mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <span className="text-[11px] font-sans font-semibold uppercase tracking-[0.2em] mb-4 block" style={{ color: COLORS.ACCENT_PRIMARY }}>
            Questions & Clarity
          </span>
          <h1 className="font-serif text-4xl md:text-5xl mb-4" style={{ color: TEXT_PRIMARY }}>
            Frequently Asked Questions
          </h1>
          <p className="text-lg" style={{ color: TEXT_PRIMARY_ALPHA_70 }}>
            Everything you need to know about our non-medical travel concierge service.
          </p>
        </motion.div>

        {FAQS.map((section, si) => (
          <motion.div
            key={si}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: si * 0.1 }}
            className="mb-12"
          >
            <div className="flex items-center gap-2 mb-4">
              <HelpCircle className="w-4 h-4" style={{ color: COLORS.ACCENT_PRIMARY }} />
              <h2 className="font-serif text-xl" style={{ color: TEXT_PRIMARY }}>{section.category}</h2>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
              {section.questions.map((faq, qi) => (
                <FAQItem key={qi} question={faq.q} answer={faq.a} />
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}