import React from "react";
import { motion } from "framer-motion";
import { Info, Loader2 } from "lucide-react";
import { TRIP_CONFIG, TRIP_STATUS } from "../constants";
import TripCard from "../components/compass-connect/TripCard";
import CTASection from "../components/compass-connect/CTASection";
import { TEXT_PRIMARY, ACCENT_PRIMARY, TEXT_PRIMARY_ALPHA_70, TEXT_PRIMARY_ALPHA_50 } from "../constants/colors";

export default function Trips() {
  // Mock data for demonstration - this would come from your admin-managed data
  const mockTrips = [
    {
      id: 1,
      departure_city: "Auckland",
      destination: TRIP_CONFIG.DESTINATION,
      departure_date: "2024-03-15",
      return_date: "2024-03-22",
      confirmed_count: 6,
      min_travelers: TRIP_CONFIG.MIN_TRAVELERS,
      price: TRIP_CONFIG.DEFAULT_PRICE,
      status: TRIP_STATUS.AVAILABLE,
      hospital_approved: true,
      hospital_reference: "MBC-2024-0315"
    },
    {
      id: 2,
      departure_city: "Sydney",
      destination: TRIP_CONFIG.DESTINATION,
      departure_date: "2024-04-12",
      return_date: "2024-04-19",
      confirmed_count: 3,
      min_travelers: TRIP_CONFIG.MIN_TRAVELERS,
      price: TRIP_CONFIG.DEFAULT_PRICE,
      status: TRIP_STATUS.AVAILABLE,
      hospital_approved: true,
      hospital_reference: "MBC-2024-0412"
    },
    {
      id: 3,
      departure_city: "Melbourne",
      destination: TRIP_CONFIG.DESTINATION,
      departure_date: "2024-05-10",
      return_date: "2024-05-17",
      confirmed_count: 9,
      min_travelers: TRIP_CONFIG.MIN_TRAVELERS,
      price: TRIP_CONFIG.DEFAULT_PRICE,
      status: TRIP_STATUS.WAITLIST,
      hospital_approved: true,
      hospital_reference: "MBC-2024-0510"
    }
  ];

  const trips = mockTrips;
  const isLoading = false;

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
            <span className="text-xs uppercase tracking-[0.2em] font-semibold" style={{ color: ACCENT_PRIMARY }}>
              Upcoming Departures
            </span>
            <h1
              className="text-4xl sm:text-5xl lg:text-6xl font-bold mt-3"
              style={{ fontFamily: 'Playfair Display, serif', color: TEXT_PRIMARY }}
            >
              Group Trips
            </h1>
            <p className="mt-5 text-lg leading-relaxed" style={{ fontFamily: 'Inter, sans-serif', color: TEXT_PRIMARY_ALPHA_70 }}>
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