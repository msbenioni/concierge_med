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
  const priceDisplay = `$${(trip.price || 0).toLocaleString()} USD`;

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
            src={trip.image_url || (() => {
              const imageMap = {
                1: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=600&q=80&auto=format&fit=crop",
                2: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80&auto=format&fit=crop",
                3: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=600&q=80&auto=format&fit=crop",
                4: "https://images.unsplash.com/photo-1571003123894-1f0e994e8752?w=600&q=80&auto=format&fit=crop"
              };
              return imageMap[trip.id] || imageMap[1];
            })()}
            alt={trip.title || `${trip.departure_city} to ${trip.destination}`}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            onError={(e) => {
              e.target.src = `https://picsum.photos/600/400?random=${trip.id || 1}`;
            }}
          />
          <div className="absolute inset-0" style={{ background: `linear-gradient(to top, ${BACKGROUND_PRIMARY_ALPHA_50}, transparent)` }} />
          <div className="absolute top-4 left-4">
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
            {trip.title || `${trip.departure_city} Medical Journey`}
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

          <div className="flex items-center justify-between pt-6" style={{ borderTop: `1px solid ${BORDERS.TEXT_SUBTLE}` }}>
            <div>
              <span className="text-xs font-sans uppercase tracking-wider" style={{ color: TEXT_PRIMARY_ALPHA_50 }}>Concierge Fee</span>
              <p className="text-xl font-serif font-semibold" style={{ color: TEXT_PRIMARY }}>{priceDisplay}</p>
            </div>
            <Link
              to={createPageUrl(`Booking?trip=${trip.id}`)}
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
              Reserve
              <ArrowRight 
                className="w-4 h-4 transition-transform duration-300" 
                style={{ transform: 'translateX(0)' }}
                onMouseEnter={(e) => e.target.style.transform = 'translateX(4px)'}
                onMouseLeave={(e) => e.target.style.transform = 'translateX(0)'}
              />
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}