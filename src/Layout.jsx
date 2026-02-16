import React, { useState } from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "./utils";
import { Menu, X, Globe, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const NAV_ITEMS = [
  { label: "Home", page: "Home" },
  { label: "How It Works", page: "HowItWorks" },
  { label: "Group Trips", page: "Trips" },
  { label: "Book Now", page: "Booking" },
  { label: "FAQ", page: "FAQ" },
];

export default function Layout({ children, currentPageName }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#F9F9F9' }}>
      {/* Nav */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/90 border-b border-[#B8D963]/10">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-4 flex items-center justify-between">
          <Link to={createPageUrl("Home")} className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-[#0E7C8C] flex items-center justify-center shadow-lg shadow-[#0E7C8C]/20 group-hover:shadow-[#0E7C8C]/30 transition-shadow">
              <Globe className="w-5 h-5 text-[#B8D963]" />
            </div>
            <div className="leading-tight">
              <span className="text-[#0E7C8C] font-semibold text-lg tracking-tight" style={{ fontFamily: 'Playfair Display, serif' }}>
                Atlas
              </span>
              <span className="block text-[10px] text-[#7A9BA8] uppercase tracking-[0.2em] font-medium">
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
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  currentPageName === item.page
                    ? "bg-[#0E7C8C] text-white"
                    : "text-[#1E1E1E] hover:bg-[#1BA8B8]/5"
                }`}
              >
                {item.label}
              </Link>
            ))}
            <a
              href="https://mexicobariatriccenter.com/health-questionnaire/?RefID=2120"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-3 px-5 py-2.5 rounded-xl bg-[#FF8C42] text-[#0F1C2E] text-sm font-semibold hover:bg-[#FF7A2A] transition-all duration-200 shadow-md shadow-[#FF8C42]/20 flex items-center gap-2"
            >
              Start Questionnaire
              <ChevronRight className="w-4 h-4" />
            </a>
          </nav>

          {/* Mobile Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 rounded-xl hover:bg-[#1BA8B8]/5 transition"
          >
            {mobileOpen ? <X className="w-6 h-6 text-[#0E7C8C]" /> : <Menu className="w-6 h-6 text-[#0E7C8C]" />}
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
              className="lg:hidden overflow-hidden border-t border-[#FF8C42]/10"
            >
              <nav className="px-5 py-4 flex flex-col gap-1">
                {NAV_ITEMS.map((item) => (
                  <Link
                    key={item.page}
                    to={createPageUrl(item.page)}
                    onClick={() => setMobileOpen(false)}
                    className={`px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                      currentPageName === item.page
                        ? "bg-[#0E7C8C] text-white"
                        : "text-[#1E1E1E] hover:bg-[#1BA8B8]/5"
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
                <a
                  href="https://mexicobariatriccenter.com/health-questionnaire/?RefID=2120"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMobileOpen(false)}
                  className="mt-2 px-5 py-3 rounded-xl bg-[#FF8C42] text-[#0F1C2E] text-sm font-semibold text-center"
                >
                  Start Questionnaire →
                </a>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Main Content */}
      <main className="flex-1">{children}</main>

      {/* Footer */}
      <footer className="bg-[#0E7C8C] text-white/80">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-lg bg-[#B8D963]/20 flex items-center justify-center">
                  <Globe className="w-4 h-4 text-[#B8D963]" />
                </div>
                <div className="leading-tight">
                  <span className="text-white font-semibold" style={{ fontFamily: 'Playfair Display, serif' }}>Atlas</span>
                  <span className="block text-[9px] text-[#B8D963] uppercase tracking-[0.2em]">Medical Tourism Concierge</span>
                </div>
              </div>
              <p className="text-sm text-white/50 leading-relaxed max-w-xs">
                Independent, non-medical concierge service supporting NZ & AU patients travelling overseas for surgery.
              </p>
            </div>
            <div>
              <h4 className="text-xs uppercase tracking-[0.2em] text-[#B8D963] mb-4 font-semibold">Navigate</h4>
              <div className="flex flex-col gap-2">
                {NAV_ITEMS.map((item) => (
                  <Link
                    key={item.page}
                    to={createPageUrl(item.page)}
                    className="text-sm text-[#F4F1EB]/60 hover:text-[#FF8C42] transition-colors"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-xs uppercase tracking-[0.2em] text-[#B8D963] mb-4 font-semibold">Hospital Partner</h4>
              <p className="text-sm text-white/50 leading-relaxed mb-3">
                All medical assessment and surgical care is provided by our accredited partner hospitals.
              </p>
              <a
                href="https://mexicobariatriccenter.com/health-questionnaire/?RefID=2120"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-[#FF8C42] hover:text-[#FF8C42]/80 transition-colors font-medium"
              >
                Visit Hospital Website →
              </a>
            </div>
          </div>

          {/* Legal Disclaimer */}
          <div className="border-t border-white/10 pt-8">
            <p className="text-xs text-white/30 leading-relaxed max-w-4xl">
              Atlas Medical Tourism Concierge is an independent, non-medical concierge service. All medical decisions, assessments, and surgical care are provided solely by licensed hospitals and medical professionals. Atlas does not collect medical information, provide medical advice, or make clinical decisions. Hospital fees are paid directly to the hospital. The NZD $3,500 group travel fee covers airfare and concierge support only.
            </p>
            <p className="text-xs text-white/20 mt-4">
              © {new Date().getFullYear()} Atlas Medical Tourism Concierge. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}