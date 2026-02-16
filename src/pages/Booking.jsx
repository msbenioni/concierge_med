import React from "react";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import MultiStepBookingForm from "../components/atlas/MultiStepBookingForm";
import DisclaimerBlock from "../components/atlas/DisclaimerBlock";

export default function Booking() {
  const urlParams = new URLSearchParams(window.location.search);
  const preselectedTripId = urlParams.get("trip") || "";

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
        <div className="max-w-2xl mx-auto px-5 sm:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="text-xs uppercase tracking-[0.2em] text-[#FF8C42] font-semibold">
              Reserve Your Seat
            </span>
            <h1
              className="text-4xl sm:text-5xl font-bold text-[#0F1C2E] mt-3"
              style={{ fontFamily: "Playfair Display, serif" }}
            >
              Book Your Trip
            </h1>
            <p className="mt-4 text-[#7C848E] max-w-lg mx-auto" style={{ fontFamily: "Inter, sans-serif" }}>
              Complete the steps below to reserve your seat on an upcoming group trip.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Form */}
      <section className="py-8 lg:py-12">
        <div className="max-w-2xl mx-auto px-5 sm:px-8">
          {isLoading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="w-8 h-8 text-[#FF8C42] animate-spin" />
            </div>
          ) : (
            <MultiStepBookingForm trips={trips} preselectedTripId={preselectedTripId} />
          )}
        </div>
      </section>

      {/* Disclaimer */}
      <section className="py-12 lg:py-16">
        <div className="max-w-2xl mx-auto px-5 sm:px-8">
          <DisclaimerBlock />
        </div>
      </section>
    </div>
  );
}