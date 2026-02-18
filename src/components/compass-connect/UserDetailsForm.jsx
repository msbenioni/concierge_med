import React, { useState } from "react";
import { motion } from "framer-motion";
import { User, Mail, Phone, MapPin, Globe, AlertCircle, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const COUNTRIES = [
  "Australia",
  "New Zealand", 
  "United States",
  "Canada",
  "United Kingdom",
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
      className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-[#FF8C42]/5"
    >
      {/* Header */}
      <div className="text-center mb-8">
        <div className="w-12 h-12 rounded-xl bg-[#0E7C8C]/10 flex items-center justify-center mx-auto mb-4">
          <User className="w-6 h-6 text-[#0E7C8C]" />
        </div>
        <h3 className="text-xl font-semibold text-[#0E7C8C] mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>
          Start Your Journey
        </h3>
        <p className="text-[#7A9BA8] text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>
          Please provide your details to access the hospital health questionnaire
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Full Name */}
        <div>
          <Label className="text-sm text-[#1E1E1E] mb-1.5 block font-medium">
            Full Name *
          </Label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#7A9BA8]" />
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
          <Label className="text-sm text-[#1E1E1E] mb-1.5 block font-medium">
            Email Address *
          </Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#7A9BA8]" />
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
          <Label className="text-sm text-[#1E1E1E] mb-1.5 block font-medium">
            Phone Number *
          </Label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#7A9BA8]" />
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
          <Label className="text-sm text-[#1E1E1E] mb-1.5 block font-medium">
            Country *
          </Label>
          <div className="relative">
            <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#7A9BA8] z-10" />
            <Select
              value={formData.country}
              onValueChange={(value) => handleInputChange("country", value)}
            >
              <SelectTrigger className={`pl-10 ${errors.country ? "border-red-300 focus:border-red-500" : ""}`}>
                <SelectValue placeholder="Select your country" />
              </SelectTrigger>
              <SelectContent>
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
        <div className="bg-[#F9F9F9] rounded-xl p-4 border border-[#B8D963]/10">
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                id="terms"
                checked={formData.terms_accepted}
                onChange={(e) => handleInputChange("terms_accepted", e.target.checked)}
                className="mt-1 w-4 h-4 text-[#0E7C8C] border-gray-300 rounded focus:ring-[#0E7C8C]"
              />
              <label htmlFor="terms" className="text-sm text-[#7A9BA8] leading-relaxed cursor-pointer">
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
          disabled={isLoading}
          className="w-full bg-[#0E7C8C] hover:bg-[#0E7C8C]/90 text-white py-3 rounded-xl font-semibold transition-colors flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Processing...
            </>
          ) : (
            <>
              Access Health Questionnaire
              <MapPin className="w-4 h-4" />
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
