import React from "react";

const statusConfig = {
  open: {
    label: "Open",
    bg: "bg-emerald-50",
    text: "text-emerald-700",
    dot: "bg-emerald-500",
    border: "border-emerald-200",
  },
  confirmed: {
    label: "Confirmed",
    bg: "bg-[#FF8C42]/10",
    text: "text-[#8B6F2A]",
    dot: "bg-[#FF8C42]",
    border: "border-[#FF8C42]/20",
  },
  waitlist: {
    label: "Waitlist",
    bg: "bg-orange-50",
    text: "text-orange-700",
    dot: "bg-orange-500",
    border: "border-orange-200",
  },
  closed: {
    label: "Closed",
    bg: "bg-gray-100",
    text: "text-gray-500",
    dot: "bg-gray-400",
    border: "border-gray-200",
  },
};

export default function StatusBadge({ status }) {
  const cfg = statusConfig[status] || statusConfig.open;

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${cfg.bg} ${cfg.text} ${cfg.border}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
      {cfg.label}
    </span>
  );
}