import React from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "../../utils";
import { motion } from "framer-motion";
import { MapPin, Calendar, Users, ArrowRight } from "lucide-react";
import StatusBadge from "./StatusBadge";
import { format } from "date-fns";
import { 
  BACKGROUND_PRIMARY, 
  TEXT_PRIMARY, 
  ACCENT_PRIMARY, 
  ACCENT_SECONDARY, 
  TEXT_PRIMARY_ALPHA_70, 
  TEXT_PRIMARY_ALPHA_50, 
  TEXT_PRIMARY_ALPHA_10,
  BACKGROUND_PRIMARY_ALPHA_50,
  ACCENT_PRIMARY_ALPHA_20, 
  GRADIENTS, 
  GLASS, 
  SHADOWS, 
  BORDERS,
  COMPONENTS
} from "../../constants/colors";

export default function TripCard({ trip, index = 0, featured = false }) {
  const seatsLeft = (trip.min_travelers || 0) - (trip.confirmed_count || 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
    >
      <div 
        className={`group rounded-3xl overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl ${featured ? "md:flex" : ""}`}
        style={{ 
          backgroundColor: GLASS.CARD_BACKGROUND, 
          backdropFilter: 'blur(16px)',
          border: `1px solid ${BORDERS.ACCENT_SUBTLE}`
        }}
      >
        {/* Image */}
        <div className={`relative overflow-hidden ${featured ? "md:w-2/5 h-64 md:h-auto" : "h-56"}`}>
          <img
            src={(() => {
              // Use trip image_url if provided, otherwise use destination-based fallback
              const imageSrc = trip.image_url || (() => {
                // Extract country from destination (default to Mexico)
                const country = trip.destination?.toLowerCase().includes('mexico') ? 'mexico' : 
                               trip.destination?.toLowerCase().includes('tijuana') ? 'mexico' : 'mexico';
                
                const destinationImages = {
                  'mexico': [
                    "/mexico/arquitectura.jpeg",     // Mexico architecture
                    "/mexico/flags.jpeg",             // Mexican flags
                    "/mexico/la_luchadora_mexicana.jpeg", // Mexican culture
                    "/mexico/mexico_city.jpeg",       // Mexico City
                    "/mexico/mexico_variety.jpeg",    // Mexico variety
                    "/mexico/mexico_villa.jpeg",      // Mexico villa/resort
                    "/mexico/san_miguel.jpeg",        // San Miguel de Allende
                    "/mexico/viva_mexico.jpeg"        // Viva Mexico celebration
                  ]
                };
                
                // Get images for the destination, default to Mexico if not found
                const images = destinationImages[country] || destinationImages['mexico'];
                
                // Rotate based on trip ID to ensure variety
                const imageIndex = (trip.id - 1) % images.length;
                return images[imageIndex];
              })();
              
              return imageSrc;
            })()}
            alt={trip.title || `${trip.departure_city} to ${trip.destination}`}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            onError={(e) => {
              // Fallback to random image from public/mexico folder
              const fallbackImages = [
                "/mexico/arquitectura.jpeg",
                "/mexico/flags.jpeg", 
                "/mexico/la_luchadora_mexicana.jpeg",
                "/mexico/mexico_city.jpeg",
                "/mexico/mexico_variety.jpeg",
                "/mexico/mexico_villa.jpeg",
                "/mexico/san_miguel.jpeg",
                "/mexico/viva_mexico.jpeg"
              ];
              const randomIndex = Math.floor(Math.random() * fallbackImages.length);
              e.target.src = fallbackImages[randomIndex];
            }}
          />
          <div className="absolute inset-0" style={{ background: `linear-gradient(to top, ${BACKGROUND_PRIMARY_ALPHA_50}, transparent)` }} />
          <div className="absolute bottom-4 right-4">
            <StatusBadge status={trip.status} />
          </div>
          {featured && (
            <div className="absolute top-4 right-4">
              <span 
                className="px-3 py-1 rounded-full text-[10px] font-sans font-semibold uppercase tracking-wider"
                style={{ 
                  background: GRADIENTS.ACCENT_PRIMARY, 
                  color: COMPONENTS.BUTTON_PRIMARY_TEXT 
                }}
              >
                Featured
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className={`p-8 ${featured ? "md:w-3/5 md:p-10 flex flex-col justify-center" : ""}`}>
          <h3 
            className="font-serif text-2xl md:text-3xl mb-4 transition-colors duration-300"
            style={{ 
              color: TEXT_PRIMARY,
            }}
            onMouseEnter={(e) => e.target.style.color = ACCENT_PRIMARY}
            onMouseLeave={(e) => e.target.style.color = TEXT_PRIMARY}
          >
            Departing<br />{trip.departure_city}
          </h3>

          <div className="space-y-3 mb-6">
            <div className="flex items-center gap-3 text-sm">
              <MapPin className="w-4 h-4" style={{ color: ACCENT_PRIMARY }} />
              <span style={{ color: TEXT_PRIMARY_ALPHA_70 }}>{trip.destination}</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Calendar className="w-4 h-4" style={{ color: ACCENT_PRIMARY }} />
              <span style={{ color: TEXT_PRIMARY_ALPHA_70 }}>
                {trip.departure_date ? format(new Date(trip.departure_date), "d MMM") : "TBD"} –{" "}
                {trip.return_date ? format(new Date(trip.return_date), "d MMM yyyy") : "TBD"}
              </span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Users className="w-4 h-4" style={{ color: ACCENT_PRIMARY }} />
              <span style={{ color: TEXT_PRIMARY_ALPHA_70 }}>
                {seatsLeft > 0 ? `${seatsLeft} seats remaining` : "Fully booked"}
              </span>
            </div>
          </div>

          {/* Inclusions preview */}
          {trip.inclusions && trip.inclusions.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {trip.inclusions.slice(0, 3).map((inc, i) => (
                <span
                  key={i}
                  className="px-3 py-1 rounded-full text-[11px] font-sans border"
                  style={{ 
                    backgroundColor: ACCENT_PRIMARY_ALPHA_20, 
                    color: ACCENT_PRIMARY,
                    borderColor: BORDERS.ACCENT_SUBTLE
                  }}
                >
                  {inc}
                </span>
              ))}
              {trip.inclusions.length > 3 && (
                <span 
                  className="px-3 py-1 rounded-full text-[11px] font-sans border"
                  style={{ 
                    backgroundColor: TEXT_PRIMARY_ALPHA_10, 
                    color: TEXT_PRIMARY_ALPHA_50,
                    borderColor: BORDERS.TEXT_SUBTLE
                  }}
                >
                  +{trip.inclusions.length - 3} more
                </span>
              )}
            </div>
          )}

          <Link
            to={createPageUrl("Booking")}
            className="inline-flex items-center gap-3 px-6 py-3 rounded-full text-sm font-sans font-semibold transition-all duration-300 shadow-lg group/btn"
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
            Begin Medical Assessment
            <ArrowRight 
              className="w-4 h-4 transition-transform duration-300" 
              style={{ transform: 'translateX(0)' }}
              onMouseEnter={(e) => e.target.style.transform = 'translateX(4px)'}
              onMouseLeave={(e) => e.target.style.transform = 'translateX(0)'}
            />
          </Link>
          
          <p className="text-xs mt-3 text-center" style={{ color: TEXT_PRIMARY_ALPHA_50 }}>
            Available to medically approved patients
          </p>
        </div>
      </div>
    </motion.div>
  );
}