import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { X, User, Mail, Phone } from "lucide-react";
import { 
  BACKGROUND_PRIMARY,
  TEXT_PRIMARY,
  COLORS,
  TEXT_PRIMARY_ALPHA_70,
  COMPONENTS,
  BORDERS
} from "../constants/colors";

export default function CompanionModal({ isOpen, onClose, onSubmit, interestData }) {
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone: "",
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
      newErrors.email = "Invalid email format";
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone is required";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit({
        ...formData,
        country: interestData.country,
        departure_country: interestData.departure_country,
        departure_city: interestData.departure_city,
        preferred_date: interestData.preferred_date,
        payment_status: 'unpaid'
      });
      
      // Reset form
      setFormData({
        full_name: "",
        email: "",
        phone: "",
      });
      setErrors({});
      
      onClose();
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error for this field
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ""
      }));
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div 
        className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4"
        style={{ backgroundColor: BACKGROUND_PRIMARY }}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b"
             style={{ borderColor: BORDERS.SUBTLE }}>
          <div>
            <h3 className="text-lg font-semibold" style={{ color: TEXT_PRIMARY }}>
              Add Companion
            </h3>
            <p className="text-sm mt-1" style={{ color: TEXT_PRIMARY_ALPHA_70 }}>
              Enter companion details for {interestData?.full_name || 'this traveler'}
            </p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="h-8 w-8 p-0"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Full Name */}
          <div>
            <Label className="text-sm font-medium" style={{ color: TEXT_PRIMARY }}>
              Full Name
            </Label>
            <div className="relative mt-1.5">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                value={formData.full_name}
                onChange={(e) => handleInputChange('full_name', e.target.value)}
                placeholder="Enter full name"
                className="pl-9"
                style={{ 
                  backgroundColor: COMPONENTS.INPUT_BACKGROUND,
                  borderColor: errors.full_name ? '#ef4444' : COMPONENTS.INPUT_BORDER,
                  color: COMPONENTS.INPUT_TEXT
                }}
              />
            </div>
            {errors.full_name && (
              <p className="text-xs text-red-500 mt-1">{errors.full_name}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <Label className="text-sm font-medium" style={{ color: TEXT_PRIMARY }}>
              Email
            </Label>
            <div className="relative mt-1.5">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="Enter email address"
                className="pl-9"
                style={{ 
                  backgroundColor: COMPONENTS.INPUT_BACKGROUND,
                  borderColor: errors.email ? '#ef4444' : COMPONENTS.INPUT_BORDER,
                  color: COMPONENTS.INPUT_TEXT
                }}
              />
            </div>
            {errors.email && (
              <p className="text-xs text-red-500 mt-1">{errors.email}</p>
            )}
          </div>

          {/* Phone */}
          <div>
            <Label className="text-sm font-medium" style={{ color: TEXT_PRIMARY }}>
              Phone
            </Label>
            <div className="relative mt-1.5">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                placeholder="Enter phone number"
                className="pl-9"
                style={{ 
                  backgroundColor: COMPONENTS.INPUT_BACKGROUND,
                  borderColor: errors.phone ? '#ef4444' : COMPONENTS.INPUT_BORDER,
                  color: COMPONENTS.INPUT_TEXT
                }}
              />
            </div>
            {errors.phone && (
              <p className="text-xs text-red-500 mt-1">{errors.phone}</p>
            )}
          </div>

          {/* Cost Display */}
          <div className="p-4 rounded-lg"
               style={{ backgroundColor: COLORS.ACCENT_PRIMARY_ALPHA_10 }}>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium" style={{ color: TEXT_PRIMARY }}>
                Companion Cost
              </span>
              <span className="text-lg font-bold" style={{ color: COLORS.ACCENT_PRIMARY }}>
                $2,000.00
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1"
              style={{ backgroundColor: COLORS.ACCENT_PRIMARY, color: TEXT_PRIMARY }}
            >
              Add Companion
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
