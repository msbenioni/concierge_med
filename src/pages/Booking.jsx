import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft, User, Plane, Settings, CheckCircle2, ExternalLink, Copy, FileText, MapPin, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { createPageUrl } from "../utils";
import LoadingSpinner from "../components/compass-connect/LoadingSpinner";
import { TRIP_CONFIG, TRIP_STATUS, BOOKING_STATUS, USER_STATUS, HOSPITAL_REF_PREFIX } from "../constants";
import { sendInterestConfirmationEmail } from "../services/emailService";
import { databaseService } from "../services/databaseService";
import { 
  BACKGROUND_PRIMARY, 
  BACKGROUND_SECONDARY,
  TEXT_PRIMARY, 
  COLORS,
  TEXT_PRIMARY_ALPHA_90,
  TEXT_PRIMARY_ALPHA_80,
  TEXT_PRIMARY_ALPHA_70,
  TEXT_PRIMARY_ALPHA_60,
  TEXT_PRIMARY_ALPHA_50,
  TEXT_PRIMARY_ALPHA_40,
  TEXT_PRIMARY_ALPHA_30,
  TEXT_PRIMARY_ALPHA_20,
  ESPRESSO_ALPHA_12,
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
  { icon: User, label: "Interest Details" },
  { icon: CheckCircle2, label: "Interest Received" },
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
  const [userSubmitted, setUserSubmitted] = useState(false); // Track if user actually clicked submit
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    country: "",
    departure_country: "",
    departure_city: "",
    other_country: "",
    preferred_date: "",
    surgery_type: "bariatric",
    mobility_needs: "",
    dietary_notes: "",
    special_requests: "",
  });

  const urlParams = new URLSearchParams(window.location.search);

  // Debug: Track step changes
  useEffect(() => {
    console.log('Step changed to:', step);
  }, [step]);

  const updateFormData = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    console.log('nextStep called, current step:', step); // Debug log
    setStep((s) => Math.min(s + 1, 1)); // Max 1 step (0, 1)
  };
  const prevStep = () => {
    console.log('prevStep called, current step:', step); // Debug log
    setStep((s) => Math.max(s - 1, 0));
  };

  const onSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    console.log('Form submitted, current step:', step, 'userSubmitted:', userSubmitted); // Debug log
    
    // Only proceed if user actually clicked submit button
    if (!userSubmitted) {
      console.log('Ignoring automatic form submission');
      return;
    }
    
    setSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const ref = generateBookingRef();
    const booking = {
      booking_ref: ref,
      first_name: formData.name.split(' ')[0] || formData.name,
      last_name: formData.name.split(' ').slice(1).join(' ') || '',
      email: formData.email,
      phone: formData.phone,
      country: formData.country,
      departure_country: formData.departure_country,
      departure_city: formData.departure_city,
      preferred_date: formData.preferred_date,
      other_country: formData.other_country || null,
      trip_type: formData.surgery_type,
      trip_title: formData.surgery_type === 'bariatric' ? 'Bariatric Surgery Journey' : 'Cosmetic Surgery Journey',
      travelers_count: 1,
      booking_status: "new",
      payment_status: "unpaid",
      flight_status: "not_started",
      accommodation_status: "not_started",
      transfers_status: "not_started",
      questionnaire_complete: false,
      notes: `Mobility needs: ${formData.mobility_needs || 'None'} | Dietary: ${formData.dietary_notes || 'None'} | Special requests: ${formData.special_requests || 'None'}`,
    };
    
    // Send confirmation email to customer with interest reference
    try {
      console.log('Sending confirmation email to:', booking.email, 'with ref:', booking.booking_ref);
      const emailResult = await sendInterestConfirmationEmail(booking);
      if (emailResult.success) {
        console.log('✅ Confirmation email sent successfully to:', booking.email);
      } else {
        console.error('❌ Failed to send confirmation email:', emailResult.error);
        // Continue with booking process even if email fails
      }
    } catch (error) {
      console.error('❌ Error sending confirmation email:', error);
      // Continue with booking process even if email fails
    }

    // Save interest data to database for follow-up
    try {
      const dbResult = await databaseService.createInterest(booking);
      if (!dbResult.success) {
        console.error('Failed to save interest to database:', dbResult.error);
        // Continue with process even if database save fails
      } else {
        console.log('Interest saved to database:', dbResult.data);
      }
    } catch (error) {
      console.error('Error saving interest to database:', error);
      // Continue with process even if database save fails
    }
    
    setBookingResult(booking);
    setStep(1); // Go to confirmation page (step 1)
    setSubmitting(false);
    setUserSubmitted(false); // Reset flag
    
    // Scroll to top after successful submission
    window.scrollTo(0, 0);
  };

  const trackQuestionnaireClick = async (bookingRef) => {
    try {
      await fetch('/.netlify/functions/track-questionnaire', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          booking_ref: bookingRef,
          timestamp: new Date().toISOString(),
          user_agent: navigator.userAgent
        })
      });
    } catch (error) {
      console.log('Failed to track questionnaire click:', error);
    }
  };

  const handleQuestionnaireClick = (bookingRef) => {
    // Track the click
    trackQuestionnaireClick(bookingRef);
    
    // Open the external questionnaire
    window.open(import.meta.env.REACT_APP_PARTNER_LINK_MBC || 'https://mexicobariatriccenter.com/health-questionnaire/?RefID=2120', '_blank');
  };

  const validateStep = () => {
    let isValid = false;
    if (step === 0) {
      // Combine traveler details and departure location requirements
      const travelerValid = formData.name && formData.email && formData.phone && formData.country;
      const departureValid = formData.departure_country && formData.departure_city && formData.preferred_date;
      const surgeryValid = formData.surgery_type;
      const otherCountryValid = formData.departure_country === 'other' ? formData.other_country : true;
      
      isValid = travelerValid && departureValid && surgeryValid && otherCountryValid;
    }
    
    console.log('Validation for step', step, ':', isValid, formData); // Debug log
    return isValid;
  };

  return (
    <div className="pt-28 pb-20">
      <div className="max-w-3xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="mb-16">
          <span className="text-[11px] font-sans font-semibold uppercase tracking-[0.2em] mb-4 block" style={{ color: COLORS.ACCENT_PRIMARY }}>
            Medical Journey Interest
          </span>
          <h1 className="font-serif text-4xl md:text-5xl mb-4" style={{ color: TEXT_PRIMARY }}>
            Express Your Interest
          </h1>
          <p className="text-lg" style={{ color: TEXT_PRIMARY_ALPHA_70 }}>
            Complete the form below to express interest in our exclusive concierge services.
          </p>
        </motion.div>

      {/* Main booking form */}
      <section className="pt-2 pb-32 px-6 lg:px-12">
        <div className="max-w-3xl mx-auto">

        {/* Step indicator */}
        <div className="flex items-center gap-2 mb-10 overflow-x-auto pb-2">
          {STEP_LABELS.map((s, i) => (
            <div key={i} className="flex items-center gap-2">
              <div
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-sans font-medium transition-all`}
                style={{
                  background: i === step ? GRADIENTS.ACCENT_PRIMARY : 
                           i < step ? COLORS.ACCENT_PRIMARY_ALPHA_20 : COMPONENTS.BUTTON_SECONDARY,
                  color: i === step ? COMPONENTS.BUTTON_PRIMARY_TEXT : 
                         i < step ? COLORS.ACCENT_PRIMARY : TEXT_PRIMARY
                }}
              >
                <s.icon className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{s.label}</span>
                <span className="sm:hidden">{i + 1}</span>
              </div>
              {i < STEP_LABELS.length - 1 && (
                <div style={{ width: '32px', height: '1px', background: i < step ? COLORS.ACCENT_PRIMARY : BORDERS.TEXT_MEDIUM }} />
              )}
            </div>
          ))}
        </div>

        <form onSubmit={onSubmit}>
          <AnimatePresence mode="pop">
            {/* Step 0: Combined Traveler & Journey Details */}
            {step === 0 && (
              <motion.div key="s0" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="rounded-3xl p-8 shadow-2xl space-y-8" style={{ backgroundColor: GLASS.CARD_BACKGROUND, backdropFilter: 'blur(16px)', border: `1px solid ${BORDERS.ACCENT_SUBTLE}` }}>
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

                <div style={{ borderTop: `1px solid ${BORDERS.TEXT_SUBTLE}` }} className="pt-8">
                  <h2 className="font-serif text-2xl mb-6" style={{ color: TEXT_PRIMARY }}>Departure Location</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label className="text-xs font-sans" style={{ color: TEXT_PRIMARY_ALPHA_70 }}>Departure Country *</Label>
                      <Select value={formData.departure_country} onValueChange={(v) => updateFormData("departure_country", v)}>
                        <SelectTrigger className="mt-1.5" style={{ backgroundColor: COMPONENTS.INPUT_BACKGROUND, borderColor: BORDERS.TEXT_SUBTLE, color: TEXT_PRIMARY }}>
                          <SelectValue placeholder="Select country" />
                        </SelectTrigger>
                        <SelectContent style={{ backgroundColor: BACKGROUND_PRIMARY, borderColor: BORDERS.TEXT_SUBTLE, color: TEXT_PRIMARY, border: '1px solid' }}>
                          <SelectItem value="new-zealand">New Zealand</SelectItem>
                          <SelectItem value="australia">Australia</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      {formData.departure_country === 'other' && (
                        <div className="mt-4">
                          <Label className="text-xs font-sans" style={{ color: TEXT_PRIMARY_ALPHA_70 }}>Specify Country *</Label>
                          <Input value={formData.other_country} onChange={(e) => updateFormData("other_country", e.target.value)} placeholder="Enter country name" className="mt-1.5" style={{ backgroundColor: COMPONENTS.INPUT_BACKGROUND, border: `1px solid ${COMPONENTS.INPUT_BORDER}`, color: COMPONENTS.INPUT_TEXT }} />
                        </div>
                      )}
                    </div>
                    <div>
                      <Label className="text-xs font-sans" style={{ color: TEXT_PRIMARY_ALPHA_70 }}>
                        {formData.departure_country === 'other' ? 'City *' : 'Departure City *'}
                      </Label>
                      <Input value={formData.departure_city} onChange={(e) => updateFormData("departure_city", e.target.value)} placeholder="City you will be traveling from" className="mt-1.5" style={{ backgroundColor: COMPONENTS.INPUT_BACKGROUND, border: `1px solid ${COMPONENTS.INPUT_BORDER}`, color: COMPONENTS.INPUT_TEXT }} />
                    </div>
                  </div>
                  <p className="text-[11px] mt-3" style={{ color: TEXT_PRIMARY_ALPHA_50 }}>
                    Your departure location will help us coordinate travel arrangements. Specific journey details will be discussed during consultation.
                  </p>
                </div>

                <div>
                  <Label className="text-xs font-sans" style={{ color: TEXT_PRIMARY_ALPHA_70 }}>Surgery Type *</Label>
                  <Select value={formData.surgery_type} onValueChange={(value) => updateFormData("surgery_type", value)}>
                    <SelectTrigger className="mt-1.5" style={{ backgroundColor: COMPONENTS.INPUT_BACKGROUND, borderColor: BORDERS.TEXT_SUBTLE, color: TEXT_PRIMARY }}>
                      <SelectValue placeholder="Select surgery type" />
                    </SelectTrigger>
                    <SelectContent style={{ backgroundColor: BACKGROUND_PRIMARY, borderColor: BORDERS.TEXT_SUBTLE, color: TEXT_PRIMARY, border: '1px solid' }}>
                      <SelectItem value="bariatric">Bariatric Surgery</SelectItem>
                      <SelectItem value="cosmetic">Cosmetic Surgery</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-[11px] mt-1.5" style={{ color: TEXT_PRIMARY_ALPHA_50 }}>
                    Select the type of surgery you're interested in pursuing.
                  </p>
                </div>

                <div>
                    <Label className="text-xs font-sans" style={{ color: TEXT_PRIMARY_ALPHA_70 }}>Preferred Travel Month</Label>
                  <div className="grid grid-cols-2 gap-3 mt-1.5">
                    <div>
                      <Select value={formData.preferred_date?.split('-')[1] || ''} onValueChange={(month) => {
                        const year = formData.preferred_date?.split('-')[0] || '2026';
                        updateFormData("preferred_date", `${year}-${month}`);
                      }}>
                        <SelectTrigger style={{ backgroundColor: COMPONENTS.INPUT_BACKGROUND, borderColor: BORDERS.TEXT_SUBTLE, color: TEXT_PRIMARY }}>
                          <SelectValue placeholder="Month" />
                        </SelectTrigger>
                        <SelectContent style={{ backgroundColor: BACKGROUND_PRIMARY, borderColor: BORDERS.TEXT_SUBTLE, color: TEXT_PRIMARY, border: '1px solid' }}>
                          <SelectItem value="01" style={{ color: TEXT_PRIMARY }}>January</SelectItem>
                          <SelectItem value="02" style={{ color: TEXT_PRIMARY }}>February</SelectItem>
                          <SelectItem value="03" style={{ color: TEXT_PRIMARY }}>March</SelectItem>
                          <SelectItem value="04" style={{ color: TEXT_PRIMARY }}>April</SelectItem>
                          <SelectItem value="05" style={{ color: TEXT_PRIMARY }}>May</SelectItem>
                          <SelectItem value="06" style={{ color: TEXT_PRIMARY }}>June</SelectItem>
                          <SelectItem value="07" style={{ color: TEXT_PRIMARY }}>July</SelectItem>
                          <SelectItem value="08" style={{ color: TEXT_PRIMARY }}>August</SelectItem>
                          <SelectItem value="09" style={{ color: TEXT_PRIMARY }}>September</SelectItem>
                          <SelectItem value="10" style={{ color: TEXT_PRIMARY }}>October</SelectItem>
                          <SelectItem value="11" style={{ color: TEXT_PRIMARY }}>November</SelectItem>
                          <SelectItem value="12" style={{ color: TEXT_PRIMARY }}>December</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Select value={formData.preferred_date?.split('-')[0] || ''} onValueChange={(year) => {
                        const month = formData.preferred_date?.split('-')[1] || '01';
                        updateFormData("preferred_date", `${year}-${month}`);
                      }}>
                        <SelectTrigger style={{ backgroundColor: COMPONENTS.INPUT_BACKGROUND, borderColor: BORDERS.TEXT_SUBTLE, color: TEXT_PRIMARY }}>
                          <SelectValue placeholder="Year" />
                        </SelectTrigger>
                        <SelectContent style={{ backgroundColor: BACKGROUND_PRIMARY, borderColor: BORDERS.TEXT_SUBTLE, color: TEXT_PRIMARY, border: '1px solid' }}>
                          <SelectItem value="2026" style={{ color: TEXT_PRIMARY }}>2026</SelectItem>
                          <SelectItem value="2027" style={{ color: TEXT_PRIMARY }}>2027</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {step === 1 && bookingResult && (
              <motion.div
                key="s1"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35 }}
                className="space-y-6"
              >
                {/* ABOVE THE FOLD: ONLY PRIMARY ACTION */}
                <div
                  className="rounded-3xl p-8 shadow-2xl"
                  style={{
                    backgroundColor: COLORS.ACCENT_PRIMARY_ALPHA_10,
                    border: `2px solid ${COLORS.ACCENT_PRIMARY}`,
                    backdropFilter: "blur(16px)",
                  }}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
                      style={{ background: GRADIENTS.ACCENT_PRIMARY }}
                    >
                      <FileText className="w-6 h-6" style={{ color: TEXT_PRIMARY }} />
                    </div>

                    <div className="flex-1">
                      <p
                        className="text-[11px] font-sans font-semibold uppercase tracking-[0.2em] mb-2"
                        style={{ color: TEXT_PRIMARY_ALPHA_60 }}
                      >
                        Next step required
                      </p>

                      <h2 className="font-serif text-3xl mb-2" style={{ color: TEXT_PRIMARY }}>
                        Complete the Health Questionnaire
                      </h2>

                      <p className="text-base mb-6" style={{ color: TEXT_PRIMARY_ALPHA_70 }}>
                        Your hospital quote can't be created until this is submitted. It takes{" "}
                        <span style={{ color: TEXT_PRIMARY, fontWeight: 600 }}>5–10 minutes</span>.
                      </p>

                      <Button
                        type="button"
                        className="w-full md:w-auto rounded-2xl px-8 py-6 text-base font-semibold shadow-lg"
                        style={{
                          background: GRADIENTS.ACCENT_PRIMARY,
                          color: TEXT_PRIMARY,
                        }}
                        onClick={() => {
                          handleQuestionnaireClick(bookingResult.booking_ref);
                        }}
                      >
                        <span className="mr-2">Start Questionnaire</span>
                        <ArrowRight className="w-5 h-5" />
                      </Button>

                    </div>
                  </div>
                </div>

                {/* SECONDARY: Interest received + Reference */}
                <div
                  className="rounded-3xl p-6 shadow-xl"
                  style={{
                    backgroundColor: GLASS.CARD_BACKGROUND,
                    backdropFilter: "blur(16px)",
                    border: `1px solid ${COLORS.ACCENT_PRIMARY_ALPHA_20}`,
                  }}
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                      <h3 className="font-serif text-xl mb-1" style={{ color: TEXT_PRIMARY }}>
                        Interest received
                      </h3>
                      <p className="text-sm" style={{ color: TEXT_PRIMARY_ALPHA_70 }}>
                        Keep this reference for your records.
                      </p>
                    </div>

                    <div
                      className="inline-flex items-center gap-2 px-5 py-2 rounded-full border"
                      style={{
                        backgroundColor: COLORS.ACCENT_PRIMARY_ALPHA_10,
                        borderColor: COLORS.ACCENT_PRIMARY_ALPHA_20,
                      }}
                    >
                      <span className="text-sm" style={{ color: TEXT_PRIMARY_ALPHA_50 }}>
                        Reference:
                      </span>
                      <span className="font-mono font-semibold" style={{ color: TEXT_PRIMARY }}>
                        {bookingResult.booking_ref}
                      </span>
                      <button
                        type="button"
                        onClick={() => navigator.clipboard.writeText(bookingResult.booking_ref)}
                        style={{ color: COLORS.ACCENT_PRIMARY }}
                        aria-label="Copy reference"
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* MOBILE: Sticky bottom CTA so it cannot be missed */}
                <div className="md:hidden fixed bottom-0 left-0 right-0 p-4" style={{ backgroundColor: BACKGROUND_PRIMARY }}>
                  <Button
                    type="button"
                    className="w-full rounded-2xl py-6 text-base font-semibold shadow-lg"
                    style={{
                      background: GRADIENTS.ACCENT_PRIMARY,
                      color: TEXT_PRIMARY,
                    }}
                    onClick={() => {
                      handleQuestionnaireClick(bookingResult.booking_ref);
                    }}
                  >
                    Start Questionnaire <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </div>

                {/* Spacer so sticky button doesn't cover content */}
                <div className="md:hidden h-24" />
              </motion.div>
            )}
          {/* Navigation */}
          {step < 1 && (
            <div className="flex justify-between items-center mt-8">
              <div></div> {/* No back button on first step */}
              <Button
                type="submit"
                disabled={submitting}
                onClick={() => setUserSubmitted(true)} // Set flag when user clicks submit
                className="rounded-full px-8 gap-2 font-semibold shadow-lg"
                style={{ 
                  background: `linear-gradient(to right, ${COLORS.ACCENT_PRIMARY}, ${COLORS.ACCENT_SECONDARY})`, 
                  color: TEXT_PRIMARY 
                }}
                onMouseEnter={(e) => e.target.style.opacity = '0.9'}
                onMouseLeave={(e) => e.target.style.opacity = '1'}
              >
                {submitting ? (
                  <>
                    <LoadingSpinner size="w-4 h-4" />
                    <span className="ml-2">Submitting...</span>
                  </>
                ) : (
                  <>
                    Submit Interest <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </Button>
            </div>
          )}
          </AnimatePresence>
        </form>
        </div>
      </section>
      </div>
    </div>
  );
}