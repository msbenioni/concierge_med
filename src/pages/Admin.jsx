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
  Globe,
  Compass,
  ClipboardList,
  Search,
  RefreshCw,
  Copy,
  ExternalLink,
  Link2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TRIP_CONFIG, TRIP_STATUS, BOOKING_STATUS, USER_STATUS, HOSPITAL_REF_PREFIX } from "../constants";
import { mockTrips, mockNotifications } from "../data/mockData";
import { getStatusClassName, getStatusLabel } from "../constants/statusConfig";
import { 
  BACKGROUND_PRIMARY, 
  TEXT_PRIMARY, 
  ACCENT_PRIMARY, 
  ACCENT_SECONDARY,
  TEXT_PRIMARY_ALPHA_70, 
  TEXT_PRIMARY_ALPHA_50, 
  TEXT_PRIMARY_ALPHA_20, 
  ACCENT_PRIMARY_ALPHA_20, 
  GRADIENTS, 
  GLASS, 
  SHADOWS,
  COMPONENTS,
  BORDERS
} from "../constants/colors";

export default function Admin() {
  const [trips, setTrips] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingTrip, setEditingTrip] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [editingFields, setEditingFields] = useState({});
  const [search, setSearch] = useState("");
  const [isLoadingTrips, setIsLoadingTrips] = useState(false);
  const [isLoadingNotifications, setIsLoadingNotifications] = useState(false);
  const [error, setError] = useState(null);

  // Initialize with mock data (simulate API calls)
  useEffect(() => {
    const loadData = async () => {
      setIsLoadingTrips(true);
      setIsLoadingNotifications(true);
      setError(null);
      
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 800));
        
        setTrips(mockTrips);
        setNotifications(mockNotifications);
      } catch (err) {
        setError("Failed to load data. Please try again.");
        console.error("Error loading admin data:", err);
      } finally {
        setIsLoadingTrips(false);
        setIsLoadingNotifications(false);
      }
    };

    loadData();
  }, []);

  // Form validation functions
  const validateTripForm = (trip) => {
    const errors = {};
    
    if (!trip.departure_city.trim()) {
      errors.departure_city = "Departure city is required";
    }
    
    if (!trip.departure_date) {
      errors.departure_date = "Departure date is required";
    }
    
    if (!trip.return_date) {
      errors.return_date = "Return date is required";
    }
    
    if (new Date(trip.return_date) <= new Date(trip.departure_date)) {
      errors.return_date = "Return date must be after departure date";
    }
    
    if (!trip.hospital_reference.trim()) {
      errors.hospital_reference = "Hospital reference is required";
    }
    
    return errors;
  };

  const validateNotificationField = (field, value) => {
    const errors = {};
    
    switch (field) {
      case 'full_name':
        if (!value.trim()) errors.full_name = "Name is required";
        else if (value.length < 2) errors.full_name = "Name must be at least 2 characters";
        break;
      case 'email':
        if (!value.trim()) errors.email = "Email is required";
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) errors.email = "Invalid email format";
        break;
      case 'phone':
        if (!value.trim()) errors.phone = "Phone is required";
        else if (!/^[\d\s\-\+\(\)]+$/.test(value)) errors.phone = "Invalid phone format";
        break;
      case 'country':
        if (!value.trim()) errors.country = "Country is required";
        break;
      default:
        break;
    }
    
    return errors;
  };

  // CSV Export Functions
  const exportToCSV = (data, filename) => {
    const headers = Object.keys(data[0] || {});
    const csvHeaders = headers.join(',');
    const csvRows = data.map(row => 
      headers.map(header => {
        const value = row[header];
        // Handle nested objects and arrays
        if (typeof value === 'object' && value !== null) {
          if (Array.isArray(value)) {
            return `"${value.join('; ')}"`;
          } else {
            return `"${JSON.stringify(value).replace(/"/g, '""')}"`;
          }
        }
        return `"${value}"`;
      }).join(',')
    );
    
    const csvContent = [csvHeaders, ...csvRows].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();
    URL.revokeObjectURL(url);
  };

  const exportTrips = () => {
    const tripsData = trips.map(trip => ({
      id: trip.id,
      departure_city: trip.departure_city,
      destination: trip.destination,
      departure_date: trip.departure_date,
      return_date: trip.return_date,
      confirmed_count: trip.confirmed_count,
      min_travelers: trip.min_travelers,
      price: trip.price,
      status: trip.status,
      hospital_approved: trip.hospital_approved,
      hospital_reference: trip.hospital_reference
    }));
    
    exportToCSV(tripsData, 'trips.csv');
  };

  const exportNotifications = () => {
    const notificationsData = notifications.map(notification => ({
      id: notification.id,
      booking_ref: notification.booking_ref,
      full_name: notification.user?.full_name || '',
      email: notification.user?.email || '',
      phone: notification.user?.phone || '',
      country: notification.user?.country || '',
      trip_title: notification.trip_title,
      travelers_count: notification.travelers_count,
      preferred_date: notification.preferred_date,
      booking_status: notification.booking_status,
      payment_status: notification.payment_status,
      questionnaire_complete: notification.questionnaire_complete,
      flight_status: notification.flight_status,
      accommodation_status: notification.accommodation_status,
      transfers_status: notification.transfers_status,
      notes: notification.notes || '',
      payment_link_url: notification.payment_link_url || ''
    }));
    
    exportToCSV(notificationsData, 'notifications.csv');
  };

  const [newTrip, setNewTrip] = useState({
    departure_city: "",
    destination: TRIP_CONFIG.DESTINATION,
    departure_date: "",
    return_date: "",
    min_travelers: TRIP_CONFIG.MIN_TRAVELERS,
    price: TRIP_CONFIG.DEFAULT_PRICE || 4000,
    hospital_reference: "",
    hospital_approved: false
  });

  const handleAddTrip = () => {
    const errors = validateTripForm(newTrip);
    
    if (Object.keys(errors).length > 0) {
      // Show validation errors (you could add toast notifications here)
      console.error("Validation errors:", errors);
      return;
    }
    
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
      price: TRIP_CONFIG.DEFAULT_PRICE || 4000,
      hospital_reference: "",
      hospital_approved: false
    });
    setShowAddForm(false);
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
    return getStatusClassName('booking', status);
  };

  const getBookingStatusText = (status) => {
    return getStatusLabel('booking', status);
  };

  const updateBookingStatus = (notificationId, newStatus) => {
    setNotifications(notifications.map(notification => 
      notification.id === notificationId 
        ? { ...notification, booking: { ...notification.booking, status: newStatus } }
        : notification
    ));
  };

  // Payment link handlers
  const handleCreatePaymentLink = (notification) => {
    // Generate a mock payment link (in real app, this would call Stripe API)
    const paymentLink = `https://payment.stripe.com/pay/${notification.booking_ref.toLowerCase()}`;
    handleFieldChange(notification.id, 'payment_link_url', paymentLink);
    handleFieldChange(notification.id, 'payment_status', 'link_sent');
    
    // Show success feedback
    alert('Payment link created successfully!');
  };

  const handleCopyPaymentLink = (notification) => {
    const paymentLink = getFieldValue(notification, 'payment_link_url');
    if (paymentLink) {
      navigator.clipboard.writeText(paymentLink);
      alert('Payment link copied to clipboard!');
    }
  };

  // Stats calculation
  const totalBookings = notifications.length;
  const confirmed = notifications.filter((n) => n.booking_status === "confirmed").length;
  const paid = notifications.filter((n) => n.payment_status === "paid").length;
  const reviewed = notifications.filter((n) => n.questionnaire_complete === true).length;
  const activeTrips = trips.filter((t) => t.status === TRIP_STATUS.AVAILABLE).length;

  // Filter notifications
  const filteredNotifications = notifications.filter((n) => {
    if (!search) return true;
    const s = search.toLowerCase();
    return (
      (n.booking_ref || "").toLowerCase().includes(s) ||
      (n.user?.full_name || "").toLowerCase().includes(s) ||
      (n.user?.email || "").toLowerCase().includes(s) ||
      (n.user?.phone || "").toLowerCase().includes(s) ||
      (n.user?.country || "").toLowerCase().includes(s) ||
      (n.trip_title || "").toLowerCase().includes(s) ||
      (n.booking_status || "").toLowerCase().includes(s) ||
      (n.payment_status || "").toLowerCase().includes(s) ||
      (n.notes || "").toLowerCase().includes(s)
    );
  });

  // TODO: Add API integration
  // TODO: Replace mock data with real API calls using React Query
  // TODO: Add pagination for large datasets
  // TODO: Add loading states and error handling
  // TODO: Add real-time updates with WebSocket
  // TODO: Add advanced filtering and sorting
  // TODO: Add data validation and error boundaries
  // TODO: Add export functionality (CSV, PDF)
  // TODO: Add audit trail for changes
  // TODO: Add user permissions and access control

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
    return getStatusClassName('trip', status);
  };

  const getStatusText = (status) => {
    return getStatusLabel('trip', status);
  };

  return (
    <div>
      {/* Hero */}
      <section className="pt-16 pb-8 lg:pt-24 lg:pb-12">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <span className="text-[11px] font-sans font-semibold uppercase tracking-[0.3em] mb-4 block" style={{ color: ACCENT_PRIMARY }}>Management Portal</span>
            <h1 className="font-serif text-4xl md:text-5xl mb-4" style={{ color: TEXT_PRIMARY }}>
              Concierge Desk
            </h1>
            <p className="text-lg" style={{ color: TEXT_PRIMARY_ALPHA_70 }}>
              Manage bookings, journeys & payments for your medical travel concierge service.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 lg:py-20">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="px-4 lg:px-8 py-6">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: GRADIENTS.ACCENT_PRIMARY }}>
                  <Compass className="w-5 h-5" style={{ color: COMPONENTS.BUTTON_PRIMARY_TEXT }} />
                </div>
                <div>
                  <h1 className="font-serif text-2xl" style={{ color: TEXT_PRIMARY }}>Dashboard</h1>
                  <p className="text-xs font-sans" style={{ color: TEXT_PRIMARY_ALPHA_50 }}>Manage bookings, journeys & payments</p>
                </div>
              </div>
              <Button variant="outline" size="sm" className="rounded-full gap-2 text-xs" onClick={() => window.location.reload()}>
                <RefreshCw className="w-3.5 h-3.5" /> Refresh
              </Button>
            </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Total Bookings", value: totalBookings, color: TEXT_PRIMARY },
            { label: "Confirmed", value: confirmed, color: COMPONENTS.STATUS_SUCCESS },
            { label: "Reviewed", value: reviewed, color: COMPONENTS.STATUS_INFO },
            { label: "Active Journeys", value: activeTrips, color: ACCENT_PRIMARY },
          ].map((stat, i) => (
            <div key={i} className="rounded-xl p-5 shadow-sm" style={{ backgroundColor: GLASS.CARD_BACKGROUND, border: `1px solid ${BORDERS.TEXT_SUBTLE}` }}>
              <p className="text-xs font-sans uppercase tracking-wider mb-1" style={{ color: TEXT_PRIMARY_ALPHA_50 }}>{stat.label}</p>
              <p className="text-2xl font-serif font-semibold" style={{ color: stat.color }}>{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <Tabs defaultValue="bookings" className="space-y-6">
          <TabsList className="p-1 rounded-xl" style={{ backgroundColor: GLASS.CARD_BACKGROUND, border: `1px solid ${BORDERS.TEXT_SUBTLE}` }}>
            <TabsTrigger value="bookings" className="rounded-lg gap-2 text-xs font-sans" style={{ color: TEXT_PRIMARY }}>
              <ClipboardList className="w-3.5 h-3.5" /> Bookings
            </TabsTrigger>
            <TabsTrigger value="trips" className="rounded-lg gap-2 text-xs font-sans" style={{ color: TEXT_PRIMARY }}>
              <Plane className="w-3.5 h-3.5" /> Journeys
            </TabsTrigger>
          </TabsList>

          <TabsContent value="bookings">
            <div className="mb-4">
              <div className="relative max-w-sm">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search by name, email, ref..."
                  className="pl-9 rounded-xl text-sm"
                />
              </div>
            </div>
            
            {/* Bookings Table */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[1800px] border-collapse border border-gray-300 bg-white">
                  {/* Table Header */}
                  <thead>
                    <tr className="bg-gray-100 border-b border-gray-300">
                      <th className="border border-gray-300 px-3 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider w-24">
                        Ref
                      </th>
                      <th className="border border-gray-300 px-3 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider w-36">
                        Name
                      </th>
                      <th className="border border-gray-300 px-3 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider w-48">
                        Email
                      </th>
                      <th className="border border-gray-300 px-3 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider w-40">
                        Phone
                      </th>
                      <th className="border border-gray-300 px-3 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider w-24">
                        Country
                      </th>
                      <th className="border border-gray-300 px-3 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider w-40">
                        Journey
                      </th>
                      <th className="border border-gray-300 px-3 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider w-20">
                        Travelers
                      </th>
                      <th className="border border-gray-300 px-3 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider w-32">
                        Pref. Date
                      </th>
                      <th className="border border-gray-300 px-3 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider w-32">
                        Booking
                      </th>
                      <th className="border border-gray-300 px-3 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider w-32">
                        Payment
                      </th>
                      <th className="border border-gray-300 px-3 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider w-20">
                        Q-Form
                      </th>
                      <th className="border border-gray-300 px-3 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider w-32">
                        Flights
                      </th>
                      <th className="border border-gray-300 px-3 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider w-40">
                        Accommod.
                      </th>
                      <th className="border border-gray-300 px-3 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider w-32">
                        Transfers
                      </th>
                      <th className="border border-gray-300 px-3 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider w-48">
                        Notes
                      </th>
                      <th className="border border-gray-300 px-3 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider w-40">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredNotifications.map((notification) => (
                      <tr key={notification.id} className="border-b border-gray-200 hover:bg-gray-50">
                        {/* Ref */}
                        <td className="border border-gray-200 px-3 py-2 w-24">
                          <Input
                            type="text"
                            value={getFieldValue(notification, 'booking_ref') || `CC-${String(notification.id).padStart(4, '0')}`}
                            onChange={(e) => handleFieldChange(notification.id, 'booking_ref', e.target.value)}
                            className="text-sm text-gray-900 border-0 bg-transparent p-0 h-6 focus:ring-1 focus:ring-blue-500"
                          />
                        </td>

                        {/* Name */}
                        <td className="border border-gray-200 px-3 py-2 w-36">
                          <Input
                            type="text"
                            value={getFieldValue(notification, 'user.full_name') || ''}
                            onChange={(e) => handleFieldChange(notification.id, 'user.full_name', e.target.value)}
                            className="text-sm font-medium text-gray-900 border-0 bg-transparent p-0 h-6 focus:ring-1 focus:ring-blue-500"
                          />
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
                        <td className="border border-gray-200 px-3 py-2 w-40">
                          <Input
                            type="tel"
                            value={getFieldValue(notification, 'user.phone') || ''}
                            onChange={(e) => handleFieldChange(notification.id, 'user.phone', e.target.value)}
                            className="text-sm text-gray-900 border-0 bg-transparent p-0 h-6 focus:ring-1 focus:ring-blue-500"
                          />
                        </td>

                        {/* Country */}
                        <td className="border border-gray-200 px-3 py-2 w-24">
                          <Input
                            type="text"
                            value={getFieldValue(notification, 'user.country') || ''}
                            onChange={(e) => handleFieldChange(notification.id, 'user.country', e.target.value)}
                            className="text-sm text-gray-900 border-0 bg-transparent p-0 h-6 focus:ring-1 focus:ring-blue-500"
                          />
                        </td>

                        {/* Journey */}
                        <td className="border border-gray-200 px-3 py-2 w-40">
                          <Input
                            type="text"
                            value={getFieldValue(notification, 'trip_title') || 'Tijuana Medical Journey'}
                            onChange={(e) => handleFieldChange(notification.id, 'trip_title', e.target.value)}
                            className="text-sm text-gray-900 border-0 bg-transparent p-0 h-6 focus:ring-1 focus:ring-blue-500"
                          />
                        </td>

                        {/* Travelers */}
                        <td className="border border-gray-200 px-3 py-2 w-20">
                          <Input
                            type="number"
                            value={getFieldValue(notification, 'travelers_count') || 1}
                            onChange={(e) => handleFieldChange(notification.id, 'travelers_count', parseInt(e.target.value) || 1)}
                            className="text-sm text-gray-900 border-0 bg-transparent p-0 h-6 focus:ring-1 focus:ring-blue-500 w-16"
                          />
                        </td>

                        {/* Pref. Date */}
                        <td className="border border-gray-200 px-3 py-2 w-32">
                          <Input
                            type="date"
                            value={getFieldValue(notification, 'preferred_date') || ''}
                            onChange={(e) => handleFieldChange(notification.id, 'preferred_date', e.target.value)}
                            className="text-sm text-gray-900 border-0 bg-transparent p-0 h-6 focus:ring-1 focus:ring-blue-500"
                          />
                        </td>

                        {/* Booking Status */}
                        <td className="border border-gray-200 px-3 py-2 w-32">
                          <select
                            value={getFieldValue(notification, 'booking_status') || 'new'}
                            onChange={(e) => handleFieldChange(notification.id, 'booking_status', e.target.value)}
                            className="text-xs px-2 py-1 rounded border border-gray-300 bg-white text-gray-900 focus:outline-none focus:ring-1 focus:ring-blue-500"
                          >
                            <option value="new">New</option>
                            <option value="pending">Pending</option>
                            <option value="confirmed">Confirmed</option>
                            <option value="waitlist">Waitlist</option>
                            <option value="cancelled">Cancelled</option>
                          </select>
                        </td>

                        {/* Payment Status */}
                        <td className="border border-gray-200 px-3 py-2 w-32">
                          <select
                            value={getFieldValue(notification, 'payment_status') || 'unpaid'}
                            onChange={(e) => handleFieldChange(notification.id, 'payment_status', e.target.value)}
                            className="text-xs px-2 py-1 rounded border border-gray-300 bg-white text-gray-900 focus:outline-none focus:ring-1 focus:ring-blue-500"
                          >
                            <option value="unpaid">Unpaid</option>
                            <option value="link_sent">Link Sent</option>
                            <option value="paid">Paid</option>
                            <option value="refunded">Refunded</option>
                          </select>
                        </td>

                        {/* Q-Form */}
                        <td className="border border-gray-200 px-3 py-2 w-20">
                          <div className="flex justify-center">
                            <input
                              type="checkbox"
                              checked={getFieldValue(notification, 'questionnaire_complete') || false}
                              onChange={(e) => handleFieldChange(notification.id, 'questionnaire_complete', e.target.checked)}
                              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                            />
                          </div>
                        </td>

                        {/* Flights */}
                        <td className="border border-gray-200 px-3 py-2 w-32">
                          <select
                            value={getFieldValue(notification, 'flight_status') || 'not_started'}
                            onChange={(e) => handleFieldChange(notification.id, 'flight_status', e.target.value)}
                            className="text-xs px-2 py-1 rounded border border-gray-300 bg-white text-gray-900 focus:outline-none focus:ring-1 focus:ring-blue-500"
                          >
                            <option value="not_started">Not Started</option>
                            <option value="in_progress">In Progress</option>
                            <option value="confirmed">Confirmed</option>
                          </select>
                        </td>

                        {/* Accommod. */}
                        <td className="border border-gray-200 px-3 py-2 w-40">
                          <select
                            value={getFieldValue(notification, 'accommodation_status') || 'not_started'}
                            onChange={(e) => handleFieldChange(notification.id, 'accommodation_status', e.target.value)}
                            className="text-xs px-2 py-1 rounded border border-gray-300 bg-white text-gray-900 focus:outline-none focus:ring-1 focus:ring-blue-500"
                          >
                            <option value="not_started">Not Started</option>
                            <option value="in_progress">In Progress</option>
                            <option value="confirmed">Confirmed</option>
                          </select>
                        </td>

                        {/* Transfers */}
                        <td className="border border-gray-200 px-3 py-2 w-32">
                          <select
                            value={getFieldValue(notification, 'transfers_status') || 'not_started'}
                            onChange={(e) => handleFieldChange(notification.id, 'transfers_status', e.target.value)}
                            className="text-xs px-2 py-1 rounded border border-gray-300 bg-white text-gray-900 focus:outline-none focus:ring-1 focus:ring-blue-500"
                          >
                            <option value="not_started">Not Started</option>
                            <option value="in_progress">In Progress</option>
                            <option value="confirmed">Confirmed</option>
                          </select>
                        </td>

                        {/* Notes */}
                        <td className="border border-gray-200 px-3 py-2 w-48">
                          <Input
                            type="text"
                            value={getFieldValue(notification, 'notes') || ''}
                            onChange={(e) => handleFieldChange(notification.id, 'notes', e.target.value)}
                            placeholder="Add notes..."
                            className="text-sm text-gray-600 border-0 bg-transparent p-0 h-6 focus:ring-1 focus:ring-blue-500"
                          />
                        </td>

                        {/* Actions */}
                        <td className="border border-gray-200 px-3 py-2 w-40">
                          <div className="flex items-center gap-1 justify-center">
                            {getFieldValue(notification, 'payment_link_url') ? (
                              <>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-7 w-7 p-0"
                                  title="Copy payment link"
                                  onClick={() => {
                                    navigator.clipboard.writeText(getFieldValue(notification, 'payment_link_url'));
                                    alert('Payment link copied to clipboard!');
                                  }}
                                >
                                  <Copy className="w-3.5 h-3.5 text-gray-500" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-7 w-7 p-0"
                                  title="Open payment link"
                                  onClick={() => window.open(getFieldValue(notification, 'payment_link_url'), '_blank')}
                                >
                                  <ExternalLink className="w-3.5 h-3.5 text-gray-500" />
                                </Button>
                              </>
                            ) : (
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-7 w-7 p-0"
                                title="Create payment link"
                                onClick={() => handleCreatePaymentLink(notification)}
                              >
                                <Link2 className="w-3.5 h-3.5 text-blue-500" />
                              </Button>
                            )}
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-7 w-7 p-0"
                              title="Delete booking"
                              onClick={() => {
                                if (confirm('Delete this booking?')) {
                                  setNotifications(notifications.filter(n => n.id !== notification.id));
                                }
                              }}
                            >
                              <Trash2 className="w-3.5 h-3.5 text-red-400" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="trips">
            {/* Trips Management Section */}
            <div className="space-y-6">
              {/* Add Trip Button */}
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-900">Manage Journeys</h2>
                <Button
                  onClick={() => setShowAddForm(true)}
                  className="rounded-xl"
                  style={{ backgroundColor: ACCENT_PRIMARY, color: COMPONENTS.BUTTON_PRIMARY_TEXT }}
                  onMouseEnter={(e) => e.target.style.backgroundColor = ACCENT_SECONDARY}
                  onMouseLeave={(e) => e.target.style.backgroundColor = ACCENT_PRIMARY}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Journey
                </Button>
              </div>

              {/* Trips Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {trips.map((trip) => (
                  <motion.div
                    key={trip.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="font-semibold text-gray-900">{trip.departure_city}</h3>
                        <p className="text-sm text-gray-500">{trip.destination}</p>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(trip.status)}`}>
                        {getStatusText(trip.status)}
                      </span>
                    </div>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-600">
                          {trip.departure_date} - {trip.return_date}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-gray-400" />
                        <div>
                          <p className="text-xs text-gray-500">Booked</p>
                          <p className="text-sm font-medium text-gray-900">
                            {trip.confirmed_count}/{trip.min_travelers}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-gray-400" />
                        <div>
                          <p className="text-xs text-gray-500">Departure</p>
                          <p className="text-sm font-medium text-gray-900">{trip.departure_city}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-500">Price</span>
                        <p className="text-sm font-medium text-gray-900">{trip.price ? trip.price.toLocaleString() : 'N/A'}</p>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEditTrip(trip)}
                        className="flex-1"
                      >
                        <Edit2 className="w-3 h-3 mr-1" />
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDeleteTrip(trip.id)}
                        className="text-red-600 hover:text-red-700 hover:border-red-300"
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
      </div>
    </section>
    </div>
  );
}
