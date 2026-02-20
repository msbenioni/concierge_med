import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  BACKGROUND_PRIMARY, 
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
  GRADIENTS, 
  GLASS, 
  SHADOWS,
  COMPONENTS,
  BORDERS
} from "../constants/colors";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Plus, X, Calendar, User, MapPin, FileText } from 'lucide-react';

const OrganizeTravel = () => {
  const [searchParams] = useSearchParams();
  const bookingRef = searchParams.get('ref');
  
  const [formData, setFormData] = useState({
    fullName: '',
    passportNumber: '',
    passportExpiry: '',
    dateOfBirth: '',
    address: '',
    city: '',
    country: '',
    phoneNumber: '',
    emergencyContact: '',
    emergencyPhone: '',
    medicalConditions: '',
    allergies: '',
    medications: '',
    specialRequests: ''
  });
  
  const [companions, setCompanions] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const addCompanion = () => {
    setCompanions(prev => [...prev, {
      id: Date.now(),
      fullName: '',
      passportNumber: '',
      passportExpiry: '',
      dateOfBirth: '',
      relationship: '',
      medicalConditions: '',
      allergies: ''
    }]);
  };

  const removeCompanion = (id) => {
    setCompanions(prev => prev.filter(comp => comp.id !== id));
  };

  const updateCompanion = (id, field, value) => {
    setCompanions(prev => prev.map(comp => 
      comp.id === id ? { ...comp, [field]: value } : comp
    ));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    
    try {
      // TODO: Save to database
      console.log('Travel organization data:', { bookingRef, formData, companions });
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setSubmitted(true);
    } catch (error) {
      console.error('Error submitting travel details:', error);
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen" style={{ backgroundColor: BACKGROUND_PRIMARY }}>
        <div className="container mx-auto px-4 py-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-2xl mx-auto"
          >
            <Card className="rounded-3xl p-8 shadow-2xl text-center" style={{ backgroundColor: GLASS.CARD_BACKGROUND, backdropFilter: 'blur(16px)', border: `1px solid ${COLORS.ACCENT_PRIMARY_ALPHA_20}` }}>
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6" style={{ background: `linear-gradient(to right, ${COLORS.ACCENT_PRIMARY}, ${COLORS.ACCENT_SECONDARY})` }}>
                <Calendar className="w-8 h-8" style={{ color: TEXT_PRIMARY }} />
              </div>
              <h1 className="font-serif text-3xl mb-4" style={{ color: TEXT_PRIMARY }}>Travel Details Submitted!</h1>
              <p className="mb-6" style={{ color: TEXT_PRIMARY_ALPHA_70 }}>
                Thank you! Your travel organization details have been received. Our team will contact you within 24 hours to finalize your travel arrangements.
              </p>
              <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border" style={{ backgroundColor: COLORS.ACCENT_PRIMARY_ALPHA_10, borderColor: COLORS.ACCENT_PRIMARY_ALPHA_20 }}>
                <span className="text-sm" style={{ color: TEXT_PRIMARY_ALPHA_50 }}>Reference:</span>
                <span className="font-mono font-semibold" style={{ color: TEXT_PRIMARY }}>{bookingRef}</span>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: BACKGROUND_PRIMARY }}>
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="font-serif text-4xl mb-4" style={{ color: TEXT_PRIMARY }}>
              Organize Your Medical Journey
            </h1>
            <p className="text-lg" style={{ color: TEXT_PRIMARY_ALPHA_70 }}>
              Complete your travel details to arrange your medical journey with Compass Connect
            </p>
            {bookingRef && (
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border mt-4" style={{ backgroundColor: COLORS.ACCENT_PRIMARY_ALPHA_10, borderColor: COLORS.ACCENT_PRIMARY_ALPHA_20 }}>
                <span className="text-sm" style={{ color: TEXT_PRIMARY_ALPHA_50 }}>Booking Reference:</span>
                <span className="font-mono font-semibold" style={{ color: COLORS.ACCENT_PRIMARY }}>{bookingRef}</span>
              </div>
            )}
          </div>

          {/* Pricing Notice */}
          <Card className="rounded-2xl p-6 mb-8" style={{ backgroundColor: COLORS.ACCENT_PRIMARY_ALPHA_10, border: `1px solid ${COLORS.ACCENT_PRIMARY_ALPHA_20}` }}>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: COLORS.ACCENT_PRIMARY }}>
                <span className="text-white font-bold">4000</span>
              </div>
              <div>
                <h3 className="font-semibold" style={{ color: TEXT_PRIMARY }}>Concierge Service Fee</h3>
                <p className="text-sm" style={{ color: TEXT_PRIMARY_ALPHA_70 }}>
                  Our comprehensive travel organization service includes accommodation, transfers, and support throughout your medical journey.
                </p>
              </div>
            </div>
          </Card>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Personal Details */}
            <Card className="rounded-3xl p-8 shadow-xl" style={{ backgroundColor: GLASS.CARD_BACKGROUND, backdropFilter: 'blur(16px)', border: `1px solid ${BORDERS.ACCENT_SUBTLE}` }}>
              <h2 className="font-serif text-2xl mb-6 flex items-center gap-3" style={{ color: TEXT_PRIMARY }}>
                <User className="w-6 h-6" style={{ color: COLORS.ACCENT_PRIMARY }} />
                Personal Details
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="fullName" style={{ color: TEXT_PRIMARY }}>Full Name (as per passport)</Label>
                  <Input
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    required
                    className="mt-1"
                    style={{ backgroundColor: COMPONENTS.INPUT_BACKGROUND, borderColor: BORDERS.TEXT_SUBTLE, color: TEXT_PRIMARY }}
                  />
                </div>
                
                <div>
                  <Label htmlFor="dateOfBirth" style={{ color: TEXT_PRIMARY }}>Date of Birth</Label>
                  <Input
                    id="dateOfBirth"
                    name="dateOfBirth"
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={handleInputChange}
                    required
                    className="mt-1"
                    style={{ backgroundColor: COMPONENTS.INPUT_BACKGROUND, borderColor: BORDERS.TEXT_SUBTLE, color: TEXT_PRIMARY }}
                  />
                </div>
                
                <div>
                  <Label htmlFor="passportNumber" style={{ color: TEXT_PRIMARY }}>Passport Number</Label>
                  <Input
                    id="passportNumber"
                    name="passportNumber"
                    value={formData.passportNumber}
                    onChange={handleInputChange}
                    required
                    className="mt-1"
                    style={{ backgroundColor: COMPONENTS.INPUT_BACKGROUND, borderColor: BORDERS.TEXT_SUBTLE, color: TEXT_PRIMARY }}
                  />
                </div>
                
                <div>
                  <Label htmlFor="passportExpiry" style={{ color: TEXT_PRIMARY }}>Passport Expiry Date</Label>
                  <Input
                    id="passportExpiry"
                    name="passportExpiry"
                    type="date"
                    value={formData.passportExpiry}
                    onChange={handleInputChange}
                    required
                    className="mt-1"
                    style={{ backgroundColor: COMPONENTS.INPUT_BACKGROUND, borderColor: BORDERS.TEXT_SUBTLE, color: TEXT_PRIMARY }}
                  />
                </div>
              </div>
            </Card>

            {/* Contact Information */}
            <Card className="rounded-3xl p-8 shadow-xl" style={{ backgroundColor: GLASS.CARD_BACKGROUND, backdropFilter: 'blur(16px)', border: `1px solid ${BORDERS.ACCENT_SUBTLE}` }}>
              <h2 className="font-serif text-2xl mb-6 flex items-center gap-3" style={{ color: TEXT_PRIMARY }}>
                <MapPin className="w-6 h-6" style={{ color: COLORS.ACCENT_PRIMARY }} />
                Contact Information
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="address" style={{ color: TEXT_PRIMARY }}>Address</Label>
                  <Input
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                    className="mt-1"
                    style={{ backgroundColor: COMPONENTS.INPUT_BACKGROUND, borderColor: BORDERS.TEXT_SUBTLE, color: TEXT_PRIMARY }}
                  />
                </div>
                
                <div>
                  <Label htmlFor="city" style={{ color: TEXT_PRIMARY }}>City</Label>
                  <Input
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    required
                    className="mt-1"
                    style={{ backgroundColor: COMPONENTS.INPUT_BACKGROUND, borderColor: BORDERS.TEXT_SUBTLE, color: TEXT_PRIMARY }}
                  />
                </div>
                
                <div>
                  <Label htmlFor="country" style={{ color: TEXT_PRIMARY }}>Country</Label>
                  <Input
                    id="country"
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    required
                    className="mt-1"
                    style={{ backgroundColor: COMPONENTS.INPUT_BACKGROUND, borderColor: BORDERS.TEXT_SUBTLE, color: TEXT_PRIMARY }}
                  />
                </div>
                
                <div>
                  <Label htmlFor="phoneNumber" style={{ color: TEXT_PRIMARY }}>Phone Number</Label>
                  <Input
                    id="phoneNumber"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    required
                    className="mt-1"
                    style={{ backgroundColor: COMPONENTS.INPUT_BACKGROUND, borderColor: BORDERS.TEXT_SUBTLE, color: TEXT_PRIMARY }}
                  />
                </div>
              </div>
            </Card>

            {/* Medical Information */}
            <Card className="rounded-3xl p-8 shadow-xl" style={{ backgroundColor: GLASS.CARD_BACKGROUND, backdropFilter: 'blur(16px)', border: `1px solid ${BORDERS.ACCENT_SUBTLE}` }}>
              <h2 className="font-serif text-2xl mb-6 flex items-center gap-3" style={{ color: TEXT_PRIMARY }}>
                <FileText className="w-6 h-6" style={{ color: COLORS.ACCENT_PRIMARY }} />
                Medical Information
              </h2>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="medicalConditions" style={{ color: TEXT_PRIMARY }}>Medical Conditions</Label>
                  <textarea
                    id="medicalConditions"
                    name="medicalConditions"
                    value={formData.medicalConditions}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full mt-1 rounded-lg border px-3 py-2"
                    style={{ backgroundColor: COMPONENTS.INPUT_BACKGROUND, borderColor: BORDERS.TEXT_SUBTLE, color: TEXT_PRIMARY }}
                    placeholder="Please list any existing medical conditions..."
                  />
                </div>
                
                <div>
                  <Label htmlFor="allergies" style={{ color: TEXT_PRIMARY }}>Allergies</Label>
                  <textarea
                    id="allergies"
                    name="allergies"
                    value={formData.allergies}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full mt-1 rounded-lg border px-3 py-2"
                    style={{ backgroundColor: COMPONENTS.INPUT_BACKGROUND, borderColor: BORDERS.TEXT_SUBTLE, color: TEXT_PRIMARY }}
                    placeholder="Please list any allergies..."
                  />
                </div>
                
                <div>
                  <Label htmlFor="medications" style={{ color: TEXT_PRIMARY }}>Current Medications</Label>
                  <textarea
                    id="medications"
                    name="medications"
                    value={formData.medications}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full mt-1 rounded-lg border px-3 py-2"
                    style={{ backgroundColor: COMPONENTS.INPUT_BACKGROUND, borderColor: BORDERS.TEXT_SUBTLE, color: TEXT_PRIMARY }}
                    placeholder="Please list current medications..."
                  />
                </div>
              </div>
            </Card>

            {/* Companions */}
            <Card className="rounded-3xl p-8 shadow-xl" style={{ backgroundColor: GLASS.CARD_BACKGROUND, backdropFilter: 'blur(16px)', border: `1px solid ${BORDERS.ACCENT_SUBTLE}` }}>
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-serif text-2xl flex items-center gap-3" style={{ color: TEXT_PRIMARY }}>
                  <User className="w-6 h-6" style={{ color: COLORS.ACCENT_PRIMARY }} />
                  Travel Companions
                </h2>
                <Button
                  type="button"
                  onClick={addCompanion}
                  className="rounded-full px-4 py-2 flex items-center gap-2"
                  style={{ background: `linear-gradient(to right, ${COLORS.ACCENT_PRIMARY}, ${COLORS.ACCENT_SECONDARY})`, color: TEXT_PRIMARY }}
                >
                  <Plus className="w-4 h-4" />
                  Add Companion
                </Button>
              </div>
              
              {companions.length === 0 ? (
                <p style={{ color: TEXT_PRIMARY_ALPHA_50, textAlign: 'center', padding: '2rem' }}>
                  No companions added. Click "Add Companion" if you're traveling with someone.
                </p>
              ) : (
                <div className="space-y-4">
                  {companions.map((companion, index) => (
                    <div key={companion.id} className="p-4 rounded-xl border" style={{ backgroundColor: COMPONENTS.INPUT_BACKGROUND, borderColor: BORDERS.TEXT_SUBTLE }}>
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-semibold" style={{ color: TEXT_PRIMARY }}>Companion {index + 1}</h3>
                        <Button
                          type="button"
                          onClick={() => removeCompanion(companion.id)}
                          variant="outline"
                          size="sm"
                          className="rounded-full"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label style={{ color: TEXT_PRIMARY }}>Full Name</Label>
                          <Input
                            value={companion.fullName}
                            onChange={(e) => updateCompanion(companion.id, 'fullName', e.target.value)}
                            className="mt-1"
                            style={{ backgroundColor: BACKGROUND_PRIMARY, borderColor: BORDERS.TEXT_SUBTLE, color: TEXT_PRIMARY }}
                          />
                        </div>
                        <div>
                          <Label style={{ color: TEXT_PRIMARY }}>Relationship</Label>
                          <Input
                            value={companion.relationship}
                            onChange={(e) => updateCompanion(companion.id, 'relationship', e.target.value)}
                            className="mt-1"
                            style={{ backgroundColor: BACKGROUND_PRIMARY, borderColor: BORDERS.TEXT_SUBTLE, color: TEXT_PRIMARY }}
                            placeholder="e.g., spouse, friend, family"
                          />
                        </div>
                        <div>
                          <Label style={{ color: TEXT_PRIMARY }}>Passport Number</Label>
                          <Input
                            value={companion.passportNumber}
                            onChange={(e) => updateCompanion(companion.id, 'passportNumber', e.target.value)}
                            className="mt-1"
                            style={{ backgroundColor: BACKGROUND_PRIMARY, borderColor: BORDERS.TEXT_SUBTLE, color: TEXT_PRIMARY }}
                          />
                        </div>
                        <div>
                          <Label style={{ color: TEXT_PRIMARY }}>Date of Birth</Label>
                          <Input
                            type="date"
                            value={companion.dateOfBirth}
                            onChange={(e) => updateCompanion(companion.id, 'dateOfBirth', e.target.value)}
                            className="mt-1"
                            style={{ backgroundColor: BACKGROUND_PRIMARY, borderColor: BORDERS.TEXT_SUBTLE, color: TEXT_PRIMARY }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </Card>

            {/* Submit Button */}
            <div className="text-center">
              <Button
                type="submit"
                disabled={submitting}
                className="rounded-full px-12 py-4 text-lg font-semibold shadow-lg"
                style={{ 
                  background: `linear-gradient(to right, ${COLORS.ACCENT_PRIMARY}, ${COLORS.ACCENT_SECONDARY})`, 
                  color: TEXT_PRIMARY 
                }}
              >
                {submitting ? 'Submitting...' : 'Submit Travel Details'}
              </Button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default OrganizeTravel;
