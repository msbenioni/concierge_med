import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, CheckCircle2, Heart, Shield, Users, Calendar, MapPin } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import { createPageUrl } from "../utils";
import { databaseService } from "../services/databaseService";
import { 
  BACKGROUND_PRIMARY, 
  TEXT_PRIMARY, 
  COLORS,
  TEXT_PRIMARY_ALPHA_70, 
  COMPONENTS
} from "../constants/colors";

export default function Questionnaire() {
  const [searchParams] = useSearchParams();
  const [reference, setReference] = useState("");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    height: "",
    weight: "",
    medicalConditions: "",
    medications: "",
    allergies: "",
    previousSurgeries: "",
    smokingStatus: "",
    alcoholConsumption: "",
    exerciseFrequency: "",
    dietaryRestrictions: "",
    travelHistory: "",
    insuranceCoverage: "",
    preferredHospital: "",
    preferredTravelDates: "",
    emergencyContact: "",
    emergencyPhone: "",
    emergencyRelationship: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const ref = searchParams.get("ref");
    if (ref) {
      setReference(ref);
    }
  }, [searchParams]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Save questionnaire data to database
    try {
      const questionnaireData = {
        reference,
        ...formData,
        status: 'submitted',
        submitted_at: new Date().toISOString()
      };
      
      const dbResult = await databaseService.createQuestionnaire(questionnaireData);
      if (!dbResult.success) {
        console.error('Failed to save questionnaire to database:', dbResult.error);
        // Continue with process even if database save fails
      } else {
        console.log('Questionnaire saved to database:', dbResult.data);
      }
    } catch (error) {
      console.error('Error saving questionnaire to database:', error);
      // Continue with process even if database save fails
    }

    console.log("Questionnaire submitted:", { reference, ...formData });

    setIsSubmitted(true);
    setIsSubmitting(false);
    
    // Scroll to top after successful submission
    window.scrollTo(0, 0);
  };

  if (isSubmitted) {
    return (
      <div style={{ minHeight: "100vh", backgroundColor: BACKGROUND_PRIMARY }}>
        <div className="max-w-4xl mx-auto px-5 sm:px-8 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8">
              <CheckCircle2 className="w-10 h-10 text-green-600" />
            </div>
            
            <h1 className="text-4xl font-bold mb-6" style={{ color: TEXT_PRIMARY }}>
              Questionnaire Submitted
            </h1>
            
            <p className="text-xl mb-8" style={{ color: TEXT_PRIMARY_ALPHA_70 }}>
              Thank you for completing your health questionnaire. We'll review your information and send you a personalized hospital quote within 2-3 business days.
            </p>
            
            <div className="p-6 rounded-2xl mb-8" style={{ backgroundColor: COMPONENTS.CARD_BACKGROUND, border: `1px solid ${COMPONENTS.CARD_BORDER}` }}>
              <p className="text-lg font-medium mb-2" style={{ color: TEXT_PRIMARY }}>
                Reference: {reference}
              </p>
              <p className="text-sm" style={{ color: TEXT_PRIMARY_ALPHA_70 }}>
                Please keep this reference for all future communications
              </p>
            </div>
            
            <Link 
              to={createPageUrl("Home")}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all"
              style={{ backgroundColor: COLORS.ACCENT_PRIMARY, color: "white" }}
            >
              Return to Homepage
            </Link>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", backgroundColor: BACKGROUND_PRIMARY }}>
      <div className="max-w-4xl mx-auto px-5 sm:px-8 py-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <Link 
            to={createPageUrl("Home")}
            className="inline-flex items-center gap-2 text-sm mb-6 transition-colors"
            style={{ color: COLORS.ACCENT_PRIMARY }}
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
          
          <h1 className="text-4xl font-bold mb-4" style={{ color: TEXT_PRIMARY }}>
            Health Questionnaire
          </h1>
          
          <p className="text-xl mb-2" style={{ color: TEXT_PRIMARY_ALPHA_70 }}>
            Please complete this form to help us provide you with the best medical journey support.
          </p>
          
          {reference && (
            <div className="p-4 rounded-xl inline-block" style={{ backgroundColor: COLORS.ACCENT_PRIMARY_ALPHA_20 }}>
              <p className="text-sm font-medium" style={{ color: COLORS.ACCENT_PRIMARY }}>
                Reference: {reference}
              </p>
            </div>
          )}
        </motion.div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Personal Information */}
            <div className="p-8 rounded-2xl" style={{ backgroundColor: COMPONENTS.CARD_BACKGROUND, border: `1px solid ${COMPONENTS.CARD_BORDER}` }}>
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-3" style={{ color: TEXT_PRIMARY }}>
                <Users className="w-6 h-6" style={{ color: COLORS.ACCENT_PRIMARY }} />
                Personal Information
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: TEXT_PRIMARY }}>
                    First Name *
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    style={{ backgroundColor: "white" }}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: TEXT_PRIMARY }}>
                    Last Name *
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    style={{ backgroundColor: "white" }}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: TEXT_PRIMARY }}>
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    style={{ backgroundColor: "white" }}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: TEXT_PRIMARY }}>
                    Phone *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    style={{ backgroundColor: "white" }}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: TEXT_PRIMARY }}>
                    Date of Birth *
                  </label>
                  <input
                    type="date"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    style={{ backgroundColor: "white" }}
                  />
                </div>
              </div>
            </div>

            {/* Health Information */}
            <div className="p-8 rounded-2xl" style={{ backgroundColor: COMPONENTS.CARD_BACKGROUND, border: `1px solid ${COMPONENTS.CARD_BORDER}` }}>
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-3" style={{ color: TEXT_PRIMARY }}>
                <Heart className="w-6 h-6" style={{ color: COLORS.ACCENT_PRIMARY }} />
                Health Information
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: TEXT_PRIMARY }}>
                    Height (cm) *
                  </label>
                  <input
                    type="number"
                    name="height"
                    value={formData.height}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    style={{ backgroundColor: "white" }}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: TEXT_PRIMARY }}>
                    Weight (kg) *
                  </label>
                  <input
                    type="number"
                    name="weight"
                    value={formData.weight}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    style={{ backgroundColor: "white" }}
                  />
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-2" style={{ color: TEXT_PRIMARY }}>
                    Current Medical Conditions *
                  </label>
                  <textarea
                    name="medicalConditions"
                    value={formData.medicalConditions}
                    onChange={handleInputChange}
                    required
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    style={{ backgroundColor: "white" }}
                    placeholder="Please list any current medical conditions..."
                  />
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-2" style={{ color: TEXT_PRIMARY }}>
                    Current Medications *
                  </label>
                  <textarea
                    name="medications"
                    value={formData.medications}
                    onChange={handleInputChange}
                    required
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    style={{ backgroundColor: "white" }}
                    placeholder="Please list all current medications..."
                  />
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-2" style={{ color: TEXT_PRIMARY }}>
                    Allergies *
                  </label>
                  <textarea
                    name="allergies"
                    value={formData.allergies}
                    onChange={handleInputChange}
                    required
                    rows={3}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    style={{ backgroundColor: "white" }}
                    placeholder="Please list any known allergies..."
                  />
                </div>
              </div>
            </div>

            {/* Travel Preferences */}
            <div className="p-8 rounded-2xl" style={{ backgroundColor: COMPONENTS.CARD_BACKGROUND, border: `1px solid ${COMPONENTS.CARD_BORDER}` }}>
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-3" style={{ color: TEXT_PRIMARY }}>
                <MapPin className="w-6 h-6" style={{ color: COLORS.ACCENT_PRIMARY }} />
                Travel Preferences
              </h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: TEXT_PRIMARY }}>
                    Preferred Hospital/Country
                  </label>
                  <input
                    type="text"
                    name="preferredHospital"
                    value={formData.preferredHospital}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    style={{ backgroundColor: "white" }}
                    placeholder="e.g., Mexico Bariatric Center, Thailand, etc."
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: TEXT_PRIMARY }}>
                    Preferred Travel Dates
                  </label>
                  <input
                    type="text"
                    name="preferredTravelDates"
                    value={formData.preferredTravelDates}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    style={{ backgroundColor: "white" }}
                    placeholder="e.g., Next 3 months, Summer 2024, etc."
                  />
                </div>
              </div>
            </div>

            {/* Emergency Contact */}
            <div className="p-8 rounded-2xl" style={{ backgroundColor: COMPONENTS.CARD_BACKGROUND, border: `1px solid ${COMPONENTS.CARD_BORDER}` }}>
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-3" style={{ color: TEXT_PRIMARY }}>
                <Shield className="w-6 h-6" style={{ color: COLORS.ACCENT_PRIMARY }} />
                Emergency Contact
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: TEXT_PRIMARY }}>
                    Emergency Contact Name *
                  </label>
                  <input
                    type="text"
                    name="emergencyContact"
                    value={formData.emergencyContact}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    style={{ backgroundColor: "white" }}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: TEXT_PRIMARY }}>
                    Emergency Contact Phone *
                  </label>
                  <input
                    type="tel"
                    name="emergencyPhone"
                    value={formData.emergencyPhone}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    style={{ backgroundColor: "white" }}
                  />
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-2" style={{ color: TEXT_PRIMARY }}>
                    Relationship *
                  </label>
                  <input
                    type="text"
                    name="emergencyRelationship"
                    value={formData.emergencyRelationship}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    style={{ backgroundColor: "white" }}
                    placeholder="e.g., Spouse, Parent, Sibling, Friend"
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="text-center">
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-8 py-4 rounded-xl font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ backgroundColor: COLORS.ACCENT_PRIMARY, color: "white" }}
              >
                {isSubmitting ? "Submitting..." : "Submit Questionnaire"}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
