import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ChevronRight,
  ChevronLeft,
  ExternalLink,
  CheckCircle2,
  CreditCard,
  Loader2,
  Shield,
  Plane,
  Users,
  MapPin,
} from "lucide-react";
import { format } from "date-fns";
import DisclaimerBlock from "./DisclaimerBlock";
import UserDetailsForm from "./UserDetailsForm";
import { TEXT_PRIMARY, TEXT_PRIMARY_ALPHA_20, TEXT_PRIMARY_ALPHA_50, TEXT_PRIMARY_ALPHA_70, TEXT_PRIMARY_ALPHA_80, ACCENT_PRIMARY, ACCENT_PRIMARY_ALPHA_20, ACCENT_PRIMARY_ALPHA_40, BACKGROUND_PRIMARY_ALPHA_10, COMPONENTS, GLASS, BORDERS } from "../../constants/colors";

const STEPS = [
  { title: "Your Details", desc: "Provide contact information" },
  { title: "Questionnaire", desc: "Complete health assessment" },
  { title: "Hospital Quote", desc: "Confirm your quote" },
  { title: "Trip & Details", desc: "Select trip & enter details" },
  { title: "Payment", desc: "Confirm & pay" },
  { title: "Confirmation", desc: "Booking complete" },
];

export default function MultiStepBookingForm({ trips, preselectedTripId }) {
  const [step, setStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingComplete, setBookingComplete] = useState(false);
  const [form, setForm] = useState({
    // User details (step 0)
    full_name: "",
    email: "",
    phone: "",
    country: "",
    terms_accepted: false,
    user_details_submitted: false,
    
    // Questionnaire (step 1)
    completed_questionnaire: false,
    
    // Hospital quote (step 2)
    received_quote: false,
    surgery_type: "",
    quote_amount: "",
    quote_reference: "",
    
    // Trip details (step 3)
    trip_id: preselectedTripId || "",
    departure_city: "",
  });

  const updateForm = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const canProceed = () => {
    switch (step) {
      case 0:
        return form.user_details_submitted;
      case 1:
        return form.completed_questionnaire;
      case 2:
        return form.received_quote;
      case 3:
        return form.trip_id && form.departure_city;
      case 4:
        return true;
      default:
        return false;
    }
  };

  const handleQuestionnaireComplete = async (checked) => {
    updateForm("completed_questionnaire", checked);
    
    if (checked && !form.completed_questionnaire) {
      // Send notification to admin that user completed questionnaire
      const notificationData = {
        user: {
          full_name: form.full_name,
          email: form.email,
          phone: form.phone,
          country: form.country
        },
        action: "questionnaire_completed",
        timestamp: new Date().toISOString(),
        hospital_reference: "MBC-" + Date.now().toString().slice(-6)
      };
      
      console.log("NOTIFICATION: User completed questionnaire:", notificationData);
      
      // Here you would send this to your backend/admin notification system
      // This could be:
      // - Email notification to admin
      // - Database entry for admin dashboard
      // - Webhook to admin system
      // - Slack/Discord notification
    }
  };

  const handleUserDetailsSubmit = async (userData) => {
    setIsSubmitting(true);
    
    // Here you would:
    // 1. Save user details to your database
    // 2. Send notification to admin that user has submitted details
    // 3. Track that user is ready for questionnaire
    
    console.log("User details submitted:", userData);
    
    // Update form with user details
    setForm(prev => ({
      ...prev,
      ...userData,
      user_details_submitted: true
    }));
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setIsSubmitting(false);
    
    // Move to next step (questionnaire)
    setStep(step + 1);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    // Mock booking submission - replace with actual API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    console.log("Booking submitted:", {
      ...form,
      quote_amount: form.quote_amount ? Number(form.quote_amount) : undefined,
      status: "pending",
    });
    setIsSubmitting(false);
    setBookingComplete(true);
    setStep(5);
  };

  const selectedTrip = trips.find((t) => t.id === form.trip_id);

  return (
    <div className="max-w-2xl mx-auto">
      {/* Progress */}
      {step < 5 && (
        <div className="mb-10">
          <div className="flex items-center justify-between mb-4">
            {STEPS.slice(0, 5).map((s, i) => (
              <div key={i} className="flex items-center gap-2">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold transition-all duration-300"
                  style={{
                    backgroundColor: i <= step ? TEXT_PRIMARY : ACCENT_PRIMARY_ALPHA_20,
                    color: i <= step ? COMPONENTS.BUTTON_PRIMARY_TEXT : TEXT_PRIMARY_ALPHA_50
                  }}
                >
                  {i < step ? (
                    <CheckCircle2 className="w-4 h-4" />
                  ) : (
                    i + 1
                  )}
                </div>
                {i < 3 && (
                  <div
                    className="hidden sm:block w-12 lg:w-20 h-0.5 transition-all duration-300"
                    style={{
                      backgroundColor: i < step ? ACCENT_PRIMARY : ACCENT_PRIMARY_ALPHA_20
                    }}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="text-center">
            <h3
              className="text-xl font-bold"
              style={{ fontFamily: "Playfair Display, serif", color: TEXT_PRIMARY }}
            >
              {STEPS[step].title}
            </h3>
            <p className="text-sm mt-1" style={{ fontFamily: "Inter, sans-serif", color: TEXT_PRIMARY_ALPHA_50 }}>
              {STEPS[step].desc}
            </p>
          </div>
        </div>
      )}

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.2 }}
        >
          {/* Step 0: User Details */}
          {step === 0 && (
            <UserDetailsForm
              onSubmit={handleUserDetailsSubmit}
              isLoading={isSubmitting}
            />
          )}

          {/* Step 1: Questionnaire Confirmation */}
          {step === 1 && (
            <div className="rounded-2xl p-6 sm:p-8 shadow-sm" style={{ backgroundColor: GLASS.CARD_BACKGROUND, border: `1px solid ${ACCENT_PRIMARY_ALPHA_20}` }}>
              <p className="mb-6 leading-relaxed" style={{ fontFamily: "Inter, sans-serif", color: TEXT_PRIMARY_ALPHA_50 }}>
                Before booking your group travel seat, you must first complete the hospital's health questionnaire. This is assessed by Mexico Bariatric Center's medical team.
              </p>

              <a
                href="https://mexicobariatriccenter.com/health-questionnaire/?RefID=2120"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-4 rounded-xl transition-colors mb-6"
                style={{ backgroundColor: ACCENT_PRIMARY_ALPHA_20, border: `1px solid ${ACCENT_PRIMARY_ALPHA_30}` }}
                onMouseEnter={(e) => e.target.style.backgroundColor = ACCENT_PRIMARY_ALPHA_30}
                onMouseLeave={(e) => e.target.style.backgroundColor = ACCENT_PRIMARY_ALPHA_20}
              >
                <ExternalLink className="w-5 h-5" style={{ color: ACCENT_PRIMARY }} />
                <div>
                  <span className="text-sm font-semibold block" style={{ color: TEXT_PRIMARY }}>
                    Hospital Health Questionnaire
                  </span>
                  <span className="text-xs" style={{ color: TEXT_PRIMARY_ALPHA_50 }}>
                    mexicobariatriccenter.com
                  </span>
                </div>
              </a>

              <div className="flex items-start gap-3">
                <Checkbox
                  checked={form.completed_questionnaire}
                  onCheckedChange={handleQuestionnaireComplete}
                  className="mt-1"
                />
                <Label
                  className="text-sm leading-relaxed cursor-pointer"
                  style={{ color: TEXT_PRIMARY }}
                >
                  I have completed the hospital health questionnaire.
                </Label>
              </div>
            </div>
          )}

          {/* Step 2: Quote Confirmation */}
          {step === 2 && (
            <div className="rounded-2xl p-6 sm:p-8 shadow-sm" style={{ backgroundColor: GLASS.CARD_BACKGROUND, border: `1px solid ${ACCENT_PRIMARY_ALPHA_20}` }}>
              <p className="mb-6 leading-relaxed" style={{ fontFamily: "Inter, sans-serif", color: TEXT_PRIMARY_ALPHA_50 }}>
                After the hospital assesses your questionnaire, they will send you a surgery quote directly. Please confirm you have received it before proceeding.
              </p>

              <div className="flex items-start gap-3 mb-8">
                <Checkbox
                  checked={form.received_quote}
                  onCheckedChange={(checked) => updateForm("received_quote", checked)}
                  className="mt-1"
                />
                <Label
                  className="text-sm leading-relaxed cursor-pointer"
                  style={{ color: TEXT_PRIMARY }}
                >
                  I have received my surgery quote from the hospital.
                </Label>
              </div>

              {form.received_quote && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="space-y-4 pt-4"
                  style={{ borderTop: `1px solid ${ACCENT_PRIMARY_ALPHA_20}` }}
                >
                  <p className="text-xs" style={{ fontFamily: "Inter, sans-serif", color: TEXT_PRIMARY_ALPHA_50 }}>
                    Optional — for coordination purposes only. Hospital fees are paid directly to the hospital.
                  </p>
                  <div>
                    <Label className="text-sm font-medium mb-1.5 block" style={{ color: TEXT_PRIMARY }}>
                      Surgery Type
                    </Label>
                    <Input
                      type="text"
                      placeholder="e.g., Gastric Sleeve, Gastric Bypass"
                      value={form.surgery_type}
                      onChange={(e) => updateForm("surgery_type", e.target.value)}
                      className="w-full"
                    />
                  </div>

                  <div>
                    <Label className="text-sm font-medium mb-1.5 block" style={{ color: TEXT_PRIMARY }}>
                      Quote Amount (USD)
                    </Label>
                    <Input
                      type="number"
                      placeholder="e.g., 8500"
                      value={form.quote_amount}
                      onChange={(e) => updateForm("quote_amount", e.target.value)}
                      className="w-full"
                    />
                  </div>

                  <div>
                    <Label className="text-sm font-medium mb-1.5 block" style={{ color: TEXT_PRIMARY }}>
                      Hospital Reference Number
                    </Label>
                    <Input
                      type="text"
                      placeholder="e.g., MBC-123456"
                      value={form.quote_reference}
                      onChange={(e) => updateForm("quote_reference", e.target.value)}
                      className="w-full"
                    />
                  </div>
                </motion.div>
              )}
            </div>
          )}

          {/* Step 3: Trip & Personal Details */}
          {step === 3 && (
            <div className="rounded-2xl p-6 sm:p-8 shadow-sm space-y-6" style={{ backgroundColor: GLASS.CARD_BACKGROUND, border: `1px solid ${ACCENT_PRIMARY_ALPHA_20}` }}>
              <div>
                <Label className="text-sm mb-1.5 block font-semibold" style={{ color: TEXT_PRIMARY }}>Select Group Trip *</Label>
                <Select
                  value={form.trip_id}
                  onValueChange={(v) => updateForm("trip_id", v)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a trip" />
                  </SelectTrigger>
                  <SelectContent>
                    {trips
                      .filter((t) => t.status !== "closed")
                      .map((trip) => (
                        <SelectItem key={trip.id} value={trip.id}>
                          {trip.departure_city} → {trip.destination} | {format(new Date(trip.departure_date), "d MMM yyyy")}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="pt-6 space-y-4" style={{ borderTop: `1px solid ${ACCENT_PRIMARY_ALPHA_20}` }}>
                <h4 className="text-sm font-semibold" style={{ color: TEXT_PRIMARY }}>Personal Details</h4>
                <div>
                  <Label className="text-sm mb-1.5 block" style={{ color: TEXT_PRIMARY }}>Full Name *</Label>
                  <Input
                    placeholder="Your full name"
                    value={form.full_name}
                    onChange={(e) => updateForm("full_name", e.target.value)}
                  />
                </div>
                <div>
                  <Label className="text-sm mb-1.5 block" style={{ color: TEXT_PRIMARY }}>Email *</Label>
                  <Input
                    type="email"
                    placeholder="your@email.com"
                    value={form.email}
                    onChange={(e) => updateForm("email", e.target.value)}
                  />
                </div>
                <div>
                  <Label className="text-sm mb-1.5 block" style={{ color: TEXT_PRIMARY }}>Phone *</Label>
                  <Input
                    type="tel"
                    placeholder="+64 21 000 0000"
                    value={form.phone}
                    onChange={(e) => updateForm("phone", e.target.value)}
                  />
                </div>
                <div>
                  <Label className="text-sm mb-1.5 block" style={{ color: TEXT_PRIMARY }}>Departure City *</Label>
                  <Input
                    placeholder="e.g. Auckland"
                    value={form.departure_city}
                    onChange={(e) => updateForm("departure_city", e.target.value)}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Payment */}
          {step === 4 && (
            <div className="rounded-2xl p-6 sm:p-8 shadow-sm" style={{ backgroundColor: GLASS.CARD_BACKGROUND, border: `1px solid ${ACCENT_PRIMARY_ALPHA_20}` }}>
              <div className="text-center mb-8">
                <div className="w-16 h-16 mx-auto rounded-2xl flex items-center justify-center mb-4" style={{ backgroundColor: ACCENT_PRIMARY_ALPHA_20 }}>
                  <CreditCard className="w-7 h-7" style={{ color: ACCENT_PRIMARY }} />
                </div>
                <h3 className="text-2xl font-bold" style={{ fontFamily: "Playfair Display, serif", color: TEXT_PRIMARY }}>
                  Payment Summary
                </h3>
              </div>

              {/* Summary */}
              {selectedTrip && (
                <div className="rounded-xl p-5 mb-6 space-y-3" style={{ backgroundColor: BACKGROUND_PRIMARY_ALPHA_10 }}>
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="w-4 h-4" style={{ color: TEXT_PRIMARY_ALPHA_70 }} />
                    <span className="font-medium" style={{ color: TEXT_PRIMARY }}>{selectedTrip.departure_city} → {selectedTrip.destination}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Plane className="w-4 h-4" style={{ color: TEXT_PRIMARY_ALPHA_70 }} />
                    <span style={{ color: TEXT_PRIMARY }}>{format(new Date(selectedTrip.departure_date), "d MMM yyyy")} – {format(new Date(selectedTrip.return_date), "d MMM yyyy")}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Users className="w-4 h-4" style={{ color: TEXT_PRIMARY_ALPHA_70 }} />
                    <span style={{ color: TEXT_PRIMARY }}>{form.full_name}</span>
                  </div>
                </div>
              )}

              {/* Breakdown */}
              <div className="space-y-3 mb-6">
                <div className="flex justify-between items-center py-2">
                  <span className="text-sm" style={{ color: TEXT_PRIMARY_ALPHA_70 }}>Group return airfare</span>
                  <span className="text-sm font-medium" style={{ color: TEXT_PRIMARY }}>Included</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-sm" style={{ color: TEXT_PRIMARY_ALPHA_70 }}>Concierge support</span>
                  <span className="text-sm font-medium" style={{ color: TEXT_PRIMARY }}>Included</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-sm" style={{ color: TEXT_PRIMARY_ALPHA_70 }}>On-the-ground coordination</span>
                  <span className="text-sm font-medium" style={{ color: TEXT_PRIMARY }}>Included</span>
                </div>
                <div className="pt-3 flex justify-between items-center" style={{ borderTop: `1px solid ${ACCENT_PRIMARY_ALPHA_20}` }}>
                  <span className="text-base font-semibold" style={{ color: TEXT_PRIMARY }}>Total</span>
                  <span className="text-2xl font-bold" style={{ fontFamily: "Playfair Display, serif", color: TEXT_PRIMARY }}>
                    4,000
                  </span>
                </div>
              </div>

              {/* Stripe Placeholder */}
              <div className="p-5 rounded-xl border-2 border-dashed text-center mb-6" style={{ borderColor: ACCENT_PRIMARY_ALPHA_20, backgroundColor: ACCENT_PRIMARY_ALPHA_10 }}>
                <CreditCard className="w-8 h-8 mx-auto mb-2" style={{ color: ACCENT_PRIMARY_ALPHA_40 }} />
                <p className="text-sm" style={{ fontFamily: "Inter, sans-serif", color: TEXT_PRIMARY_ALPHA_70 }}>
                  Stripe payment integration will be configured here
                </p>
              </div>

              <div className="flex items-start gap-2 mb-6">
                <Shield className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: ACCENT_PRIMARY }} />
                <p className="text-xs" style={{ color: TEXT_PRIMARY_ALPHA_70 }}>
                  This fee covers airfare and concierge services only. Hospital / surgical fees are paid separately, directly to the hospital.
                </p>
              </div>

              <Button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="w-full py-6 rounded-xl font-semibold transition-all shadow-lg"
                style={{ backgroundColor: TEXT_PRIMARY, color: COMPONENTS.BUTTON_PRIMARY_TEXT }}
                onMouseEnter={(e) => e.target.style.backgroundColor = TEXT_PRIMARY_ALPHA_80}
                onMouseLeave={(e) => e.target.style.backgroundColor = TEXT_PRIMARY}
              >
                {isSubmitting ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  "Confirm Booking"
                )}
              </Button>
            </div>
          )}

          {/* Step 5: Confirmation */}
          {step === 5 && bookingComplete && (
            <div className="rounded-2xl p-8 sm:p-12 shadow-sm text-center" style={{ backgroundColor: GLASS.CARD_BACKGROUND, border: `1px solid ${ACCENT_PRIMARY_ALPHA_20}` }}>
              <div className="w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-6" style={{ backgroundColor: COMPONENTS.SUCCESS_BACKGROUND }}>
                <CheckCircle2 className="w-10 h-10" style={{ color: COMPONENTS.SUCCESS_TEXT }} />
              </div>
              <h2
                className="text-3xl font-bold mb-3"
                style={{ fontFamily: "Playfair Display, serif", color: TEXT_PRIMARY }}
              >
                Booking Received
              </h2>
              <p className="max-w-md mx-auto mb-8 leading-relaxed" style={{ fontFamily: "Inter, sans-serif", color: TEXT_PRIMARY_ALPHA_70 }}>
                Thank you for reserving your seat. Here's what happens next:
              </p>

              <div className="text-left max-w-md mx-auto space-y-4 mb-8">
                {[
                  "We'll confirm your booking via email within 24 hours.",
                  "Your trip is confirmed once 4 travelers are secured.",
                  "If minimum is not met, you receive a full refund.",
                  "Hospital fees are arranged separately between you and the hospital.",
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ backgroundColor: ACCENT_PRIMARY_ALPHA_20 }}>
                      <span className="text-xs font-bold" style={{ color: ACCENT_PRIMARY }}>{i + 1}</span>
                    </div>
                    <p className="text-sm" style={{ fontFamily: "Inter, sans-serif", color: TEXT_PRIMARY_ALPHA_70 }}>
                      {item}
                    </p>
                  </div>
                ))}
              </div>

              <DisclaimerBlock compact />
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      {step < 4 && (
        <div className="flex justify-between mt-8">
          {step > 0 ? (
            <Button
              variant="outline"
              onClick={() => setStep((s) => Math.max(0, s - 1))}
              className="rounded-xl px-6 py-3"
              style={{ border: `1px solid ${TEXT_PRIMARY_ALPHA_20}` }}
            >
              <ChevronLeft className="w-4 h-4 mr-1" />
              Back
            </Button>
          ) : (
            <div />
          )}

          {step < 3 && (
            <Button
              onClick={() => setStep((s) => Math.min(4, s + 1))}
              disabled={!canProceed()}
              className="rounded-xl px-6 py-3"
              style={{ backgroundColor: TEXT_PRIMARY, color: COMPONENTS.BUTTON_PRIMARY_TEXT }}
              onMouseEnter={(e) => e.target.style.backgroundColor = TEXT_PRIMARY_ALPHA_80}
              onMouseLeave={(e) => e.target.style.backgroundColor = TEXT_PRIMARY}
            >
              Continue
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          )}
        </div>
      )}
    </div>
  );
}