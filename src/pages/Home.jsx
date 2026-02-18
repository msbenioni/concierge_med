import React from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "../utils";
import { motion } from "framer-motion";
import { ArrowRight, Quote, Sparkles } from "lucide-react";
import HeroSection from "../components/compass-connect/HeroSection";
import StepTimeline from "../components/compass-connect/StepTimeline";
import WhatWeDoSection from "../components/compass-connect/WhatWeDoSection";
import WhyGroupTravel from "../components/compass-connect/WhyGroupTravel";
import DisclaimerBlock from "../components/compass-connect/DisclaimerBlock";
import CTASection from "../components/compass-connect/CTASection";
import TripCard from "../components/compass-connect/TripCard";
import TripHighlights from "../components/compass-connect/TripHighlights";
import { 
  BACKGROUND_PRIMARY, 
  TEXT_PRIMARY, 
  ACCENT_PRIMARY, 
  ACCENT_SECONDARY, 
  TEXT_PRIMARY_ALPHA_90,
  TEXT_PRIMARY_ALPHA_80,
  TEXT_PRIMARY_ALPHA_70,
  TEXT_PRIMARY_ALPHA_50,
  TEXT_PRIMARY_ALPHA_20,
  BACKGROUND_PRIMARY_ALPHA_70, 
  BACKGROUND_PRIMARY_ALPHA_50, 
  ACCENT_PRIMARY_ALPHA_20, 
  GRADIENTS, 
  GLASS, 
  SHADOWS,
  COMPONENTS,
  BORDERS
} from "../constants/colors";

export default function Home() {
  // Mock featured trips data (TODO: Replace with API call)
  const featuredTrips = [
    {
      id: 1,
      title: "Auckland Medical Journey",
      departure_city: "Auckland",
      destination: "Tijuana, Mexico",
      departure_date: "2024-03-15",
      return_date: "2024-03-22",
      confirmed_count: 6,
      min_travelers: 4,
      price: 4000,
      status: "available",
      hospital_approved: true,
      hospital_reference: "MBC-2024-0315",
      inclusions: ["Flights", "Accommodation", "Transfers", "Concierge Support", "Meals", "Insurance"],
      image_url: "https://images.unsplash.com/photo-1571896349842-33c89424de90?w=800&q=80"
    },
    {
      id: 2,
      title: "Sydney Medical Journey",
      departure_city: "Sydney",
      destination: "Tijuana, Mexico",
      departure_date: "2024-04-12",
      return_date: "2024-04-19",
      confirmed_count: 3,
      min_travelers: 4,
      price: 4000,
      status: "available",
      hospital_approved: true,
      hospital_reference: "MBC-2024-0412",
      inclusions: ["Flights", "Accommodation", "Transfers", "Concierge Support", "Meals"],
      image_url: "https://images.unsplash.com/photo-1571003123894-1f0e994e8752?w=800&q=80"
    }
  ];

  return (
    <div style={{ backgroundColor: BACKGROUND_PRIMARY, color: TEXT_PRIMARY }}>
      {/* Hero Section with Full Width Image */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=80&auto=format&fit=crop"
            alt="Luxury spa retreat"
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.src = "https://picsum.photos/1920/1080?random=1";
            }}
          />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.1), rgba(0,0,0,0.4))' }} />
        </div>
        
        <div className="relative z-10 text-center px-6 lg:px-12 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <div className="flex items-center justify-center gap-2 mb-6">
              <Sparkles className="w-5 h-5" style={{ color: ACCENT_PRIMARY }} />
              <span className="text-[11px] font-sans font-semibold uppercase tracking-[0.3em]" style={{ color: ACCENT_PRIMARY }}>
                Ultra-Premium Concierge
              </span>
              <Sparkles className="w-5 h-5" style={{ color: ACCENT_PRIMARY }} />
            </div>
            
            <h1 className="font-serif text-5xl md:text-7xl mb-6 leading-tight" style={{ color: TEXT_PRIMARY }}>
              Compass Connect
            </h1>
            <p className="font-serif text-2xl md:text-3xl mb-8 leading-relaxed" style={{ color: ACCENT_PRIMARY }}>
              Where Healing Meets Luxury
            </p>
            <p className="text-lg mb-12 max-w-2xl mx-auto leading-relaxed" style={{ color: TEXT_PRIMARY_ALPHA_80 }}>
              Experience the pinnacle of non-medical travel concierge services. 
              We orchestrate every detail of your journey with the precision and care 
              of a five-star spa retreat.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to={createPageUrl("Booking")}
                className="inline-flex items-center gap-3 px-10 py-4 rounded-full font-sans font-semibold tracking-wide transition-all duration-500 shadow-lg"
                style={{ 
                  background: GRADIENTS.ACCENT_PRIMARY, 
                  color: COMPONENTS.BUTTON_PRIMARY_TEXT,
                  boxShadow: SHADOWS.ACCENT_MEDIUM
                }}
                onMouseEnter={(e) => {
                  e.target.style.opacity = '0.9';
                  e.target.style.boxShadow = SHADOWS.ACCENT_STRONG;
                }}
                onMouseLeave={(e) => {
                  e.target.style.opacity = '1';
                  e.target.style.boxShadow = SHADOWS.ACCENT_MEDIUM;
                }}
              >
                Begin Your Journey <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to={createPageUrl("Trips")}
                className="inline-flex items-center gap-3 px-10 py-4 rounded-full font-sans font-medium transition-all duration-500"
                style={{ 
                  border: `1px solid ${BORDERS.TEXT_MEDIUM}`,
                  color: TEXT_PRIMARY
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = TEXT_PRIMARY;
                  e.target.style.color = BACKGROUND_PRIMARY;
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = 'transparent';
                  e.target.style.color = TEXT_PRIMARY;
                }}
              >
                View Journeys
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Luxury Divider */}
      <div className="h-px" style={{ background: `linear-gradient(to right, transparent, ${ACCENT_PRIMARY}, transparent)` }} />

      {/* Enhanced What We Do Section with Full Width Image */}
      <section className="py-32 px-6 lg:px-12 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-2xl mx-auto mb-20"
        >
          <span className="text-[11px] font-sans font-semibold uppercase tracking-[0.3em] mb-4 block" style={{ color: ACCENT_PRIMARY }}>
            Exclusive Services
          </span>
          <h2 className="font-serif text-4xl md:text-5xl mb-6" style={{ color: TEXT_PRIMARY }}>
            Curated Excellence
          </h2>
          <p className="leading-relaxed text-lg" style={{ color: TEXT_PRIMARY_ALPHA_70 }}>
            Our non-medical concierge service focuses entirely on your travel comfort. 
            The partner hospital handles all medical care with the same precision.
          </p>
        </motion.div>

        {/* Full Width Image with Service Highlights */}
        <div className="relative rounded-3xl overflow-hidden mb-16">
          <img
            src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=1600&q=80"
            alt="Luxury travel services"
            className="w-full h-[700px] object-cover"
          />
          <div className="absolute inset-0" style={{ background: `linear-gradient(to top, ${BACKGROUND_PRIMARY}, ${BACKGROUND_PRIMARY_ALPHA_50}, transparent)` }} />
          <div className="absolute bottom-0 left-0 right-0 p-8 pb-12">
            <TripHighlights />
          </div>
        </div>
      </section>

      {/* Featured Journeys with Premium Design */}
      <section className="py-32" style={{ background: GRADIENTS.BACKGROUND_DARK_TO_LIGHT }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-16"
          >
            <div>
              <span className="text-[11px] font-sans font-semibold uppercase tracking-[0.3em] mb-4 block" style={{ color: ACCENT_PRIMARY }}>
                Elite Journeys
              </span>
              <h2 className="font-serif text-4xl md:text-5xl" style={{ color: TEXT_PRIMARY }}>
                Curated Travel Cohorts
              </h2>
            </div>
            <Link
              to={createPageUrl("Trips")}
              className="inline-flex items-center gap-2 font-sans font-medium text-sm transition-all duration-300"
              style={{ color: ACCENT_PRIMARY }}
              onMouseEnter={(e) => e.target.style.gap = '0.75rem'}
              onMouseLeave={(e) => e.target.style.gap = '0.5rem'}
            >
              View all journeys <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12">
            {featuredTrips.map((trip, i) => (
              <motion.div
                key={trip.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.2 }}
              >
                <TripCard trip={trip} index={i} featured />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Full Width Testimonial Section */}
      <section className="relative py-32">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=1920&q=80"
            alt="Luxury testimonial background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0" style={{ background: GRADIENTS.OVERLAY_IMAGE_MEDIUM }} />
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-12 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Quote className="w-12 h-12 mx-auto mb-8" style={{ color: ACCENT_PRIMARY_ALPHA_20 }} />
            <p className="font-serif text-3xl md:text-4xl italic leading-relaxed mb-12" style={{ color: TEXT_PRIMARY_ALPHA_90 }}>
              "Traveling for surgery felt daunting until Compass Connect arranged every detail. 
              I only had to focus on myself. The experience was like staying at a five-star spa."
            </p>
            <div className="flex items-center justify-center gap-4">
              <div className="w-12 h-12 rounded-full flex items-center justify-center font-serif text-lg" style={{ backgroundColor: ACCENT_PRIMARY_ALPHA_20, color: ACCENT_PRIMARY }}>
                S
              </div>
              <div className="text-left">
                <p className="text-sm font-sans font-medium" style={{ color: TEXT_PRIMARY_ALPHA_80 }}>Sarah M.</p>
                <p className="text-xs" style={{ color: TEXT_PRIMARY_ALPHA_50 }}>Auckland, NZ</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Premium CTA Section */}
      <section className="py-32 px-6 lg:px-12 max-w-4xl mx-auto" style={{ background: GRADIENTS.BACKGROUND_LIGHT_TO_DARK }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-[11px] font-sans font-semibold uppercase tracking-[0.3em] mb-4 block" style={{ color: ACCENT_PRIMARY }}>
            Exclusive Invitation
          </span>
          <h2 className="font-serif text-4xl mb-6" style={{ color: TEXT_PRIMARY }}>Begin Your Journey</h2>
          <p className="mb-12 text-lg" style={{ color: TEXT_PRIMARY_ALPHA_70 }}>
            Ready to experience travel with unparalleled luxury and support?
          </p>
          <Link
            to={createPageUrl("Booking")}
            className="inline-flex items-center gap-3 px-12 py-5 rounded-full font-sans font-semibold tracking-wide transition-all duration-500 shadow-lg text-lg"
            style={{ 
              background: GRADIENTS.ACCENT_PRIMARY, 
              color: COMPONENTS.BUTTON_PRIMARY_TEXT,
              boxShadow: SHADOWS.ACCENT_MEDIUM
            }}
            onMouseEnter={(e) => {
              e.target.style.opacity = '0.9';
              e.target.style.boxShadow = SHADOWS.ACCENT_STRONG;
            }}
            onMouseLeave={(e) => {
              e.target.style.opacity = '1';
              e.target.style.boxShadow = SHADOWS.ACCENT_MEDIUM;
            }}
          >
            Reserve Your Journey <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
        
        {/* Trust & Ethics */}
        <div className="max-w-3xl mx-auto">
          <DisclaimerBlock />
        </div>
      </section>

      <WhyGroupTravel />
      <CTASection />
    </div>
  );
}