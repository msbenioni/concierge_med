import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft, User, Plane, Settings, CheckCircle2, ExternalLink, Copy } from "lucide-react";
import { Link } from "react-router-dom";
import { createPageUrl } from "../utils";
import { TRIP_CONFIG, TRIP_STATUS, BOOKING_STATUS, USER_STATUS, HOSPITAL_REF_PREFIX } from "../constants";
import { 
  BACKGROUND_PRIMARY, 
  TEXT_PRIMARY, 
  ACCENT_PRIMARY, 
  ACCENT_SECONDARY,
  TEXT_PRIMARY_ALPHA_70, 
  TEXT_PRIMARY_ALPHA_60, 
  TEXT_PRIMARY_ALPHA_50, 
  TEXT_PRIMARY_ALPHA_20, 
  TEXT_PRIMARY_ALPHA_80,
  ACCENT_PRIMARY_ALPHA_20, 
  ACCENT_PRIMARY_ALPHA_10,
  GRADIENTS, 
  GLASS, 
  SHADOWS,
  COMPONENTS,
  BORDERS
} from "../constants/colors";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const STEP_LABELS = [
  { icon: User, label: "Traveler Details" },
  { icon: Plane, label: "Select Journey" },
  { icon: Settings, label: "Preferences" },
  { icon: CheckCircle2, label: "Confirmation" },
];

function generateBookingRef() {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = "CC-";
  for (let i = 0; i < 6; i++) result += chars.charAt(Math.floor(Math.random() * chars.length));
  return result;
}

export default function Booking() {
  const [step, setStep] = useState(0);
  const [bookingResult, setBookingResult] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    country: "",
    emergency_contact_name: "",
    emergency_contact_phone: "",
    trip_id: "",
    travelers_count: 4,
    preferred_date: "",
    rooming_preference: "no_preference",
    mobility_needs: "",
    dietary_notes: "",
    special_requests: "",
  });

  const urlParams = new URLSearchParams(window.location.search);
  const preselectedTripId = urlParams.get("trip") || "";

  // Mock trips data
  const mockTrips = [
    {
      id: 1,
      title: "Auckland Medical Journey",
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
      title: "Sydney Medical Journey",
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
      title: "Melbourne Medical Journey",
      departure_city: "Melbourne",
      destination: TRIP_CONFIG.DESTINATION,
      departure_date: "2024-05-10",
      return_date: "2024-05-17",
      confirmed_count: 9,
      min_travelers: TRIP_CONFIG.MIN_TRAVELERS,
      price: TRIP_CONFIG.DEFAULT_PRICE,
      status: TRIP_STATUS.AVAILABLE,
      hospital_approved: true,
      hospital_reference: "MBC-2024-0510"
    }
  ];

  const selectedTrip = mockTrips.find((t) => t.id === parseInt(formData.trip_id));

  useEffect(() => {
    if (preselectedTripId) {
      setFormData(prev => ({ ...prev, trip_id: preselectedTripId }));
    }
  }, [preselectedTripId]);

  const updateFormData = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const nextStep = () => setStep((s) => Math.min(s + 1, 3));
  const prevStep = () => setStep((s) => Math.max(s - 1, 0));

  const onSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const ref = generateBookingRef();
    const booking = {
      ...formData,
      booking_ref: ref,
      trip_title: selectedTrip?.title || "Unknown Journey",
      travelers_count: Number(formData.travelers_count),
      booking_status: "new",
      payment_status: "unpaid",
      flight_status: "not_started",
      accommodation_status: "not_started",
      transfers_status: "not_started",
      questionnaire_complete: false,
    };
    
    setBookingResult(booking);
    setStep(3);
    setSubmitting(false);
  };

  const validateStep = () => {
    if (step === 0) return formData.name && formData.email && formData.phone && formData.country && formData.emergency_contact_name && formData.emergency_contact_phone;
    if (step === 1) return formData.trip_id && formData.travelers_count >= 1;
    return true;
  };

  return (
    <div style={{ backgroundColor: BACKGROUND_PRIMARY, color: TEXT_PRIMARY }}>
      <div className="max-w-3xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
          <span className="text-[11px] font-sans font-semibold uppercase tracking-[0.3em] mb-4 block" style={{ color: ACCENT_PRIMARY }}>
            Ultra-Premium Concierge Booking
          </span>
          <h1 className="font-serif text-4xl md:text-5xl mb-4" style={{ color: TEXT_PRIMARY }}>
            Reserve Your Journey
          </h1>
          <p className="text-lg" style={{ color: TEXT_PRIMARY_ALPHA_70 }}>
            Complete the form below to reserve your spot. Medical care is provided by partner hospitals.
          </p>
        </motion.div>

        {/* Step indicator */}
        <div className="flex items-center gap-2 mb-10 overflow-x-auto pb-2">
          {STEP_LABELS.map((s, i) => (
            <div key={i} className="flex items-center gap-2">
              <div
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-sans font-medium transition-all`}
                style={{
                  background: i === step ? GRADIENTS.ACCENT_PRIMARY : 
                           i < step ? ACCENT_PRIMARY_ALPHA_20 : COMPONENTS.BUTTON_SECONDARY,
                  color: i === step ? COMPONENTS.BUTTON_PRIMARY_TEXT : 
                         i < step ? ACCENT_PRIMARY : TEXT_PRIMARY
                }}
              >
                <s.icon className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{s.label}</span>
                <span className="sm:hidden">{i + 1}</span>
              </div>
              {i < STEP_LABELS.length - 1 && (
                <div style={{ width: '32px', height: '1px', background: i < step ? ACCENT_PRIMARY : BORDERS.TEXT_MEDIUM }} />
              )}
            </div>
          ))}
        </div>

        <form onSubmit={onSubmit}>
          <AnimatePresence mode="wait">
            {/* Step 0: Traveler Details */}
            {step === 0 && (
              <motion.div key="s0" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="rounded-3xl p-8 shadow-2xl space-y-6" style={{ backgroundColor: GLASS.CARD_BACKGROUND, backdropFilter: 'blur(16px)', border: `1px solid ${BORDERS.ACCENT_SUBTLE}` }}>
                <h2 className="font-serif text-2xl mb-6" style={{ color: TEXT_PRIMARY }}>Traveler Details</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label className="text-xs font-sans" style={{ color: TEXT_PRIMARY_ALPHA_70 }}>Full Name *</Label>
                    <Input value={formData.name} onChange={(e) => updateFormData("name", e.target.value)} placeholder="Jane Doe" className="mt-1.5" style={{ backgroundColor: COMPONENTS.INPUT_BACKGROUND, border: `1px solid ${COMPONENTS.INPUT_BORDER}`, color: COMPONENTS.INPUT_TEXT }} />
                  </div>
                  <div>
                    <Label className="text-xs font-sans" style={{ color: TEXT_PRIMARY_ALPHA_70 }}>Email *</Label>
                    <Input type="email" value={formData.email} onChange={(e) => updateFormData("email", e.target.value)} placeholder="jane@example.com" className="mt-1.5" style={{ backgroundColor: COMPONENTS.INPUT_BACKGROUND, border: `1px solid ${COMPONENTS.INPUT_BORDER}`, color: COMPONENTS.INPUT_TEXT }} />
                  </div>
                  <div>
                    <Label className="text-xs font-sans" style={{ color: TEXT_PRIMARY_ALPHA_70 }}>Phone *</Label>
                    <Input value={formData.phone} onChange={(e) => updateFormData("phone", e.target.value)} placeholder="+64 21 000 0000" className="mt-1.5" style={{ backgroundColor: COMPONENTS.INPUT_BACKGROUND, border: `1px solid ${COMPONENTS.INPUT_BORDER}`, color: COMPONENTS.INPUT_TEXT }} />
                  </div>
                  <div>
                    <Label className="text-xs font-sans" style={{ color: TEXT_PRIMARY_ALPHA_70 }}>Country *</Label>
                    <Input value={formData.country} onChange={(e) => updateFormData("country", e.target.value)} placeholder="New Zealand" className="mt-1.5" style={{ backgroundColor: COMPONENTS.INPUT_BACKGROUND, border: `1px solid ${COMPONENTS.INPUT_BORDER}`, color: COMPONENTS.INPUT_TEXT }} />
                  </div>
                </div>
                <div className="pt-6" style={{ borderTop: `1px solid ${BORDERS.TEXT_SUBTLE}` }}>
                  <p className="text-xs mb-4" style={{ color: TEXT_PRIMARY_ALPHA_50 }}>Emergency Contact</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label className="text-xs font-sans" style={{ color: TEXT_PRIMARY_ALPHA_70 }}>Emergency Contact Name *</Label>
                      <Input value={formData.emergency_contact_name} onChange={(e) => updateFormData("emergency_contact_name", e.target.value)} className="mt-1.5" style={{ backgroundColor: COMPONENTS.INPUT_BACKGROUND, border: `1px solid ${COMPONENTS.INPUT_BORDER}`, color: COMPONENTS.INPUT_TEXT }} />
                    </div>
                    <div>
                      <Label className="text-xs font-sans" style={{ color: TEXT_PRIMARY_ALPHA_70 }}>Emergency Contact Phone *</Label>
                      <Input value={formData.emergency_contact_phone} onChange={(e) => updateFormData("emergency_contact_phone", e.target.value)} className="mt-1.5" style={{ backgroundColor: COMPONENTS.INPUT_BACKGROUND, border: `1px solid ${COMPONENTS.INPUT_BORDER}`, color: COMPONENTS.INPUT_TEXT }} />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 1: Select Journey */}
            {step === 1 && (
              <motion.div key="s1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="rounded-3xl p-8 shadow-2xl space-y-6" style={{ backgroundColor: GLASS.CARD_BACKGROUND, backdropFilter: 'blur(16px)', border: `1px solid ${ACCENT_PRIMARY_ALPHA_20}` }}>
                <h2 className="font-serif text-2xl mb-6" style={{ color: TEXT_PRIMARY }}>Select Your Journey</h2>
                <div>
                  <Label className="text-xs font-sans" style={{ color: TEXT_PRIMARY_ALPHA_70 }}>Journey *</Label>
                  <Select value={formData.trip_id} onValueChange={(v) => updateFormData("trip_id", v)}>
                    <SelectTrigger className="mt-1.5" style={{ backgroundColor: COMPONENTS.BUTTON_SECONDARY, borderColor: BORDERS.TEXT_SUBTLE, color: TEXT_PRIMARY }}><SelectValue placeholder="Choose a journey" /></SelectTrigger>
                    <SelectContent style={{ backgroundColor: GLASS.CARD_BACKGROUND, borderColor: ACCENT_PRIMARY_ALPHA_20 }}>
                      {mockTrips.map((t) => (
                        <SelectItem key={t.id} value={t.id.toString()} style={{ color: TEXT_PRIMARY }}>
                          {t.title} — {t.destination}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                {selectedTrip && (
                  <div className="rounded-2xl p-4 text-sm border" style={{ backgroundColor: ACCENT_PRIMARY_ALPHA_10, borderColor: ACCENT_PRIMARY_ALPHA_20, color: TEXT_PRIMARY_ALPHA_80 }}>
                    <p className="font-medium" style={{ color: TEXT_PRIMARY }}>{selectedTrip.title}</p>
                    <p>{selectedTrip.destination} • Min {selectedTrip.min_travelers} travelers</p>
                    <p className="font-medium mt-1" style={{ color: ACCENT_PRIMARY }}>
                      ${selectedTrip.price.toLocaleString()} USD concierge fee
                    </p>
                  </div>
                )}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label className="text-xs font-sans" style={{ color: TEXT_PRIMARY_ALPHA_70 }}>Number of Travelers *</Label>
                    <Input type="number" min="1" value={formData.travelers_count} onChange={(e) => updateFormData("travelers_count", parseInt(e.target.value) || 1)} className="mt-1.5" style={{ backgroundColor: COMPONENTS.BUTTON_SECONDARY, borderColor: BORDERS.TEXT_SUBTLE, color: TEXT_PRIMARY }} />
                    <p className="text-[11px] mt-1" style={{ color: TEXT_PRIMARY_ALPHA_50 }}>Min. 4 travelers per cohort to proceed</p>
                  </div>
                  <div>
                    <Label className="text-xs font-sans" style={{ color: TEXT_PRIMARY_ALPHA_70 }}>Preferred Travel Date</Label>
                    <Input type="date" value={formData.preferred_date} onChange={(e) => updateFormData("preferred_date", e.target.value)} className="mt-1.5" style={{ backgroundColor: COMPONENTS.BUTTON_SECONDARY, borderColor: BORDERS.TEXT_SUBTLE, color: TEXT_PRIMARY }} />
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 2: Preferences */}
            {step === 2 && (
              <motion.div key="s2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="rounded-3xl p-8 shadow-2xl space-y-6" style={{ backgroundColor: GLASS.CARD_BACKGROUND, backdropFilter: 'blur(16px)', border: `1px solid ${ACCENT_PRIMARY_ALPHA_20}` }}>
                <h2 className="font-serif text-2xl mb-6" style={{ color: TEXT_PRIMARY }}>Logistics & Preferences</h2>
                <div>
                  <Label className="text-xs font-sans" style={{ color: TEXT_PRIMARY_ALPHA_70 }}>Rooming Preference</Label>
                  <Select value={formData.rooming_preference} onValueChange={(v) => updateFormData("rooming_preference", v)}>
                    <SelectTrigger className="mt-1.5" style={{ backgroundColor: COMPONENTS.BUTTON_SECONDARY, borderColor: BORDERS.TEXT_SUBTLE, color: TEXT_PRIMARY }}><SelectValue /></SelectTrigger>
                    <SelectContent style={{ backgroundColor: GLASS.CARD_BACKGROUND, borderColor: ACCENT_PRIMARY_ALPHA_20 }}>
                      <SelectItem value="single" style={{ color: TEXT_PRIMARY }}>Single Room</SelectItem>
                      <SelectItem value="shared" style={{ color: TEXT_PRIMARY }}>Shared Room</SelectItem>
                      <SelectItem value="no_preference" style={{ color: TEXT_PRIMARY }}>No Preference</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-xs font-sans" style={{ color: TEXT_PRIMARY_ALPHA_70 }}>Mobility Needs</Label>
                  <Textarea value={formData.mobility_needs} onChange={(e) => updateFormData("mobility_needs", e.target.value)} placeholder="Any mobility requirements we should know about..." className="mt-1.5 h-20" style={{ backgroundColor: COMPONENTS.BUTTON_SECONDARY, borderColor: BORDERS.TEXT_SUBTLE, color: TEXT_PRIMARY }} />
                </div>
                <div>
                  <Label className="text-xs font-sans" style={{ color: TEXT_PRIMARY_ALPHA_70 }}>Dietary Notes</Label>
                  <Textarea value={formData.dietary_notes} onChange={(e) => updateFormData("dietary_notes", e.target.value)} placeholder="Allergies, dietary restrictions..." className="mt-1.5 h-20" style={{ backgroundColor: COMPONENTS.BUTTON_SECONDARY, borderColor: BORDERS.TEXT_SUBTLE, color: TEXT_PRIMARY }} />
                </div>
                <div>
                  <Label className="text-xs font-sans" style={{ color: TEXT_PRIMARY_ALPHA_70 }}>Special Requests</Label>
                  <Textarea value={formData.special_requests} onChange={(e) => updateFormData("special_requests", e.target.value)} placeholder="Anything else you'd like us to know..." className="mt-1.5 h-20" style={{ backgroundColor: COMPONENTS.BUTTON_SECONDARY, borderColor: BORDERS.TEXT_SUBTLE, color: TEXT_PRIMARY }} />
                </div>

                {/* Partner Clinic Form link */}
                <div className="rounded-2xl p-6 border" style={{ backgroundColor: ACCENT_PRIMARY_ALPHA_10, borderColor: ACCENT_PRIMARY_ALPHA_20 }}>
                  <h3 className="font-serif text-lg mb-3" style={{ color: TEXT_PRIMARY }}>Partner Clinic Form</h3>
                  <p className="text-sm mb-4" style={{ color: TEXT_PRIMARY_ALPHA_70 }}>
                    The partner hospital requires you to complete their medical questionnaire.
                    This is the hospital's own form — Compass Connect does not process or view medical information.
                  </p>
                  <a
                    href="#"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-sans font-medium transition-all"
                    style={{ borderColor: ACCENT_PRIMARY, color: ACCENT_PRIMARY }}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = ACCENT_PRIMARY;
                      e.target.style.color = TEXT_PRIMARY;
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = 'transparent';
                      e.target.style.color = ACCENT_PRIMARY;
                    }}
                  >
                    Open Partner Clinic Form <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                  <p className="text-[11px] mt-2" style={{ color: TEXT_PRIMARY_ALPHA_50 }}>
                    You can complete this after booking. Our concierge team will follow up.
                  </p>
                </div>
              </motion.div>
            )}

            {/* Step 3: Confirmation */}
            {step === 3 && bookingResult && (
              <motion.div key="s3" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="space-y-8">
                <div className="rounded-3xl p-8 shadow-2xl text-center" style={{ backgroundColor: GLASS.CARD_BACKGROUND, backdropFilter: 'blur(16px)', border: `1px solid ${ACCENT_PRIMARY_ALPHA_20}` }}>
                  <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6" style={{ background: `linear-gradient(to right, ${ACCENT_PRIMARY}, ${ACCENT_SECONDARY})` }}>
                    <CheckCircle2 className="w-8 h-8" style={{ color: TEXT_PRIMARY }} />
                  </div>
                  <h2 className="font-serif text-3xl mb-2" style={{ color: TEXT_PRIMARY }}>Journey Reserved</h2>
                  <p className="mb-4" style={{ color: TEXT_PRIMARY_ALPHA_70 }}>Your booking has been submitted successfully.</p>
                  <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border" style={{ backgroundColor: ACCENT_PRIMARY_ALPHA_10, borderColor: ACCENT_PRIMARY_ALPHA_20 }}>
                    <span className="text-sm" style={{ color: TEXT_PRIMARY_ALPHA_50 }}>Booking Reference:</span>
                    <span className="font-mono font-semibold" style={{ color: TEXT_PRIMARY }}>{bookingResult.booking_ref}</span>
                    <button
                      type="button"
                      onClick={() => navigator.clipboard.writeText(bookingResult.booking_ref)}
                      style={{ color: ACCENT_PRIMARY }}
                      onMouseEnter={(e) => e.target.style.color = ACCENT_SECONDARY}
                      onMouseLeave={(e) => e.target.style.color = ACCENT_PRIMARY}
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Next Steps */}
                <div className="rounded-3xl p-8 shadow-2xl" style={{ backgroundColor: GLASS.CARD_BACKGROUND, backdropFilter: 'blur(16px)', border: `1px solid ${ACCENT_PRIMARY_ALPHA_20}` }}>
                  <h3 className="font-serif text-xl mb-6" style={{ color: TEXT_PRIMARY }}>What happens next</h3>
                  <div className="space-y-4">
                    <div className="flex gap-3">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 border" style={{ backgroundColor: ACCENT_PRIMARY_ALPHA_10, borderColor: ACCENT_PRIMARY_ALPHA_20 }}>
                        <span className="font-semibold text-sm" style={{ color: ACCENT_PRIMARY }}>1</span>
                      </div>
                      <div>
                        <p className="font-medium" style={{ color: TEXT_PRIMARY }}>Review your booking</p>
                        <p className="text-sm" style={{ color: TEXT_PRIMARY_ALPHA_60 }}>Check your email for booking confirmation</p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 border" style={{ backgroundColor: ACCENT_PRIMARY_ALPHA_10, borderColor: ACCENT_PRIMARY_ALPHA_20 }}>
                        <span className="font-semibold text-sm" style={{ color: ACCENT_PRIMARY }}>2</span>
                      </div>
                      <div>
                        <p className="font-medium" style={{ color: TEXT_PRIMARY }}>Complete medical questionnaire</p>
                        <p className="text-sm" style={{ color: TEXT_PRIMARY_ALPHA_60 }}>Partner hospital will send you their medical form</p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 border" style={{ backgroundColor: ACCENT_PRIMARY_ALPHA_10, borderColor: ACCENT_PRIMARY_ALPHA_20 }}>
                        <span className="font-semibold text-sm" style={{ color: ACCENT_PRIMARY }}>3</span>
                      </div>
                      <div>
                        <p className="font-medium" style={{ color: TEXT_PRIMARY }}>Payment coordination</p>
                        <p className="text-sm" style={{ color: TEXT_PRIMARY_ALPHA_60 }}>We'll send payment links for concierge services</p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 border" style={{ backgroundColor: ACCENT_PRIMARY_ALPHA_10, borderColor: ACCENT_PRIMARY_ALPHA_20 }}>
                        <span className="font-semibold text-sm" style={{ color: ACCENT_PRIMARY }}>4</span>
                      </div>
                      <div>
                        <p className="font-medium" style={{ color: TEXT_PRIMARY }}>Travel preparation</p>
                        <p className="text-sm" style={{ color: TEXT_PRIMARY_ALPHA_60 }}>Our team coordinates all logistics for your journey</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation */}
          {step < 3 && (
            <div className="flex justify-between items-center mt-8">
              {step > 0 ? (
                <Button type="button" variant="outline" onClick={prevStep} className="rounded-full px-6 gap-2 bg-white/10 border-white/20 text-white hover:bg-white/20">
                  <ArrowLeft className="w-4 h-4" /> Back
                </Button>
              ) : <div />}
              {step < 2 ? (
                <Button
                  type="button"
                  onClick={nextStep}
                  disabled={!validateStep()}
                  className="rounded-full px-8 gap-2 font-semibold shadow-lg"
                  style={{ 
                    background: `linear-gradient(to right, ${ACCENT_PRIMARY}, ${ACCENT_SECONDARY})`, 
                    color: TEXT_PRIMARY 
                  }}
                  onMouseEnter={(e) => e.target.style.opacity = '0.9'}
                  onMouseLeave={(e) => e.target.style.opacity = '1'}
                >
                  Continue <ArrowRight className="w-4 h-4" />
                </Button>
              ) : (
                <Button
                  type="submit"
                  disabled={submitting}
                  className="rounded-full px-8 gap-2 font-semibold shadow-lg"
                  style={{ 
                    background: `linear-gradient(to right, ${ACCENT_PRIMARY}, ${ACCENT_SECONDARY})`, 
                    color: TEXT_PRIMARY 
                  }}
                  onMouseEnter={(e) => e.target.style.opacity = '0.9'}
                  onMouseLeave={(e) => e.target.style.opacity = '1'}
                >
                  {submitting ? "Submitting..." : "Submit Reservation"} <ArrowRight className="w-4 h-4" />
                </Button>
              )}
            </div>
          )}
        </form>

      </div>
    </div>
  );
}