import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { motion } from "framer-motion";

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
            className="border border-[#FF8C42]/5 rounded-2xl bg-white px-6 shadow-sm data-[state=open]:shadow-md transition-shadow"
          >
            <AccordionTrigger className="text-left text-[#0F1C2E] font-semibold text-base py-5 hover:no-underline" style={{ fontFamily: 'Inter, sans-serif' }}>
              {item.question}
            </AccordionTrigger>
            <AccordionContent className="text-[#7C848E] text-sm leading-relaxed pb-5" style={{ fontFamily: 'Inter, sans-serif' }}>
              {item.answer}
            </AccordionContent>
          </AccordionItem>
        </motion.div>
      ))}
    </Accordion>
  );
}