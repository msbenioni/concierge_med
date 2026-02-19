import { TRIP_CONFIG, TRIP_STATUS, BOOKING_STATUS, HOSPITAL_REF_PREFIX } from "../constants";

// Shared mock trips data
export const mockTrips = [
  {
    id: 1,
    departure_city: "Auckland",
    destination: TRIP_CONFIG.DESTINATION,
    departure_date: "2024-03-15",
    return_date: "2024-03-22",
    confirmed_count: 6,
    min_travelers: TRIP_CONFIG.MIN_TRAVELERS,
    price: TRIP_CONFIG.DEFAULT_PRICE || 4000,
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
    price: TRIP_CONFIG.DEFAULT_PRICE || 4000,
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
    price: TRIP_CONFIG.DEFAULT_PRICE || 4000,
    status: TRIP_STATUS.WAITLIST,
    hospital_approved: true,
    hospital_reference: `${HOSPITAL_REF_PREFIX}-2024-0510`
  }
];

// Shared mock notifications data
export const mockNotifications = [
  {
    id: 1,
    booking_ref: "CC-0001",
    user: {
      full_name: "Sarah Johnson",
      email: "sarah.j@email.com",
      phone: "+64 21 123 4567",
      country: "New Zealand"
    },
    trip_title: "Tijuana Medical Journey",
    travelers_count: 1,
    preferred_date: "2024-03-15",
    booking_status: BOOKING_STATUS.CONFIRMED,
    payment_status: "paid",
    questionnaire_complete: true,
    flight_status: "confirmed",
    accommodation_status: "confirmed",
    transfers_status: "confirmed",
    notes: "Wheelchair assistance required",
    payment_link_url: "https://payment.stripe.com/pay/cc-0001"
  },
  {
    id: 2,
    booking_ref: "CC-0002",
    user: {
      full_name: "Michael Chen",
      email: "m.chen@email.com",
      phone: "+61 2 9876 5432",
      country: "Australia"
    },
    trip_title: "Tijuana Medical Journey",
    travelers_count: 1,
    preferred_date: "2024-04-12",
    booking_status: BOOKING_STATUS.PENDING,
    payment_status: "unpaid",
    questionnaire_complete: false,
    flight_status: "not_started",
    accommodation_status: "not_started",
    transfers_status: "not_started",
    notes: "First-time traveler",
    payment_link_url: "https://payment.stripe.com/pay/cc-0002"
  },
  {
    id: 3,
    booking_ref: "CC-0003",
    user: {
      full_name: "Emma Wilson",
      email: "emma.w@email.com",
      phone: "+64 9 456 7890",
      country: "New Zealand"
    },
    trip_title: "Tijuana Medical Journey",
    travelers_count: 1,
    preferred_date: "2024-05-10",
    booking_status: "new",
    payment_status: "unpaid",
    questionnaire_complete: false,
    flight_status: "not_started",
    accommodation_status: "not_started",
    transfers_status: "not_started",
    notes: "Allergic to nuts",
    payment_link_url: ""
  }
];
