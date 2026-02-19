import React from "react";
import { getStatusConfig, getStatusBadgeStyle, getStatusDotStyle } from "../../constants/statusConfig";

export default function StatusBadge({ status, type = "trip" }) {
  const config = getStatusConfig(type, status);

  return (
    <span
      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border"
      style={config.badgeStyle}
    >
      <span 
        className="w-1.5 h-1.5 rounded-full" 
        style={config.dotStyle}
      />
      {config.label}
    </span>
  );
}