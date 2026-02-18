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
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold transition-all duration-300 ${
                    i <= step
                      ? "bg-[#0F1C2E] text-white"
                      : "bg-[#0F1C2E]/5 text-[#7C848E]"
                  }`}
                >
                  {i < step ? (
                    <CheckCircle2 className="w-4 h-4" />
                  ) : (
                    i + 1
                  )}
                </div>
                {i < 3 && (
                  <div
                    className={`hidden sm:block w-12 lg:w-20 h-0.5 transition-all duration-300 ${
                      i < step ? "bg-[#FF8C42]" : "bg-[#0F1C2E]/5"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="text-center">
            <h3
              className="text-xl font-bold text-[#0F1C2E]"
              style={{ fontFamily: "Playfair Display, serif" }}
            >
              {STEPS[step].title}
            </h3>
            <p className="text-sm text-[#7C848E] mt-1" style={{ fontFamily: "Inter, sans-serif" }}>
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
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-[#FF8C42]/5">
              <p className="text-[#7C848E] mb-6 leading-relaxed" style={{ fontFamily: "Inter, sans-serif" }}>
                Before booking your group travel seat, you must first complete the hospital's health questionnaire. This is assessed by Mexico Bariatric Center's medical team.
              </p>

              <a
                href="https://mexicobariatriccenter.com/health-questionnaire/?RefID=2120"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-4 rounded-xl bg-[#1F4E5F]/5 border border-[#1F4E5F]/10 hover:bg-[#1F4E5F]/10 transition-colors mb-6"
              >
                <ExternalLink className="w-5 h-5 text-[#1F4E5F]" />
                <div>
                  <span className="text-sm font-semibold text-[#0F1C2E] block">
                    Hospital Health Questionnaire
                  </span>
                  <span className="text-xs text-[#7C848E]">
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
                  className="text-sm text-[#1E1E1E] leading-relaxed cursor-pointer"
                >
                  I have completed the hospital health questionnaire.
                </Label>
              </div>
            </div>
          )}

          {/* Step 2: Quote Confirmation */}
          {step === 2 && (
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-[#FF8C42]/5">
              <p className="text-[#7C848E] mb-6 leading-relaxed" style={{ fontFamily: "Inter, sans-serif" }}>
                After the hospital assesses your questionnaire, they will send you a surgery quote directly. Please confirm you have received it before proceeding.
              </p>

              <div className="flex items-start gap-3 mb-8">
                <Checkbox
                  checked={form.received_quote}
                  onCheckedChange={(checked) => updateForm("received_quote", checked)}
                  className="mt-1"
                />
                <Label
                  className="text-sm text-[#1E1E1E] leading-relaxed cursor-pointer"
                >
                  I have received my surgery quote from the hospital.
                </Label>
              </div>

              {form.received_quote && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="space-y-4 pt-4 border-t border-[#FF8C42]/10"
                >
                  <p className="text-xs text-[#7C848E]" style={{ fontFamily: "Inter, sans-serif" }}>
                    Optional — for coordination purposes only. Hospital fees are paid directly to the hospital.
                  </p>
                  <div>
                    <Label className="text-sm text-[#1E1E1E] mb-1.5 block">Surgery Type</Label>
                    <Select
                      value={form.surgery_type}
                      onValueChange={(v) => updateForm("surgery_type", v)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="bariatric">Bariatric Surgery</SelectItem>
                        <SelectItem value="cosmetic">Cosmetic Surgery</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="text-sm text-[#1E1E1E] mb-1.5 block">Quote Amount (USD)</Label>
                    <Input
                      type="number"
                      placeholder="e.g. 4,500"
                      value={form.quote_amount}
                      onChange={(e) => updateForm("quote_amount", e.target.value)}
                    />
                  </div>
                  <div>
                    <Label className="text-sm text-[#1E1E1E] mb-1.5 block">Quote Reference ID</Label>
                    <Input
                      placeholder="e.g. MBC-12345"
                      value={form.quote_reference}
                      onChange={(e) => updateForm("quote_reference", e.target.value)}
                    />
                  </div>
                </motion.div>
              )}
            </div>
          )}

          {/* Step 3: Trip & Personal Details */}
          {step === 3 && (
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-[#FF8C42]/5 space-y-6">
              <div>
                <Label className="text-sm text-[#1E1E1E] mb-1.5 block font-semibold">Select Group Trip *</Label>
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

              <div className="border-t border-[#FF8C42]/10 pt-6 space-y-4">
                <h4 className="text-sm font-semibold text-[#0F1C2E]">Personal Details</h4>
                <div>
                  <Label className="text-sm text-[#1E1E1E] mb-1.5 block">Full Name *</Label>
                  <Input
                    placeholder="Your full name"
                    value={form.full_name}
                    onChange={(e) => updateForm("full_name", e.target.value)}
                  />
                </div>
                <div>
                  <Label className="text-sm text-[#1E1E1E] mb-1.5 block">Email *</Label>
                  <Input
                    type="email"
                    placeholder="your@email.com"
                    value={form.email}
                    onChange={(e) => updateForm("email", e.target.value)}
                  />
                </div>
                <div>
                  <Label className="text-sm text-[#1E1E1E] mb-1.5 block">Phone *</Label>
                  <Input
                    type="tel"
                    placeholder="+64 21 000 0000"
                    value={form.phone}
                    onChange={(e) => updateForm("phone", e.target.value)}
                  />
                </div>
                <div>
                  <Label className="text-sm text-[#1E1E1E] mb-1.5 block">Departure City *</Label>
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
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-[#FF8C42]/5">
              <div className="text-center mb-8">
                <div className="w-16 h-16 mx-auto rounded-2xl bg-[#FF8C42]/10 flex items-center justify-center mb-4">
                  <CreditCard className="w-7 h-7 text-[#FF8C42]" />
                </div>
                <h3 className="text-2xl font-bold text-[#0F1C2E]" style={{ fontFamily: "Playfair Display, serif" }}>
                  Payment Summary
                </h3>
              </div>

              {/* Summary */}
              {selectedTrip && (
                <div className="bg-[#F4F1EB] rounded-xl p-5 mb-6 space-y-3">
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="w-4 h-4 text-[#7C848E]" />
                    <span className="text-[#1E1E1E] font-medium">{selectedTrip.departure_city} → {selectedTrip.destination}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Plane className="w-4 h-4 text-[#7C848E]" />
                    <span className="text-[#1E1E1E]">{format(new Date(selectedTrip.departure_date), "d MMM yyyy")} – {format(new Date(selectedTrip.return_date), "d MMM yyyy")}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Users className="w-4 h-4 text-[#7C848E]" />
                    <span className="text-[#1E1E1E]">{form.full_name}</span>
                  </div>
                </div>
              )}

              {/* Breakdown */}
              <div className="space-y-3 mb-6">
                <div className="flex justify-between items-center py-2">
                  <span className="text-sm text-[#7C848E]">Group return airfare</span>
                  <span className="text-sm font-medium text-[#1E1E1E]">Included</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-sm text-[#7C848E]">Concierge support</span>
                  <span className="text-sm font-medium text-[#1E1E1E]">Included</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-sm text-[#7C848E]">On-the-ground coordination</span>
                  <span className="text-sm font-medium text-[#1E1E1E]">Included</span>
                </div>
                <div className="border-t border-[#FF8C42]/10 pt-3 flex justify-between items-center">
                  <span className="text-base font-semibold text-[#0F1C2E]">Total</span>
                  <span className="text-2xl font-bold text-[#0F1C2E]" style={{ fontFamily: "Playfair Display, serif" }}>
                    4,000
                  </span>
                </div>
              </div>

              {/* Stripe Placeholder */}
              <div className="p-5 rounded-xl border-2 border-dashed border-[#FF8C42]/20 bg-[#FF8C42]/[0.03] text-center mb-6">
                <CreditCard className="w-8 h-8 text-[#FF8C42]/40 mx-auto mb-2" />
                <p className="text-sm text-[#7C848E]" style={{ fontFamily: "Inter, sans-serif" }}>
                  Stripe payment integration will be configured here
                </p>
              </div>

              <div className="flex items-start gap-2 mb-6">
                <Shield className="w-4 h-4 text-[#1F4E5F] mt-0.5 flex-shrink-0" />
                <p className="text-xs text-[#7C848E]">
                  This fee covers airfare and concierge services only. Hospital / surgical fees are paid separately, directly to the hospital.
                </p>
              </div>

              <Button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="w-full py-6 rounded-xl bg-[#0F1C2E] text-white font-semibold hover:bg-[#1a2d45] transition-all shadow-lg"
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
            <div className="bg-white rounded-2xl p-8 sm:p-12 shadow-sm border border-[#FF8C42]/5 text-center">
              <div className="w-20 h-20 mx-auto rounded-full bg-emerald-50 flex items-center justify-center mb-6">
                <CheckCircle2 className="w-10 h-10 text-emerald-600" />
              </div>
              <h2
                className="text-3xl font-bold text-[#0F1C2E] mb-3"
                style={{ fontFamily: "Playfair Display, serif" }}
              >
                Booking Received
              </h2>
              <p className="text-[#7C848E] max-w-md mx-auto mb-8 leading-relaxed" style={{ fontFamily: "Inter, sans-serif" }}>
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
                    <div className="w-6 h-6 rounded-full bg-[#FF8C42]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-bold text-[#FF8C42]">{i + 1}</span>
                    </div>
                    <p className="text-sm text-[#1E1E1E]/70" style={{ fontFamily: "Inter, sans-serif" }}>
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
              onClick={() => setStep(step - 1)}
              className="rounded-xl px-6 py-3 border-[#0F1C2E]/10"
            >
              <ChevronLeft className="w-4 h-4 mr-1" />
              Back
            </Button>
          ) : (
            <div />
          )}

          {step < 3 && (
            <Button
              onClick={() => setStep(step + 1)}
              disabled={!canProceed()}
              className="rounded-xl px-6 py-3 bg-[#0F1C2E] text-white hover:bg-[#1a2d45] disabled:opacity-30"
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