import { 
  COMPONENTS,
  COLORS,
  BORDERS
} from "./colors";

// Unified status configuration for all status types
export const STATUS_CONFIG = {
  // Trip Status
  trip: {
    available: {
      label: "Available",
      className: "text-green-600 bg-green-50",
      badgeStyle: {
        backgroundColor: 'rgba(0, 0, 0, 0.85)', // Dark background for contrast
        color: '#10b981', // Bright green text
        borderColor: 'rgba(16, 185, 129, 0.5)',
        backdropFilter: 'blur(8px)',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)'
      },
      dotStyle: {
        backgroundColor: '#10b981',
        boxShadow: '0 0 8px rgba(16, 185, 129, 0.6)'
      }
    },
    waitlist: {
      label: "Waitlist", 
      className: "text-yellow-600 bg-yellow-50",
      badgeStyle: {
        backgroundColor: 'rgba(0, 0, 0, 0.85)', // Dark background for contrast
        color: '#f59e0b', // Bright yellow text
        borderColor: 'rgba(245, 158, 11, 0.5)',
        backdropFilter: 'blur(8px)',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)'
      },
      dotStyle: {
        backgroundColor: '#f59e0b',
        boxShadow: '0 0 8px rgba(245, 158, 11, 0.6)'
      }
    },
    closed: {
      label: "Closed",
      className: "text-red-600 bg-red-50",
      badgeStyle: {
        backgroundColor: 'rgba(0, 0, 0, 0.85)', // Dark background for contrast
        color: '#ef4444', // Bright red text
        borderColor: 'rgba(239, 68, 68, 0.5)',
        backdropFilter: 'blur(8px)',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)'
      },
      dotStyle: {
        backgroundColor: '#ef4444',
        boxShadow: '0 0 8px rgba(239, 68, 68, 0.6)'
      }
    }
  },
  
  // Booking Status
  booking: {
    confirmed: {
      label: "Confirmed",
      className: "text-green-600 bg-green-50",
      badgeStyle: {
        backgroundColor: 'rgba(0, 0, 0, 0.85)', // Dark background for contrast
        color: '#10b981', // Bright green text
        borderColor: 'rgba(16, 185, 129, 0.5)',
        backdropFilter: 'blur(8px)',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)'
      },
      dotStyle: {
        backgroundColor: '#10b981',
        boxShadow: '0 0 8px rgba(16, 185, 129, 0.6)'
      }
    },
    pending: {
      label: "Pending",
      className: "text-yellow-600 bg-yellow-50",
      badgeStyle: {
        backgroundColor: 'rgba(0, 0, 0, 0.85)', // Dark background for contrast
        color: '#f59e0b', // Bright yellow text
        borderColor: 'rgba(245, 158, 11, 0.5)',
        backdropFilter: 'blur(8px)',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)'
      },
      dotStyle: {
        backgroundColor: '#f59e0b',
        boxShadow: '0 0 8px rgba(245, 158, 11, 0.6)'
      }
    },
    new: {
      label: "New",
      className: "text-blue-600 bg-blue-50",
      badgeStyle: {
        backgroundColor: 'rgba(0, 0, 0, 0.85)', // Dark background for contrast
        color: '#3b82f6', // Bright blue text
        borderColor: 'rgba(59, 130, 246, 0.5)',
        backdropFilter: 'blur(8px)',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)'
      },
      dotStyle: {
        backgroundColor: '#3b82f6',
        boxShadow: '0 0 8px rgba(59, 130, 246, 0.6)'
      }
    },
    to_be_requested: {
      label: "To Be Requested",
      className: "text-gray-600 bg-gray-50",
      badgeStyle: {
        backgroundColor: 'rgba(0, 0, 0, 0.85)', // Dark background for contrast
        color: '#6b7280', // Gray text
        borderColor: 'rgba(107, 114, 128, 0.5)',
        backdropFilter: 'blur(8px)',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)'
      },
      dotStyle: {
        backgroundColor: '#6b7280',
        boxShadow: '0 0 8px rgba(107, 114, 128, 0.6)'
      }
    }
  },
  
  // Payment Status
  payment: {
    paid: {
      label: "Paid",
      className: "text-green-600 bg-green-50",
      badgeStyle: {
        backgroundColor: COMPONENTS.STATUS_SUCCESS + '20',
        color: COMPONENTS.STATUS_SUCCESS,
        borderColor: COMPONENTS.STATUS_SUCCESS + '40'
      },
      dotStyle: {
        backgroundColor: COMPONENTS.STATUS_SUCCESS
      }
    },
    unpaid: {
      label: "Unpaid",
      className: "text-red-600 bg-red-50",
      badgeStyle: {
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        color: 'rgba(239, 68, 68, 1)',
        borderColor: 'rgba(239, 68, 68, 0.2)'
      },
      dotStyle: {
        backgroundColor: 'rgba(239, 68, 68, 1)'
      }
    }
  },
  
  // Flight/Service Status
  service: {
    confirmed: {
      label: "Confirmed",
      className: "text-green-600 bg-green-50",
      badgeStyle: {
        backgroundColor: COMPONENTS.STATUS_SUCCESS + '20',
        color: COMPONENTS.STATUS_SUCCESS,
        borderColor: COMPONENTS.STATUS_SUCCESS + '40'
      },
      dotStyle: {
        backgroundColor: COMPONENTS.STATUS_SUCCESS
      }
    },
    not_started: {
      label: "Not Started",
      className: "text-gray-600 bg-gray-50",
      badgeStyle: {
        backgroundColor: 'rgba(156, 163, 175, 0.1)',
        color: 'rgba(107, 114, 128, 1)',
        borderColor: 'rgba(209, 213, 219, 0.5)'
      },
      dotStyle: {
        backgroundColor: 'rgba(156, 163, 175, 1)'
      }
    }
  }
};

// Helper functions for getting status configuration
export const getStatusConfig = (type, status) => {
  return STATUS_CONFIG[type]?.[status] || STATUS_CONFIG.trip.available;
};

export const getStatusClassName = (type, status) => {
  return getStatusConfig(type, status).className;
};

export const getStatusLabel = (type, status) => {
  return getStatusConfig(type, status).label;
};

export const getStatusBadgeStyle = (type, status) => {
  return getStatusConfig(type, status).badgeStyle;
};

export const getStatusDotStyle = (type, status) => {
  return getStatusConfig(type, status).dotStyle;
};
