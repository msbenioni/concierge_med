import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "../utils";
import { motion } from "framer-motion";
import { ArrowRight, Quote, Sparkles, CheckCircle, Shield, Users, Plane } from "lucide-react";
import HeroSection from "../components/compass-connect/HeroSection";
import StepTimeline from "../components/compass-connect/StepTimeline";
import WhatWeDoSection from "../components/compass-connect/WhatWeDoSection";
import WhyGroupTravel from "../components/compass-connect/WhyGroupTravel";
import CTASection from "../components/compass-connect/CTASection";
import TripCard from "../components/compass-connect/TripCard";
import TripHighlights from "../components/compass-connect/TripHighlights";
import { databaseService } from "../services/databaseService";
import { 
  BACKGROUND_PRIMARY, 
  BACKGROUND_SECONDARY,
  TEXT_PRIMARY, 
  COLORS,
  TEXT_PRIMARY_ALPHA_90,
  TEXT_PRIMARY_ALPHA_80,
  TEXT_PRIMARY_ALPHA_70,
  TEXT_PRIMARY_ALPHA_60,
  TEXT_PRIMARY_ALPHA_50,
  TEXT_PRIMARY_ALPHA_40,
  TEXT_PRIMARY_ALPHA_30,
  TEXT_PRIMARY_ALPHA_20,
  ESPRESSO_ALPHA_12,
  GRADIENTS, 
  GLASS, 
  SHADOWS,
  COMPONENTS,
  BORDERS
} from "../constants/colors";

export default function Home() {
  const [featuredTrips, setFeaturedTrips] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadFeaturedTrips = async () => {
      try {
        const result = await databaseService.getFeaturedTrips();
        if (result.success) {
          setFeaturedTrips(result.data);
        } else {
          console.error('Failed to load featured trips:', result.error);
          // Fallback to mock data if database fails
          setFeaturedTrips([
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
              image_url: "/mexico/medical-facility-1.jpg"
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
              image_url: "/mexico/medical-facility-2.jpg"
            }
          ]);
        }
      } catch (error) {
        console.error('Error loading featured trips:', error);
      } finally {
        setLoading(false);
      }
    };

    loadFeaturedTrips();
  }, []);

  return (
    <div style={{ backgroundColor: BACKGROUND_PRIMARY, color: TEXT_PRIMARY }}>
      {/* Hero Section with Full Width Image */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/hospital_hero.png"
            alt="Modern medical facility"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.1), rgba(0,0,0,0.4))' }} />
        </div>
        
        <div className="relative z-10 text-center px-6 lg:px-12 max-w-4xl mx-auto">
          <div className="rounded-3xl p-8 md:p-12 lg:p-16" style={{ 
            backgroundColor: GLASS.CARD_BACKGROUND, 
            border: `1px solid ${GLASS.BORDER_SUBTLE}`, 
            boxShadow: SHADOWS.BACKGROUND_STRONG,
            backdropFilter: 'blur(20px)'
          }}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
            <div className="flex items-center justify-center gap-2 mb-6">
              <span className="text-[11px] font-sans font-semibold uppercase tracking-[0.3em]" style={{ color: 'white' }}>
                Personalised Medical Travel Concierge
              </span>
            </div>
            
            <h1 className="font-serif text-5xl md:text-7xl mb-6 leading-tight" style={{ color: TEXT_PRIMARY }}>
              Compass Connect
            </h1>
            <p className="font-serif text-2xl md:text-3xl mb-6 leading-relaxed" style={{ color: COLORS.ACCENT_PRIMARY }}>
              Your Concierge Guide to Trusted Surgical Care Abroad
            </p>
            <p className="text-lg mb-12 max-w-2xl mx-auto leading-relaxed" style={{ color: TEXT_PRIMARY_ALPHA_80 }}>
              We coordinate travel logistics for medically approved patients while accredited hospitals provide all clinical care.
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
                Express Interest <ArrowRight className="w-4 h-4" />
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
                View Upcoming Group Trips
              </Link>
            </div>
          </motion.div>
          </div>
        </div>
      </section>

      {/* Luxury Divider */}
      <div className="h-px" style={{ background: `linear-gradient(to right, transparent, ${COLORS.ACCENT_PRIMARY}, transparent)` }} />

      {/* How It Works Section - Process Clarity */}
      <section className="py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-xs uppercase tracking-[0.2em] font-semibold mb-4 block" style={{ color: COLORS.ACCENT_PRIMARY }}>
              Your Journey, Clearly Defined
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6" style={{ fontFamily: 'Playfair Display, serif', color: TEXT_PRIMARY }}>
              How It Works
            </h2>
            <p className="max-w-3xl mx-auto text-lg mb-8" style={{ fontFamily: 'Inter, sans-serif', color: TEXT_PRIMARY_ALPHA_70 }}>
              A seamless, two-phase journey. Medical care handled by accredited professionals. 
              Travel coordination handled by Compass Connect.
            </p>
          </motion.div>

          {/* 5-Step Journey Overview */}
          <div className="mb-20">
            <div className="relative">
              {/* Connection Line */}
              <div 
                className="absolute top-1/2 left-0 right-0 h-0.5 -translate-y-1/2 hidden lg:block"
                style={{ 
                  background: `linear-gradient(to right, ${COLORS.ACCENT_PRIMARY} 20%, ${COLORS.ACCENT_PRIMARY_ALPHA_20} 20%, ${COLORS.ACCENT_PRIMARY_ALPHA_20} 80%, ${COLORS.ACCENT_PRIMARY} 80%)`
                }}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
                {[
                  { number: "1", title: "Express Interest", desc: "Submit your details to begin" },
                  { number: "2", title: "Complete Assessment", desc: "Secure hospital questionnaire" },
                  { number: "3", title: "Receive Quote & Return", desc: "Get pricing with reference number" },
                  { number: "4", title: "We Organise Travel", desc: "Premium concierge service" }
                ].map((step, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="text-center"
                  >
                    {/* Step Number */}
                    <div 
                      className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-lg font-bold"
                      style={{ 
                        backgroundColor: index === 0 || index === 3 ? COLORS.ACCENT_PRIMARY : COLORS.ACCENT_PRIMARY_ALPHA_20,
                        color: index === 0 || index === 3 ? COMPONENTS.BUTTON_PRIMARY_TEXT : TEXT_PRIMARY_ALPHA_50
                      }}
                    >
                      {step.number}
                    </div>

                    {/* Step Content */}
                    <h3 
                      className="font-semibold mb-2 text-sm"
                      style={{ color: TEXT_PRIMARY }}
                    >
                      {step.title}
                    </h3>
                    <p 
                      className="text-xs leading-relaxed"
                      style={{ color: TEXT_PRIMARY_ALPHA_50 }}
                    >
                      {step.desc}
                    </p>

                    {/* Arrow for mobile */}
                    {index < 3 && (
                      <div className="lg:hidden flex justify-center mt-4">
                        <div className="w-4 h-4 rounded-full" style={{ 
                          backgroundColor: COLORS.ACCENT_PRIMARY_ALPHA_20,
                          color: COLORS.ACCENT_PRIMARY
                        }} />
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Phase Labels */}
            <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="text-center p-6 rounded-2xl"
                style={{ backgroundColor: COLORS.ACCENT_PRIMARY_ALPHA_10 }}
              >
                <div className="flex items-center justify-center gap-2 mb-3">
                  <div 
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: COLORS.ACCENT_PRIMARY }}
                  />
                  <span 
                    className="text-sm font-semibold uppercase tracking-wider"
                    style={{ color: COLORS.ACCENT_PRIMARY }}
                  >
                    Compass Connect
                  </span>
                </div>
                <p 
                  className="text-sm"
                  style={{ color: TEXT_PRIMARY_ALPHA_70 }}
                >
                  Steps 1 & 4: Interest submission & travel coordination
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="text-center p-6 rounded-2xl"
                style={{ backgroundColor: COLORS.ACCENT_PRIMARY_ALPHA_10 }}
              >
                <div className="flex items-center justify-center gap-2 mb-3">
                  <div 
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: COLORS.ACCENT_PRIMARY }}
                  />
                  <span 
                    className="text-sm font-semibold uppercase tracking-wider"
                    style={{ color: COLORS.ACCENT_PRIMARY }}
                  >
                    Hospital & User
                  </span>
                </div>
                <p 
                  className="text-sm"
                  style={{ color: TEXT_PRIMARY_ALPHA_70 }}
                >
                  Steps 2 & 3: Assessment, quote & return flow
                </p>
              </motion.div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-center"
            >
              <div className="w-16 h-16 mx-auto rounded-2xl flex items-center justify-center mb-6" style={{ backgroundColor: COMPONENTS.CARD_BACKGROUND, border: `1px solid ${COMPONENTS.CARD_BORDER}` }}>
                <CheckCircle className="w-8 h-8" style={{ color: COLORS.ACCENT_PRIMARY }} />
              </div>
              <h3 className="text-xl font-bold mb-3" style={{ fontFamily: 'Playfair Display, serif', color: TEXT_PRIMARY }}>
                Express Interest
              </h3>
              <p className="text-sm leading-relaxed" style={{ fontFamily: 'Inter, sans-serif', color: TEXT_PRIMARY_ALPHA_70 }}>
                Start by expressing your interest in our medical journey services.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-center"
            >
              <div className="w-16 h-16 mx-auto rounded-2xl flex items-center justify-center mb-6" style={{ backgroundColor: COMPONENTS.CARD_BACKGROUND, border: `1px solid ${COMPONENTS.CARD_BORDER}` }}>
                <Shield className="w-8 h-8" style={{ color: COLORS.ACCENT_PRIMARY }} />
              </div>
              <h3 className="text-xl font-bold mb-3" style={{ fontFamily: 'Playfair Display, serif', color: TEXT_PRIMARY }}>
                Receive Surgical Approval
              </h3>
              <p className="text-sm leading-relaxed" style={{ fontFamily: 'Inter, sans-serif', color: TEXT_PRIMARY_ALPHA_70 }}>
                Our partner hospital reviews your case and provides medical approval for your procedure.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-center"
            >
              <div className="w-16 h-16 mx-auto rounded-2xl flex items-center justify-center mb-6" style={{ backgroundColor: COMPONENTS.CARD_BACKGROUND, border: `1px solid ${COMPONENTS.CARD_BORDER}` }}>
                <Plane className="w-8 h-8" style={{ color: COLORS.ACCENT_PRIMARY }} />
              </div>
              <h3 className="text-xl font-bold mb-3" style={{ fontFamily: 'Playfair Display, serif', color: TEXT_PRIMARY }}>
                Book Your Group Journey
              </h3>
              <p className="text-sm leading-relaxed" style={{ fontFamily: 'Inter, sans-serif', color: TEXT_PRIMARY_ALPHA_70 }}>
                Join your approved travel group and let us handle all travel logistics and support.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Hospital Partner Section - Trust Signals */}
      <section className="py-24 lg:py-32" style={{ backgroundColor: BACKGROUND_SECONDARY }}>
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-xs uppercase tracking-[0.2em] font-semibold mb-4 block" style={{ color: COLORS.ACCENT_PRIMARY }}>
              Trusted Partnership
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6" style={{ fontFamily: 'Playfair Display, serif', color: TEXT_PRIMARY }}>
              Internationally Accredited Surgical Excellence
            </h2>
            <p className="max-w-2xl mx-auto text-lg mb-8" style={{ fontFamily: 'Inter, sans-serif', color: TEXT_PRIMARY_ALPHA_70 }}>
              Our partner facility is internationally accredited and staffed by board-certified surgeons who specialize exclusively in bariatric procedures, serving patients from around the world.
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <div className="rounded-3xl p-6 text-center" style={{ backgroundColor: COMPONENTS.CARD_BACKGROUND, border: `1px solid ${COMPONENTS.CARD_BORDER}`, boxShadow: COMPONENTS.CARD_SHADOW }}>
              <div className="text-center mb-1">
                <img 
                  src="/mexico_bariatric_logo.webp" 
                  alt="Mexico Bariatric Center Logo" 
                  className="w-64 h-64 object-contain mx-auto"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextElementSibling.style.display = 'flex';
                  }}
                />
                <div className="w-20 h-20 mx-auto rounded-2xl flex items-center justify-center" style={{ backgroundColor: COLORS.ACCENT_PRIMARY_ALPHA_20, display: 'none' }}>
                  <Shield className="w-10 h-10" style={{ color: COLORS.ACCENT_PRIMARY }} />
                </div>
              </div>
              <p className="text-lg mb-6" style={{ fontFamily: 'Inter, sans-serif', color: TEXT_PRIMARY_ALPHA_70 }}>
                Internationally accredited surgical facility specializing in bariatric and cosmetic procedures.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                <div>
                  <p className="text-2xl font-bold mb-2" style={{ color: COLORS.ACCENT_PRIMARY }}>10,000+</p>
                  <p className="text-sm" style={{ color: TEXT_PRIMARY_ALPHA_60 }}>Bariatric Surgeries Performed</p>
                </div>
                <div>
                  <p className="text-2xl font-bold mb-2" style={{ color: COLORS.ACCENT_PRIMARY }}>15+ Years</p>
                  <p className="text-sm" style={{ color: TEXT_PRIMARY_ALPHA_60 }}>Specializing Exclusively in Bariatric Surgery</p>
                </div>
                <div>
                  <p className="text-2xl font-bold mb-2" style={{ color: COLORS.ACCENT_PRIMARY }}>99%</p>
                  <p className="text-sm" style={{ color: TEXT_PRIMARY_ALPHA_60 }}>Patient Satisfaction Rating</p>
                </div>
              </div>

              {/* International Accreditation Badges */}
              <div className="mt-8 pt-6" style={{ borderTop: `1px solid ${ESPRESSO_ALPHA_12}` }}>
                <p className="text-xs uppercase tracking-[0.15em] mb-4 font-semibold" style={{ color: TEXT_PRIMARY_ALPHA_50 }}>Recognised By:</p>
                <div className="flex flex-wrap justify-center gap-3 text-xs items-center">
                  <div className="flex items-center gap-2 px-3 py-1 rounded-full" style={{ backgroundColor: COLORS.ACCENT_PRIMARY_ALPHA_10, border: `1px solid ${COLORS.ACCENT_PRIMARY_ALPHA_30}`, color: TEXT_PRIMARY }}>
                    <img 
                      src="/ifso_logo.png" 
                      alt="IFSO Logo" 
                      className="w-16 h-16 object-contain"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextElementSibling.style.display = 'inline';
                      }}
                    />
                    <span style={{ display: 'none' }}>🏥</span>
                    International Federation for the Surgery of Obesity (IFSO)
                  </div>
                  <span className="px-3 py-1 rounded-full" style={{ backgroundColor: COLORS.ACCENT_PRIMARY_ALPHA_10, border: `1px solid ${COLORS.ACCENT_PRIMARY_ALPHA_30}`, color: TEXT_PRIMARY }}>
                    U.S. Board-Certified Surgeons
                  </span>
                  <span className="px-3 py-1 rounded-full" style={{ backgroundColor: COLORS.ACCENT_PRIMARY_ALPHA_10, border: `1px solid ${COLORS.ACCENT_PRIMARY_ALPHA_30}`, color: TEXT_PRIMARY }}>
                    Joint Commission Standards
                  </span>
                </div>
              </div>

              {/* International Trust Line */}
              <p className="text-sm mt-6 font-medium" style={{ color: TEXT_PRIMARY_ALPHA_70, fontFamily: 'Inter, sans-serif' }}>
                Trusted by patients across the U.S., Canada, Australia & New Zealand
              </p>
              <a
                href={import.meta.env.REACT_APP_PARTNER_LINK_MBC || 'https://mexicobariatriccenter.com/health-questionnaire/?RefID=2120'}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-8 text-sm font-medium transition-colors"
                style={{ color: COLORS.ACCENT_PRIMARY }}
                onMouseEnter={(e) => e.target.style.opacity = '0.8'}
                onMouseLeave={(e) => e.target.style.opacity = '1'}
              >
                Visit Hospital Website →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Why Group Travel Section - Emotional Justification */}
      <WhyGroupTravel />

      {/* Enhanced What We Do Section with Full Width Image */}
      <section className="py-32 px-6 lg:px-12 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-2xl mx-auto mb-20"
        >
          <span className="text-[11px] font-sans font-semibold uppercase tracking-[0.3em] mb-4 block" style={{ color: COLORS.ACCENT_PRIMARY }}>
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

        {/* Curated Excellence Section */}
        <TripHighlights />
      </section>

      {/* Featured Journeys with Premium Design */}
      <section className="py-32" style={{ background: GRADIENTS.BACKGROUND_DARK_TO_LIGHT }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-2xl mx-auto mb-16"
          >
            <span className="text-[11px] font-sans font-semibold uppercase tracking-[0.3em] mb-4 block" style={{ color: COLORS.ACCENT_PRIMARY }}>
              Elite Journeys
            </span>
            <h2 className="font-serif text-4xl md:text-5xl" style={{ color: TEXT_PRIMARY }}>
              Elite Travel Groups
            </h2>
            <div className="mt-6">
              <Link
                to={createPageUrl("Trips")}
                className="inline-flex items-center gap-2 font-sans font-medium text-sm transition-all duration-300"
                style={{ color: COLORS.ACCENT_PRIMARY }}
                onMouseEnter={(e) => e.target.style.gap = '0.75rem'}
                onMouseLeave={(e) => e.target.style.gap = '0.5rem'}
              >
                View upcoming group travel <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
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
            <Quote className="w-12 h-12 mx-auto mb-8" style={{ color: COLORS.ACCENT_PRIMARY_ALPHA_20 }} />
            <p className="font-serif text-3xl md:text-4xl italic leading-relaxed mb-12" style={{ color: TEXT_PRIMARY_ALPHA_90 }}>
              "Traveling for surgery felt daunting until Compass Connect arranged every detail. 
              I only had to focus on myself. The experience was like staying at a five-star spa."
            </p>
            <div className="flex items-center justify-center gap-4">
              <div className="w-12 h-12 rounded-full flex items-center justify-center font-serif text-lg" style={{ backgroundColor: COLORS.ACCENT_PRIMARY_ALPHA_20, color: COLORS.ACCENT_PRIMARY }}>
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
          <span className="text-[11px] font-sans font-semibold uppercase tracking-[0.3em] mb-4 block" style={{ color: COLORS.ACCENT_PRIMARY }}>
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
            Express Interest <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </section>
    </div>
  );
}