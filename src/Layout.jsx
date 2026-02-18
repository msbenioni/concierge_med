import React, { useState } from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "./utils";
import { Menu, X, Globe, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  BACKGROUND_PRIMARY, 
  TEXT_PRIMARY, 
  ACCENT_PRIMARY, 
  TEXT_PRIMARY_ALPHA_80,
  TEXT_PRIMARY_ALPHA_70, 
  TEXT_PRIMARY_ALPHA_60,
  TEXT_PRIMARY_ALPHA_50,
  TEXT_PRIMARY_ALPHA_30,
  TEXT_PRIMARY_ALPHA_20,
  ACCENT_PRIMARY_ALPHA_20, 
  GRADIENTS, 
  GLASS, 
  SHADOWS,
  COMPONENTS,
  BORDERS
} from "./constants/colors";

const NAV_ITEMS = [
  { label: "Home", page: "Home" },
  { label: "How It Works", page: "HowItWorks" },
  { label: "Group Trips", page: "Trips" },
  { label: "Book Now", page: "Booking" },
  { label: "FAQ", page: "FAQ" },
  { label: "Admin", page: "Admin" },
];

export default function Layout({ children, currentPageName }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: BACKGROUND_PRIMARY }}>
      {/* Nav */}
      <header className="sticky top-0 z-50 backdrop-blur-xl px-5 sm:px-8 py-4 flex items-center justify-between" style={{ backgroundColor: GLASS.CARD_BACKGROUND, borderBottom: `1px solid ${BORDERS.ACCENT_SUBTLE}` }}>
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
          <Link to={createPageUrl("Home")} className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center shadow-lg transition-shadow" style={{ backgroundColor: ACCENT_PRIMARY, boxShadow: SHADOWS.ACCENT_SUBTLE }} onMouseEnter={(e) => e.target.style.boxShadow = SHADOWS.ACCENT_MEDIUM} onMouseLeave={(e) => e.target.style.boxShadow = SHADOWS.ACCENT_SUBTLE}>
              <Globe className="w-5 h-5" style={{ color: COMPONENTS.BUTTON_PRIMARY_TEXT }} />
            </div>
            <div className="leading-tight">
              <span className="font-semibold text-lg tracking-tight" style={{ color: ACCENT_PRIMARY, fontFamily: 'Playfair Display, serif' }}>
                Compass Connect
              </span>
              <span className="block text-[10px] uppercase tracking-[0.2em] font-medium" style={{ color: TEXT_PRIMARY_ALPHA_70 }}>
                Medical Tourism Concierge
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.page}
                to={createPageUrl(item.page)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200`}
                style={{
                  backgroundColor: currentPageName === item.page ? ACCENT_PRIMARY : 'transparent',
                  color: currentPageName === item.page ? COMPONENTS.BUTTON_PRIMARY_TEXT : TEXT_PRIMARY
                }}
                onMouseEnter={(e) => {
                  if (currentPageName !== item.page) {
                    e.target.style.backgroundColor = ACCENT_PRIMARY_ALPHA_20;
                  }
                }}
                onMouseLeave={(e) => {
                  if (currentPageName !== item.page) {
                    e.target.style.backgroundColor = 'transparent';
                  }
                }}
              >
                {item.label}
              </Link>
            ))}
            <Link
              to={createPageUrl("Booking")}
              className="ml-3 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 shadow-md flex items-center gap-2"
              style={{ 
                backgroundColor: COMPONENTS.STATUS_WARNING, 
                color: TEXT_PRIMARY_ALPHA_50,
                boxShadow: SHADOWS.ACCENT_SUBTLE
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = COMPONENTS.STATUS_WARNING;
                e.target.style.boxShadow = SHADOWS.ACCENT_MEDIUM;
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = COMPONENTS.STATUS_WARNING;
                e.target.style.boxShadow = SHADOWS.ACCENT_SUBTLE;
              }}
            >
              Start Questionnaire
              <ChevronRight className="w-4 h-4" />
            </Link>
          </nav>

          {/* Mobile Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 rounded-xl transition"
            onMouseEnter={(e) => e.target.style.backgroundColor = ACCENT_PRIMARY_ALPHA_20}
            onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
          >
            {mobileOpen ? <X className="w-6 h-6" style={{ color: ACCENT_PRIMARY }} /> : <Menu className="w-6 h-6" style={{ color: ACCENT_PRIMARY }} />}
          </button>
        </div>

        {/* Mobile Nav */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden overflow-hidden"
              style={{ borderTop: `1px solid ${BORDERS.ACCENT_SUBTLE}` }}
            >
              <nav className="px-5 py-4 flex flex-col gap-1">
                {NAV_ITEMS.map((item) => (
                  <Link
                    key={item.page}
                    to={createPageUrl(item.page)}
                    onClick={() => setMobileOpen(false)}
                    className={`px-4 py-3 rounded-xl text-sm font-medium transition-all`}
                    style={{
                      backgroundColor: currentPageName === item.page ? ACCENT_PRIMARY : 'transparent',
                      color: currentPageName === item.page ? COMPONENTS.BUTTON_PRIMARY_TEXT : TEXT_PRIMARY
                    }}
                    onMouseEnter={(e) => {
                      if (currentPageName !== item.page) {
                        e.target.style.backgroundColor = ACCENT_PRIMARY_ALPHA_20;
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (currentPageName !== item.page) {
                        e.target.style.backgroundColor = 'transparent';
                      }
                    }}
                  >
                    {item.label}
                  </Link>
                ))}
                <Link
                  to={createPageUrl("Booking")}
                  onClick={() => setMobileOpen(false)}
                  className="mt-2 px-5 py-3 rounded-xl text-sm font-semibold text-center"
                  style={{ backgroundColor: COMPONENTS.STATUS_WARNING, color: TEXT_PRIMARY_ALPHA_50 }}
                >
                  Start Questionnaire →
                </Link>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Main Content */}
      <main className="flex-1">{children}</main>

      {/* Footer */}
      <footer style={{ backgroundColor: ACCENT_PRIMARY, color: TEXT_PRIMARY_ALPHA_80 }}>
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ backgroundColor: ACCENT_PRIMARY_ALPHA_20 }}>
                  <Globe className="w-4 h-4" style={{ color: TEXT_PRIMARY }} />
                </div>
                <div className="leading-tight">
                  <span className="font-semibold" style={{ color: TEXT_PRIMARY, fontFamily: 'Playfair Display, serif' }}>Compass Connect</span>
                  <span className="block text-[9px] uppercase tracking-[0.2em]" style={{ color: TEXT_PRIMARY }}>Medical Tourism Concierge</span>
                </div>
              </div>
              <p className="text-sm leading-relaxed max-w-xs" style={{ color: TEXT_PRIMARY_ALPHA_50 }}>
                Independent, non-medical concierge service supporting NZ & AU patients travelling overseas for surgery.
              </p>
            </div>
            <div>
              <h4 className="text-xs uppercase tracking-[0.2em] mb-4 font-semibold" style={{ color: TEXT_PRIMARY }}>Navigate</h4>
              <div className="flex flex-col gap-2">
                {NAV_ITEMS.map((item) => (
                  <Link
                    key={item.page}
                    to={createPageUrl(item.page)}
                    className="text-sm transition-colors"
                    style={{ color: TEXT_PRIMARY_ALPHA_60 }}
                    onMouseEnter={(e) => e.target.style.color = COMPONENTS.STATUS_WARNING}
                    onMouseLeave={(e) => e.target.style.color = TEXT_PRIMARY_ALPHA_60}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-xs uppercase tracking-[0.2em] mb-4 font-semibold" style={{ color: TEXT_PRIMARY }}>Hospital Partner</h4>
              <p className="text-sm leading-relaxed mb-3" style={{ color: TEXT_PRIMARY_ALPHA_50 }}>
                All medical assessment and surgical care is provided by our accredited partner hospitals.
              </p>
              <a
                href="https://mexicobariatriccenter.com/health-questionnaire/?RefID=2120"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm transition-colors font-medium"
                style={{ color: COMPONENTS.STATUS_WARNING }}
                onMouseEnter={(e) => e.target.style.opacity = '0.8'}
                onMouseLeave={(e) => e.target.style.opacity = '1'}
              >
                Visit Hospital Website →
              </a>
            </div>
          </div>

          {/* Legal Disclaimer */}
          <div style={{ borderTop: `1px solid ${BORDERS.TEXT_SUBTLE}` }} className="pt-8">
            <p className="text-xs leading-relaxed max-w-4xl" style={{ color: TEXT_PRIMARY_ALPHA_30 }}>
              Compass Connect is an independent, non-medical concierge service. All medical decisions, assessments, and surgical care are provided solely by licensed hospitals and medical professionals. Compass Connect does not collect medical information, provide medical advice, or make clinical decisions. Hospital fees are paid directly to the hospital. The 4,000 group travel fee covers airfare and concierge support only.
            </p>
            <p className="text-xs mt-4" style={{ color: TEXT_PRIMARY_ALPHA_20 }}>
              © {new Date().getFullYear()} Compass Connect. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}