import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { motion } from "framer-motion";
import { TEXT_PRIMARY, TEXT_PRIMARY_ALPHA_50, ACCENT_PRIMARY, ACCENT_PRIMARY_ALPHA_20, GLASS, BORDERS } from "../../constants/colors";

export default function FAQAccordion({ items }) {
  return (
    <Accordion type="single" collapsible className="space-y-3">
      {items.map((item, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.05 }}
        >
          <AccordionItem
            value={`faq-${i}`}
            className="rounded-2xl px-6 shadow-sm data-[state=open]:shadow-md transition-shadow"
            style={{ backgroundColor: GLASS.CARD_BACKGROUND, border: `1px solid ${ACCENT_PRIMARY_ALPHA_20}` }}
          >
            <AccordionTrigger className="text-left font-semibold text-base py-5 hover:no-underline" style={{ color: TEXT_PRIMARY, fontFamily: 'Inter, sans-serif' }}>
              {item.question}
            </AccordionTrigger>
            <AccordionContent className="text-sm leading-relaxed pb-5" style={{ color: TEXT_PRIMARY_ALPHA_50, fontFamily: 'Inter, sans-serif' }}>
              {item.answer}
            </AccordionContent>
          </AccordionItem>
        </motion.div>
      ))}
    </Accordion>
  );
}