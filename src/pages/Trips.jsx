import React from "react";
import { motion } from "framer-motion";
import { Info, Loader2 } from "lucide-react";
import TripCard from "../components/compass-connect/TripCard";
import CTASection from "../components/compass-connect/CTASection";
import DisclaimerBlock from "../components/compass-connect/DisclaimerBlock";

export default function Trips() {
  // Mock data for demonstration
  const mockTrips = [
    {
      id: 1,
      departure_city: "Auckland",
      destination: "Tijuana, Mexico",
      departure_date: "2024-03-15",
      return_date: "2024-03-22",
      confirmed_count: 6,
      min_travelers: 8,
      price_nzd: 3500,
      status: "available"
    },
    {
      id: 2,
      departure_city: "Sydney",
      destination: "Bangkok, Thailand",
      departure_date: "2024-04-12",
      return_date: "2024-04-19",
      confirmed_count: 3,
      min_travelers: 8,
      price_nzd: 3500,
      status: "available"
    },
    {
      id: 3,
      departure_city: "Melbourne",
      destination: "Seoul, South Korea",
      departure_date: "2024-05-10",
      return_date: "2024-05-17",
      confirmed_count: 9,
      min_travelers: 8,
      price_nzd: 3500,
      status: "waitlist"
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
            <span className="text-xs uppercase tracking-[0.2em] text-[#FF8C42] font-semibold">
              Upcoming Departures
            </span>
            <h1
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#0F1C2E] mt-3"
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              Group Trips
            </h1>
            <p className="mt-5 text-lg text-[#7C848E] leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>
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
              <p className="text-[#7C848E]" style={{ fontFamily: 'Inter, sans-serif' }}>
                No trips available at the moment. Check back soon.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Disclaimer */}
      <section className="py-12 lg:py-16">
        <div className="max-w-3xl mx-auto px-5 sm:px-8">
          <DisclaimerBlock />
        </div>
      </section>

      <CTASection />
    </div>
  );
}