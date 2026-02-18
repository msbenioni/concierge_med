import React from "react";
import { 
  COMPONENTS,
  ACCENT_PRIMARY_ALPHA_20,
  ACCENT_PRIMARY,
  BORDERS
} from "../../constants/colors";

const statusConfig = {
  open: {
    label: "Open",
    bg: "",
    text: "",
    dot: "",
    border: "",
    style: {
      backgroundColor: COMPONENTS.STATUS_SUCCESS + '20',
      color: COMPONENTS.STATUS_SUCCESS,
      borderColor: COMPONENTS.STATUS_SUCCESS + '40'
    },
    dotStyle: {
      backgroundColor: COMPONENTS.STATUS_SUCCESS
    }
  },
  confirmed: {
    label: "Confirmed",
    bg: "",
    text: "",
    dot: "",
    border: "",
    style: {
      backgroundColor: ACCENT_PRIMARY_ALPHA_20,
      color: ACCENT_PRIMARY,
      borderColor: BORDERS.ACCENT_SUBTLE
    },
    dotStyle: {
      backgroundColor: ACCENT_PRIMARY
    }
  },
  waitlist: {
    label: "Waitlist",
    bg: "",
    text: "",
    dot: "",
    border: "",
    style: {
      backgroundColor: COMPONENTS.STATUS_WARNING + '20',
      color: COMPONENTS.STATUS_WARNING,
      borderColor: COMPONENTS.STATUS_WARNING + '40'
    },
    dotStyle: {
      backgroundColor: COMPONENTS.STATUS_WARNING
    }
  },
  closed: {
    label: "Closed",
    bg: "",
    text: "",
    dot: "",
    border: "",
    style: {
      backgroundColor: 'rgba(156, 163, 175, 0.1)',
      color: 'rgba(107, 114, 128, 1)',
      borderColor: 'rgba(209, 213, 219, 0.5)'
    },
    dotStyle: {
      backgroundColor: 'rgba(156, 163, 175, 1)'
    }
  },
};

export default function StatusBadge({ status }) {
  const cfg = statusConfig[status] || statusConfig.open;

  return (
    <span
      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border"
      style={cfg.style}
    >
      <span 
        className="w-1.5 h-1.5 rounded-full" 
        style={cfg.dotStyle}
      />
      {cfg.label}
    </span>
  );
}