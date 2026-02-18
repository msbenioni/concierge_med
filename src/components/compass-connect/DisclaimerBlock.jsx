import React from "react";
import { ShieldCheck } from "lucide-react";
import { 
  BACKGROUND_PRIMARY, 
  TEXT_PRIMARY, 
  ACCENT_PRIMARY, 
  TEXT_PRIMARY_ALPHA_50, 
  ACCENT_PRIMARY_ALPHA_20, 
  GLASS, 
  BORDERS
} from "../../constants/colors";

export default function DisclaimerBlock({ compact = false }) {
  if (compact) {
    return (
      <p className="text-xs leading-relaxed" style={{ fontFamily: 'Inter, sans-serif', color: TEXT_PRIMARY_ALPHA_50 }}>
        Compass Connect is a non-medical concierge service. All medical decisions and surgical care are provided solely by licensed professionals.
      </p>
    );
  }

  return (
    <div className="rounded-2xl p-6 lg:p-8" style={{ backgroundColor: ACCENT_PRIMARY_ALPHA_20, border: `1px solid ${BORDERS.ACCENT_SUBTLE}` }}>
      <div className="flex items-start gap-4">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5" style={{ backgroundColor: ACCENT_PRIMARY_ALPHA_20 }}>
          <ShieldCheck className="w-5 h-5" style={{ color: ACCENT_PRIMARY }} />
        </div>
        <div>
          <h4 className="text-sm font-semibold mb-2" style={{ fontFamily: 'Inter, sans-serif', color: TEXT_PRIMARY }}>
            Trust & Transparency
          </h4>
          <p className="text-sm leading-relaxed" style={{ fontFamily: 'Inter, sans-serif', color: TEXT_PRIMARY_ALPHA_50 }}>
            We are not a medical provider. All medical advice, assessment, surgery and aftercare are provided solely by our partner hospitals and their licensed professionals. Hospital fees are paid directly to the hospital. Compass Connect provides non-medical concierge and travel coordination only.
          </p>
        </div>
      </div>
    </div>
  );
}