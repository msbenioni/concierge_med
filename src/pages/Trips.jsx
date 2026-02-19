import React from "react";
import { motion } from "framer-motion";
import { Info } from "lucide-react";
import { TRIP_CONFIG, TRIP_STATUS } from "../constants";
import { mockTrips } from "../data/mockData";
import TripCard from "../components/compass-connect/TripCard";
import CTASection from "../components/compass-connect/CTASection";
import LoadingSpinner from "../components/compass-connect/LoadingSpinner";
import { TEXT_PRIMARY, ACCENT_PRIMARY, TEXT_PRIMARY_ALPHA_70, TEXT_PRIMARY_ALPHA_50 } from "../constants/colors";

export default function Trips() {
  const trips = mockTrips;

  return (
    <div>
      {/* Header */}
      <section className="pt-16 pb-8 lg:pt-24 lg:pb-12">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl"
          >
            <span className="text-[11px] font-sans font-semibold uppercase tracking-[0.3em] mb-4 block" style={{ color: ACCENT_PRIMARY }}>
              Upcoming Departures
            </span>
            <h1 className="font-serif text-4xl md:text-5xl mb-4" style={{ color: TEXT_PRIMARY }}>
              Travel Groups
            </h1>
            <p className="text-lg" style={{ color: TEXT_PRIMARY_ALPHA_70 }}>
              Browse upcoming group travel dates. Each trip includes return flights and full concierge support.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Trip Cards */}
      <section className="py-8 lg:py-12">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          {trips.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {trips.map((trip, i) => (
                <TripCard key={trip.id} trip={trip} index={i} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p style={{ fontFamily: 'Inter, sans-serif', color: TEXT_PRIMARY_ALPHA_50 }}>
                No trips available at the moment. Check back soon.
              </p>
            </div>
          )}
        </div>
      </section>

      <CTASection />
    </div>
  );
}