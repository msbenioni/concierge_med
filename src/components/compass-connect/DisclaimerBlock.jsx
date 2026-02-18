import React from "react";
import { ShieldCheck } from "lucide-react";

export default function DisclaimerBlock({ compact = false }) {
  if (compact) {
    return (
      <p className="text-xs text-[#7C848E] leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>
        Compass Connect is a non-medical concierge service. All medical decisions and surgical care are provided solely by licensed professionals.
      </p>
    );
  }

  return (
    <div className="rounded-2xl bg-[#0F1C2E]/[0.03] border border-[#0F1C2E]/5 p-6 lg:p-8">
      <div className="flex items-start gap-4">
        <div className="w-10 h-10 rounded-xl bg-[#1F4E5F]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
          <ShieldCheck className="w-5 h-5 text-[#1F4E5F]" />
        </div>
        <div>
          <h4 className="text-sm font-semibold text-[#0F1C2E] mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>
            Trust & Transparency
          </h4>
          <p className="text-sm text-[#7C848E] leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>
            We are not a medical provider. All medical advice, assessment, surgery and aftercare are provided solely by our partner hospitals and their licensed professionals. Hospital fees are paid directly to the hospital. Compass Connect provides non-medical concierge and travel coordination only.
          </p>
        </div>
      </div>
    </div>
  );
}