import React from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "../../utils";
import { motion } from "framer-motion";
import { MapPin, Calendar, Users, Plane, ChevronRight } from "lucide-react";
import StatusBadge from "./StatusBadge";
import { format } from "date-fns";

export default function TripCard({ trip, index = 0 }) {
  const departureDate = trip.departure_date ? format(new Date(trip.departure_date), "d MMM yyyy") : "TBC";
  const returnDate = trip.return_date ? format(new Date(trip.return_date), "d MMM yyyy") : "TBC";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
    >
      <div className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-500 border border-[#B8D963]/5 overflow-hidden group">
        {/* Top Accent Bar */}
        <div className="h-1 bg-gradient-to-r from-[#0E7C8C] via-[#1BA8B8] to-[#B8D963]" />

        <div className="p-6 lg:p-8">
          {/* Header */}
          <div className="flex items-start justify-between mb-6">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <MapPin className="w-4 h-4 text-[#B8D963]" />
                <span className="text-sm text-[#7A9BA8] font-medium" style={{ fontFamily: 'Inter, sans-serif' }}>
                  Departing from
                </span>
              </div>
              <h3 className="text-2xl font-bold text-[#0E7C8C]" style={{ fontFamily: 'Playfair Display, serif' }}>
                {trip.departure_city}
              </h3>
              <p className="text-sm text-[#1BA8B8] font-medium mt-1">→ {trip.destination}</p>
            </div>
            <StatusBadge status={trip.status} />
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-[#F4F1EB] rounded-xl p-4">
              <div className="flex items-center gap-2 mb-1">
                <Calendar className="w-3.5 h-3.5 text-[#7C848E]" />
                <span className="text-xs text-[#7C848E] font-medium">Departure</span>
              </div>
              <p className="text-sm font-semibold text-[#0F1C2E]">{departureDate}</p>
            </div>
            <div className="bg-[#F4F1EB] rounded-xl p-4">
              <div className="flex items-center gap-2 mb-1">
                <Calendar className="w-3.5 h-3.5 text-[#7C848E]" />
                <span className="text-xs text-[#7C848E] font-medium">Return</span>
              </div>
              <p className="text-sm font-semibold text-[#0F1C2E]">{returnDate}</p>
            </div>
          </div>

          {/* Travelers Count */}
          <div className="flex items-center gap-3 mb-6 p-4 rounded-xl bg-[#0E7C8C]/[0.02] border border-[#0E7C8C]/5">
            <Users className="w-4 h-4 text-[#1BA8B8]" />
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-sm text-[#7A9BA8]">Travelers confirmed</span>
                <span className="text-sm font-semibold text-[#0E7C8C]">
                  {trip.confirmed_count} joined
                </span>
              </div>
              <div className="w-full bg-[#0E7C8C]/5 rounded-full h-1.5">
                <div
                  className="h-1.5 rounded-full transition-all duration-700 bg-gradient-to-r from-[#1BA8B8] to-[#B8D963]"
                  style={{ width: `${Math.min((trip.confirmed_count / 10) * 100, 100)}%` }}
                />
              </div>
            </div>
          </div>

          {/* Price & Includes */}
          <div className="flex items-end justify-between mb-6">
            <div>
              <span className="text-xs text-[#7A9BA8] uppercase tracking-wider">From</span>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-bold text-[#0E7C8C]" style={{ fontFamily: 'Playfair Display, serif' }}>
                  ${trip.price_nzd?.toLocaleString()}
                </span>
                <span className="text-sm text-[#7A9BA8]">NZD</span>
              </div>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-[#7A9BA8]">
              <Plane className="w-3.5 h-3.5" />
              <span>Flights included</span>
            </div>
          </div>

          {/* CTA */}
          {trip.status !== "closed" && (
            <Link
              to={createPageUrl("Booking") + `?trip=${trip.id}`}
              className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#0F1C2E] text-white text-sm font-semibold hover:bg-[#1a2d45] transition-all duration-300 group-hover:shadow-lg group-hover:shadow-[#0F1C2E]/15"
            >
              {trip.status === "waitlist" ? "Join Waitlist" : "Reserve Seat"}
              <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          )}
        </div>
      </div>
    </motion.div>
  );
}