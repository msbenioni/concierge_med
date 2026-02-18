import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Calendar, 
  Plus, 
  Edit2, 
  Trash2, 
  Users, 
  MapPin, 
  Plane,
  Save,
  X,
  AlertCircle,
  CheckCircle,
  Mail,
  Phone,
  Globe
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import DisclaimerBlock from "../components/compass-connect/DisclaimerBlock";
import { TRIP_CONFIG, TRIP_STATUS, BOOKING_STATUS, USER_STATUS, HOSPITAL_REF_PREFIX } from "../constants";

export default function Admin() {
  const [trips, setTrips] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingTrip, setEditingTrip] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [editingFields, setEditingFields] = useState({});

  // Initialize with mock data
  useEffect(() => {
    const mockTrips = [
      {
        id: 1,
        departure_city: "Auckland",
        destination: TRIP_CONFIG.DESTINATION,
        departure_date: "2024-03-15",
        return_date: "2024-03-22",
        confirmed_count: 6,
        min_travelers: TRIP_CONFIG.MIN_TRAVELERS,
        price: TRIP_CONFIG.DEFAULT_PRICE,
        status: TRIP_STATUS.AVAILABLE,
        hospital_approved: true,
        hospital_reference: `${HOSPITAL_REF_PREFIX}-2024-0315`
      },
      {
        id: 2,
        departure_city: "Sydney",
        destination: TRIP_CONFIG.DESTINATION, 
        departure_date: "2024-04-12",
        return_date: "2024-04-19",
        confirmed_count: 3,
        min_travelers: TRIP_CONFIG.MIN_TRAVELERS,
        price: TRIP_CONFIG.DEFAULT_PRICE,
        status: TRIP_STATUS.AVAILABLE,
        hospital_approved: true,
        hospital_reference: `${HOSPITAL_REF_PREFIX}-2024-0412`
      },
      {
        id: 3,
        departure_city: "Melbourne",
        destination: TRIP_CONFIG.DESTINATION,
        departure_date: "2024-05-10",
        return_date: "2024-05-17",
        confirmed_count: 9,
        min_travelers: TRIP_CONFIG.MIN_TRAVELERS,
        price: TRIP_CONFIG.DEFAULT_PRICE,
        status: TRIP_STATUS.WAITLIST,
        hospital_approved: true,
        hospital_reference: `${HOSPITAL_REF_PREFIX}-2024-0510`
      }
    ];
    
    const mockNotifications = [
      {
        id: 1,
        user: {
          full_name: "Sarah Johnson",
          email: "sarah.j@email.com",
          phone: "+64 21 123 4567",
          country: "New Zealand"
        },
        action: "questionnaire_completed",
        timestamp: "2024-02-19T10:30:00Z",
        hospital_reference: "MBC-2024-0219",
        status: "pending",
        booking: {
          status: "confirmed",
          travel_dates: {
            departure: "2024-03-15",
            return: "2024-03-22"
          },
          flight_confirmation: "NZ12345",
          accommodation: "Hotel Grand Tijuana",
          notes: "Window seat requested, vegetarian meals"
        }
      },
      {
        id: 2,
        user: {
          full_name: "Michael Chen",
          email: "m.chen@email.com",
          phone: "+61 2 9876 5432",
          country: "Australia"
        },
        action: "questionnaire_completed",
        timestamp: "2024-02-19T09:15:00Z",
        hospital_reference: "MBC-2024-0218",
        status: "reviewed",
        booking: {
          status: "pending",
          travel_dates: null,
          flight_confirmation: null,
          accommodation: null,
          notes: "Awaiting hospital surgery date confirmation"
        }
      },
      {
        id: 3,
        user: {
          full_name: "Emma Wilson",
          email: "emma.w@email.com",
          phone: "+64 9 456 7890",
          country: "New Zealand"
        },
        action: "questionnaire_completed",
        timestamp: "2024-02-18T14:20:00Z",
        hospital_reference: "MBC-2024-0217",
        status: "reviewed",
        booking: {
          status: "to_be_requested",
          travel_dates: null,
          flight_confirmation: null,
          accommodation: null,
          notes: "Patient needs to confirm surgery date first"
        }
      }
    ];
    
    setTrips(mockTrips);
    setNotifications(mockNotifications);
  }, []);

  const [newTrip, setNewTrip] = useState({
    departure_city: "",
    destination: TRIP_CONFIG.DESTINATION,
    departure_date: "",
    return_date: "",
    min_travelers: TRIP_CONFIG.MIN_TRAVELERS,
    price: TRIP_CONFIG.DEFAULT_PRICE,
    hospital_reference: "",
    hospital_approved: false
  });

  const handleAddTrip = () => {
    if (newTrip.departure_city && newTrip.departure_date && newTrip.return_date && newTrip.hospital_reference) {
      const trip = {
        ...newTrip,
        id: Date.now(),
        confirmed_count: 0,
        status: TRIP_STATUS.AVAILABLE
      };
      setTrips([...trips, trip]);
      setNewTrip({
        departure_city: "",
        destination: TRIP_CONFIG.DESTINATION,
        departure_date: "",
        return_date: "",
        min_travelers: TRIP_CONFIG.MIN_TRAVELERS,
        price: TRIP_CONFIG.DEFAULT_PRICE,
        hospital_reference: "",
        hospital_approved: false
      });
      setShowAddForm(false);
    }
  };

  const handleEditTrip = (trip) => {
    setEditingTrip({ ...trip });
    setIsEditing(true);
  };

  const handleUpdateTrip = () => {
    setTrips(trips.map(trip => 
      trip.id === editingTrip.id ? editingTrip : trip
    ));
    setIsEditing(false);
    setEditingTrip(null);
  };

  const handleDeleteTrip = (id) => {
    setTrips(trips.filter(trip => trip.id !== id));
  };

  const getBookingStatusColor = (status) => {
    switch (status) {
      case BOOKING_STATUS.CONFIRMED: return "text-green-600 bg-green-50";
      case BOOKING_STATUS.PENDING: return "text-yellow-600 bg-yellow-50";
      case BOOKING_STATUS.TO_BE_REQUESTED: return "text-gray-600 bg-gray-50";
      default: return "text-gray-600 bg-gray-50";
    }
  };

  const getBookingStatusText = (status) => {
    switch (status) {
      case BOOKING_STATUS.CONFIRMED: return "Confirmed";
      case BOOKING_STATUS.PENDING: return "Pending";
      case BOOKING_STATUS.TO_BE_REQUESTED: return "To Be Requested";
      default: return "Unknown";
    }
  };

  const updateBookingStatus = (notificationId, newStatus) => {
    setNotifications(notifications.map(notification => 
      notification.id === notificationId 
        ? { ...notification, booking: { ...notification.booking, status: newStatus } }
        : notification
    ));
  };

  const handleFieldChange = (notificationId, field, value) => {
    // Update editing fields state
    setEditingFields(prev => ({
      ...prev,
      [`${notificationId}-${field}`]: value
    }));
    
    // Update notification data
    setNotifications(notifications.map(notification => {
      if (notification.id === notificationId) {
        const fieldParts = field.split('.');
        if (fieldParts.length === 2) {
          // Handle nested fields like booking.flight_confirmation
          return {
            ...notification,
            [fieldParts[0]]: {
              ...notification[fieldParts[0]],
              [fieldParts[1]]: value
            }
          };
        } else {
          // Handle top-level fields
          return {
            ...notification,
            [field]: value
          };
        }
      }
      return notification;
    }));
  };

  const getFieldValue = (notification, field) => {
    const fieldKey = `${notification.id}-${field}`;
    return editingFields[fieldKey] !== undefined ? editingFields[fieldKey] : 
      field.includes('.') ? field.split('.').reduce((obj, key) => {
        const value = obj?.[key];
        return value !== undefined ? value : '';
      }, notification) : notification[field] || '';
  };

  const getStatusColor = (status) => {
    switch (status) {
      case TRIP_STATUS.AVAILABLE: return "text-green-600 bg-green-50";
      case TRIP_STATUS.WAITLIST: return "text-yellow-600 bg-yellow-50";
      case TRIP_STATUS.CLOSED: return "text-red-600 bg-red-50";
      default: return "text-gray-600 bg-gray-50";
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case TRIP_STATUS.AVAILABLE: return "Available";
      case TRIP_STATUS.WAITLIST: return "Waitlist";
      case TRIP_STATUS.CLOSED: return "Closed";
      default: return "Unknown";
    }
  };

  return (
    <div>
      {/* Header */}
      <section className="pt-16 pb-8 lg:pt-24 lg:pb-12">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <span className="text-xs uppercase tracking-[0.2em] text-[#B8D963] font-semibold">Admin Portal</span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0E7C8C] mt-3" style={{ fontFamily: 'Playfair Display, serif' }}>
              Hospital-Approved Trip Management
            </h1>
            <p className="mt-4 text-[#7A9BA8] max-w-2xl mx-auto" style={{ fontFamily: 'Inter, sans-serif' }}>
              Manage group travel dates based on hospital confirmations. Add new dates when patients receive surgery approval.
            </p>
          </motion.div>

          {/* Admin Notice */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-8"
          >
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="text-sm font-semibold text-blue-900 mb-1">Hospital Approval Process</h3>
                <p className="text-sm text-blue-700">
                  Only add trip dates after receiving confirmation from the hospital that at least one patient has been approved for surgery on that date. 
                  Each trip requires a hospital reference number for tracking.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="pb-16">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          {/* Add New Trip Button */}
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-[#0E7C8C]" style={{ fontFamily: 'Playfair Display, serif' }}>
              Manage Trips ({trips.length})
            </h2>
            <Button
              onClick={() => setShowAddForm(true)}
              className="bg-[#0E7C8C] hover:bg-[#0E7C8C]/90 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add Hospital-Approved Trip
            </Button>
          </div>

          {/* Add Trip Form */}
          {showAddForm && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl p-6 shadow-sm border border-[#B8D963]/10 mb-8"
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold text-[#0E7C8C]">Add New Trip Date</h3>
                <Button
                  onClick={() => setShowAddForm(false)}
                  variant="ghost"
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm text-[#1E1E1E] mb-1.5 block">Departure City *</Label>
                  <Input
                    placeholder="e.g. Auckland"
                    value={newTrip.departure_city}
                    onChange={(e) => setNewTrip({...newTrip, departure_city: e.target.value})}
                  />
                </div>
                <div>
                  <Label className="text-sm text-[#1E1E1E] mb-1.5 block">Destination</Label>
                  <Input
                    value={newTrip.destination}
                    onChange={(e) => setNewTrip({...newTrip, destination: e.target.value})}
                  />
                </div>
                <div>
                  <Label className="text-sm text-[#1E1E1E] mb-1.5 block">Departure Date *</Label>
                  <Input
                    type="date"
                    value={newTrip.departure_date}
                    onChange={(e) => setNewTrip({...newTrip, departure_date: e.target.value})}
                  />
                </div>
                <div>
                  <Label className="text-sm text-[#1E1E1E] mb-1.5 block">Return Date *</Label>
                  <Input
                    type="date"
                    value={newTrip.return_date}
                    onChange={(e) => setNewTrip({...newTrip, return_date: e.target.value})}
                  />
                </div>
                <div>
                  <Label className="text-sm text-[#1E1E1E] mb-1.5 block">Minimum Travelers</Label>
                  <Input
                    type="number"
                    value={newTrip.min_travelers}
                    onChange={(e) => setNewTrip({...newTrip, min_travelers: parseInt(e.target.value) || 0})}
                  />
                </div>
                <div>
                  <Label className="text-sm text-[#1E1E1E] mb-1.5 block">Price</Label>
                  <Input
                    type="number"
                    value={newTrip.price}
                    onChange={(e) => setNewTrip({...newTrip, price: parseInt(e.target.value) || 0})}
                  />
                </div>
                <div className="md:col-span-2">
                  <Label className="text-sm text-[#1E1E1E] mb-1.5 block">Hospital Reference Number *</Label>
                  <Input
                    placeholder="e.g. MBC-2024-0315"
                    value={newTrip.hospital_reference}
                    onChange={(e) => setNewTrip({...newTrip, hospital_reference: e.target.value})}
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <Button
                  onClick={() => setShowAddForm(false)}
                  variant="outline"
                  className="border-[#FF8C42] text-[#FF8C42] hover:bg-[#FF8C42]/10"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleAddTrip}
                  className="bg-[#0E7C8C] hover:bg-[#0E7C8C]/90 text-white"
                >
                  <Save className="w-4 h-4 mr-2" />
                  Add Trip
                </Button>
              </div>
            </motion.div>
          )}

          {/* Trips List */}
          <div className="space-y-4">
            {trips.map((trip, index) => (
              <motion.div
                key={trip.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white rounded-2xl p-6 shadow-sm border border-[#B8D963]/5"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 rounded-xl bg-[#0E7C8C]/10 flex items-center justify-center">
                        <Plane className="w-6 h-6 text-[#0E7C8C]" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-[#0E7C8C]">
                          {trip.departure_city} → {trip.destination}
                        </h3>
                        <div className="flex items-center gap-4 text-sm text-[#7A9BA8] mt-1">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {new Date(trip.departure_date).toLocaleDateString()} - {new Date(trip.return_date).toLocaleDateString()}
                          </span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(trip.status)}`}>
                            {getStatusText(trip.status)}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-[#7A9BA8]" />
                        <div>
                          <p className="text-xs text-[#7A9BA8]">Booked</p>
                          <p className="text-sm font-medium text-[#1E1E1E]">
                            {trip.confirmed_count}/{trip.min_travelers}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-[#7A9BA8]" />
                        <div>
                          <p className="text-xs text-[#7A9BA8]">Departure</p>
                          <p className="text-sm font-medium text-[#1E1E1E]">{trip.departure_city}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-[#7A9BA8]">Price</span>
                        <p className="text-sm font-medium text-[#1E1E1E]">{trip.price.toLocaleString()}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        {trip.hospital_approved ? (
                          <CheckCircle className="w-4 h-4 text-green-600" />
                        ) : (
                          <AlertCircle className="w-4 h-4 text-yellow-600" />
                        )}
                        <div>
                          <p className="text-xs text-[#7A9BA8]">Hospital Ref</p>
                          <p className="text-sm font-medium text-[#1E1E1E]">{trip.hospital_reference}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 ml-4">
                    <Button
                      onClick={() => handleEditTrip(trip)}
                      variant="ghost"
                      className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                    >
                      <Edit2 className="w-4 h-4" />
                    </Button>
                    <Button
                      onClick={() => handleDeleteTrip(trip.id)}
                      variant="ghost"
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {trips.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <div className="w-16 h-16 rounded-full bg-[#0E7C8C]/10 flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-8 h-8 text-[#0E7C8C]" />
              </div>
              <h3 className="text-lg font-semibold text-[#0E7C8C] mb-2">No Hospital-Approved Trips</h3>
              <p className="text-[#7A9BA8] mb-6">
                Add trip dates when you receive hospital confirmation for patient surgeries.
              </p>
              <Button
                onClick={() => setShowAddForm(true)}
                className="bg-[#0E7C8C] hover:bg-[#0E7C8C]/90 text-white"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add First Trip
              </Button>
            </motion.div>
          )}
        </div>
      </section>

      {/* Edit Modal */}
      {isEditing && editingTrip && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold text-[#0E7C8C]">Edit Trip</h3>
              <Button
                onClick={() => setIsEditing(false)}
                variant="ghost"
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className="text-sm text-[#1E1E1E] mb-1.5 block">Departure City</Label>
                <Input
                  value={editingTrip.departure_city}
                  onChange={(e) => setEditingTrip({...editingTrip, departure_city: e.target.value})}
                />
              </div>
              <div>
                <Label className="text-sm text-[#1E1E1E] mb-1.5 block">Destination</Label>
                <Input
                  value={editingTrip.destination}
                  onChange={(e) => setEditingTrip({...editingTrip, destination: e.target.value})}
                />
              </div>
              <div>
                <Label className="text-sm text-[#1E1E1E] mb-1.5 block">Departure Date</Label>
                <Input
                  type="date"
                  value={editingTrip.departure_date}
                  onChange={(e) => setEditingTrip({...editingTrip, departure_date: e.target.value})}
                />
              </div>
              <div>
                <Label className="text-sm text-[#1E1E1E] mb-1.5 block">Return Date</Label>
                <Input
                  type="date"
                  value={editingTrip.return_date}
                  onChange={(e) => setEditingTrip({...editingTrip, return_date: e.target.value})}
                />
              </div>
              <div>
                <Label className="text-sm text-[#1E1E1E] mb-1.5 block">Confirmed Count</Label>
                <Input
                  type="number"
                  value={editingTrip.confirmed_count}
                  onChange={(e) => setEditingTrip({...editingTrip, confirmed_count: parseInt(e.target.value)})}
                />
              </div>
              <div>
                <Label className="text-sm text-[#1E1E1E] mb-1.5 block">Minimum Travelers</Label>
                <Input
                  type="number"
                  value={editingTrip.min_travelers}
                  onChange={(e) => setEditingTrip({...editingTrip, min_travelers: parseInt(e.target.value) || 0})}
                />
              </div>
              <div>
                <Label className="text-sm text-[#1E1E1E] mb-1.5 block">Price</Label>
                <Input
                  type="number"
                  value={editingTrip.price}
                  onChange={(e) => setEditingTrip({...editingTrip, price: parseInt(e.target.value) || 0})}
                />
              </div>
              <div>
                <Label className="text-sm text-[#1E1E1E] mb-1.5 block">Status</Label>
                <select
                  value={editingTrip.status}
                  onChange={(e) => setEditingTrip({...editingTrip, status: e.target.value})}
                  className="w-full h-9 rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm"
                >
                  <option value={TRIP_STATUS.AVAILABLE}>Available</option>
                  <option value={TRIP_STATUS.WAITLIST}>Waitlist</option>
                  <option value={TRIP_STATUS.CLOSED}>Closed</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <Label className="text-sm text-[#1E1E1E] mb-1.5 block">Hospital Reference</Label>
                <Input
                  value={editingTrip.hospital_reference}
                  onChange={(e) => setEditingTrip({...editingTrip, hospital_reference: e.target.value})}
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <Button
                onClick={() => setIsEditing(false)}
                variant="outline"
                className="border-[#FF8C42] text-[#FF8C42] hover:bg-[#FF8C42]/10"
              >
                Cancel
              </Button>
              <Button
                onClick={handleUpdateTrip}
                className="bg-[#0E7C8C] hover:bg-[#0E7C8C]/90 text-white"
              >
                <Save className="w-4 h-4 mr-2" />
                Update Trip
              </Button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Notifications Section */}
      <section className="pb-16">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-[#0E7C8C]" style={{ fontFamily: 'Playfair Display, serif' }}>
              Recent Questionnaire Completions ({notifications.length})
            </h2>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-[#7A9BA8]">Live notifications</span>
            </div>
          </div>

          {notifications.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[1800px] border-collapse border border-gray-300 bg-white">
                {/* Table Header */}
                <thead>
                  <tr className="bg-gray-100 border-b border-gray-300">
                    <th className="border border-gray-300 px-3 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider w-32">
                      User Details
                    </th>
                    <th className="border border-gray-300 px-3 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider w-48">
                      Email
                    </th>
                    <th className="border border-gray-300 px-3 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider w-72">
                      Phone
                    </th>
                    <th className="border border-gray-300 px-3 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider w-40">
                      Country
                    </th>
                    <th className="border border-gray-300 px-3 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider w-32">
                      Completed
                    </th>
                    <th className="border border-gray-300 px-3 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider w-48">
                      Hospital Ref
                    </th>
                    <th className="border border-gray-300 px-3 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider w-80">
                      Travel Dates
                    </th>
                    <th className="border border-gray-300 px-3 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider w-48">
                      Flight
                    </th>
                    <th className="border border-gray-300 px-3 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider w-56">
                      Accommodation
                    </th>
                    <th className="border border-gray-300 px-3 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider w-64">
                      Notes
                    </th>
                    <th className="border border-gray-300 px-3 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider w-32">
                      Status
                    </th>
                    <th className="border border-gray-300 px-3 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider w-48">
                      Actions
                    </th>
                  </tr>
                </thead>

                {/* Table Body */}
                <tbody>
                  {notifications.map((notification, index) => (
                    <motion.tr
                      key={notification.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="hover:bg-gray-50 border-b border-gray-200"
                    >
                      {/* User Details */}
                      <td className="border border-gray-200 px-3 py-2 w-32">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded bg-[#FF8C42]/10 flex items-center justify-center flex-shrink-0">
                            <CheckCircle className="w-3 h-3 text-[#FF8C42]" />
                          </div>
                          <div className="flex-1">
                            <Input
                              type="text"
                              value={getFieldValue(notification, 'user.full_name') || ''}
                              onChange={(e) => handleFieldChange(notification.id, 'user.full_name', e.target.value)}
                              className="text-sm font-medium text-gray-900 border-0 bg-transparent p-0 h-6 focus:ring-1 focus:ring-blue-500"
                            />
                            <div className="mt-1">
                              <select
                                value={getFieldValue(notification, 'status') || USER_STATUS.PENDING}
                                onChange={(e) => handleFieldChange(notification.id, 'status', e.target.value)}
                                className={`px-1.5 py-0.5 rounded text-xs font-medium border-0 bg-transparent focus:ring-1 focus:ring-blue-500 ${
                                  getFieldValue(notification, 'status') === USER_STATUS.PENDING 
                                    ? 'text-yellow-600 bg-yellow-50' 
                                    : 'text-green-600 bg-green-50'
                                }`}
                              >
                                <option value={USER_STATUS.PENDING}>Pending</option>
                                <option value={USER_STATUS.REVIEWED}>Reviewed</option>
                              </select>
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Email */}
                      <td className="border border-gray-200 px-3 py-2 w-48">
                        <Input
                          type="email"
                          value={getFieldValue(notification, 'user.email') || ''}
                          onChange={(e) => handleFieldChange(notification.id, 'user.email', e.target.value)}
                          className="text-sm text-gray-600 border-0 bg-transparent p-0 h-6 focus:ring-1 focus:ring-blue-500"
                        />
                      </td>

                      {/* Phone */}
                      <td className="border border-gray-200 px-3 py-2 w-72">
                        <Input
                          type="tel"
                          value={getFieldValue(notification, 'user.phone') || ''}
                          onChange={(e) => handleFieldChange(notification.id, 'user.phone', e.target.value)}
                          className="text-sm text-gray-900 border-0 bg-transparent p-0 h-6 focus:ring-1 focus:ring-blue-500"
                        />
                      </td>

                      {/* Country */}
                      <td className="border border-gray-200 px-3 py-2 w-40">
                        <Input
                          type="text"
                          value={getFieldValue(notification, 'user.country') || ''}
                          onChange={(e) => handleFieldChange(notification.id, 'user.country', e.target.value)}
                          className="text-sm text-gray-900 border-0 bg-transparent p-0 h-6 focus:ring-1 focus:ring-blue-500"
                        />
                      </td>

                      {/* Completed */}
                      <td className="border border-gray-200 px-3 py-2 w-32">
                        <Input
                          type="date"
                          value={getFieldValue(notification, 'timestamp') || ''}
                          onChange={(e) => handleFieldChange(notification.id, 'timestamp', e.target.value)}
                          className="text-sm text-gray-900 border-0 bg-transparent p-0 h-6 focus:ring-1 focus:ring-blue-500"
                        />
                      </td>

                      {/* Hospital Ref */}
                      <td className="border border-gray-200 px-3 py-2 w-48">
                        <Input
                          type="text"
                          value={getFieldValue(notification, 'hospital_reference') || ''}
                          onChange={(e) => handleFieldChange(notification.id, 'hospital_reference', e.target.value)}
                          className="text-sm text-gray-900 border-0 bg-transparent p-0 h-6 focus:ring-1 focus:ring-blue-500"
                        />
                      </td>

                      {/* Travel Dates */}
                      <td className="border border-gray-200 px-3 py-2 w-80">
                        <div className="flex gap-2">
                          <Input
                            type="date"
                            value={getFieldValue(notification, 'booking.travel_dates.departure') || ''}
                            onChange={(e) => handleFieldChange(notification.id, 'booking.travel_dates.departure', e.target.value)}
                            className="text-sm text-gray-900 border-0 bg-transparent p-0 h-6 focus:ring-1 focus:ring-blue-500"
                          />
                          <span className="text-sm text-gray-500">-</span>
                          <Input
                            type="date"
                            value={getFieldValue(notification, 'booking.travel_dates.return') || ''}
                            onChange={(e) => handleFieldChange(notification.id, 'booking.travel_dates.return', e.target.value)}
                            className="text-sm text-gray-900 border-0 bg-transparent p-0 h-6 focus:ring-1 focus:ring-blue-500"
                          />
                        </div>
                      </td>

                      {/* Flight */}
                      <td className="border border-gray-200 px-3 py-2 w-48">
                        <Input
                          type="text"
                          value={getFieldValue(notification, 'booking.flight_confirmation') || ''}
                          onChange={(e) => handleFieldChange(notification.id, 'booking.flight_confirmation', e.target.value)}
                          placeholder="Flight confirmation"
                          className="text-sm text-gray-900 border-0 bg-transparent p-0 h-6 focus:ring-1 focus:ring-blue-500"
                        />
                      </td>

                      {/* Accommodation */}
                      <td className="border border-gray-200 px-3 py-2 w-56">
                        <Input
                          type="text"
                          value={getFieldValue(notification, 'booking.accommodation') || ''}
                          onChange={(e) => handleFieldChange(notification.id, 'booking.accommodation', e.target.value)}
                          placeholder="Hotel name"
                          className="text-sm text-gray-900 border-0 bg-transparent p-0 h-6 focus:ring-1 focus:ring-blue-500"
                        />
                      </td>

                      {/* Notes */}
                      <td className="border border-gray-200 px-3 py-2 w-64">
                        <Input
                          type="text"
                          value={getFieldValue(notification, 'booking.notes') || ''}
                          onChange={(e) => handleFieldChange(notification.id, 'booking.notes', e.target.value)}
                          placeholder="Special requirements"
                          className="text-sm text-gray-600 border-0 bg-transparent p-0 h-6 focus:ring-1 focus:ring-blue-500"
                        />
                      </td>

                      {/* Status */}
                      <td className="border border-gray-200 px-3 py-2 w-32">
                        <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getBookingStatusColor(notification.booking.status)}`}>
                          {getBookingStatusText(notification.booking.status)}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="border border-gray-200 px-3 py-2 w-48">
                        <div className="flex items-center gap-2">
                          <select
                            value={notification.booking.status}
                            onChange={(e) => updateBookingStatus(notification.id, e.target.value)}
                            className="text-xs px-2 py-1 rounded border border-gray-300 bg-white text-gray-900 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                          >
                            <option value={BOOKING_STATUS.TO_BE_REQUESTED}>To Be Requested</option>
                            <option value={BOOKING_STATUS.PENDING}>Pending</option>
                            <option value={BOOKING_STATUS.CONFIRMED}>Confirmed</option>
                          </select>
                          {notification.status === 'pending' && (
                            <Button
                              size="sm"
                              className="bg-blue-600 hover:bg-blue-700 text-white px-2 py-1 text-xs"
                            >
                              Mark Reviewed
                            </Button>
                          )}
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <div className="w-16 h-16 rounded-full bg-[#FF8C42]/10 flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-[#FF8C42]" />
              </div>
              <h3 className="text-lg font-semibold text-[#0E7C8C] mb-2">No Recent Questionnaires</h3>
              <p className="text-[#7A9BA8]">
                When users complete questionnaires, they'll appear here for your review.
              </p>
            </motion.div>
          )}
        </div>
      </section>

      {/* Disclaimer */}
      <div className="max-w-7xl mx-auto px-5 sm:px-8 mt-16">
        <DisclaimerBlock />
      </div>
    </div>
  );
}
