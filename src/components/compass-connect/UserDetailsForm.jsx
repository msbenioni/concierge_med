import React, { useState } from "react";
import { motion } from "framer-motion";
import { User, Mail, Phone, MapPin, Globe, AlertCircle, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import LoadingSpinner from "./LoadingSpinner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TEXT_PRIMARY, TEXT_PRIMARY_ALPHA_80, TEXT_PRIMARY_ALPHA_70, TEXT_PRIMARY_ALPHA_50, COLORS, BACKGROUND_PRIMARY_ALPHA_10, BACKGROUND_PRIMARY, COMPONENTS, GLASS, SHADOWS, BORDERS } from "../../constants/colors";

const COUNTRIES = [
  "Australia",
  "New Zealand", 
  "Other"
];

export default function UserDetailsForm({ onSubmit, isLoading }) {
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone: "",
    country: "",
    terms_accepted: false
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.full_name.trim()) {
      newErrors.full_name = "Full name is required";
    }
    
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\+?[\d\s\-\(\)]+$/.test(formData.phone)) {
      newErrors.phone = "Please enter a valid phone number";
    }
    
    if (!formData.country) {
      newErrors.country = "Country is required";
    }
    
    if (!formData.terms_accepted) {
      newErrors.terms_accepted = "You must accept the terms to continue";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl p-6 sm:p-8 shadow-sm"
      style={{ backgroundColor: GLASS.CARD_BACKGROUND, border: `1px solid ${COLORS.ACCENT_PRIMARY_ALPHA_20}` }}
    >
      {/* Header */}
      <div className="text-center mb-8">
        <div className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: COLORS.ACCENT_PRIMARY_ALPHA_20 }}>
          <User className="w-6 h-6" style={{ color: COLORS.ACCENT_PRIMARY }} />
        </div>
        <h3 className="text-xl font-semibold mb-2" style={{ fontFamily: 'Playfair Display, serif', color: TEXT_PRIMARY }}>
          Start Your Journey
        </h3>
        <p className="text-sm" style={{ fontFamily: 'Inter, sans-serif', color: TEXT_PRIMARY_ALPHA_70 }}>
          Please provide your details to access the hospital health questionnaire
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Full Name */}
        <div>
          <Label className="text-sm mb-1.5 block font-medium" style={{ color: TEXT_PRIMARY }}>
            Full Name *
          </Label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4" style={{ color: TEXT_PRIMARY_ALPHA_70 }} />
            <Input
              type="text"
              placeholder="Enter your full name"
              value={formData.full_name}
              onChange={(e) => handleInputChange("full_name", e.target.value)}
              className={`pl-10 ${errors.full_name ? "border-red-300 focus:border-red-500" : ""}`}
            />
          </div>
          {errors.full_name && (
            <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
              <AlertCircle className="w-3 h-3" />
              {errors.full_name}
            </p>
          )}
        </div>

        {/* Email */}
        <div>
          <Label className="text-sm mb-1.5 block font-medium" style={{ color: TEXT_PRIMARY }}>
            Email Address *
          </Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4" style={{ color: TEXT_PRIMARY_ALPHA_70 }} />
            <Input
              type="email"
              placeholder="your.email@example.com"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              className={`pl-10 ${errors.email ? "border-red-300 focus:border-red-500" : ""}`}
            />
          </div>
          {errors.email && (
            <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
              <AlertCircle className="w-3 h-3" />
              {errors.email}
            </p>
          )}
        </div>

        {/* Phone */}
        <div>
          <Label className="text-sm mb-1.5 block font-medium" style={{ color: TEXT_PRIMARY }}>
            Phone Number *
          </Label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4" style={{ color: TEXT_PRIMARY_ALPHA_70 }} />
            <Input
              type="tel"
              placeholder="+64 21 123 4567"
              value={formData.phone}
              onChange={(e) => handleInputChange("phone", e.target.value)}
              className={`pl-10 ${errors.phone ? "border-red-300 focus:border-red-500" : ""}`}
            />
          </div>
          {errors.phone && (
            <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
              <AlertCircle className="w-3 h-3" />
              {errors.phone}
            </p>
          )}
        </div>

        {/* Country */}
        <div>
          <Label className="text-sm mb-1.5 block font-medium" style={{ color: TEXT_PRIMARY }}>
            Country *
          </Label>
          <div className="relative">
            <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 z-10" style={{ color: TEXT_PRIMARY_ALPHA_70 }} />
            <Select
              value={formData.country}
              onValueChange={(value) => handleInputChange("country", value)}
            >
              <SelectTrigger className={`pl-10 ${errors.country ? "border-red-300 focus:border-red-500" : ""}`} style={{ backgroundColor: COMPONENTS.INPUT_BACKGROUND, borderColor: BORDERS.TEXT_SUBTLE, color: TEXT_PRIMARY }}>
                <SelectValue placeholder="Select your country" />
              </SelectTrigger>
              <SelectContent style={{ backgroundColor: BACKGROUND_PRIMARY, borderColor: BORDERS.TEXT_SUBTLE, color: TEXT_PRIMARY, border: '1px solid' }}>
                {COUNTRIES.map((country) => (
                  <SelectItem key={country} value={country}>
                    {country}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          {errors.country && (
            <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
              <AlertCircle className="w-3 h-3" />
              {errors.country}
            </p>
          )}
        </div>

        {/* Terms and Privacy */}
        <div className="rounded-xl p-4" style={{ backgroundColor: BACKGROUND_PRIMARY_ALPHA_10, border: `1px solid ${COLORS.ACCENT_PRIMARY_ALPHA_20}` }}>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                id="terms"
                checked={formData.terms_accepted}
                onChange={(e) => handleInputChange("terms_accepted", e.target.checked)}
                className="mt-1 w-4 h-4 rounded"
                style={{ color: COLORS.ACCENT_PRIMARY, borderColor: TEXT_PRIMARY_ALPHA_50 }}
              />
              <label htmlFor="terms" className="text-sm leading-relaxed cursor-pointer" style={{ color: TEXT_PRIMARY_ALPHA_70 }}>
                I understand that Compass Connect is a non-medical concierge service. All medical decisions and surgical care are provided solely by licensed hospitals and medical professionals. I agree to be contacted about my inquiry.
              </label>
            </div>
          </div>
          {errors.terms_accepted && (
            <p className="text-red-500 text-xs mt-2 flex items-center gap-1">
              <AlertCircle className="w-3 h-3" />
              {errors.terms_accepted}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={isLoading || !formData.terms_accepted}
          className="w-full py-3 rounded-xl font-semibold transition-colors flex items-center justify-center gap-2"
          style={{ backgroundColor: TEXT_PRIMARY, color: COMPONENTS.BUTTON_PRIMARY_TEXT }}
          onMouseEnter={(e) => e.target.style.backgroundColor = TEXT_PRIMARY_ALPHA_80}
          onMouseLeave={(e) => e.target.style.backgroundColor = TEXT_PRIMARY}
        >
          {isLoading ? (
            <>
              <LoadingSpinner size="w-4 h-4" />
              Processing...
            </>
          ) : (
            <>
              Submit Details <CheckCircle className="w-4 h-4" />
            </>
          )}
        </Button>

        {/* Info Note */}
        <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="text-sm font-semibold text-blue-900 mb-1">What happens next?</h4>
              <p className="text-xs text-blue-700 leading-relaxed">
                After submitting your details, you'll be redirected to the hospital's secure health questionnaire. 
                The hospital will review your information and contact you directly with a surgery quote.
              </p>
            </div>
          </div>
        </div>
      </form>
    </motion.div>
  );
}
